<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\EventReminder
 *
 * @property int $id
 * @property int $event_id
 * @property int $user_id
 * @property string $reminder_type
 * @property \Illuminate\Support\Carbon $scheduled_at
 * @property \Illuminate\Support\Carbon|null $sent_at
 * @property string $channel
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Event $event
 * @property-read \App\Models\User $user
 */
class EventReminder extends Model
{
    use HasFactory;

    // Type Enums
    const TYPE_24H = '24h';
    const TYPE_1H = '1h';
    const TYPE_15MIN = '15min';
    const TYPE_CUSTOM = 'custom';

    // Channel Enums
    const CHANNEL_EMAIL = 'email';
    const CHANNEL_WHATSAPP = 'whatsapp';
    const CHANNEL_PUSH = 'push';

    protected $fillable = [
        'event_id',
        'user_id',
        'reminder_type',
        'scheduled_at',
        'sent_at',
        'channel',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
