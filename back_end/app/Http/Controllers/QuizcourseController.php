<?php

namespace App\Http\Controllers;

use App\Models\Quizcourse;
use App\Http\Requests\StoreQuizcourseRequest;
use App\Http\Requests\UpdateQuizcourseRequest;

class QuizcourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $quiz = Quizcourse::where('course_id', $id)->get();
        return response()->json(['data' => $quiz]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizcourseRequest $request)
    {
        $store = Quizcourse::create([
            'question' => $request->question,
            'answer_1' => $request->answer_1,
            'answer_2' => $request->answer_2,
            'answer_3' => $request->answer_3,
            'answer_4' => $request->answer_4,
            'answer_right' => $request->answer_right,
            'type' => 'level',
            'course_id' => $request->course_id
        ]);
        return response()->json(['data' => $store, 'message' => 'add question successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quizcourse $quizcourse)
    {
        return response()->json(['data' => $quizcourse->load('course')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizcourseRequest $request, Quizcourse $quizcourse)
    {
        $quizcourse->update([
            'question' => $request->question,
            'answer_1' => $request->answer_1,
            'answer_2' => $request->answer_2,
            'answer_3' => $request->answer_3,
            'answer_4' => $request->answer_4,
            'answer_right' => $request->answer_right,
            'type' => 'level',
            'course_id' => $request->course_id
        ]);
        return response()->json(['message' => 'update question successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quizcourse $quizcourse)
    {
        $quizcourse->delete();
        return response()->json(['message' => 'delete question successfully!']);
    }
}
