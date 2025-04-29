<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Level;
use App\Models\Target;
use App\Models\Unit;
use App\Models\User;
use App\Services\Calculate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile()
    {
        $user = User::where('id', auth()->id())->first();
        $certificate = Certificate::whereHas('target', function ($q) {
            $q->where('user_id', auth()->id());
        })->with('target.course')->get();
        // 1️⃣ عدد الوحدات التي أكملها المستخدم
        $completedUnits = Target::where('user_id', $user->id)
            ->where('type', 'unit')
            ->count();

        // 2️⃣ عدد الدروس المكتملة
        $completedLessons = Target::where('user_id', $user->id)
            ->where('type', 'lesson')
            ->count();

        // 3️⃣ عدد المستويات المكتملة
        $completedLevels = Target::where('user_id', $user->id)
            ->where('type', 'level')
            ->count();



        // 6️⃣ عدد الأيام المتتالية التي درس فيها المستخدم (Streak)
        $streak = Calculate::calculateStreak($user->id);



        // 9️⃣ ترتيب المستخدم بين المتعلمين (Leaderboard)
        $rank = Calculate::getUserRank($user->id);
        $courses = Course::all();
        $levels = [];
        $rate = [];
        foreach ($courses as $c) {
            $level = Target::where('user_id', $user->id)
                ->where('type', 'level')
                ->where('course_id', $c->id)
                ->first();

            $my_level_in_course = $level ? $level->level : 1;

            $levels_in_course = Level::where('course_id', $c->id)->orderBy('number')->get();
            $levels_count = $levels_in_course->count();

            $total_units = 0;
            $completed_units = 0;

            $total_lessons = 0;
            $completed_lessons = 0;

            foreach ($levels_in_course as $level) {
                if ($level->number < $my_level_in_course) {
                    continue; // ⛔ تجاهل المستويات السابقة لمستوى المستخدم
                }

                $units = Unit::where('level_id', $level->id)->get();
                $units_id = Unit::where('level_id', $level->id)->pluck('units.id');
                $total_units += $units->count();
                $total_unit = $units->count();
                $unit_completed_level = Target::where('user_id', $user->id)
                    ->where('type', 'unit')
                    ->whereIn('check', $units_id)
                    ->count();
                if ($total_unit == $unit_completed_level) {
                    $my_level_in_course++;
                }
                foreach ($units as $unit) {
                    // تحقق من اختبار الوحدة
                    $unit_completed = Target::where('user_id', $user->id)
                        ->where('type', 'unit')
                        ->where('check', $unit->id)
                        ->exists();
                    if ($unit_completed) {
                        $completed_units++;
                    }

                    // تحقق من دروس الوحدة
                    $lesson_ids = Lesson::where('unit_id', $unit->id)->pluck('id')->toArray();
                    $lesson_count = count($lesson_ids);
                    $total_lessons += $lesson_count;

                    if ($lesson_count > 0) {
                        $completed = Target::where('user_id', $user->id)
                            ->where('type', 'lesson')
                            ->whereIn('check', $lesson_ids)
                            ->count();

                        $completed_lessons += $completed;

                        // ✅ إذا كانت هذه آخر وحدة وتم إنهاء دروسها كلها
                        $is_last_unit = $unit->id === $units->last()->id;
                        if ($is_last_unit && $completed == $lesson_count) {
                            $last_unit_completed = true;
                        }
                    }
                }
            }

            // ✅ حساب نسبة التقدم
            $unit_progress = $total_units > 0 ? ($completed_units / $total_units) * 100 : 0;
            $lesson_progress = $completed_lessons > 0 ? ($completed_lessons / ($total_lessons + 1)) * 100 : 0;

            $rate_all = intval($unit_progress + $lesson_progress);

            // ✅ إذا أنهى المستخدم جميع الوحدات والدروس بعد مستواه
            if ($completed_units == $total_units && $total_units > 0) {
                $rate_all = 100;
            }

            // ✅ تحديث المستوى الفعلي (لو أنهى كل وحدات بعد مستواه الحالي)
            if ($completed_units == $total_units && $total_units > 0) {
                $my_level_in_course = $levels_count;
            }

            // array_push($rate, [app()->getLocale() == 'fa' ? "$c->title" : "$c->title_ar" => $my_level_in_course]);
            array_push($rate, [app()->getLocale() == 'fa' ? "$c->title" : "$c->title_ar" => ["rate" => $rate_all, "level" => $my_level_in_course]]);
        }


        $user->completed_units = $completedUnits;
        $user->completed_lessons = $completedLessons;
        $user->completed_levels = $completedLevels;
        $user->streak_days = $streak;
        $user->levels = $levels;
        $user->rate = $rate;
        $user->user_rank = $rank;
        $user->certificate = $certificate;
        // 🔹 تجميع الإحصائيات في مصفوفة وإرسالها للعرض
        return response()->json(['data' => $user]);
    }

    public function update(Request $request)
    {
        User::where('id', auth()->id())->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        return response()->json([
            'message' => app()->getLocale() == 'fa' ? "Profil modifié avec succès" : "تم تعديل الملف الشخصي بنجاح"
        ]);
    }

    public function delete()
    {
        User::where('id', auth()->id())->delete();
        return response()->json([
            'message' => app()->getLocale() == 'fa' ? "Profil supprimé avec succès" : "تم حذف الملف الشخصي بنجاح"
        ]);
    }

    public function dashboardStats()
    {
        $total_users = User::count();
        $active_today = User::whereDate('last_login', Carbon::today())->count();
        $active_week = User::whereBetween('last_login', [Carbon::now()->subWeek(), Carbon::now()])->count();
        $active_month = User::whereMonth('last_login', Carbon::now()->month)->count();

        $total_courses = Course::count();
        $total_units = Unit::count();
        $total_lessons = Lesson::count();

        $tests_level = Target::where('type', 'level')->count();
        $tests_unit = Target::where('type', 'unit')->count();
        $tests_lesson = Target::where('type', 'lesson')->count();
        $tests_total = $tests_level + $tests_unit + $tests_lesson;

        $course_completion = Course::with('levels.unit')->get()->map(function ($course) {
            $users = User::all(); // إذا في فلترة يفضل نحصرهم هنا
            $completed = 0;

            foreach ($users as $user) {
                $last_unit = Unit::whereHas('level.course', function ($q) use ($course) {
                    $q->where('courses.id', $course->id);
                })
                    ->latest('id')
                    ->first();
                $unit_completed = Target::where('user_id', $user->id)
                    ->where('type', 'unit')
                    ->where('course_id', $course->id)
                    ->where('check', $last_unit?->id)
                    ->count();

                if ($unit_completed) {
                    $completed++;
                }
            }

            return [
                'course' => $course->title,
                'completed_users' => $completed
            ];
        });

        $inactive_users = User::doesntHave('targets')->count();

        $average_progress = Target::select('user_id', 'course_id')
            ->distinct()
            ->get()
            ->map(function ($target) {
                $user = $target->user_id;
                $course = $target->course_id;

                $total_units = Unit::whereIn('level_id', function ($q) use ($course) {
                    $q->select('id')->from('levels')->where('course_id', $course);
                })->pluck('id');

                $completed_units = Target::where('user_id', $user)
                    ->where('type', 'unit')
                    ->whereIn('check', $total_units)
                    ->count();

                $total = count($total_units);
                return $total > 0 ? ($completed_units / $total) * 100 : 0;
            })
            ->avg();


        $getDailyTestsStats = DB::table('targets')
            ->select(DB::raw('DATE(created_at) as x'), DB::raw('count(*) as y'))
            ->whereIn('type', ['unit', 'lesson', 'level']) // أو حسب نوع الاختبارات
            ->where('created_at', '>=', Carbon::now()->subDays(6)) // آخر 7 أيام
            ->groupBy('x')
            ->orderBy('x', 'asc')
            ->get();


        $getUserGrowthPerMonth = DB::table('users')
            ->select(
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as x"),
                DB::raw('count(*) as y')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths(11))
            ->groupBy('x')
            ->orderBy('x', 'asc')
            ->get();

        return response()->json([
            'total_users' => $total_users,
            'active_today' => $active_today,
            'active_week' => $active_week,
            'active_month' => $active_month,

            'total_courses' => $total_courses,
            'total_units' => $total_units,
            'total_lessons' => $total_lessons,

            'total_tests' => $tests_total,
            'level_tests' => $tests_level,
            'unit_tests' => $tests_unit,
            'lesson_tests' => $tests_lesson,

            'course_completion' => $course_completion,
            'inactive_users' => $inactive_users,
            'average_progress' => round($average_progress, 2),

            'get_daily_tests_stats' => $getDailyTestsStats,
            'get_user_grow_th_per_month' => $getUserGrowthPerMonth
        ]);
    }
}
