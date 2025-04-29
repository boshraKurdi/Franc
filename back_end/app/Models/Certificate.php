<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    /** @use HasFactory<\Database\Factories\CertificateFactory> */
    use HasFactory;
    protected $fillable = [
        'target_id',
        'average'
    ];
    public function target()
    {
        return $this->belongsTo(Target::class);
    }
}
