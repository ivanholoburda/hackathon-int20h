<?php

use App\Http\Controllers\Quest\QuestController;
use App\Http\Controllers\Question\QuestionController;
use App\Http\Controllers\Review\ReviewController;
use App\Http\Controllers\Room\DiceController;
use App\Http\Controllers\Room\RoomController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Leaderboard\LeaderboardController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\UserHistoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/balancer', function() {
    return 'Handled by container: ' . gethostname();
});

Route::get('/', function () {
    return Inertia::render('Homepage/Index');
})
    ->name('home');

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'loginIndex')
        ->name('login');
    Route::get('/register', 'registerIndex')
        ->name('register');
    Route::post('/logout', 'logout')
        ->name('logout');
    Route::post('/login', 'login')
        ->name('auth.login');
    Route::post('/register', 'register')
        ->name('auth.register');
    Route::get('/oauth/login-github', 'loginGithub')
        ->name('auth.login-github');
    Route::get('/oauth/callback', 'handleOAuthLogin')
        ->name('auth.callback');
});

Route::controller(ProfileController::class)->middleware('auth')->group(function () {
    Route::get('/profile', 'index')
        ->name('profile.index');
    Route::post('/profile/update', 'update')
        ->name('profile.update');
    Route::get('/profile/{user}', 'show')
        ->name('profile.show');
});

Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard.index');

Route::controller(QuestController::class)->middleware('auth')->group(function () {
    Route::get('/quests', 'index')
        ->name('quest.index');
    Route::get('/user-quests', 'getUserQuests')
        ->name('quest.user-quests');
    Route::get('/quests/create', 'create')
        ->name('quest.create');
    Route::post('/quests', 'store')
        ->name('quest.store');
    Route::get('/quests/{quest}', 'show')
        ->name('quest.show');
    Route::get('/quests/{quest}/edit', 'edit')
        ->name('quest.edit');
    Route::put('/quests/{quest}', 'update')
        ->name('quest.update');
    Route::delete('/quests/{quest}', 'destroy')
        ->name('quest.destroy');
    Route::post('/quests/{quest}/start', 'startQuest')
        ->name('quest.start');
});

Route::post('/quests/{quest}/reviews', [ReviewController::class, 'store']);
Route::get('/quests/{quest}/reviews', [ReviewController::class, 'index']);

Route::controller(QuestionController::class)->middleware('auth')->group(function () {
    Route::get('/quests/{quest}/questions/{question}', 'show');
    Route::post('/quests/{quest}/questions', 'store');
    Route::delete('/quests/{quest}/questions/{question}', 'destroy');
    Route::patch('/quests/{quest}/questions/{question}', 'update');
    Route::post('/quests/{quest}/questions/{question}/check', 'checkCorrectness');
});

Route::controller(RoomController::class)->middleware('auth')->group(function () {
    Route::get('/rooms', 'activeRooms')
        ->name('rooms.list');
    Route::get('/rooms/{room}', 'index')
        ->name('room.index');
    Route::post('/rooms/{room}/send-message', 'sendMessage')
        ->name('room.send-message');
});

Route::get('/games-history', [UserHistoryController::class, 'index'])
    ->name('user.history');

Route::post('/rooms/{room}/roll-dice', [DiceController::class, 'rollDice']);
