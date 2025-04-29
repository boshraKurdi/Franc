<?php

namespace Database\Seeders;

use App\Models\Quizunit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizunitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quizunit::factory(10)->create();
    }
}
