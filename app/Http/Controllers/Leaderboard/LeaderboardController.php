<?php

namespace App\Http\Controllers\Leaderboard;

use App\Http\Controllers\Controller;

use App\Services\Review\ReviewService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    public function __construct(
        private readonly ReviewService $reviewService,
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Leaderboard/Index', [
            'users' => $this->reviewService->getLeaderboardData(),
        ]);
    }

}
