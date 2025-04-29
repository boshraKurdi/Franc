<?php

namespace App\Services;

use App\Models\Target;
use Carbon\Carbon;

class Calculate
{
    public static function calculateStreak($userId)
    {
        $dates = Target::where('user_id', $userId)
            ->selectRaw('DATE(created_at) as date')
            ->distinct()
            ->orderBy('date', 'desc')
            ->pluck('date');

        $streak = 0;
        $yesterday = Carbon::today();

        foreach ($dates as $date) {
            if ($date == $yesterday->toDateString()) {
                $streak++;
                $yesterday->subDay();
            } else {
                break;
            }
        }

        return $streak;
    }

    // 🔹 تابع لحساب نسبة التقدم في المهارات
    public static function calculateSkillProgress($userId, $skillType)
    {
        return Target::where('user_id', $userId)
            ->where('type', $skillType)
            ->avg('degree') ?? 0;
    }

    // 🔹 تابع لحساب ترتيب المستخدم بين المتعلمين
    public static function getUserRank($userId)
    {
        $userScores = Target::selectRaw('user_id, SUM(degree) as total_score')
            ->groupBy('user_id')
            ->orderBy('total_score', 'desc')
            ->get();

        foreach ($userScores as $index => $user) {
            if ($user->user_id == $userId) {
                return $index + 1; // الترتيب يبدأ من 1 وليس 0
            }
        }

        return null; // المستخدم ليس ضمن الترتيب
    }
}
