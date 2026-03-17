<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasMany;


use App\Traits\RecordsActivity;

class Article extends Model
{
    use SoftDeletes, RecordsActivity;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'status',
        'published_at',
        'author_id',
        'meta_title',
        'meta_description'
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * Boot function to automatically generate slug from title.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $slug = Str::slug($article->title);
                $originalSlug = $slug;
                $count = 1;

                while (static::withTrashed()->where('slug', $slug)->exists()) {
                    $slug = "{$originalSlug}-{$count}";
                    $count++;
                }

                $article->slug = $slug;
            }
        });

        static::deleting(function ($article) {
            // Delete interactions to trigger their RecordsActivity deletion hooks
            $article->likes->each->delete();
            $article->comments->each->delete();
        });
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ArticleCategory::class, 'article_category_pivot', 'article_id', 'category_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(ArticleTag::class, 'article_tag_pivot', 'article_id', 'tag_id');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(ArticleLike::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ArticleComment::class);
    }

    public function isLikedBy(User $user): bool
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }


    public function shouldRecordActivity(string $eventName): bool
    {
        if ($eventName === 'created') {
            return $this->status === 'published';
        }

        if ($eventName === 'updated') {
            // Notify if becoming published or if major fields change while published
            return ($this->wasChanged('status') && $this->status === 'published') ||
                   ($this->status === 'published' && $this->wasChanged(['title', 'content', 'category_id']));
        }

        return false;
    }

    /**
     * Get the full URL for the featured image.
     */
    public function getFeaturedImageAttribute($value): ?string
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

        // Limpieza: si contiene el dominio o /storage/, extraemos solo la ruta final
        if (str_contains($value, '/storage/')) {
            $value = \Illuminate\Support\Str::after($value, '/storage/');
        } elseif (str_contains($value, 'railway.app')) {
            $value = \Illuminate\Support\Str::after($value, 'railway.app');
            $value = ltrim($value, '/');
        }

        // Generamos la URL completa usando asset()
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
