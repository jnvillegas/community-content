<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\EventRegistration
 *
 * @property int $id
 * @property int $event_id
 * @property int $user_id
 * @property string $status
 * @property \Illuminate\Support\Carbon $registration_date
 * @property \Illuminate\Support\Carbon|null $attended_at
 * @property bool $certificate_issued
 * @property string|null $certificate_url
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Event $event
 * @property-read \App\Models\User $user
 */
class EventRegistration extends Model
{
    use HasFactory;

    // Status Enums
    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_ATTENDED = 'attended';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_NO_SHOW = 'no_show';

    protected $fillable = [
        'event_id',
        'user_id',
        'status',
        'attended_at',
        'certificate_url',
        'notes',
        // 'certificate_issued' is usually managed by logic, but adding if manual override needed
        'certificate_issued'
    ];

    protected $casts = [
        'registration_date' => 'datetime',
        'attended_at' => 'datetime',
        'certificate_issued' => 'boolean',
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
