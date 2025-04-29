<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with('media')->get();
        return response()->json(['data' => $books]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $store = Book::create([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'price' => $request->price,
            'author' => $request->author,
            'metaphor' => $request->metaphor
        ]);
        if ($request->media) {
            $store->addMediaFromRequest('media')->toMediaCollection('books');
        }
        return response()->json(['data' => $store->load('media'), 'message' => 'add books successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return response()->json(['data' => $book->load('media')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'price' => $request->price,
            'author' => $request->author,
            'metaphor' => $request->metaphor
        ]);
        if ($request->media) {
            $book->addMediaFromRequest('media')->toMediaCollection('books');
        }
        return response()->json(['data' => $book->load('media'), 'message' => 'update books successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['message' => 'delete books successfully!']);
    }
}
