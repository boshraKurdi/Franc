<?php

namespace Database\Seeders;

use App\Models\Quizcourse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizcourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quizcourse::factory(10)->create();
    }
}
