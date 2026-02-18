<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoryImage extends Model
{
    protected $fillable = ['story_id', 'image_url', 'order'];

    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }
}
