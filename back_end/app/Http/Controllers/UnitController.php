<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get_unit_course_level()
    {
        $unit = Unit::where('');
    }
    public function index()
    {
        $units = Unit::with(['level', 'lesson', 'quiz'])->get();
        return response()->json(['data' => $units]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUnitRequest $request)
    {
        $store = Unit::create([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'level_id' => $request->level_id,
            'number' => $request->number
        ]);
        return response()->json(['data' => $store, 'message' => 'add unit successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Unit $unit)
    {
        return response()->json(['data' => $unit->load(['level', 'lesson', 'quiz'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        $unit->update([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description,
            'level_id' => $request->level_id,
            'number' => $request->number
        ]);
        return response()->json(['message' => 'update unit successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        $unit->delete();
        return response()->json(['message' => 'delete unit successfully!']);
    }
}
