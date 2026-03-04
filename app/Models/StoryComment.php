<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\RecordsActivity;

class StoryComment extends Model
{
    use RecordsActivity;
    protected $fillable = ['user_id', 'story_id', 'content'];
    protected $touches = ['story'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }
}
