<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    /** @use HasFactory<\Database\Factories\TopicFactory> */
    use HasFactory;

    protected $fillable = [
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
}
