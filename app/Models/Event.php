<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;

/**
 * App\Models\Event
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string $type
 * @property string $status
 * @property string|null $location
 * @property string|null $location_url
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string|null $virtual_url
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property string $timezone
 * @property int|null $max_attendees
 * @property \Illuminate\Support\Carbon|null $registration_deadline
 * @property string|null $cover_image
 * @property int $created_by
 * @property bool $requires_subscription
 * @property bool $requires_registration
 * @property string|null $price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\User $createdBy
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EventRegistration[] $registrations
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EventCategory[] $categories
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EventReminder[] $reminders
 *
 * @method static Builder|Event newModelQuery()
 * @method static Builder|Event newQuery()
 * @method static Builder|Event query()
 * @method static Builder|Event upcoming()
 * @method static Builder|Event published()
 * @method static Builder|Event past()
 */
class Event extends Model
{
    use HasFactory, SoftDeletes;

    // Type Enums
    // Type Enums
    const TYPE_WORKSHOP = 'WORKSHOP';
    const TYPE_MEETUP = 'MEETUP';
    const TYPE_WEBINAR = 'WEBINAR';
    const TYPE_TRIP = 'TRIP';

    // Status Enums
    const STATUS_DRAFT = 'draft';
    const STATUS_PUBLISHED = 'published';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_COMPLETED = 'completed';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'type',
        'status',
        'location',
        'location_url',
        'latitude',
        'longitude',
        'virtual_url',
        'start_date',
        'end_date',
        'timezone',
        'max_attendees',
        'registration_deadline',
        'cover_image',
        'created_by',
        'requires_subscription',
        'requires_registration',
        'price',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'registration_deadline' => 'datetime',
        'requires_subscription' => 'boolean',
        'requires_registration' => 'boolean',
        'price' => 'decimal:2',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(EventCategory::class, 'event_category', 'event_id', 'category_id');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(EventReminder::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('start_date', '>', now())
            ->orderBy('start_date', 'asc');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PUBLISHED);
    }

    public function scopePast(Builder $query): Builder
    {
        return $query->where('end_date', '<', now())
            ->orderBy('end_date', 'desc');
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function isFull(): bool
    {
        if (is_null($this->max_attendees)) {
            return false;
        }

        return $this->registrations()->whereIn('status', [
            EventRegistration::STATUS_CONFIRMED,
            EventRegistration::STATUS_ATTENDED
        ])->count() >= $this->max_attendees;
    }

    public function canRegister(User $user): bool
    {
        // 1. Check status
        if ($this->status !== self::STATUS_PUBLISHED) {
            return false;
        }

        // 2. Check registration deadline
        if ($this->registration_deadline && now()->greaterThan($this->registration_deadline)) {
            return false;
        }

        // 3. Check capacity
        if ($this->isFull()) {
            return false;
        }

        // 4. Check subscription requirement
        if ($this->requires_subscription && !$user->hasActiveSubscription()) { // Assuming hasActiveSubscription exists or will exist
            return false;
        }

        // 5. Check already registered
        if ($this->registrations()->where('user_id', $user->id)->exists()) {
            return false;
        }

        return true;
    }
}
