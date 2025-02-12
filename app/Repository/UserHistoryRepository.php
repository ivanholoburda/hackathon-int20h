<?php

namespace App\Repository;

use App\Models\User;
use App\Models\UserHistory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UserHistoryRepository extends AbstractRepository
{
    public function model(): string
    {
        return UserHistory::class;
    }

    public function getLatestGames(User $user, int $limit = 5): Collection
    {
        return $this->query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->with('quest')
            ->limit($limit)
            ->get();
    }

    public function getPaginated(User $user, int $page = 10): LengthAwarePaginator
    {
        return $this->query()
            ->where('user_id', $user->id)
            ->with('quest')
            ->orderByDesc('created_at')
            ->paginate($page);
    }
}
