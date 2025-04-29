<?php

namespace Database\Factories;

use App\Models\CourseLevel;
use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->title,
            'description' => $this->faker->text,
            'title_ar' => $this->faker->title,
            'description_ar' => $this->faker->text,
            'level_id' => Level::inRandomOrder()->first()->id,
        ];
    }
}
