<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Course extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = [
        'title',
        'title_ar',
        'description_ar',
        'description'
    ];

    public function levels()
    {
        return $this->hasMany(Level::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function quiz()
    {
        return $this->hasMany(Quizcourse::class);
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }


    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('courses');
    }
}
