<?php

namespace App\Notifications;

use App\Models\Activity;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class GlobalActivityNotification extends Notification
{
    use Queueable;

    protected $activity;

    /**
     * Create a new notification instance.
     */
    public function __construct(Activity $activity)
    {
        $this->activity = $activity;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     */
    public function toDatabase(object $notifiable): array
    {
        $subject = $this->activity->subject;
        $user = $this->activity->user;
        $type = class_basename($subject);

        // Dynamic message based on type
        $message = match ($type) {
            'Article' => 'ha publicado un nuevo artículo: ' . $subject->title,
            'Video' => 'ha subido un nuevo video: ' . $subject->title,
            'Wallpaper' => 'ha compartido un nuevo wallpaper: ' . $subject->title,
            'Event' => 'ha creado un nuevo evento: ' . $subject->title,
            'Course' => 'ha lanzado un nuevo curso: ' . $subject->title,
            'EventLike' => 'le ha dado like a tu evento: ' . $subject->event->title,
            'EventComment' => 'ha comentado en tu evento: ' . $subject->event->title,
            'StoryLike' => 'le ha dado like a tu historia: ' . $subject->story->title,
            'StoryComment' => 'ha comentado en tu historia: ' . $subject->story->title,
            default => 'ha realizado una actividad nueva: ' . ($subject->title ?? $subject->name ?? ''),
        };

        // Dynamic URL based on type
        $url = match ($type) {
            'Article' => route('blog.show', $subject->id),
            'Video' => route('videos.show', $subject->id),
            'Wallpaper' => route('wallpaper'),
            'Event' => route('events.show', $subject->slug),
            'Course' => route('academy.show', $subject->slug),
            'EventLike', 'EventComment' => route('events.show', $subject->event->slug),
            'StoryLike', 'StoryComment' => route('stories.index'),
            default => '#',
        };

        return [
            'message' => $message,
            'action_url' => $url,
            'sender_name' => $user->name,
            'sender_avatar' => $user->avatar,
            'subject_id' => $subject->id,
            'subject_type' => get_class($subject),
        ];
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
