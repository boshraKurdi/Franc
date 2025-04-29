<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


class Quizlesson extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\QuizlessonFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = [
        'question',
        'answer_1',
        'answer_2',
        'answer_3',
        'answer_4',
        'answer_right',
        'lesson_id'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('quizlessons');
    }
}
