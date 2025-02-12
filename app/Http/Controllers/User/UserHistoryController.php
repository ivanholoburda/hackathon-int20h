<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\User\UserHistoryService;
use Inertia\Inertia;
use Inertia\Response;

class UserHistoryController extends Controller
{
    public function __construct(
        private readonly UserHistoryService $userHistoryService,
    ) {
    }

    public function index(): Response
    {
        /** @var User $user */
        $user = auth()->user();

        return Inertia::render('History/Index', [
            'games' => $this->userHistoryService->getPaginated($user),
        ]);
    }
}
