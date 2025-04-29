<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    /** @use HasFactory<\Database\Factories\UnitFactory> */
    use HasFactory;

    protected $fillable = [
        'number',
        'title',
        'title_ar',
        'description_ar',
        'description',
        'level_id'
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function lesson()
    {
        return $this->hasMany(Lesson::class);
    }

    public function quiz()
    {
        return $this->hasMany(Quizunit::class);
    }
}
