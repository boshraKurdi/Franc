<?php

namespace Database\Seeders;

use App\Models\Quizlesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizlessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quizlesson::factory(10)->create();
    }
}
