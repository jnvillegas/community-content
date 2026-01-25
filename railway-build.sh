#!/usr/bin/env bash
# Railway Build Script
set -o errexit

echo "🚂 Starting Railway build process..."

# Install Composer dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Install NPM dependencies
echo "📦 Installing NPM dependencies..."
npm ci

# Build Vite assets
echo "🎨 Building frontend assets..."
npm run build

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 775 storage bootstrap/cache

echo "✅ Railway build completed successfully!"
