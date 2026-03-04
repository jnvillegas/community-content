<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\RecordsActivity;

class Course extends Model
{
    use HasFactory, SoftDeletes, RecordsActivity;

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
        'description',
        'cover_image',
        'instructor_id',
        'status',
    ];

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function modules()
    {
        return $this->hasMany(Module::class)->orderBy('order');
    }

    public function lessons()
    {
        return $this->hasManyThrough(Lesson::class, Module::class);
    }

    /**
     * Get the full URL for the cover image.
     */
    public function getCoverImageAttribute($value): ?string
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
