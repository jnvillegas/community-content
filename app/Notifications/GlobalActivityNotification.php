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
        $isUpdate = str_starts_with($this->activity->type, 'updated_');

        $message = match ($type) {
            'Article' => $isUpdate ? 'ha actualizado el artículo: ' . $subject->title : 'ha publicado un nuevo artículo: ' . $subject->title,
            'Video' => $isUpdate ? 'ha actualizado el video: ' . $subject->title : 'ha subido un nuevo video: ' . $subject->title,
            'Wallpaper' => $isUpdate ? 'ha actualizado el wallpaper: ' . $subject->title : 'ha compartido un nuevo wallpaper: ' . $subject->title,
            'Event' => $isUpdate ? 'ha actualizado el evento: ' . $subject->title : 'ha creado un nuevo evento: ' . $subject->title,
            'Course' => $isUpdate ? 'ha actualizado el curso: ' . $subject->title : 'ha lanzado un nuevo curso: ' . $subject->title,
            'Story' => $isUpdate ? 'ha actualizado la historia: ' . $subject->title : 'ha publicado una nueva historia: ' . $subject->title,
            'EventLike' => 'le ha dado like a tu evento: ' . $subject->event->title,
            'EventComment' => 'ha comentado en tu evento: ' . $subject->event->title,
            'StoryLike' => 'le ha dado like a tu historia: ' . $subject->story->title,
            'StoryComment' => 'ha comentado en tu historia: ' . $subject->story->title,
            'ArticleLike' => 'le ha dado like a tu artículo: ' . $subject->article->title,
            'ArticleComment' => 'ha comentado en tu artículo: ' . $subject->article->title,
            'VideoLike' => 'le ha dado like a tu video: ' . $subject->video->title,
            'VideoComment' => 'ha comentado en tu video: ' . $subject->video->title,
            'WallpaperLike' => 'le ha dado like a tu wallpaper: ' . $subject->wallpaper->title,
            'WallpaperComment' => 'ha comentado en tu wallpaper: ' . $subject->wallpaper->title,
            default => ($isUpdate ? 'ha actualizado ' : 'ha realizado ') . 'una actividad: ' . ($subject->title ?? $subject->name ?? ''),
        };

        // Dynamic URL based on type
        $url = match ($type) {
            'Article' => route('articles.show', $subject->slug),
            'Video' => route('videos.show', $subject->id),
            'Wallpaper' => route('wallpapers.show', $subject->id),
            'Event' => route('events.show', $subject->slug),
            'Course' => route('academy.show', $subject->slug),
            'Story' => route('dashboard', ['story' => $subject->id]),
            'EventLike', 'EventComment' => route('events.show', $subject->event->slug),
            'StoryLike', 'StoryComment' => route('dashboard', ['story' => $subject->story->id]),
            'ArticleLike', 'ArticleComment' => route('articles.show', $subject->article->slug),
            'VideoLike', 'VideoComment' => route('videos.show', $subject->video->id),
            'WallpaperLike', 'WallpaperComment' => route('wallpapers.show', $subject->wallpaper->id),
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
