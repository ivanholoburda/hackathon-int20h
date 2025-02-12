<?php

namespace App\Services\User;

use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Repository\UserHistoryRepository;
use App\Repository\UserRepository;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly UserHistoryRepository $userHistoryRepository,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function updateProfile(User $user, UpdateProfileRequest $request): ?User
    {
        $data = $request->validated();
        $user = $this->userRepository->update($user, $data);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user = $this->userRepository->update($user, ['avatar' => $path]);
        }

        /** @var User */
        return $user;
    }


    public function getLatestGames(User $user, int $limit = 5): Collection
    {
        return $this->userHistoryRepository->getLatestGames($user, $limit);
    }
}
