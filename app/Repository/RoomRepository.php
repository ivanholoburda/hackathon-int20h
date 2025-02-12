<?php

namespace App\Repository;

use App\Models\Room;
use Illuminate\Pagination\LengthAwarePaginator;

class RoomRepository extends AbstractRepository
{
    public function model(): string
    {
        return Room::class;
    }

    public function getActiveRooms(): LengthAwarePaginator
    {
        return $this->query()
            ->where('status', 'WAITING')
            ->with(['owner', 'quest', 'participants.user'])
            ->paginate();
    }
}
