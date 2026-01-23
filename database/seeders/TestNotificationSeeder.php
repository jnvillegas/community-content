<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class TestNotificationSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if ($user) {
            // Notification 1
            $user->notifications()->create([
                'id' => Str::uuid(),
                'type' => 'App\Notifications\TestNotification',
                'data' => [
                    'message' => 'le ha dado Like a tu publicación de "Creator Connect".',
                    'sender_name' => 'Kina Rally',
                    'sender_avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=kina',
                    'action_url' => '/dashboard'
                ],
            ]);

            // Notification 2
            $user->notifications()->create([
                'id' => Str::uuid(),
                'type' => 'App\Notifications\TestNotification',
                'data' => [
                    'message' => 'subió un nuevo recurso al curso de Edición Avanzada.',
                    'sender_name' => 'Gery Thomas',
                    'sender_avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=gery',
                    'action_url' => '/dashboard'
                ],
            ]);

            $this->command->info('Test notifications created for: ' . $user->name);
        }
    }
}
