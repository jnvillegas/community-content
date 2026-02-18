<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'module_id',
        'title',
        'slug',
        'content_type',
        'video_url',
        'content_body',
        'duration',
        'order',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function course()
    {
        return $this->hasOneThrough(Course::class, Module::class, 'id', 'id', 'module_id', 'course_id');
    }

    public function progress()
    {
        return $this->hasMany(CourseProgress::class);
    }
}
