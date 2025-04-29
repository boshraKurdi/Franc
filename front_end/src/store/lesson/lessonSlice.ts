import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetLessons from "./act/actGetLessons";
import { TLesson } from "@customtypes/lessonType";
import { TQuizUnit } from "@customtypes/QuizType";
import actGetQuizLesson from "./act/actGetQuizLesson";
import actGetAllLessons from "./act/actGetAllLesson";
interface IAuthState {
    lessons: TLesson[] | null,
    loading: TLoading;
    error: string | null;
    quizes: TQuizUnit | null
}
const initialState: IAuthState = {
    lessons: null,
    loading: "idle",
    error: null,
    quizes: null
}
const authSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        actCLearLessons: (state) => {
            state.lessons = null;
        },

    }
    ,
    extraReducers: (builder) => {
        //get lesson by unit
        builder.addCase(actGetLessons.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetLessons.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.lessons = action.payload;

        });
        builder.addCase(actGetLessons.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get all lesson
        builder.addCase(actGetAllLessons.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetAllLessons.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.lessons = action.payload;

        });
        builder.addCase(actGetAllLessons.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get quiz unit
        builder.addCase(actGetQuizLesson.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetQuizLesson.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quizes = action.payload;

        });
        builder.addCase(actGetQuizLesson.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


    },
})

export {
    actGetLessons,
};
export const { actCLearLessons } = authSlice.actions;
export default authSlice.reducer