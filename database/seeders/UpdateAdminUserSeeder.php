<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UpdateAdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if ($user) {
            $user->update([
                'name' => 'Nico Villegas',
                'status' => 'Disponible',
            ]);

            // Assign admin role if not already assigned
            if (!$user->hasRole('admin')) {
                $user->assignRole('admin');
            }

            $this->command->info('User updated successfully: Nico Villegas (Admin)');
        } else {
            $this->command->error('No user found to update.');
        }
    }
}
