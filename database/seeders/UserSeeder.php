<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User if it doesn't exist
        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'], // Check if a user with this email exists
            [
                'name' => 'Admin User',
                'password' => Hash::make('12345678'), // Create with these attributes if it doesn't exist
            ]
        );

        if ($admin->wasRecentlyCreated) {
            $this->command->info('Admin user has been created.');
        } else {
            $this->command->info('Admin user already exists.');
        }

        // Create Regular User if it doesn't exist
        $user = User::firstOrCreate(
            ['email' => 'user@gmail.com'], // Check if a user with this email exists
            [
                'name' => 'Regular User',
                'password' => Hash::make('12345678'),
            ]
        );

        if ($user->wasRecentlyCreated) {
            $this->command->info('Regular user has been created.');
        } else {
            $this->command->info('Regular user already exists.');
        }
    }
}
