<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StoryImage extends Model
{
    protected $fillable = ['story_id', 'image_url', 'order'];

    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }

    /**
     * Get the full image URL.
     *
     * @param  string  $value
     * @return string
     */
    public function getImageUrlAttribute($value): string
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

        // Generamos la URL base usando asset()
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
