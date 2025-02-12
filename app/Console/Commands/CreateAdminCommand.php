<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create admin of system';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info('Creating a new admin user...');

        $name = $this->ask('Enter admin name');
        $email = $this->ask('Enter admin email');

        $password = $this->secret('Enter admin password');
        User::query()->create([
            'name' => $name,
            'email' => $email,
            'password' => bcrypt($password),
            'is_admin' => true,
        ]);

        $this->info('Admin user created!');
    }
}
