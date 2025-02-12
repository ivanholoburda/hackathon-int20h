<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $user_id
 * @property int $quest_id
 * @property int $place
 */
class UserHistory extends Model
{
    use CrudTrait;
    protected $fillable = [
        'user_id',
        'quest_id',
        'place',
    ];

    protected $table = 'user_games_history';

    public function quest(): BelongsTo
    {
        return $this->belongsTo(Quest::class);
    }
}
