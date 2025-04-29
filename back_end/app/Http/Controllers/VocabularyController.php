<?php

namespace App\Http\Controllers;

use App\Models\Vocabulary;
use App\Http\Requests\StoreVocabularyRequest;
use App\Http\Requests\UpdateVocabularyRequest;

class VocabularyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $index = Vocabulary::where('lesson_id', $id)->with(['lesson', 'media'])->get();
        return response()->json(['data' => $index]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVocabularyRequest $request)
    {
        $store = Vocabulary::create([
            'translation' => $request->translation,
            'word' => $request->word,
            'example_sentence' => $request->example_sentence,
            'lesson_id' => $request->lesson_id
        ]);
        if ($request->media) {
            $store->addMediaFromRequest('media')->toMediaCollection('vocabularies');
        }
        return response()->json(['data' => $store->load('media'), 'message' => 'add vocabulary successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vocabulary $vocabulary)
    {
        return response()->json(['data' => $vocabulary->load(['lesson', 'media'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVocabularyRequest $request, Vocabulary $vocabulary)
    {
        $vocabulary->update([
            'translation' => $request->translation,
            'word' => $request->word,
            'example_sentence' => $request->example_sentence,
            'lesson_id' => $request->lesson_id
        ]);
        if ($request->media) {
            $vocabulary->addMediaFromRequest('media')->toMediaCollection('vocabularies');
        }
        return response()->json(['data' => $vocabulary, 'message' => 'upadate vocabulary successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vocabulary $vocabulary)
    {
        $vocabulary->delete();
        return response()->json(['message' => 'delete vocabulary successfully!']);
    }
}
