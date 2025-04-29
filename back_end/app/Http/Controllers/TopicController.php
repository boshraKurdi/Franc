<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $index = Topic::where('course_id', $id)->with('course')->get();
        return response()->json(['data' => $index]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTopicRequest $request)
    {
        $store = Topic::create([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'course_id' => $request->course_id,
        ]);
        return response()->json(['data' => $store, 'message' => 'add topic successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        return response()->json(['data' => $topic->load(['course'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTopicRequest $request, Topic $topic)
    {
        $topic->update([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'course_id' => $request->course_id,
        ]);
        return response()->json(['message' => 'update topic successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        $topic->delete();
        return response()->json(['message' => 'delete topic successfully!']);
    }
}
