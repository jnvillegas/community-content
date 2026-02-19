<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class EventsController extends Controller
{
    public function index(Request $request)
    {
        // Base query with eager loading for likes, comments, categories, etc.
        $query = Event::with(['likes', 'comments', 'categories', 'createdBy'])
            ->latest();

        // Optional: Add filters similar to dashboard (e.g., search)
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // Fetch limited events (or paginate for larger lists)
        $events = $query->take(5)->get();

        // Transform events to include counts and user-specific data
        $events->transform(function ($event) {
            $event->likes_count = $event->likes->count(); // Or use $event->likes()->count() if not eager-loaded
            $event->comments_count = $event->comments->count();
            $event->is_liked = Auth::check() && $event->likes->contains('user_id', Auth::id()); // Check if user liked it
            // Add more as needed, e.g., registrations_count = $event->registrations()->count();
            return $event;
        });

        return Inertia::render('web/views/Community/Community', [
            'events' => $events,
            // Optional: Pass filters if added
            'filters' => $request->only(['search']),
        ]);
    }

    // Optional: Add a show method for individual event details
    public function show(int $id)
    {
        $event = Event::with(['likes', 'comments', 'categories', 'createdBy', 'registrations'])
            ->where('id', $id)
            ->firstOrFail();

        // Add counts and checks
        $likes_count = $event->likes()->count();
        $comments_count = $event->comments()->count();
        $is_liked = Auth::check() && $event->likes()->where('user_id', Auth::id())->exists();
        // Similar to dashboard for registrations, etc.

        return Inertia::render('web/views/Community/Community', [
            'event' => $event,
            'likes_count' => $likes_count,
            'comments_count' => $comments_count,
            'is_liked' => $is_liked,
        ]);
    }

    // Reuse or add toggleLike and storeComment (similar to dashboard)
    public function toggleLike(Event $event)
    {
        // Copy logic from dashboard...
        $user = Auth::user();
        $like = $event->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
        } else {
            $event->likes()->create(['user_id' => $user->id]);
        }

        return back();
    }

    // Similarly for storeComment...
}