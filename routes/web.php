<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('web/views/Home/Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('web/views/About/About');
})->name('about');

Route::get('/blog', function () {
    return Inertia::render('web/views/Blog/Blog');
})->name('blog');

Route::get('/wallpaper', function () {
    return Inertia::render('web/views/Wallpaper/Wallpaper');
})->name('wallpaper');

// Rutas pendientes de implementación real
foreach (['community', 'contact'] as $route) {
    Route::get('/' . $route, function () {
        return Inertia::render('web/views/Home/Home');
    })->name($route);
}

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Http\Controllers\UserController::class)->except(['create', 'edit', 'show']);
    Route::resource('roles', \App\Http\Controllers\RoleController::class)->except(['create', 'edit', 'show']);
    Route::resource('permissions', \App\Http\Controllers\PermissionController::class)->except(['create', 'edit', 'show']);
    Route::resource('posts', \App\Http\Controllers\PostController::class);

    // Notifications
    Route::get('notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::post('notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
    Route::delete('notifications/{id}', [\App\Http\Controllers\NotificationController::class, 'destroy'])->name('notifications.destroy');

    // Articles (WordPress-style blog)
    Route::resource('articles', \App\Http\Controllers\ArticleController::class);

    // Videos (Travel Explorer Hub)
    Route::resource('videos', \App\Http\Controllers\VideoController::class);
});

require __DIR__ . '/settings.php';
