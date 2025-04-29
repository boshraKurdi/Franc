<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
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
            'author' => $this->faker->name,
            'description' => $this->faker->text,
            'title_ar' => $this->faker->title,
            'description_ar' => $this->faker->text,
            'price' => rand(10, 1000),
            'metaphor' => rand(10, 1000),
        ];
    }
}
