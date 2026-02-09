<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventReminder extends Notification
{
    use Queueable;

    protected $event;

    /**
     * Create a new notification instance.
     */
    public function __construct($event)
    {
        $this->event = $event;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Recordatorio de Evento: ' . $this->event->title)
            ->greeting('¡Hola ' . $notifiable->name . '!')
            ->line('Este es un recordatorio de que te asistes al evento "' . $this->event->title . '" que comenzará pronto.')
            ->line('Fecha de inicio: ' . $this->event->start_date->format('d/m/Y H:i'))
            ->action('Ver Detalles del Evento', route('events.show', $this->event->slug))
            ->line('¡Esperamos verte allí!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
