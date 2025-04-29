import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import { TCourse } from "@customtypes/courseType";
import { TLevel } from "@customtypes/levelType";
import { TTopic, } from "@customtypes/topicType";
import { TUnit, TUnitProps } from "@customtypes/unitType";
import { TLesson } from "@customtypes/lessonType";
import { TVocbulary } from "@customtypes/vocabularyType";
import { TQuizProps } from "@customtypes/QuizType";
import actDashGetCourses from "./actCourse/actDashGetCourse";
import actDashShowCourse from "./actCourse/actDashShowCourse";
import actDashAddCourses from "./actCourse/actDashAddCourse";
import actDashUpdateCourse from "./actCourse/actDashUpdateCourse";
import actDashDeleteCourses from "./actCourse/actDashDeleteCourse";
import actDashGetLevels from "./actLevel/actDashGetLevel";
import actDashShowLevel from "./actLevel/actDashShowLevel";
import actDashAddLevel from "./actLevel/actDashAddLevel";
import actDashUpdateLevel from "./actLevel/actDashUpdateLevel";
import actDashDeleteLevel from "./actLevel/actDashDeleteLevel";
import actDashDeleteTopic from "./actTopic/actDashDeleteTopic";
import actDashUpdateTopic from "./actTopic/actDashUpdateTopic";
import actDashAddTopic from "./actTopic/actDashAddTopic";
import actDashShowTopic from "./actTopic/actDashShowTopic";
import actDashGetTopics from "./actTopic/actDashGetTopic";
import actDashDeleteLesson from "./actLesson/actDashDeleteLesson";
import actDashUpdateLesson from "./actLesson/actDashUpdateLesson";
import actDashAddLesson from "./actLesson/actDashAddLesson";
import actDashShowLesson from "./actLesson/actDashShowLesson";
import actDashGetLessons from "./actLesson/actDashGetLesson";
import actDashDeleteUnit from "./actUnit/actDashDeleteUnit";
import actDashUpdateUnit from "./actUnit/actDashUpdateUnit";
import actDashAddUnit from "./actUnit/actDashAddUnit";
import actDashShowUnit from "./actUnit/actDashShowUnit";
import actDashGetUnits from "./actUnit/actDashGetUnit";
import actDashDeleteVoc from "./actVocabulary/actDashDeleteVoc";
import actDashUpdateVoc from "./actVocabulary/actDashUpdateVoc";
import actDashAddVoc from "./actVocabulary/actDashAddVoc";
import actDashShowVoc from "./actVocabulary/actDashShowVoc";
import actDashGetVoc from "./actVocabulary/actDashGetVoc";
import actDashDeleteQuizCourse from "./actquizCourse/actDashDeleteQuizCourse";
import actDashUpdateQuizCourse from "./actquizCourse/actDashUpdateQuizCourse";
import actDashAddQuizCourse from "./actquizCourse/actDashAddQuizCourse";
import actDashShowQuizCourse from "./actquizCourse/actDashShowQuizCourse";
import actDashGetQuizCourse from "./actquizCourse/actDashGetQuizCourse";
import actDashDeleteQuizUnit from "./actquizUnit/actDashDeleteQuizUnit";
import actDashUpdateQuizUnit from "./actquizUnit/actDashUpdateQuizUnit";
import actDashAddQuizUnit from "./actquizUnit/actDashAddQuizUnit";
import actDashShowQuizUnit from "./actquizUnit/actDashShowQuizUnit";
import actDashGetQuizUnit from "./actquizUnit/actDashGetQuizUnit";
import actDashDeleteQuizLesson from "./actquizLesson/actDashDeleteQuizLesson";
import actDashUpdateQuizLesson from "./actquizLesson/actDashUpdateQuizLesson";
import actDashAddQuizLesson from "./actquizLesson/actDashAddQuizLesson";
import actDashShowQuizLesson from "./actquizLesson/actDashShowQuizLesson";
import actDashGetQuizLesson from "./actquizLesson/actDashGetQuizLesson";
import { TState } from "@customtypes/stateType";
import actGetStates from "./actGetStates/actGetStates";
import { TBook } from "@customtypes/bookType";
import actDashAddBook from "./actBook/actDashAddBook";
import actDashGetBook from "./actBook/actDashGetBook";
import actDashShowBook from "./actBook/actDashShowBook";
import actDashUpdateBook from "./actBook/actDashUpdateBook";
import actDashDeleteBook from "./actBook/actDashDeleteBook";
interface IAuthState {
    states: TState | null,
    book: TBook | null,
    books: TBook[] | null,
    courses: TCourse[] | null,
    course: TCourse | null,
    levels: TLevel[] | null,
    level: TLevel | null,
    units: TUnit[] | null,
    unit: TUnitProps | null,
    topics: TTopic[] | null,
    vocabularies: TVocbulary[] | null,
    vocabulary: TVocbulary | null,
    topic: TTopic | null,
    lessons: TLesson[] | null,
    lesson: TLesson | null,
    quiz_course: TQuizProps | null,
    quiz_courses: TQuizProps[] | null,

