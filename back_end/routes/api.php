<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\QuizcourseController;
use App\Http\Controllers\QuizlessonController;
use App\Http\Controllers\QuizunitController;
use App\Http\Controllers\TargetController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VocabularyController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout'])
        ->middleware('auth:api');
    Route::post('refresh', [AuthController::class, 'refresh'])
        ->middleware('auth:api');
});
Route::group(['prefix' => 'home'], function () {
    Route::get('GetCourses', [CourseController::class, 'index']);
    Route::get('ShowCourse/{id}', [CourseController::class, 'show']);
    Route::get('GetBook', [BookController::class, 'index']);
    Route::get('ShowBook/{book}', [BookController::class, 'show']);
});
Route::group(['middleware' => 'auth:api'], function () {
    Route::group(['prefix' => 'course'], function () {
        Route::get('QuizLevel/{id}', [CourseController::class, 'quiz_level']);
        Route::get('GetUnits/{id}', [CourseController::class, 'get_unit_course_level']);
        Route::get('GetLessons/{id}', [CourseController::class, 'get_lesson']);
    });
    Route::group(['prefix' => 'unit'], function () {
        Route::get('QuizUnit/{id}', [QuizunitController::class, 'quiz_unit']);
    });
    Route::group(['prefix' => 'lesson'], function () {
        Route::get('QuizLesson/{id}', [QuizlessonController::class, 'quiz_lesson']);
    });
    Route::group(['prefix' => 'progress'], function () {
        Route::post('AddProgress', [TargetController::class, 'store']);
    });
    Route::group(['prefix' => 'user'], function () {
        Route::get('profile', [UserController::class, 'profile']);
        Route::post('update', [UserController::class, 'update']);
        Route::delete('delete', [UserController::class, 'delete']);
        Route::get('certificate/{certificate}', [CertificateController::class, 'show']);
    });
    Route::group(['prefix' => 'payment'], function () {
        Route::post('store', [PaymentController::class, 'store']);
        Route::get('show/{payment}', [PaymentController::class, 'show']);
        Route::get('index', [PaymentController::class, 'index']);
    });
});
Route::group(['middleware' => ['role:admin']], function () {
    Route::group(['prefix' => 'dashboard'], function () {
        Route::get('index', [UserController::class, 'dashboardStats']);
        Route::group(['prefix' => 'course'], function () {
            Route::get('index', [CourseController::class, 'index']);
            Route::get('show/{course}', [CourseController::class, 'showCourse']);
            Route::post('store', [CourseController::class, 'store']);
            Route::post('update/{course}', [CourseController::class, 'update']);
            Route::delete('destroy/{course}', [CourseController::class, 'destroy']);
        });
        Route::group(['prefix' => 'level'], function () {
            Route::get('index', [LevelController::class, 'index']);
            Route::post('store', [LevelController::class, 'store']);
            Route::get('show/{level}', [LevelController::class, 'show']);
            Route::post('update/{level}', [LevelController::class, 'update']);
            Route::delete('destroy/{level}', [LevelController::class, 'destroy']);
        });
        Route::group(['prefix' => 'unit'], function () {
            Route::get('index', [UnitController::class, 'index']);
            Route::post('store', [UnitController::class, 'store']);
            Route::get('show/{unit}', [UnitController::class, 'show']);
            Route::post('update/{unit}', [UnitController::class, 'update']);
            Route::delete('destroy/{unit}', [UnitController::class, 'destroy']);
        });
        Route::group(['prefix' => 'lesson'], function () {
            Route::get('index', [LessonController::class, 'index']);
            Route::post('store', [LessonController::class, 'store']);
            Route::get('show/{lesson}', [LessonController::class, 'show']);
            Route::post('update/{lesson}', [LessonController::class, 'update']);
            Route::delete('destroy/{lesson}', [LessonController::class, 'destroy']);
        });
        Route::group(['prefix' => 'vocabulary'], function () {
            Route::get('index/{id}', [VocabularyController::class, 'index']);
            Route::post('store', [VocabularyController::class, 'store']);
            Route::get('show/{vocabulary}', [VocabularyController::class, 'show']);
            Route::post('update/{vocabulary}', [VocabularyController::class, 'update']);
            Route::delete('destroy/{vocabulary}', [VocabularyController::class, 'destroy']);
        });
        Route::group(['prefix' => 'topic'], function () {
            Route::get('index/{id}', [TopicController::class, 'index']);
            Route::post('store', [TopicController::class, 'store']);
            Route::get('show/{topic}', [TopicController::class, 'show']);
            Route::post('update/{topic}', [TopicController::class, 'update']);
            Route::delete('destroy/{topic}', [TopicController::class, 'destroy']);
        });
        Route::group(['prefix' => 'book'], function () {
            Route::get('index', [BookController::class, 'index']);
            Route::get('show/{book}', [BookController::class, 'show']);
            Route::post('store', [BookController::class, 'store']);
            Route::post('update/{book}', [BookController::class, 'update']);
            Route::delete('destroy/{book}', [BookController::class, 'destroy']);
        });
        Route::group(['prefix' => 'payment'], function () {
            Route::post('update/{payment}', [PaymentController::class, 'update']);
            Route::get('index', [PaymentController::class, 'GetPayment']);
        });
        Route::group(['prefix' => 'quiz_course'], function () {
            Route::get('index/{id}', [QuizcourseController::class, 'index']);
            Route::post('store', [QuizcourseController::class, 'store']);
            Route::get('show/{quizcourse}', [QuizcourseController::class, 'show']);
            Route::post('update/{quizcourse}', [QuizcourseController::class, 'update']);
            Route::delete('destroy/{quizcourse}', [QuizcourseController::class, 'destroy']);
        });
        Route::group(['prefix' => 'quiz_unit'], function () {
            Route::get('index/{id}', [QuizunitController::class, 'index']);
            Route::post('store', [QuizunitController::class, 'store']);
            Route::get('show/{quizunit}', [QuizunitController::class, 'show']);
            Route::post('update/{quizunit}', [QuizunitController::class, 'update']);
            Route::delete('destroy/{quizunit}', [QuizunitController::class, 'destroy']);
        });
        Route::group(['prefix' => 'quiz_lesson'], function () {
            Route::get('index/{id}', [QuizlessonController::class, 'index']);
            Route::post('store', [QuizlessonController::class, 'store']);
            Route::get('show/{quizlesson}', [QuizlessonController::class, 'show']);
            Route::post('update/{quizlesson}', [QuizlessonController::class, 'update']);
            Route::delete('destroy/{quizlesson}', [QuizlessonController::class, 'destroy']);
        });
    });
});
