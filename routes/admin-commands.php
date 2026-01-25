<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Admin Command Routes (GRATIS - Sin Shell)
|--------------------------------------------------------------------------
|
| Estas rutas te permiten ejecutar comandos artisan via web browser
| IMPORTANTE: Protegidas con token secreto
|
| Uso:
| https://tu-app.onrender.com/admin/migrate?token=TU_TOKEN_SECRETO
|
*/

// Middleware para verificar token
Route::middleware(function ($request, $next) {
    if ($request->query('token') !== env('ADMIN_SECRET_TOKEN')) {
        abort(403, 'Unauthorized - Invalid token');
    }
    return $next($request);
})->group(function () {

    // Ejecutar migraciones
    Route::get('/admin/migrate', function () {
        Artisan::call('migrate', ['--force' => true]);

        return response()->json([
            'success' => true,
            'command' => 'migrate',
            'output' => Artisan::output()
        ]);
    });

    // Ejecutar migraciones con rollback
    Route::get('/admin/migrate-fresh', function () {
        Artisan::call('migrate:fresh', ['--force' => true]);

        return response()->json([
            'success' => true,
            'command' => 'migrate:fresh',
            'output' => Artisan::output()
        ]);
    });

    // Limpiar todos los cachés
    Route::get('/admin/clear-cache', function () {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');
        Artisan::call('route:clear');

        return response()->json([
            'success' => true,
            'command' => 'clear-all-caches',
            'message' => 'All caches cleared successfully'
        ]);
    });

    // Ejecutar seeders
    Route::get('/admin/seed', function () {
        $class = request('class', 'DatabaseSeeder');

        Artisan::call('db:seed', [
            '--class' => $class,
            '--force' => true
        ]);

        return response()->json([
            'success' => true,
            'command' => 'db:seed',
            'seeder' => $class,
            'output' => Artisan::output()
        ]);
    });

    // Optimizar aplicación
    Route::get('/admin/optimize', function () {
        Artisan::call('optimize');

        return response()->json([
            'success' => true,
            'command' => 'optimize',
            'output' => Artisan::output()
        ]);
    });

    // Ver info de la aplicación
    Route::get('/admin/info', function () {
        return response()->json([
            'app_name' => config('app.name'),
            'app_env' => config('app.env'),
            'app_debug' => config('app.debug'),
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
        ]);
    });

});
