<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Story;
use App\Models\StoryComment;
use App\Models\StoryLike;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_stories' => Story::count(),
            'total_likes' => StoryLike::count(),
            'total_comments' => StoryComment::count(),
            'total_views' => Story::sum('views_count'),
        ];

        $recentComments = StoryComment::with(['user', 'story'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'user' => [
                        'name' => $comment->user->name,
                        'avatar' => $comment->user->avatar ?? 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $comment->user->name,
                    ],
                    'story_title' => $comment->story->title,
                    'created_at' => $comment->created_at->diffForHumans(),
                ];
            });

        $storiesPerformance = Story::withCount(['likes', 'comments'])
            ->orderBy('views_count', 'desc')
            ->take(10)
            ->get()
            ->map(function ($story) {
                return [
                    'id' => $story->id,
                    'title' => $story->title,
                    'views' => $story->views_count,
                    'likes' => $story->likes_count,
                    'comments' => $story->comments_count,
                    'engagement_rate' => $story->views_count > 0
                        ? round((($story->likes_count + $story->comments_count) / $story->views_count) * 100, 2)
                        : 0,
                ];
            });

        return Inertia::render('Admin/Stories/Dashboard', [
            'stats' => $stats,
            'recentComments' => $recentComments,
            'storiesPerformance' => $storiesPerformance,
        ]);
    }

    public function destroyComment(StoryComment $comment)
    {
        $comment->delete();
        return back()->with('success', 'Comment deleted successfully');
    }
}
