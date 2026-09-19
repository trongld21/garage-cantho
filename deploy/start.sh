#!/usr/bin/env bash
set -Eeuo pipefail

cd /app/backend
export APP_URL="${RENDER_EXTERNAL_URL:-${APP_URL:-http://localhost:10000}}"
export APP_KEY="${APP_KEY:-$(php -r 'echo "base64:".base64_encode(random_bytes(32));')}"

# This demo has an ephemeral SQLite database. Seed only a new database.
if [[ "${DB_CONNECTION}" != "sqlite" ]]; then
    echo "This demo startup script requires DB_CONNECTION=sqlite." >&2
    exit 1
fi
mkdir -p "$(dirname "$DB_DATABASE")" storage/framework/{cache/data,sessions,views}
if [[ ! -s "$DB_DATABASE" ]]; then
    touch "$DB_DATABASE"
    php artisan migrate --force --seed
else
    php artisan migrate --force
fi
php artisan optimize

php artisan serve --host=127.0.0.1 --port=8000 --no-reload &
backend_pid=$!
frontend_pid=""
cleanup() {
    kill "$backend_pid" ${frontend_pid:+"$frontend_pid"} 2>/dev/null || true
    wait || true
}
trap cleanup EXIT
trap 'exit 143' TERM
trap 'exit 130' INT

# Do not expose the frontend until migrations and the API are ready.
ready=false
for attempt in {1..30}; do
    if curl --fail --silent http://127.0.0.1:8000/up >/dev/null; then
        ready=true
        break
    fi
    kill -0 "$backend_pid"
    sleep 1
done
if [[ "$ready" != true ]]; then
    echo "Laravel did not become ready." >&2
    exit 1
fi

cd /app/frontend
HOSTNAME=0.0.0.0 node server.js &
frontend_pid=$!
# Stop the container if either server exits, so Render can restart both.
wait -n "$backend_pid" "$frontend_pid"
exit 1
