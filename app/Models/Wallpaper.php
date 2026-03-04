<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Traits\RecordsActivity;

class Wallpaper extends Model
{
    use SoftDeletes, RecordsActivity;

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function shouldRecordActivity(string $eventName): bool
    {
        if ($eventName === 'created') {
            return $this->status === 'published';
        }

        if ($eventName === 'updated') {
            return $this->wasChanged('status') && $this->status === 'published';
        }

        return false;
    }

    protected $fillable = [
        'title',
        'slug',
        'alt',
        'src',
        'is_locked',
        'lock_text',
        'lock_subtitle',
        'category',
        'resolution',
        'file_size',
        'downloads_count',
        'is_featured',
        'status',
        'published_at',
        'author_id',
    ];

    protected $casts = [
        'is_locked' => 'boolean',
        'is_featured' => 'boolean',
        'downloads_count' => 'integer',
        'published_at' => 'datetime',
    ];

    /**
     * Boot function to automatically generate slug from title.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($wallpaper) {
            if (empty($wallpaper->slug)) {
                $wallpaper->slug = Str::slug($wallpaper->title);
            }
        });
    }

    /**
     * Increment the downloads count.
     */
    public function incrementDownloads(): void
    {
        $this->increment('downloads_count');
    }

    /**
     * Scope to get only published wallpapers.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope to get only unlocked wallpapers.
     */
    public function scopeUnlocked($query)
    {
        return $query->where('is_locked', false);
    }

    /**
     * Scope to get featured wallpapers.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
    /**
     * Get the full URL for the wallpaper source.
     */
    public function getSrcAttribute($value): ?string
    {
        if (empty($value))
            return null;

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
