#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🚀 Starting build process..."

# Install Composer dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Install NPM dependencies
echo "📦 Installing NPM dependencies..."
npm ci

# Build Vite assets
echo "🎨 Building frontend assets..."
npm run build

# Clear and cache config
echo "⚙️ Optimizing Laravel..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Run migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force --no-interaction

# Optimize for production
echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link
echo "🔗 Creating storage link..."
php artisan storage:link

echo "✅ Build completed successfully!"
