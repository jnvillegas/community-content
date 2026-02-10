<?php

namespace App\Traits;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait RecordsActivity
{
    protected static function bootRecordsActivity()
    {
        static::created(function (Model $model) {
            if (method_exists($model, 'shouldRecordActivity')) {
                if (!$model->shouldRecordActivity('created'))
                    return;
            }
            $model->recordActivity('created');
        });

        static::updated(function (Model $model) {
            if (method_exists($model, 'shouldRecordActivity')) {
                if ($model->shouldRecordActivity('updated')) {
                    $model->recordActivity('created');
                }
            }
        });
    }

    protected function recordActivity(string $event)
    {
        Activity::create([
            'user_id' => Auth::id() ?? $this->user_id ?? $this->author_id ?? 1,
            'type' => $event . '_' . strtolower(class_basename($this)),
            'subject_id' => $this->id,
            'subject_type' => get_class($this),
        ]);
    }

    public function activity()
    {
        return $this->morphMany(Activity::class, 'subject');
    }
}
