<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\SendMessageRequest;
use App\Http\Resources\Room\RoomResource;
use App\Models\Room;
use App\Models\User;
use App\Services\Room\RoomService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function __construct(
        private readonly RoomService $roomService,
    ) {
    }

    /**
     * @throws Exception
     */
    public function index(Room $room): Response|RedirectResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $room = $this->roomService->loadDetails($room);

        if (!$this->roomService->joinRoom($user, $room)) {
            return to_route('quest.index');
        }

        return Inertia::render('Room/Index', [
            'room' => new RoomResource($room),
        ]);
    }

    public function activeRooms(): Response
    {
        $rooms = $this->roomService->getActiveRooms();

        return Inertia::render('Room/List', [
            'rooms' => RoomResource::collection($rooms)->toArray(request()),
        ]);
    }

    /**
     * @throws Exception
     */
    public function sendMessage(Room $room, SendMessageRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        if (!$this->roomService->sendMessage($user, $room, $request)) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot send message to this room!',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Message sent!',
        ]);
    }
}
