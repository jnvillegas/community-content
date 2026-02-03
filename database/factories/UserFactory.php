<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the model has two-factor authentication configured.
     */
    public function withTwoFactor(): static
    {
        return $this->state(fn (array $attributes) => [
            'two_factor_secret' => encrypt('secret'),
            'two_factor_recovery_codes' => encrypt(json_encode(['recovery-code-1'])),
            'two_factor_confirmed_at' => now(),
        ]);
    }

    /**
     * Set the user status.
     */
    public function withStatus(string $status = 'active'): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => $status,
        ]);
    }

    /**
     * Assign a role to the user after creation.
     */
    public function withRole(string $roleName): static
    {
        return $this->afterCreating(function (User $user) use ($roleName) {
            $user->assignRole($roleName);
        });
    }

    /**
     * Create an admin user.
     */
    public function asAdmin(): static
    {
        return $this->withRole('admin')->withStatus('active');
    }

    /**
     * Create a standard user.
     */
    public function asStandard(): static
    {
        return $this->withRole('standard')->withStatus('active');
    }

    /**
     * Create a creator user.
     */
    public function asCreator(): static
    {
        return $this->withRole('creator')->withStatus('active');
    }

    /**
     * Create a mentor user.
     */
    public function asMentor(): static
    {
        return $this->withRole('mentor')->withStatus('active');
    }

    /**
     * Create a suspended user.
     */
    public function asSuspended(): static
    {
        return $this->withRole('standard')->withStatus('suspended');
    }

    /**
     * Create a moderator user.
     */
    public function asModerator(): static
    {
        return $this->withRole('moderator')->withStatus('active');
    }

    /**
     * Create an editor user.
     */
    public function asEditor(): static
    {
        return $this->withRole('editor')->withStatus('active');
    }
}
