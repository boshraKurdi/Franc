<?php

namespace App\Http\Controllers;

use App\Models\Target;
use App\Http\Requests\StoreTargetRequest;
use App\Http\Requests\UpdateTargetRequest;
use App\Models\Certificate;
use App\Models\Level;
use App\Models\Unit;
use Illuminate\Support\Facades\Auth;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTargetRequest $request)
    {
        $levels = Level::where('course_id', $request->course_id)->get();


        $level_num = 0;
        $level_id = 0;
        $certificate = 0;
        $status =  app()->getLocale() == 'fa' ? 'réussi' : "ناجح";
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $request->course_id)
            ->where('check', $request->check)
            ->where('type', $request->type)
            ->count();
        $check_level = Target::where('user_id', auth()->id())
            ->where('course_id', $request->course_id)
            ->where('type', $request->type)
            ->count();
        if (!$check) {
            if ($request->degree > 5 && $request->type != 'level') {
                $target = Target::create([
                    'user_id' => auth()->id(),
                    'course_id' => $request->course_id,
                    'check' => $request->check,
                    'type' => $request->type,
                    'degree' => $request->degree
                ]);
            }
            if (!$check_level && $request->type == 'level') {
                $target = Target::create([
                    'user_id' => auth()->id(),
                    'course_id' => $request->course_id,
                    'check' => 0,
                    'type' => $request->type,
                    'degree' => $request->degree
                ]);
                $max_degree = 10;
                $levels_count = count($levels);
                $range_per_level = $max_degree / $levels_count;

                foreach ($levels as $index => $level_title) {
                    $min_range = $index * $range_per_level;
                    $max_range = ($index + 1) * $range_per_level;

                    if ($request->degree >= $min_range && $request->degree <= $max_range) {
                        $level_num = $index + 1;
                        $level = app()->getLocale() == 'fa' ? $level_title->title : $level_title->title_ar;
                        break;
                    }
                }
                $mylevel = Level::whereHas('course', function ($q) use ($request) {
                    $q->where('courses.id', $request->course_id);
                })->where('number', $level_num)->first();
                $level_id = $mylevel ? $mylevel->id : 0;

                Target::where('id', $target->id)->update([
                    'level' => $level_num
                ]);
            }
        }
        if ($request->type == 'unit') {

            $unit_count = Unit::whereHas('level.course', function ($q) use ($request) {
                $q->where('courses.id', $request->course_id);
            })
                ->count();
            $last_unit = Unit::whereHas('level.course', function ($q) use ($request) {
                $q->where('courses.id', $request->course_id);
            })
                ->latest('id')
                ->first();
            $unit_completed = Target::where('user_id', auth()->id())
                ->where('type', 'unit')
                ->where('course_id', $request->course_id)
                ->where('check', $last_unit?->id)
                ->count();

            $unit_score_total = Target::where('user_id', auth()->id())
                ->where('type', 'unit')
                ->where('course_id', $request->course_id)
                ->sum('degree');
            if ($unit_completed) {
                $c = Certificate::create([
                    'target_id' => $target->id,
                    'average' => intval($unit_score_total / $unit_count) * 10
                ]);
                $certificate = $c->load(['target.course']);
            }
        }

        if ($request->degree > 5) {

            $message = app()->getLocale() == 'fa' ? "Votre travail acharné commence à porter ses fruits, continuez !💪🏻" : "عملك الجاد بدأ يؤتي ثماره، استمر في التقدم!💪🏻";
        } else if ($request->degree == 10) {
            $message = app()->getLocale() == 'fa' ? "Bravo! Votre réussite est le fruit de votre travail acharné, continuez à briller !🥳" : "مبروك! إنجازك هو ثمرة اجتهادك، استمر في التألق!🥳";
        } else {
            $status = app()->getLocale() == 'fa' ? "Échoué" : "راسب";
            $message = app()->getLocale() == 'fa' ? "Chaque échec est un pas vers le succès, apprenez et recommencez !😢" : "كل فشل هو خطوة نحو النجاح، تعلم وابدأ من جديد!😢";
        }




        return response()->json(['message' => $message, 'data' => [
            'level' =>  $level_id ? $level : 0,
            'status' => $status,
            'level_id' => $level_id,
            'certificate' => $certificate
        ]]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Target $target)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTargetRequest $request, Target $target)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Target $target)
    {
        //
    }
}
