<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\User\AuthService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
    ) {
    }

    public function loginIndex(): Response
    {
        return Inertia::render('Login/Index');
    }

    public function registerIndex(): Response
    {
        return Inertia::render('Register/Index');
    }

    public function login(LoginRequest $request): RedirectResponse
    {
        if (!$this->authService->login($request)) {
            return back()->withErrors([
                'email' => 'Invalid credentials',
            ]);
        }

        return to_route('home');
    }

    /**
     * @throws \Exception
     */
    public function register(RegisterRequest $request): RedirectResponse
    {
        $this->authService->register($request);

        return to_route('login');
    }

    public function logout(): RedirectResponse
    {
        $this->authService->logout();
        return to_route('home');
    }

    public function loginGithub(): RedirectResponse
    {
        return Socialite::driver('github')->redirect();
    }

    /**
     * @throws \Exception
     */
    public function handleOAuthLogin(): RedirectResponse
    {
        $this->authService->handleOAuthLogin();

        return to_route('home');
    }
}
