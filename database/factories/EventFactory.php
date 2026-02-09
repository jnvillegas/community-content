<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(5) . " - Community";
        $type = $this->faker->randomElement([
            Event::TYPE_WORKSHOP,
            Event::TYPE_MEETUP,
            Event::TYPE_WEBINAR,
            Event::TYPE_TRIP
        ]);

        // Logical location data based on type
        $isPresencial = in_array($type, [Event::TYPE_WORKSHOP, Event::TYPE_MEETUP, Event::TYPE_TRIP]);
        $location = $isPresencial ? $this->faker->city() . " - " . $this->faker->streetAddress() : null;
        $locationUrl = $isPresencial ? 'https://maps.google.com/?q=' . $this->faker->latitude() . ',' . $this->faker->longitude() : null;
        $latitude = $isPresencial ? $this->faker->latitude() : null;
        $longitude = $isPresencial ? $this->faker->longitude() : null;

        $virtualUrl = $type === Event::TYPE_WEBINAR
            ? 'https://zoom.us/j/' . $this->faker->numerify('#########')
            : null;

        $startDate = $this->faker->dateTimeBetween('+1 week', '+3 months');
        $endDate = (clone $startDate)->modify('+' . rand(1, 4) . ' hours');

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . uniqid(),
            'description' => $this->faker->paragraphs(3, true),
            'type' => $type,
            'status' => $this->faker->randomElement([
                Event::STATUS_DRAFT,
                Event::STATUS_PUBLISHED,
                Event::STATUS_PUBLISHED, // Higher weight
                Event::STATUS_PUBLISHED,
                Event::STATUS_COMPLETED,
                Event::STATUS_CANCELLED
            ]),

            // Location
            'location' => $location,
            'location_url' => $locationUrl,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'virtual_url' => $virtualUrl,

            // Dates
            'start_date' => $startDate,
            'end_date' => $endDate,
            'timezone' => 'America/Argentina/Tucuman',

            // Registration logic
            'max_attendees' => $this->faker->boolean(70) ? $this->faker->numberBetween(20, 200) : null,
            'registration_deadline' => $this->faker->boolean(20) ? (clone $startDate)->modify('-1 day') : null,
            'cover_image' => $this->faker->imageUrl(800, 400, 'events', true),
            'created_by' => User::factory(),

            // Business logic
            'requires_subscription' => $this->faker->boolean(80),
            'requires_registration' => true,
            'price' => $this->faker->boolean(10) ? $this->faker->randomFloat(2, 500, 5000) : null,
        ];
    }

    public function published(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Event::STATUS_PUBLISHED,
        ]);
    }

    public function draft(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Event::STATUS_DRAFT,
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Event::STATUS_COMPLETED,
            'start_date' => $this->faker->dateTimeBetween('-2 months', '-1 week'),
            'end_date' => fn(array $attributes) => (clone $attributes['start_date'])->modify('+2 hours'),
        ]);
    }

    public function meetup(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => Event::TYPE_MEETUP,
            'location' => $this->faker->city(),
            'location_url' => 'https://maps.google.com',
            'virtual_url' => null,
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ]);
    }

    public function webinar(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => Event::TYPE_WEBINAR,
            'location' => null,
            'location_url' => null,
            'latitude' => null,
            'longitude' => null,
            'virtual_url' => 'https://zoom.us/test',
        ]);
    }

    public function withMaxAttendees(int $max): static
    {
        return $this->state(fn(array $attributes) => [
            'max_attendees' => $max,
        ]);
    }
}
