<?php

namespace App\Http\Controllers;

use App\Models\Quizlesson;
use App\Http\Requests\StoreQuizlessonRequest;
use App\Http\Requests\UpdateQuizlessonRequest;

class QuizlessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function quiz_lesson($id)
    {
        $quiz = Quizlesson::with('media')->where('lesson_id', $id)->get();
        return response()->json(['data' => $quiz]);
    }
    public function index($id)
    {
        $quiz = Quizlesson::with('media')->where('lesson_id', $id)->with('lesson')->get();
        return response()->json(['data' => $quiz]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizlessonRequest $request)
    {
        $store = Quizlesson::create([
            'question' => $request->question,
            'answer_1' => $request->answer_1,
            'answer_2' => $request->answer_2,
            'answer_3' => $request->answer_3,
            'answer_4' => $request->answer_4,
            'answer_right' => $request->answer_right,
            'lesson_id' => $request->lesson_id
        ]);
        return response()->json(['data' => $store, 'message' => 'add question successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quizlesson $quizlesson)
    {
        return response()->json(['data' => $quizlesson->load('lesson')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizlessonRequest $request, Quizlesson $quizlesson)
    {
        $quizlesson->update([
            'question' => $request->question,
            'answer_1' => $request->answer_1,
            'answer_2' => $request->answer_2,
            'answer_3' => $request->answer_3,
            'answer_4' => $request->answer_4,
            'answer_right' => $request->answer_right,
            'lesson_id' => $request->lesson_id
        ]);
        return response()->json(['message' => 'update question successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quizlesson $quizlesson)
    {
        $quizlesson->delete();
        return response()->json(['message' => 'delete question successfully!']);
    }
}
