<?php

namespace App\Http\Controllers\Quest;

use App\Enums\QuestionType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Quest\CreateQuestRequest;
use App\Http\Requests\Quest\StartQuestRequest;
use App\Http\Requests\Quest\UpdateQuestRequest;
use App\Http\Resources\Quest\QuestBaseResource;
use App\Http\Resources\Quest\QuestResource;
use App\Models\Quest;
use App\Models\User;
use App\Services\Quest\QuestService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuestController extends Controller
{
    public function __construct(
        private readonly QuestService $questService,
    ) {
    }

    public function index(): Response
    {
        $quests = $this->questService->getPaginated()->withQueryString();

        return Inertia::render('Quest/Index', [
            'quests' => QuestBaseResource::collection($quests)->response()->getData(true),
        ]);
    }

    public function getUserQuests(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        return response()->json([
            'quests' => QuestBaseResource::collection($this->questService->getUserPaginated($user)),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Quest/Create');
    }

    public function edit(Quest $quest): Response
    {
        return Inertia::render('Quest/Edit', [
            'quest' => new QuestResource($quest->load('questions')),
            'question_types' => QuestionType::getLists(),
        ]);
    }

    public function show(Quest $quest): Response
    {
        /** @var User $user */
        $user = auth()->user();

        $quest = $this->questService->getQuestWithNumberOfQuestions($quest);
        $canLeaveReview = $this->questService->checkReviewAbility($user, $quest);

        return Inertia::render('Quest/Show', [
            'quest' => new QuestBaseResource($quest),
            'can_leave_review' => $canLeaveReview,
        ]);
    }

    /**
     * @throws Exception
     */
    public function store(CreateQuestRequest $request): RedirectResponse
    {
        $quest = $this->questService->create($request);

        return to_route('quest.edit', $quest);
    }

    /**
     * @throws Exception
     */
    public function update(Quest $quest, UpdateQuestRequest $request): RedirectResponse
    {
        $this->questService->update($request, $quest);

        return to_route('quest.edit', $quest, 303);
    }

    public function delete(Quest $quest): RedirectResponse
    {
        $this->questService->delete($quest);

        return to_route('quest.index', status: 303);
    }

    /**
     * @throws Exception
     */
    public function startQuest(StartQuestRequest $request, Quest $quest): RedirectResponse
    {
        $room = $this->questService->startQuest($request, $quest);

        return to_route('room.index', $room->id);
    }
}
