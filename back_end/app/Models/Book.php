<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Book extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'title_ar',
        'description_ar',
        'description',
        'price',
        'metaphor',
        'author'
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('books');
    }
}
