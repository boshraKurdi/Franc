import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TQuizProps } from "@customtypes/QuizType";
const cookie = Cookie()
const actDashAddQuizLesson = createAsyncThunk(
    "dashboard/actDashAddQuizLesson",
    async (form: TQuizProps, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post(`dashboard/quiz_lesson/store`, form
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDashAddQuizLesson;
