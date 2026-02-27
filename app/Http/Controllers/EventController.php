<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Event::query()->published()->upcoming();

        // Filters
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('id', $request->category_id);
            });
        }

        if ($request->filled('event_type')) {
            $query->where('type', $request->event_type);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('start_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('start_date', '<=', $request->date_to);
        }

        $events = $query->with(['categories', 'createdBy', 'likes', 'comments.user'])
            ->paginate(12)
            ->withQueryString()
            ->through(function ($event) {
                $event->likes_count = $event->likes->count();
                $event->is_liked = Auth::check() ? $event->isLikedBy(Auth::user()) : false;
                $event->comments_count = $event->comments->count();
                return $event;
            });

        $categories = EventCategory::all();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'event_type', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug): Response
    {
        $event = Event::with(['categories', 'createdBy', 'registrations', 'likes', 'comments.user'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Check if user can register
        $canRegister = ['can' => false, 'reason' => 'Guest'];
        $isRegistered = false;

        if (Auth::check()) {
            /* @var \App\Services\EventService $eventService */
            $eventService = app(\App\Services\EventService::class);
            $canRegister = $eventService->canRegister(Auth::user(), $event);

            $isRegistered = $event->registrations()
                ->where('user_id', Auth::id())
                ->whereIn('status', ['confirmed', 'attended']) // Check logic
                ->exists();
        }

        // Add computed properties for likes and comments
        $event->likes_count = $event->likes->count();
        $event->is_liked = Auth::check() ? $event->isLikedBy(Auth::user()) : false;
        $event->comments_count = $event->comments->count();

        return Inertia::render('Events/Show', [
            'event' => $event,
            'registrations_count' => $event->registrations()
                ->whereIn('status', ['confirmed', 'attended'])
                ->count(),
            'can_register' => $canRegister,
            'is_registered' => $isRegistered,
        ]);
    }

    /**
     * Display events for the authenticated user.
     */
    public function myEvents(): Response
    {
        $user = Auth::user();

        $registrations = $user->eventRegistrations()
            ->with(['event.categories'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Events/MyEvents', [
            'registrations' => $registrations,
        ]);
    }

    public function toggleLike(Event $event): RedirectResponse
    {
        $user = Auth::user();
        $like = $event->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
        } else {
            $event->likes()->create(['user_id' => $user->id]);
        }

        return back();
    }

    public function storeComment(Event $event, Request $request): RedirectResponse
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $event->comments()->create([
            'user_id' => Auth::id(),
            'content' => $request->input('content'),
        ]);

        return back();
    }
}
