<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Course;
use App\Models\Event;
use App\Models\Story;
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
                            'content' => $comment->content,
                            'user' => [
                                'name' => $comment->user->name,
                                'avatar' => $comment->user->profile_photo_url,
                            ],
                            'created_at' => $comment->created_at->diffForHumans(),
                        ];
                    }),
                ];
            });

        $activities = Activity::with(['subject', 'user'])
            ->latest()
            ->paginate(10);

        $activities->loadMorph('subject', [
            Event::class => ['likes', 'comments.user', 'createdBy'],
            Story::class => ['likes', 'comments.user', 'user', 'images'],
        ]);

        // Map activities to include likes data and relations for subjects
        $activities->getCollection()->transform(function ($activity) {
            $subject = $activity->subject;
            if ($subject) {
                if ($subject instanceof \App\Models\Event) {
                    $subject->likes_count = $subject->likes->count();
                    $subject->is_liked = Auth::check() ? $subject->isLikedBy(Auth::user()) : false;

                    if (!isset($subject->author)) {
                        $subject->author = [
                            'name' => $subject->createdBy->name,
                            'avatar' => $subject->createdBy->profile_photo_url,
                        ];
                    }

                    if ($subject->comments->isNotEmpty() && $subject->comments->first() instanceof \Illuminate\Database\Eloquent\Model) {
                        $subject->comments = $subject->comments->map(function ($comment) {
                            return [
                                'id' => $comment->id,
                                'content' => $comment->content,
                                'user' => [
                                    'name' => $comment->user->name,
                                    'avatar' => $comment->user->profile_photo_url,
                                ],
                                'created_at' => $comment->created_at->diffForHumans(),
                            ];
                        });
                    }
                } elseif ($subject instanceof \App\Models\Story) {
                    $subject->likes_count = $subject->likes->count();
                    $subject->is_liked = Auth::check() ? $subject->isLikedBy(Auth::user()) : false;

                    if (!isset($subject->author)) {
                        $subject->author = [
                            'name' => $subject->user->name,
                            'avatar' => $subject->user->profile_photo_url ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $subject->user->name,
                        ];
                    }

                    if ($subject->comments->isNotEmpty() && $subject->comments->first() instanceof \Illuminate\Database\Eloquent\Model) {
                        $subject->comments = $subject->comments->map(function ($comment) {
                            return [
                                'id' => $comment->id,
                                'content' => $comment->content,
                                'user' => [
                                    'name' => $comment->user->name,
                                    'avatar' => $comment->user->profile_photo_url ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $comment->user->name,
                                ],
                                'created_at' => $comment->created_at->diffForHumans(),
                            ];
                        });
                    }
                    if ($subject->created_at instanceof \Carbon\Carbon) {
                        $subject->created_at = $subject->created_at->diffForHumans();
                    }
                } else {
                    $subject->likes_count = 0;
                    $subject->is_liked = false;
                }
            }
            return $activity;
        });

        $stories = Story::with(['user', 'likes', 'comments.user', 'images'])
            ->latest()
            ->get()
            ->map(function ($story) {
                return [
                    'id' => $story->id,
                    'title' => $story->title,
                    'description' => $story->description,
                    'content_url' => $story->content_url,
                    'images' => $story->images->map(fn($img) => $img->image_url),
                    'likes_count' => $story->likes->count(),
                    'is_liked' => auth()->check() ? $story->isLikedBy(auth()->user()) : false,
                    'comments' => $story->comments->map(function ($comment) {
                        return [
                            'id' => $comment->id,
                            'content' => $comment->content,
                            'user' => [
                                'name' => $comment->user->name,
                                'avatar' => $comment->user->avatar ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $comment->user->name,
                            ],
                            'created_at' => $comment->created_at->diffForHumans(),
                        ];
                    }),
                    'author' => [
                        'name' => $story->user->name,
                        'avatar' => $story->user->avatar ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $story->user->name,
                    ],
                    'created_at' => $story->created_at->diffForHumans(),
                ];
            });

        $courses = Course::with(['instructor', 'modules'])
            ->where('status', 'published')
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'cover_image' => $course->cover_image,
                    'slug' => $course->slug,
                    'instructor' => [
                        'name' => $course->instructor->name,
                        'avatar' => $course->instructor->profile_photo_url,
                    ],
                    'modules_count' => $course->modules->count(),
                ];
            });

        return Inertia::render('dashboard', [
            'upcomingEvents' => $upcomingEvents,
            'activities' => $activities,
            'stories' => $stories,
            'courses' => $courses,
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
