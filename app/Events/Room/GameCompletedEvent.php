<?php

namespace App\Events\Room;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameCompletedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public int $roomId,
        public int $userId,
    ) {
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel("room-{$this->roomId}"),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'winner_id' => $this->userId,
        ];
    }

    public function broadcastAs(): string
    {
        return "GameCompletedEvent";
    }
}
