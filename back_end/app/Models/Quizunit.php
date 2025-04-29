<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


class Quizunit extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\QuizunitFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'question',
        'answer_1',
        'answer_2',
        'answer_3',
        'answer_4',
        'answer_right',
        'unit_id'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('quizunits');
    }
}
