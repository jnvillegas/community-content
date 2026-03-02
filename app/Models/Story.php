<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Story extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content_url',
        'user_id',
        'expires_at',
        'views_count',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(StoryLike::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(StoryComment::class);
    }

    public function getLikesCountAttribute(): int
    {
        return $this->likes()->count();
    }

    public function isLikedBy(User $user): bool
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }

    public function images(): HasMany
    {
        return $this->hasMany(StoryImage::class)->orderBy('order');
    }

    /**
     * Get the story's content URL.
     *
     * @param  string  $value
     * @return string
     */
    public function getContentUrlAttribute($value): string
    {
        if (empty($value))
            return '';

        // Si ya es una URL completa con protocolo, la devolvemos tal cual
        if (preg_match('/^https?:\/\//', $value)) {
            return $value;
        }

        // Limpieza: si contiene el dominio o /storage/, extraemos solo la ruta final
        if (str_contains($value, '/storage/')) {
            $value = Str::after($value, '/storage/');
        } elseif (str_contains($value, 'railway.app')) {
            $value = Str::after($value, 'railway.app');
            $value = ltrim($value, '/');
        }

        // Generamos la URL base. Usamos asset() para asegurar protocolo y dominio
        $url = asset('storage/' . $value);

        // Forzamos siempre HTTPS en producción para evitar Mixed Content
        if (str_starts_with($url, 'http://')) {
            $url = str_replace('http://', 'https://', $url);
        } elseif (!str_starts_with($url, 'http')) {
            $url = 'https://' . ltrim($url, '/');
        }

        return $url;
    }
}