    quiz_unit: TQuizProps | null,
    quiz_units: TQuizProps[] | null,

    quiz_lesson: TQuizProps | null,
    quiz_lessons: TQuizProps[] | null,

    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    books: null,
    book: null,
    states: null,
    courses: null,
    course: null,
    levels: null,
    level: null,
    units: null,
    unit: null,
    topics: null,
    topic: null,
    lessons: null,
    lesson: null,
    vocabularies: null,
    vocabulary: null,
    quiz_course: null,
    quiz_courses: null,
    quiz_unit: null,
    quiz_units: null,
    quiz_lesson: null,
    quiz_lessons: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        actCLearCourse: (state) => {
            state.courses = null;
        },
        actCLearCourses: (state) => {
            state.course = null;
        },
    }
    ,
    extraReducers: (builder) => {
        // Get Course
        builder.addCase(actDashGetCourses.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetCourses.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.courses = action.payload;

        });
        builder.addCase(actDashGetCourses.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show course
        builder.addCase(actDashShowCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowCourse.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.course = action.payload;
        });
        builder.addCase(actDashShowCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add course
        builder.addCase(actDashAddCourses.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddCourses.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.courses?.push(action.payload.data);
        });
        builder.addCase(actDashAddCourses.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update course
        builder.addCase(actDashUpdateCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateCourse.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete course
        builder.addCase(actDashDeleteCourses.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteCourses.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.courses! = state.courses!.filter((course: TCourse) => course.id !== action.payload)
        });
        builder.addCase(actDashDeleteCourses.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // Get topics
        builder.addCase(actDashGetTopics.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetTopics.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.topics = action.payload;

        });
        builder.addCase(actDashGetTopics.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show topic
        builder.addCase(actDashShowTopic.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowTopic.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.topic = action.payload;
        });
        builder.addCase(actDashShowTopic.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add topic
        builder.addCase(actDashAddTopic.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddTopic.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.topics!.push(action.payload.data);
        });
        builder.addCase(actDashAddTopic.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update topic
        builder.addCase(actDashUpdateTopic.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateTopic.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateTopic.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete topic
        builder.addCase(actDashDeleteTopic.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteTopic.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.topics = state.topics!.filter(topic => topic.id !== action.payload)
        });
        builder.addCase(actDashDeleteTopic.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // Get levels
        builder.addCase(actDashGetLevels.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetLevels.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.levels = action.payload;

        });
        builder.addCase(actDashGetLevels.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show level
        builder.addCase(actDashShowLevel.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowLevel.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.level = action.payload;
        });
        builder.addCase(actDashShowLevel.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add level
        builder.addCase(actDashAddLevel.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddLevel.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.levels?.push(action.payload.data);
        });
        builder.addCase(actDashAddLevel.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update level
        builder.addCase(actDashUpdateLevel.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateLevel.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateLevel.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete level
        builder.addCase(actDashDeleteLevel.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteLevel.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.levels! = state.levels!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteLevel.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // Get units
        builder.addCase(actDashGetUnits.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetUnits.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.units = action.payload;

        });
        builder.addCase(actDashGetUnits.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show unit
        builder.addCase(actDashShowUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.unit = action.payload;
        });
        builder.addCase(actDashShowUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add unit
        builder.addCase(actDashAddUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.units!.push(action.payload.data);
        });
        builder.addCase(actDashAddUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update unit
        builder.addCase(actDashUpdateUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateUnit.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete unit
        builder.addCase(actDashDeleteUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.units = state.units!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // Get lessons
        builder.addCase(actDashGetLessons.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetLessons.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.lessons = action.payload;

        });
        builder.addCase(actDashGetLessons.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show lesson
        builder.addCase(actDashShowLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.lesson = action.payload;
        });
        builder.addCase(actDashShowLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add lesson
        builder.addCase(actDashAddLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.lessons?.push(action.payload.data);
        });
        builder.addCase(actDashAddLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update lesson
        builder.addCase(actDashUpdateLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateLesson.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete lesson
        builder.addCase(actDashDeleteLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.lessons = state.lessons!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // Get vocs
        builder.addCase(actDashGetVoc.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetVoc.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.vocabularies = action.payload;

        });
        builder.addCase(actDashGetVoc.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show voc
        builder.addCase(actDashShowVoc.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowVoc.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.vocabulary = action.payload;
        });
        builder.addCase(actDashShowVoc.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add voc
        builder.addCase(actDashAddVoc.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddVoc.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.vocabularies!.push(action.payload.data);
        });
        builder.addCase(actDashAddVoc.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update voc
        builder.addCase(actDashUpdateVoc.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateVoc.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateVoc.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete voc
        builder.addCase(actDashDeleteVoc.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteVoc.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.vocabularies = state.vocabularies!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteVoc.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // Get quiz course
        builder.addCase(actDashGetQuizCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetQuizCourse.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quiz_courses = action.payload;

        });
        builder.addCase(actDashGetQuizCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show quiz course
        builder.addCase(actDashShowQuizCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowQuizCourse.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quiz_course = action.payload;
        });
        builder.addCase(actDashShowQuizCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add quiz course
        builder.addCase(actDashAddQuizCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddQuizCourse.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.quiz_courses!.push(action.payload.data);
        });
        builder.addCase(actDashAddQuizCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update quiz course
        builder.addCase(actDashUpdateQuizCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateQuizCourse.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateQuizCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete quiz course
        builder.addCase(actDashDeleteQuizCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteQuizCourse.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.quiz_courses! = state.quiz_courses!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteQuizCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // Get quiz unit
        builder.addCase(actDashGetQuizUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetQuizUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quiz_units = action.payload;

        });
        builder.addCase(actDashGetQuizUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show quiz unit
        builder.addCase(actDashShowQuizUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowQuizUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quiz_unit = action.payload;
        });
        builder.addCase(actDashShowQuizUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add quiz unit
        builder.addCase(actDashAddQuizUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddQuizUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.quiz_units!.push(action.payload.data);
        });
        builder.addCase(actDashAddQuizUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update quiz unit
        builder.addCase(actDashUpdateQuizUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateQuizUnit.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateQuizUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete quiz unit
        builder.addCase(actDashDeleteQuizUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteQuizUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.quiz_units! = state.quiz_units!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteQuizUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // Get quiz lesson
        builder.addCase(actDashGetQuizLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetQuizLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quiz_lessons = action.payload;

        });
        builder.addCase(actDashGetQuizLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show quiz lesson
        builder.addCase(actDashShowQuizLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowQuizLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quiz_lesson = action.payload;
        });
        builder.addCase(actDashShowQuizLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add quiz lesson
        builder.addCase(actDashAddQuizLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddQuizLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.quiz_lessons!.push(action.payload.data);
        });
        builder.addCase(actDashAddQuizLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update quiz lesson
        builder.addCase(actDashUpdateQuizLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateQuizLesson.fulfilled, (state) => {
            state.loading = "succeeded";
            // state.course = action.payload;
        });
        builder.addCase(actDashUpdateQuizLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete quiz lesson
        builder.addCase(actDashDeleteQuizLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteQuizLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.quiz_lessons! = state.quiz_lessons!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteQuizLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // get states
        builder.addCase(actGetStates.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetStates.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.states = action.payload;
        });
        builder.addCase(actGetStates.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });




        // Get books
        builder.addCase(actDashGetBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashGetBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.books = action.payload;

        });
        builder.addCase(actDashGetBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show book
        builder.addCase(actDashShowBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashShowBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.book = action.payload;
        });
        builder.addCase(actDashShowBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // add book
        builder.addCase(actDashAddBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashAddBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.books!.push(action.payload.data);
        });
        builder.addCase(actDashAddBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // update book
        builder.addCase(actDashUpdateBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashUpdateBook.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actDashUpdateBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        // delete book
        builder.addCase(actDashDeleteBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDashDeleteBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.course = action.payload;
            state.books! = state.books!.filter(level => level.id !== action.payload)
        });
        builder.addCase(actDashDeleteBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

    },
})

export {
    actDashGetCourses,
};
export const { actCLearCourse } = authSlice.actions;
export default authSlice.reducer