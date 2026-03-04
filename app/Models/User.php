<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'status',
        'last_seen_at',
    ];

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'is_online',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'last_seen_at' => 'datetime',
        ];
    }

    /**
     * Determine if the user is considered online.
     * 
     * @return bool
     */
    public function getIsOnlineAttribute(): bool
    {
        if (!$this->last_seen_at) {
            return false;
        }

        return $this->last_seen_at->gt(now()->subMinutes(5));
    }
    /**
     * Get the event registrations for the user.
     */
    public function eventRegistrations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    /**
     * Check if the user has an active subscription.
     * 
     * @return bool
     */
    public function hasActiveSubscription(): bool
    {
        // TODO: Implement actual subscription logic when subscription system is ready
        // For now, return true to allow all users to register for events
        return true;
    }
    /**
     * Get the user's avatar URL.
     */
    public function getAvatarAttribute($value): ?string
    {
        if (empty($value)) {
            return 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . urlencode($this->name);
        }

        // Si ya es una URL completa con protocolo, la devolvemos tal cual
        if (preg_match('/^https?:\/\//', $value)) {
            if (app()->isProduction() && str_starts_with($value, 'http://')) {
                return str_replace('http://', 'https://', $value);
            }
            return $value;
        }

        // Limpieza: si contiene /storage/, extraemos solo la ruta final
        if (str_contains($value, '/storage/')) {
            $value = \Illuminate\Support\Str::after($value, '/storage/');
        }

        // Generamos la URL base usando asset()
        $url = asset('storage/' . $value);

        // Forzamos siempre HTTPS en producción para evitar Mixed Content
        if (app()->isProduction()) {
            if (str_starts_with($url, 'http://')) {
                $url = str_replace('http://', 'https://', $url);
            } elseif (!str_starts_with($url, 'https://') && !str_starts_with($url, 'http://')) {
                $url = 'https://' . ltrim($url, '/');
            }
        }

        return $url;
    }
}
