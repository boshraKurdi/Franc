<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    /** @use HasFactory<\Database\Factories\TargetFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'course_id',
        'check',
        'level',
        'degree',
        'type',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function certificate()
    {
        return $this->hasMany(Certificate::class);
    }
}
