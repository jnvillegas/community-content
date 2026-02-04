<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Spatie\Permission\Models\Permission;

class PermissionFactory extends Factory
{
    protected $model = Permission::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'manage users',
                'manage roles',
                'manage permissions',
                'create posts',
                'edit posts',
                'delete posts',
                'publish posts',
                'approve posts',
                'manage events',
                'manage courses',
                'view analytics',
                'manage settings',
                'create articles',
                'edit articles',
                'delete articles',
                'publish articles',
                'create videos',
                'edit videos',
                'delete videos',
                'publish videos',
                'create wallpapers',
                'edit wallpapers',
                'delete wallpapers',
                'publish wallpapers',
            ]),
            'guard_name' => 'web',
        ];
    }
}
