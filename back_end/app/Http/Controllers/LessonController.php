<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = Lesson::with(['quiz', 'vocabulary'])->get();
        return response()->json(['data' => $lessons]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        $store = Lesson::create([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'content' => $request->content,
            'content_ar' => $request->content_ar,
            'objective' => $request->objective,
            'objective_ar' => $request->objective_ar,
            'video_url' => $request->video_url,
            'unit_id' => $request->unit_id,
        ]);
        return response()->json(['data' => $store, 'message' => 'add lesson successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson)
    {
        return response()->json(['data' => $lesson->load(['quiz', 'vocabulary'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $lesson->update([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'content' => $request->content,
            'content_ar' => $request->content_ar,
            'objective' => $request->objective,
            'objective_ar' => $request->objective_ar,
            'video_url' => $request->video_url,
            'unit_id' => $request->unit_id,
        ]);
        return response()->json(['message' => 'update lesson successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return response()->json(['message' => 'delete lesson successfully!']);
    }
}
