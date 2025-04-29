<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quizcourse>
 */
class QuizcourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => 'level',
            'question' => $this->faker->text,
            'answer_1' => $this->faker->text,
            'answer_2' => $this->faker->text,
            'answer_3' => $this->faker->text,
            'answer_4' => $this->faker->text,
            'answer_right' => $this->faker->text,
            'course_id' => Course::inRandomOrder()->first()->id,
        ];
    }
}
