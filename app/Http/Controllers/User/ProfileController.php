<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Resources\User\UserProfileResource;
use App\Models\User;
use App\Repository\QuestRepository;
use App\Services\User\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(
        private readonly QuestRepository $questRepository,
        private readonly UserService $userService,
    ) {
    }

    public function index(): Response
    {
        /** @var User $user */
        $user = auth()->user();
        $quests = $this->questRepository->findByOwner($user->id);

        return Inertia::render('Profile/Profile', [
            'user' => new UserProfileResource($user),
            'quests' => $quests,
            'games' => $this->userService->getLatestGames($user,4),
        ]);
    }

    public function show(User $user): Response
    {
        $quests = $this->questRepository->findByOwner($user->id);

        return Inertia::render('Profile/UserProfile', [
            'user' => new UserProfileResource($user),
            'quests' => $quests,
        ]);
    }

    /**
     * @throws \Exception
     */
    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $this->userService->updateProfile($user, $request);

        return to_route('profile.index');
    }
}
