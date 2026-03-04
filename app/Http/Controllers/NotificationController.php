<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Http\RedirectResponse;

class NotificationController extends Controller
{
    /**
     * Get all notifications for the authenticated user.
     */
    public function index(Request $request)
    {
        $notifications = auth()->user()->notifications()->paginate(20);

        if ($request->wantsJson()) {
            return $notifications;
        }

        return \Inertia\Inertia::render('notifications/index', [
            'notifications' => $notifications
        ]);
    }

    /**
     * Mark a specific notification as read.
     */
    public function markAsRead(string $id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        if (request()->wantsJson() || request()->header('X-Inertia')) {
            return response()->noContent();
        }

        return redirect()->back();
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();

        if (request()->wantsJson() || request()->header('X-Inertia')) {
            return response()->noContent();
        }

        return redirect()->back();
    }

    /**
     * Delete a notification.
     */
    public function destroy(string $id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->delete();

        if (request()->wantsJson() || request()->header('X-Inertia')) {
            return response()->noContent();
        }

        return redirect()->back();
    }
}
