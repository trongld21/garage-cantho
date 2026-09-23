#!/usr/bin/env bash
set -Eeuo pipefail

app_path="${1:?Missing application path}"
public_path="${2:?Missing public path}"
release_name="${3:?Missing release name}"

case "$app_path:$public_path:$release_name" in
  *$'\n'*|*..*) echo "Unsafe deployment path." >&2; exit 1 ;;
esac
[[ "$app_path" = /* && "$public_path" = /* && "$app_path" != / && "$public_path" != / ]] || {
  echo "Deployment paths must be absolute and cannot be root." >&2
  exit 1
}

release_path="$app_path/releases/$release_name"
shared_path="$app_path/shared"
[[ -d "$release_path" ]] || { echo "Release not found: $release_path" >&2; exit 1; }
if [[ ! -f "$shared_path/.env" ]]; then
  install -m 600 "$release_path/.env.directadmin.example" "$shared_path/.env"
  echo "Created $shared_path/.env from the template. Fill its production values and rerun the workflow." >&2
  exit 1
fi

mkdir -p \
  "$shared_path/storage/app/public" \
  "$shared_path/storage/framework/cache/data" \
  "$shared_path/storage/framework/sessions" \
  "$shared_path/storage/framework/views" \
  "$shared_path/storage/logs"

for link_name in api storage; do
  link_path="$public_path/$link_name"
  if [[ -e "$link_path" && ! -L "$link_path" ]]; then
    echo "$link_path exists and is not a symlink; refusing to overwrite it." >&2
    exit 1
  fi
done

ln -sfn "$shared_path/.env" "$release_path/.env"
ln -sfn "$shared_path/storage" "$release_path/storage"

cd "$release_path"
php artisan config:clear
php artisan migrate --force
php artisan admin:bootstrap
php artisan optimize

ln -sfn "$release_path" "$app_path/current"

ln -sfn "$app_path/current/public" "$public_path/api"
ln -sfn "$shared_path/storage/app/public" "$public_path/storage"

# Retain the newest three releases to stay inside small DirectAdmin disk quotas.
mapfile -t old_releases < <(find "$app_path/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +4 | cut -d' ' -f2-)
for old_release in "${old_releases[@]}"; do
  resolved_old="$(readlink -f "$old_release")"
  resolved_releases="$(readlink -f "$app_path/releases")"
  [[ "$resolved_old" == "$resolved_releases"/* ]] || { echo "Unsafe cleanup target: $old_release" >&2; exit 1; }
  rm -rf -- "$resolved_old"
done

echo "Activated release $release_name"

