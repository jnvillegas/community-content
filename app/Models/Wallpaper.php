<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Wallpaper extends Model
{
    use SoftDeletes;

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
     * Get the author of the wallpaper.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
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
}
