<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $upcomingEvents = Event::where('start_date', '>', now())
            ->where('status', Event::STATUS_PUBLISHED)
            ->orderBy('start_date', 'asc')
            ->take(5)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'start_date' => $event->start_date,
                    'slug' => $event->slug,
                    // Add other necessary fields for the dashboard widget
                    'color' => $this->getEventColor($event->type),
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
