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

        // 1. Define Permissions
        $permissions = [
            // Platform
            'view dashboard',

            // Members (Security)
            'manage users', // Create/Edit/Delete Users
            'view users',   // Read-only access to users list
            'manage roles',
            'manage permissions',

            // Content
            'manage articles',
            'manage videos',
            'manage wallpapers',
            'view content', // For simple users to consume

            // Community
            'manage events',
            'manage courses',
            'manage messages',
            'participate community', // Comment, join events

            // Membership
            'manage plans',
            'view my membership',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // 2. Define Roles & Assign Permissions

        // --- ADMIN ---
        // All Access
        $admin = Role::findOrCreate('admin');
        $admin->givePermissionTo(Permission::all());

        // --- CREATOR (Owner) ---
        // Content + Community + Membership + View Users (No Technical Security)
        $creator = Role::findOrCreate('creator');
        $creator->givePermissionTo([
            'view dashboard',
            'view users',
            'manage articles',
            'manage videos',
            'manage wallpapers',
            'manage events',
            'manage courses',
            'manage messages',
            'manage plans',
        ]);

        // --- EDITOR (Content Manager) ---
        // Content Management Only
        $editor = Role::findOrCreate('editor'); // Renamed from "Auditor" concept
        $editor->givePermissionTo([
            'view dashboard',
            'manage articles',
            'manage videos',
            'manage wallpapers',
            'view content',
            'participate community' // Originally "view community"
        ]);

        // --- USER (Standard) ---
        // Consumption & Participation
        $standard = Role::findOrCreate('standard');
        $standard->givePermissionTo([
            'view dashboard', // Their own dashboard
            'view content',
            'participate community',
            'view my membership',
        ]);

        // Ensure legacy roles have some permissions or are handled if needed
        $mentor = Role::findOrCreate('mentor');
        $mentor->givePermissionTo(['view content', 'participate community']);
    }

    public function run(): void
    {
        $this->up();
    }
}
