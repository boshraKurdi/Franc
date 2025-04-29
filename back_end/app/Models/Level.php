<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    /** @use HasFactory<\Database\Factories\LevelFactory> */
    use HasFactory;

    protected $fillable = [
        'number',
        'title',
        'title_ar',
        'description_ar',
        'description',
        'course_id'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function unit()
    {
        return $this->hasMany(Unit::class);
    }
}
