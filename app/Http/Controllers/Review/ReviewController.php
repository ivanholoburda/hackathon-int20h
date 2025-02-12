<?php

namespace App\Http\Controllers\Review;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\CreateReviewRequest;
use App\Http\Resources\Review\ReviewResource;
use App\Models\Quest;
use App\Services\Review\ReviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class ReviewController extends Controller
{
    public function __construct(
        protected readonly ReviewService $reviewService,
    ) {
    }

    public function index(Quest $quest): JsonResponse
    {
        $reviews = $this->reviewService->getPaginatedReviews($quest->id);
        return response()->json([
            'reviews' => ReviewResource::collection($reviews),
            'next_page_url' => $reviews->nextPageUrl(),
        ]);
    }

    public function store(CreateReviewRequest $request, Quest $quest): RedirectResponse
    {
        $review = $this->reviewService->createReview($quest, $request->validated());
        return to_route('quest.show', $review->quest_id);
    }
}
