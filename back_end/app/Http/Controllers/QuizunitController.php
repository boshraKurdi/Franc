<?php

namespace App\Http\Controllers;

use App\Models\Quizunit;
use App\Http\Requests\StoreQuizunitRequest;
use App\Http\Requests\UpdateQuizunitRequest;

class QuizunitController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function quiz_unit($id)
    {
        $quiz = Quizunit::with('media')->where('unit_id', $id)->get();
        return response()->json(['data' => $quiz]);
    }
    public function index($id)
    {
        $quiz = Quizunit::with('media')->where('unit_id', $id)->with('unit')->get();
        return response()->json(['data' => $quiz]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizunitRequest $request)
    {
        $store = Quizunit::create([
            'question' => $request->question,
            'answer_1' => $request->answer_1,
            'answer_2' => $request->answer_2,
            'answer_3' => $request->answer_3,
            'answer_4' => $request->answer_4,
            'answer_right' => $request->answer_right,
            'unit_id' => $request->unit_id
        ]);
        return response()->json(['data' => $store, 'message' => 'add question successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quizunit $quizunit)
    {
        return response()->json(['data' => $quizunit->load('unit')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizunitRequest $request, Quizunit $quizunit)
    {
        $quizunit->update([
            'question' => $request->question,
            'answer_1' => $request->answer_1,
            'answer_2' => $request->answer_2,
            'answer_3' => $request->answer_3,
            'answer_4' => $request->answer_4,
            'answer_right' => $request->answer_right,
            'unit_id' => $request->unit_id
        ]);
        return response()->json(['message' => 'update question successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quizunit $quizunit)
    {
        $quizunit->delete();
        return response()->json(['message' => 'delete question successfully!']);
    }
}
