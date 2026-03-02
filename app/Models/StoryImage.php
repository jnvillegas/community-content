<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

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
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }

        return Storage::url($value);
    }
}
