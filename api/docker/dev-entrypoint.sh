#!/bin/sh
set -eu

if [ ! -x node_modules/.bin/tsx ]; then
  echo "Installing API dependencies into the Docker volume..."
  npm ci
fi

if [ ! -f node_modules/.prisma/client/default.js ] || [ prisma/schema.prisma -nt node_modules/.prisma/client/default.js ]; then
  echo "Generating Prisma client..."
  npx prisma generate
fi

if [ "${RUN_DB_MIGRATIONS:-true}" = "true" ]; then
  echo "Applying Prisma migrations..."
  npx prisma migrate deploy
fi

if [ "${RUN_DB_SEED:-false}" = "true" ]; then
  echo "Running database seed..."
  npx prisma db seed
fi

exec npm run dev
