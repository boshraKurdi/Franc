<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;

    protected $fillable = [
        'price',
        'type',
        'user_id',
        'book_id',
        'number',
        'cvc',
        'status',
        'type_payment'
    ];
}
