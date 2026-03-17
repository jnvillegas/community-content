<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\RecordsActivity;
 
class WallpaperLike extends Model
{
    use RecordsActivity;
    protected $fillable = ['user_id', 'wallpaper_id'];
 
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
 
    public function wallpaper(): BelongsTo
    {
        return $this->belongsTo(Wallpaper::class);
    }
}
