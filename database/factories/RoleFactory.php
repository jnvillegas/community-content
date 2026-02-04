<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Spatie\Permission\Models\Role;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'admin',
                'moderator',
                'editor',
                'contributor',
                'viewer',
                'manager',
                'developer',
                'supervisor',
                'analyst',
            ]),
            'guard_name' => 'web',
        ];
    }
}
