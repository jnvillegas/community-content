<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use App\Models\User;
use App\Notifications\GlobalActivityNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Log;

class Activity extends Model
{
    protected $fillable = ['user_id', 'type', 'subject_id', 'subject_type'];

    protected static function booted()
    {
        static::created(function ($activity) {
            $type = $activity->type;
            $actor = $activity->user;
            $subject = $activity->subject;

            // 1. Interactions (Likes, Comments) -> Notify the content owner
            $interactions = [
                'created_eventlike',
                'created_eventcomment',
                'created_storylike',
                'created_storycomment',
                'created_articlelike',
                'created_articlecomment',
                'created_videolike',
                'created_videocomment',
                'created_wallpaperlike',
                'created_wallpapercomment'
            ];

            if (in_array($type, $interactions)) {
                $recipient = null;

                // Determine the recipient (owner of the content)
                if (str_contains($type, 'event')) {
                    $recipient = $subject->event->createdBy;
                } elseif (str_contains($type, 'story')) {
                    $recipient = $subject->story->user;
                } elseif (str_contains($type, 'article')) {
                    $recipient = $subject->article->author;
                } elseif (str_contains($type, 'video')) {
                    $recipient = $subject->video->author;
                } elseif (str_contains($type, 'wallpaper')) {
                    $recipient = $subject->wallpaper->author;
                }

                // Only notify if there's a recipient and it's not the actor
                if ($recipient && $recipient->id !== $actor->id) {
                    Log::info("Sending notification for {$type} to recipient {$recipient->id}");
                    Notification::send($recipient, new GlobalActivityNotification($activity));
                } else {
                    Log::info("Not sending notification for {$type}. Recipient: " . ($recipient->id ?? 'null') . ", Actor: {$actor->id}");
                }
                return;
            }

            // 2. New Content or Updates (Article, Video, etc.) -> Notify everyone
            if (str_starts_with($type, 'created_') || str_starts_with($type, 'updated_')) {
                $users = User::where('id', '!=', $activity->user_id)->get();
                Notification::send(
                    $users,
                    new GlobalActivityNotification($activity)
                );
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subject(): MorphTo
    {
        return $this->morphTo();
    }
}
