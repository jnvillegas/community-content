<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function up(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Users & RBAC
            'manage users',
            'manage roles',
            'manage permissions',
            // Posts
            'create posts',
            'edit posts',
            'delete posts',
            'publish posts',
            // Content modules
            'manage articles',
            'manage videos',
            'manage wallpapers',
            // Others
            'manage events',
            'manage courses',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // Create roles and assign created permissions

        // Standard User
        $role = Role::findOrCreate('standard');
        $role->givePermissionTo(['create posts', 'edit posts']);

        // Creator
        $role = Role::findOrCreate('creator');
        $role->givePermissionTo(['create posts', 'edit posts', 'publish posts', 'manage events', 'manage articles', 'manage videos']);

        // Mentor
        $role = Role::findOrCreate('mentor');
        $role->givePermissionTo(['create posts', 'edit posts', 'publish posts', 'manage events', 'manage courses', 'manage articles', 'manage videos', 'manage wallpapers']);

        // Admin
        $role = Role::findOrCreate('admin');
        $role->givePermissionTo(Permission::all());
    }

    public function run(): void
    {
        $this->up();
    }
}
