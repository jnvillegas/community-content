<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\EventRegistration;
use App\Models\Event;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventRegistration>
 */
class EventRegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => Event::factory(),
            'user_id' => User::factory(),
            'status' => $this->faker->randomElement([
                EventRegistration::STATUS_PENDING,
                EventRegistration::STATUS_CONFIRMED,
                EventRegistration::STATUS_ATTENDED,
                EventRegistration::STATUS_CANCELLED,
                EventRegistration::STATUS_NO_SHOW
            ]),
            'registration_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'attended_at' => null, // Processed in state or specific logic
            'certificate_issued' => false,
            'certificate_url' => null,
            'notes' => $this->faker->boolean(20) ? $this->faker->sentence() : null,
        ];
    }

    public function confirmed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => EventRegistration::STATUS_CONFIRMED,
        ]);
    }

    public function attended(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => EventRegistration::STATUS_ATTENDED,
            // Try to find the event start date to be realistic
            'attended_at' => function (array $attributes) {
                $event = Event::find($attributes['event_id']);
                return $event ? $event->start_date : now();
            },
        ]);
    }

    public function cancelled(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => EventRegistration::STATUS_CANCELLED,
        ]);
    }
}
