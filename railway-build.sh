#!/bin/bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
# Eliminamos los comandos de cache de aquí porque se deben ejecutar en runtime, no en build
