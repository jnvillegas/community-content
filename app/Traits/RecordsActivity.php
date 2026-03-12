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

        static::deleted(function (Model $model) {
            $model->deleteActivityAndNotifications();
        });
    }

    protected function deleteActivityAndNotifications()
    {
        // 1. Delete Activities
        $this->activity()->delete();

        // 2. Delete Notifications
        $driver = \Illuminate\Support\Facades\DB::getDriverName();

        if ($driver === 'pgsql') {
            // In PostgreSQL, the 'data' column is often 'text', so we need to cast it
            \Illuminate\Support\Facades\DB::table('notifications')
                ->whereRaw('data::jsonb->>\'subject_id\' = ?', [(string) $this->id])
                ->whereRaw('data::jsonb->>\'subject_type\' = ?', [get_class($this)])
                ->delete();
        } else {
            // Default for MySQL/SQLite
            \Illuminate\Support\Facades\DB::table('notifications')
                ->where('data->subject_id', $this->id)
                ->where('data->subject_type', get_class($this))
                ->delete();
        }
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
