<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\BlogController;
use App\Http\Controllers\Web\WallpaperController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventRegistrationController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Web\EventsController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('web/views/About/About');
})->name('about');

Route::get('/community', [EventsController::class, 'index'])->name('community');

Route::get('/contact', function () {
    return Inertia::render('web/views/Contact/Contact');
})->name('contact');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');

Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/wallpaper', [WallpaperController::class, 'index'])->name('wallpaper');
Route::get('/wallpaper/{wallpaper}/download', [WallpaperController::class, 'download'])->name('wallpaper.download');

// Events (Public)
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('users', \App\Http\Controllers\UserController::class)->except(['create', 'edit', 'show']);
    Route::resource('roles', \App\Http\Controllers\RoleController::class)->except(['create', 'edit', 'show']);
    Route::resource('permissions', \App\Http\Controllers\PermissionController::class)->except(['create', 'edit', 'show']);
    Route::get('/roles/{role}/permissions', [\App\Http\Controllers\RoleController::class, 'permissions'])->name('roles.permissions');
    Route::post('/roles/{role}/permissions', [\App\Http\Controllers\RoleController::class, 'syncPermissions'])->name('roles.permissions.sync');
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
    //
    // // Dynamic Categories (AJAX)
    // Route::post('/categories', [\App\Http\Controllers\CategoryController::class, 'store'])->name('categories.store');

    // Events (User)
    Route::get('/my-events', [EventController::class, 'myEvents'])->name('events.my');
    Route::post('/events/{event}/register', [EventRegistrationController::class, 'store'])->name('events.register');
    Route::delete('/events/{event}/unregister', [EventRegistrationController::class, 'destroy'])->name('events.unregister');

    // Event Interactions
    Route::post('/events/{event}/like', [EventController::class, 'toggleLike'])->name('events.like');
    Route::post('/events/{event}/comments', [EventController::class, 'storeComment'])->name('events.comment');

    // Stories
    Route::get('/stories', [\App\Http\Controllers\StoryController::class, 'index'])->name('stories.index');
    Route::post('/stories', [\App\Http\Controllers\StoryController::class, 'store'])->name('stories.store');
    Route::post('/stories/{story}/like', [\App\Http\Controllers\StoryController::class, 'like'])->name('stories.like');
    Route::post('/stories/{story}/comments', [\App\Http\Controllers\StoryController::class, 'comment'])->name('stories.comment');
    Route::delete('/stories/{story}', [\App\Http\Controllers\StoryController::class, 'destroy'])->name('stories.destroy');

    // Academy (Courses)
    Route::get('/academy', [\App\Http\Controllers\CourseController::class, 'index'])->name('academy.index');
    Route::get('/academy/{slug}', [\App\Http\Controllers\CourseController::class, 'show'])->name('academy.show');
    Route::get('/academy/{courseSlug}/lessons/{lessonSlug}', [\App\Http\Controllers\CourseController::class, 'lesson'])->name('academy.lesson');
    Route::post('/academy/lessons/{lesson}/progress', [\App\Http\Controllers\CourseProgressController::class, 'toggleComplete'])->name('academy.progress');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('events', AdminEventController::class)->except(['show']);
    Route::get('/events/{slug}/stats', [AdminEventController::class, 'stats'])->name('events.stats');
    Route::get('/events/{slug}/attendees', [AdminEventController::class, 'attendees'])->name('events.attendees');
    Route::post('/events/{slug}/attendees/{user}/mark', [AdminEventController::class, 'markAttendance'])->name('events.mark-attendance');
    Route::resource('event-categories', \App\Http\Controllers\Admin\EventCategoryController::class);
    Route::get('/stories', [\App\Http\Controllers\Admin\StoryDashboardController::class, 'index'])->name('stories.index');

    // Academy Dashboard
    Route::group(['prefix' => 'academy', 'as' => 'academy.'], function () {
        Route::get('/', [\App\Http\Controllers\Admin\AcademyDashboardController::class, 'index'])->name('dashboard');
        Route::resource('courses', \App\Http\Controllers\Admin\CourseController::class);
        Route::resource('courses.modules', \App\Http\Controllers\Admin\ModuleController::class);
        Route::resource('modules.lessons', \App\Http\Controllers\Admin\LessonController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/admin-commands.php';