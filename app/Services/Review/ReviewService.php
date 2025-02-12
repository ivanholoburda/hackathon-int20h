<?php

namespace App\Services\Review;

use App\Models\Quest;
use App\Models\Review;
use App\Repository\ReviewRepository;
use App\Repository\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

readonly class ReviewService
{
    public function __construct(
        protected ReviewRepository $reviewRepository,
        private readonly UserRepository $userRepository,
    )
    {
    }

    public function createReview(Quest $quest, array $data): Review
    {
        $data['user_id'] = auth()->user()->id;
        /** @var Review * */
        return $this->reviewRepository->create($data + [
                'reviewable_id' => $quest->owner_id,
            ]);
    }

    public function getPaginatedReviews(int $questId, int $perPage = 5): LengthAwarePaginator
    {
        return $this->reviewRepository->query()->where('quest_id', $questId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getLeaderboardData(): Collection
    {
        return $this->userRepository
            ->query()
            ->withAvg('reviews as average_rating', 'rating')
            ->orderByDesc('average_rating')
            ->limit(50)
            ->get();
    }
}
