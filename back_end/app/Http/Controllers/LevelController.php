<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Http\Requests\StoreLevelRequest;
use App\Http\Requests\UpdateLevelRequest;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = Level::with('course')->get();
        return response()->json(['data' => $levels]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLevelRequest $request)
    {
        $store = Level::create([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'course_id' => $request->course_id,
            'number' => $request->number
        ]);
        return response()->json(['data' => $store, 'message' => 'add level successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Level $level)
    {
        return response()->json(['data' => $level->load(['course'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLevelRequest $request, Level $level)
    {
        $level->update([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'course_id' => $request->course_id,
            'number' => $request->number
        ]);
        return response()->json(['message' => 'update level successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Level $level)
    {
        $level->delete();
        return response()->json(['message' => 'delete level successfully!']);
    }
}
