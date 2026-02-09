<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventRegistration;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        DB::transaction(function () use ($faker) {
            // Asumir admin ID 1
            $adminId = 1;

            // Cargar categorías (deben haber sido creadas por EventCategorySeeder)
            $categories = EventCategory::all();

            // Distribución de tipos
            $typesList = array_merge(
                array_fill(0, 3, Event::TYPE_PRESENCIAL),
                array_fill(0, 4, Event::TYPE_WEBINAR),
                array_fill(0, 2, Event::TYPE_LIVE),
                array_fill(0, 1, Event::TYPE_HYBRID)
            );
            shuffle($typesList);

            $allEvents = [];

            // 10 eventos: 5 futuros, 5 pasados
            foreach ($typesList as $index => $type) {
                // Primeros 5 futuros, siguientes 5 pasados
                $isFuture = $index < 5;

                $date = $isFuture
                    ? Carbon::now()->addDays(rand(1, 60))
                    : Carbon::now()->subDays(rand(1, 60));

                $status = $isFuture
                    ? $faker->randomElement([Event::STATUS_PUBLISHED, Event::STATUS_DRAFT, Event::STATUS_PUBLISHED])
                    : $faker->randomElement([Event::STATUS_COMPLETED, Event::STATUS_CANCELLED, Event::STATUS_COMPLETED]);

                $title = $this->generateTravelTitle($faker, $type);

                $event = Event::create([
                    'title' => $title,
                    'slug' => Str::slug($title) . '-' . uniqid(),
                    'description' => $faker->realText(300),
                    'type' => $type,
                    'status' => $status,

                    // Location details
                    'location' => ($type === Event::TYPE_PRESENCIAL || $type === Event::TYPE_HYBRID) ? $faker->city . ', ' . $faker->country : null,
                    'location_url' => ($type === Event::TYPE_PRESENCIAL || $type === Event::TYPE_HYBRID) ? 'https://maps.google.com/?q=' . $faker->latitude . ',' . $faker->longitude : null,
                    'latitude' => ($type === Event::TYPE_PRESENCIAL || $type === Event::TYPE_HYBRID) ? $faker->latitude : null,
                    'longitude' => ($type === Event::TYPE_PRESENCIAL || $type === Event::TYPE_HYBRID) ? $faker->longitude : null,
                    'virtual_url' => ($type !== Event::TYPE_PRESENCIAL) ? 'https://zoom.us/j/' . $faker->numerify('#########') : null,

                    // Timing
                    'start_date' => $date,
                    'end_date' => (clone $date)->addHours(2),
                    'timezone' => 'America/Argentina/Tucuman',

                    // Enrollment
                    'max_attendees' => $faker->boolean(70) ? $faker->numberBetween(20, 100) : null,
                    'registration_deadline' => (clone $date)->subHours(24),
                    'cover_image' => 'https://picsum.photos/800/400',

                    'created_by' => $adminId,
                    'requires_subscription' => true,
                    'requires_registration' => true,
                    'price' => $faker->boolean(30) ? $faker->randomFloat(2, 10, 100) : 0,
                ]);

                // Asignar categorías random
                if ($categories->count() > 0) {
                    $event->categories()->attach($categories->random(rand(1, 3))->pluck('id'));
                }

                $allEvents[] = $event;
            }

            // 20 Registraciones fakes
            // Ensure we have enough users
            if (User::count() < 15) {
                User::factory()->count(15 - User::count())->create();
            }
            $userIds = User::pluck('id')->toArray();

            for ($i = 0; $i < 20; $i++) {
                if (empty($allEvents))
                    break;

                $event = $faker->randomElement($allEvents);
                $userId = $faker->randomElement($userIds);

                // Evitar duplicados
                if (EventRegistration::where('event_id', $event->id)->where('user_id', $userId)->exists()) {
                    continue;
                }

                $isFuture = $event->start_date > now();
                $status = EventRegistration::STATUS_CONFIRMED;
                $attendedAt = null;

                if (!$isFuture) { // Evento pasado
                    $rand = rand(1, 100);
                    if ($rand <= 70) {
                        $status = EventRegistration::STATUS_ATTENDED;
                        $attendedAt = $event->start_date;
                    } elseif ($rand <= 90) {
                        $status = EventRegistration::STATUS_NO_SHOW;
                    } else {
                        $status = EventRegistration::STATUS_CANCELLED;
                    }
                }

                EventRegistration::create([
                    'event_id' => $event->id,
                    'user_id' => $userId,
                    'status' => $status,
                    'attended_at' => $attendedAt,
                    'registration_date' => $event->created_at->addDays(rand(0, 5)),
                    'notes' => $faker->optional(0.3)->sentence,
                ]);
            }
        });
    }

    private function generateTravelTitle($faker, $type)
    {
        $topics = ['Mochileros', 'Fotografía', 'Presupuesto', 'Visa Working Holiday', 'Nómadas Digitales', 'Rutas en Auto', 'Equipaje', 'Gastronomía'];
        $places = ['Bariloche', 'Tucumán', 'BsAs', 'Madrid', 'Tokio', 'Patagonia', 'Cusco', 'Roma'];

        $topic = $faker->randomElement($topics);
        $place = $faker->randomElement($places);

        if ($type === Event::TYPE_WEBINAR) {
            return $faker->randomElement([
                "Webinar: Cómo viajar por $place con bajo presupuesto",
                "Masterclass: $topic en $place",
                "Tips de $topic para tu próximo viaje"
            ]);
        } elseif ($type === Event::TYPE_LIVE) {
            return "Live desde $place: Consejos sobre $topic";
        } elseif ($type === Event::TYPE_PRESENCIAL) {
            return $faker->randomElement([
                "Meetup Community $place",
                "Workshop: $topic en vivo",
                "Encuentro de viajeros en $place"
            ]);
        } else {
            return "Evento Híbrido: Experiencia $topic en $place";
        }
    }
}
