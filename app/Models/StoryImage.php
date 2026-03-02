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

        // Si la cadena contiene "/storage/", extraemos solo lo que viene después
        if (str_contains($value, '/storage/')) {
            $value = Str::after($value, '/storage/');
        }

        return Storage::url($value);
    }
}
