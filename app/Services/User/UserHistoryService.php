<?php

namespace App\Services\User;

use App\Models\User;
use App\Repository\UserHistoryRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class UserHistoryService
{
    public function __construct(
        private readonly UserHistoryRepository $userHistoryRepository,
    ) {
    }

    public function getPaginated(User $user, int $pages = 10): LengthAwarePaginator
    {
        return $this->userHistoryRepository->getPaginated($user, $pages);
    }
}
