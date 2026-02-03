<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersWithRolesSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->asAdmin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        User::factory()->asCreator()->create([
            'name' => 'Content Manager',
            'email' => 'manager@example.com',
        ]);

        User::factory()->asMentor()->create([
            'name' => 'Mentor User',
            'email' => 'mentor@example.com',
        ]);

        User::factory()->asStandard()->create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
        ]);

        User::factory()->asSuspended()->create([
            'name' => 'Suspended User',
            'email' => 'suspended@example.com',
        ]);

        User::factory()->asModerator()->create([
            'name' => 'Moderator User',
            'email' => 'moderator@example.com',
        ]);

        User::factory()->asEditor()->create([
            'name' => 'Editor User',
            'email' => 'editor@example.com',
        ]);

        User::factory(15)->asStandard()->create();
    }
}
