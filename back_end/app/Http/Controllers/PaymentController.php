<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = User::with('books')->where('id', auth()->id())->get();
        return response()->json(['data', $payments]);
    }
    public function GetPayment()
    {
        $payments = DB::table('payments')
            ->join('books', 'books.id', '=', 'payments.book_id')
            ->join('users', 'users.id', '=', 'payments.user_id')
            ->get();
        return response()->json(['data' => $payments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $store = Payment::create([
            'price' => $request->price,
            'type' => $request->type,
            'user_id' => auth()->id(),
            'book_id' => $request->book_id,
            'number' => $request->number,
            'cvc' => $request->cvc,
            'type_payment' => $request->type_payment
        ]);
        return response()->json(['data' => $store, 'message' => 'payment successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return response()->json(['data' => $payment->load('books')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        $payment->update([
            'status' => 'delivery',
        ]);

        return response()->json(['message' => 'update payment successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
