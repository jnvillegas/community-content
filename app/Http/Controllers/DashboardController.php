<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $upcomingEvents = Event::with(['likes', 'comments.user', 'createdBy'])
            ->where('start_date', '>', now())
            ->where('status', Event::STATUS_PUBLISHED)
            ->orderBy('start_date', 'asc')
            ->take(5)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'location' => $event->location,
                    'cover_image' => $event->cover_image,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'formatted_date' => $this->formatEventDate($event->start_date, $event->end_date),
                    'slug' => $event->slug,
                    'color' => $this->getEventColor($event->type),
                    'likes_count' => $event->likes->count(),
                    'is_liked' => $event->isLikedBy(Auth::user()),
                    'author' => [
                        'name' => $event->createdBy->name,
                        'avatar' => $event->createdBy->profile_photo_url,
                    ],
                    'comments' => $event->comments->map(function ($comment) {
                        return [
                            'id' => $comment->id,
                            'user' => $comment->user->name,
                            'avatar' => $comment->user->profile_photo_url,
                            'content' => $comment->content,
                            'created_at' => $comment->created_at->diffForHumans(),
                        ];
                    }),
                ];
            });

        $activities = Activity::with(['subject', 'user'])
            ->latest()
            ->paginate(10);

        return Inertia::render('dashboard', [
            'upcomingEvents' => $upcomingEvents,
            'activities' => $activities,
        ]);
    }

    private function formatEventDate($start, $end)
    {
        $start = \Carbon\Carbon::parse($start);
        $end = \Carbon\Carbon::parse($end);

        return $start->format('d M') . ' - ' . $end->format('d M');
    }

    private function getEventColor(string $type): string
    {
        return match ($type) {
            'WORKSHOP' => 'bg-emerald-500',
            'MEETUP' => 'bg-blue-500',
            'WEBINAR' => 'bg-amber-500',
            'TRIP' => 'bg-purple-500',
            default => 'bg-gray-500',
        };
    }
}
