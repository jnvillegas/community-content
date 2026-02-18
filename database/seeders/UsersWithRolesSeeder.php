<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersWithRolesSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active'
            ]
        );
        $admin->assignRole('admin');

        // Creator
        $creator = User::updateOrCreate(
            ['email' => 'manager@example.com'],
            [
                'name' => 'Content Manager',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active'
            ]
        );
        $creator->assignRole('creator');

        // Mentor
        $mentor = User::updateOrCreate(
            ['email' => 'mentor@example.com'],
            [
                'name' => 'Mentor User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active'
            ]
        );
        $mentor->assignRole('mentor');

        // Standard
        $standard = User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Regular User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active'
            ]
        );
        $standard->assignRole('standard');

        // Suspended
        $suspended = User::updateOrCreate(
            ['email' => 'suspended@example.com'],
            [
                'name' => 'Suspended User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'suspended'
            ]
        );
        $suspended->assignRole('standard');

        // Moderator
        $moderator = User::updateOrCreate(
            ['email' => 'moderator@example.com'],
            [
                'name' => 'Moderator User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active'
            ]
        );
        $moderator->assignRole('moderator');

        // Editor
        $editor = User::updateOrCreate(
            ['email' => 'editor@example.com'],
            [
                'name' => 'Editor User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
                'status' => 'active'
            ]
        );
        $editor->assignRole('editor');

        // Solo crear adicionales si no hay suficientes
        if (User::count() < 10) {
            User::factory(10)->asStandard()->create();
        }
    }
}
