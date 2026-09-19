FROM node:22-bookworm-slim AS frontend-build
WORKDIR /build/frontend
ENV NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_API_URL=/api
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM php:8.3-cli-bookworm AS php-base
RUN apt-get update && apt-get install -y --no-install-recommends \
    libonig-dev libsqlite3-dev libxml2-dev unzip curl libstdc++6 \
    && docker-php-ext-install mbstring pdo_sqlite dom xml \
    && rm -rf /var/lib/apt/lists/*

FROM php-base AS backend-build
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
WORKDIR /build/backend
COPY backend/ ./
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

FROM php-base AS runtime
COPY --from=frontend-build /usr/local/bin/node /usr/local/bin/node
WORKDIR /app
COPY --from=backend-build --chown=www-data:www-data /build/backend ./backend
COPY --from=frontend-build --chown=www-data:www-data /build/frontend/.next/standalone ./frontend
COPY --from=frontend-build --chown=www-data:www-data /build/frontend/.next/static ./frontend/.next/static
COPY --from=frontend-build --chown=www-data:www-data /build/frontend/public ./frontend/public
COPY deploy/start.sh /app/start.sh
RUN chmod +x /app/start.sh && mkdir -p /app/data && chown www-data:www-data /app/data
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=10000 \
    APP_ENV=production APP_DEBUG=false LOG_CHANNEL=stderr \
    DB_CONNECTION=sqlite DB_DATABASE=/app/data/demo.sqlite \
    SESSION_DRIVER=file CACHE_STORE=file QUEUE_CONNECTION=sync
USER www-data
EXPOSE 10000
CMD ["/app/start.sh"]
