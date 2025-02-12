<?php

namespace App\Models;

use App\Events\Room\ChatMessageCreatedEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $room_id
 * @property int $user_id
 * @property string $message
 */
class ChatMessage extends Model
{
    protected $fillable = [
        'room_id',
        'user_id',
        'message',
    ];

    protected $dispatchesEvents = [
        'created' => ChatMessageCreatedEvent::class,
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
