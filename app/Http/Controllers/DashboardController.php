<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Activity;
use App\Models\Course;
use App\Models\Event;
use App\Models\Story;
use App\Models\Video;
use App\Models\Wallpaper;
use App\Models\EventLike;
use App\Models\EventComment;
use App\Models\StoryLike;
use App\Models\StoryComment;
use App\Models\ArticleLike;
use App\Models\ArticleComment;
use App\Models\VideoLike;
use App\Models\VideoComment;
use App\Models\WallpaperLike;
use App\Models\WallpaperComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request): Response
    {
        $openStoryId = $request->query('story');
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
            ->whereIn('type', [
                'created_event', 'created_article', 'created_video', 'created_wallpaper',
                'updated_article', 'updated_video', 'updated_wallpaper',
                'created_eventlike', 'created_eventcomment', 'created_storylike', 'created_storycomment',
                'created_articlelike', 'created_articlecomment', 'created_videolike', 'created_videocomment',
                'created_wallpaperlike', 'created_wallpapercomment'
            ])
            ->latest()
            ->paginate(10);

        $activities->loadMorph('subject', [
            Event::class => ['likes', 'comments.user', 'createdBy'],
            Story::class => ['likes', 'comments.user', 'user', 'images'],
            Article::class => ['author', 'categories', 'likes', 'comments.user'],
            Video::class => ['author', 'categories', 'likes', 'comments.user'],
            Wallpaper::class => ['author', 'likes', 'comments.user'],
            EventLike::class => ['event', 'user'],
            EventComment::class => ['event', 'user'],
            StoryLike::class => ['story', 'user'],
            StoryComment::class => ['story', 'user'],
            ArticleLike::class => ['article', 'user'],
            ArticleComment::class => ['article', 'user'],
            VideoLike::class => ['video', 'user'],
            VideoComment::class => ['video', 'user'],
            WallpaperLike::class => ['wallpaper', 'user'],
            WallpaperComment::class => ['wallpaper', 'user'],
        ]);

        // Map activities to include likes data and relations for subjects
        // First, remove activities whose subject was deleted (soft-deleted)
        $activities->setCollection(
            $activities->getCollection()->filter(fn($activity) => $activity->subject !== null)
        );

        $activities->getCollection()->transform(function ($activity) {
            $subject = $activity->subject;
            
            // Normalize subject for interaction activities
            // If the parent content is missing, we set subject to null so it gets filtered out
            if ($activity->type === 'created_articlelike' || $activity->type === 'created_articlecomment') {
                $subject = $subject->article ?? null;
                $activity->setRelation('subject', $subject);
            } elseif ($activity->type === 'created_videolike' || $activity->type === 'created_videocomment') {
                $subject = $subject->video ?? null;
                $activity->setRelation('subject', $subject);
            } elseif ($activity->type === 'created_wallpaperlike' || $activity->type === 'created_wallpapercomment') {
                $subject = $subject->wallpaper ?? null;
                $activity->setRelation('subject', $subject);
            } elseif ($activity->type === 'created_eventlike' || $activity->type === 'created_eventcomment') {
                $subject = $subject->event ?? null;
                $activity->setRelation('subject', $subject);
            } elseif ($activity->type === 'created_storylike' || $activity->type === 'created_storycomment') {
                $subject = $subject->story ?? null;
                $activity->setRelation('subject', $subject);
            }

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
                } elseif ($subject instanceof \App\Models\Article) {
                    $subject->likes_count = $subject->likes->count();
                    $subject->comments_count = $subject->comments->count();
                    $subject->is_liked = Auth::check() ? $subject->isLikedBy(Auth::user()) : false;
                    $subject->formatted_date = $subject->created_at->format('M j · g:i A');

                    if (!isset($subject->author) && isset($subject->author_id)) {
                        $author = $subject->author;
                        $subject->author = [
                            'name' => $author->name ?? 'Admin',
                            'avatar' => $author->profile_photo_url ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . ($author->name ?? 'Admin'),
                        ];
                    }
                } elseif ($subject instanceof \App\Models\Video) {
                    $subject->likes_count = $subject->likes->count();
                    $subject->comments_count = $subject->comments->count();
                    $subject->is_liked = Auth::check() ? $subject->isLikedBy(Auth::user()) : false;

                    if (!isset($subject->author) && isset($subject->author_id)) {
                        $author = $subject->author;
                        $subject->author = [
                            'name' => $author->name ?? 'Admin',
                            'avatar' => $author->profile_photo_url ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . ($author->name ?? 'Admin'),
                        ];
                    }
                } elseif ($subject instanceof \App\Models\Wallpaper) {
                    $subject->likes_count = $subject->likes->count();
                    $subject->comments_count = $subject->comments->count();
                    $subject->is_liked = Auth::check() ? $subject->isLikedBy(Auth::user()) : false;

                    if (!isset($subject->author) && isset($subject->author_id)) {
                        $author = $subject->author;
                        $subject->author = [
                            'name' => $author->name ?? 'Admin',
                            'avatar' => $author->profile_photo_url ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . ($author->name ?? 'Admin'),
                        ];
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
                    'is_viewed' => auth()->check() ? $story->isViewedBy(auth()->user()) : false,
                    'new_interactions_count' => auth()->check() ? $story->getNewInteractionsCountFor(auth()->user()) : 0,
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
            'openStoryId' => $openStoryId ? (int) $openStoryId : null,
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
