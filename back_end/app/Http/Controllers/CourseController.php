<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Lesson;
use App\Models\Level;
use App\Models\Target;
use App\Models\Unit;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function quiz_level($id)
    {

        $quiz = Course::where('id', $id)->whereHas('quiz', function ($q) {
            $q->where('type', 'level');
        })
            ->with('quiz.media')
            ->get();

        return response()->json(['data' => $quiz]);
    }

    public function index()
    {
        $courses = Course::with('media')->get();
        return response()->json(['data' => $courses]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $store = Course::create([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description
        ]);
        if ($request->media) {
            $store->addMediaFromRequest('media')->toMediaCollection('courses');
        }
        return response()->json(['data' => $store->load('media'), 'message' => 'add course successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function get_unit_course_level($id)
    {
        $level_course = DB::table('levels')
            ->where('levels.id', $id)
            ->first();
        $courseId = DB::table('levels')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('levels.id', $id)
            ->value('courses.id');
        $units_ids = DB::table('lessons')
            ->join('units', 'lessons.unit_id', '=', 'units.id')
            ->join('levels', 'units.level_id', '=', 'levels.id')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('levels.id', $id)
            ->pluck('units.id');
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'unit')
            ->whereIn('check',  $units_ids)
            ->count();
        $level = Target::where('user_id', auth()->id())
            ->where('type', 'level')
            ->where('course_id', $courseId)
            ->first();

        $my_level_in_course = $level ? $level->level : 1;

        $levels_in_course = Level::where('course_id', $courseId)->orderBy('number')->get();

        foreach ($levels_in_course as $l) {

            $units = Unit::where('level_id', $l->id)->get();
            $units_id = Unit::where('level_id', $l->id)->pluck('units.id');

            $total_unit = $units->count();
            $unit_completed_level = Target::where('user_id', auth()->id())
                ->where('type', 'unit')
                ->whereIn('check', $units_id)
                ->count();
            if ($total_unit == $unit_completed_level) {
                $my_level_in_course++;
            }
        }
        $userUnit = $check ? $check + 1 : 1;
        $units = Unit::where('level_id', $id)->get();
        if ($units) {
            foreach ($units as $index => $unit) {
                if ($my_level_in_course > $level_course->number) {
                    $unit->is_locked = false;
                } else {
                    $unit->is_locked = ($index + 1) > $userUnit;
                }
            }
        }
        return response()->json(['data' => $units]);
    }
    public function get_lesson($id)
    {
        $unit = DB::table('units')
            ->where('id', $id)
            ->first();
        $myunits_id = Unit::where('level_id', $unit->level_id)->pluck('units.id');
        $level_course = DB::table('levels')
            ->where('levels.id',  $unit->level_id)
            ->first();
        $lessons_ids = DB::table('lessons')
            ->join('units', 'lessons.unit_id', '=', 'units.id')
            ->join('levels', 'units.level_id', '=', 'levels.id')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('units.id', $id)
            ->pluck('lessons.id');
        $courseId = DB::table('lessons')
            ->join('units', 'lessons.unit_id', '=', 'units.id')
            ->join('levels', 'units.level_id', '=', 'levels.id')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('units.id', $id)
            ->value('courses.id');
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'lesson')
            ->whereIn('check', $lessons_ids)
            ->count();
        $level = Target::where('user_id', auth()->id())
            ->where('type', 'level')
            ->where('course_id', $courseId)
            ->first();

        $my_level_in_course = $level ? $level->level : 1;

        $levels_in_course = Level::where('course_id', $courseId)->orderBy('number')->get();

        foreach ($levels_in_course as $level) {

            $units = Unit::where('level_id', $level->id)->get();
            $units_id = Unit::where('level_id', $level->id)->pluck('units.id');

            $total_unit = $units->count();
            $unit_completed_level = Target::where('user_id', auth()->id())
                ->where('type', 'unit')
                ->whereIn('check', $units_id)
                ->count();
            if ($total_unit == $unit_completed_level) {
                $my_level_in_course++;
            }
        }
        $check_unit = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'unit')
            ->whereIn('check', $myunits_id)
            ->count();
        $check_level_number =  $my_level_in_course;
        $userLesson = $check ? $check + 1 : 1;
        $lessons = Lesson::where('unit_id', $id)->with(['vocabulary', 'vocabulary.media'])->get();
        if ($lessons) {
            foreach ($lessons as $index => $lesson) {
                if ($check_level_number > $level_course->number || $check_unit >= $unit->number) {
                    $lesson->is_locked = false;
                } else {
                    $lesson->is_locked = ($index + 1) > $userLesson;
                }
            }
        }
        return response()->json(['data' => $lessons]);
    }
    public function show($id)
    {
        $course = Course::where('id', $id)->with(['levels', 'media', 'topics'])->first();
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $id)
            ->where('type', 'level')
            ->first();
        $buttonLevelQuiz  = $check ? false : true;
        $course->buttonLevelQuiz = $buttonLevelQuiz;

        $level = Target::where('user_id', auth()->id())
            ->where('type', 'level')
            ->where('course_id', $id)
            ->first();

        $my_level_in_course = $level ? $level->level : 1;

        $levels_in_course = Level::where('course_id', $id)->orderBy('number')->get();

        foreach ($levels_in_course as $level) {

            $units = Unit::where('level_id', $level->id)->get();
            $units_id = Unit::where('level_id', $level->id)->pluck('units.id');

            $total_unit = $units->count();
            $unit_completed_level = Target::where('user_id', auth()->id())
                ->where('type', 'unit')
                ->whereIn('check', $units_id)
                ->count();
            if ($total_unit == $unit_completed_level) {
                $my_level_in_course++;
            }
        }
        if ($course) {
            foreach ($course->levels as $index => $level) {

                $level->is_locked = ($index + 1) > $my_level_in_course;
            }
        }
        return response()->json(['data' => $course]);
    }
    public function showCourse(Course $course)
    {
        return response()->json(['data' => $course->load(['media'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description
        ]);
        if ($request->hasFile('media')) {
            $course->clearMediaCollection('courses');
            $course->addMediaFromRequest('media')->toMediaCollection('courses');
        }
        return response()->json(['data' => $course->load('media'), 'message' => 'update course successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(['message' => 'delete course successfully!']);
    }
}