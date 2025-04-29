<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Vocabulary extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\VocabularyFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'translation',
        'word',
        'example_sentence',
        'lesson_id'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('vocabularies');
    }
}
