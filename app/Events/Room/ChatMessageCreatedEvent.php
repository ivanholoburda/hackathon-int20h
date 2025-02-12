<?php

namespace App\Events\Room;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageCreatedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public ChatMessage $chatMessage,
    ) {
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel("room-{$this->chatMessage->room_id}"),
        ];
    }

    public function broadcastAs(): string
    {
        return 'ChatMessageCreatedEvent';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->chatMessage->id,
            'message' => $this->chatMessage->message,
            'user' => [
                'name' => $this->chatMessage->user->name,
            ],
        ];
    }
}
