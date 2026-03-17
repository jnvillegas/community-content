<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\RecordsActivity;
 
class WallpaperComment extends Model
{
    use RecordsActivity;
    protected $fillable = ['user_id', 'wallpaper_id', 'content'];
 
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
 
    public function wallpaper(): BelongsTo
    {
        return $this->belongsTo(Wallpaper::class);
    }
}
