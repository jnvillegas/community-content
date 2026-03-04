<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use App\Models\User;
use App\Notifications\GlobalActivityNotification;
use Illuminate\Support\Facades\Notification;

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
                'created_storycomment'
            ];

            if (in_array($type, $interactions)) {
                $recipient = null;

                // Determine the recipient (owner of the content)
                if (str_contains($type, 'event')) {
                    $recipient = $subject->event->createdBy;
                } elseif (str_contains($type, 'story')) {
                    $recipient = $subject->story->user;
                }

                // Only notify if there's a recipient and it's not the actor
                if ($recipient && $recipient->id !== $actor->id) {
                    Notification::send($recipient, new GlobalActivityNotification($activity));
                }
                return;
            }

            // 2. New Content (Article, Video, etc.) -> Notify everyone
            if (str_starts_with($type, 'created_')) {
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
