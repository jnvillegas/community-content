<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

use App\Traits\RecordsActivity;

class Video extends Model
{
    use SoftDeletes, RecordsActivity;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'youtube_id',
        'thumbnail_url',
        'duration',
        'location',
        'status',
        'is_featured',
        'author_id',
        'meta_title',
        'meta_description'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($video) {
            if (empty($video->slug)) {
                $video->slug = Str::slug($video->title);
            }
        });
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(VideoCategory::class, 'video_category_pivot', 'video_id', 'category_id');
    }

    /**
     * Get the YouTube embed URL.
     */
    public function getEmbedUrlAttribute(): string
    {
        return "https://www.youtube.com/embed/{$this->youtube_id}?rel=0&showinfo=0&autoplay=0";
    }

    /**
     * Get the full URL for the thumbnail.
     */
    public function getThumbnailUrlAttribute($value): ?string
    {
        if (empty($value)) {
            // Si no hay miniatura, podemos devolver una por defecto de YouTube si tenemos el ID
            if ($this->youtube_id) {
                return "https://img.youtube.com/vi/{$this->youtube_id}/maxresdefault.jpg";
            }
            return null;
        }

        // Si ya es una URL completa, la devolvemos
        if (preg_match('/^https?:\/\//', $value)) {
            // Forzamos HTTPS solo en producción
            if (app()->isProduction() && str_starts_with($value, 'http://')) {
                return str_replace('http://', 'https://', $value);
            }
            return $value;
        }

        // Si es una ruta relativa de storage
        $url = asset('storage/' . $value);

        if (app()->isProduction()) {
            if (str_starts_with($url, 'http://')) {
                $url = str_replace('http://', 'https://', $url);
            }
        }

        return $url;
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
}
