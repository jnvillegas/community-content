<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\BlogController;
use App\Http\Controllers\Web\WallpaperController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('web/views/About/About');
})->name('about');

Route::get('/community', function () {
    return Inertia::render('web/views/Community/Community');
})->name('community');

Route::get('/contact', function () {
    return Inertia::render('web/views/Contact/Contact');
})->name('contact');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');

Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/wallpaper', [WallpaperController::class, 'index'])->name('wallpaper');
Route::get('/wallpaper/{wallpaper}/download', [WallpaperController::class, 'download'])->name('wallpaper.download');

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

    // Wallpapers
    Route::resource('wallpapers', \App\Http\Controllers\WallpaperController::class);

    // Dynamic Categories (AJAX)
    Route::post('/categories', [\App\Http\Controllers\CategoryController::class, 'store'])->name('categories.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/admin-commands.php';