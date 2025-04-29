import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TQuizUnit } from "@customtypes/QuizType";
import Cookie from 'cookie-universal'
type TResponse = TQuizUnit;
const cookie = Cookie()
const actGetQuizLesson = createAsyncThunk(
    "lesson/actGetQuizLesson",
    async (id: number, thunk) => {
        const { rejectWithValue, signal } = thunk;

        try {
            const res = await axios.get<TResponse>(`lesson/QuizLesson/${id}`,
                {
                    signal,
                    headers: {
                        // 'Content-Type': 'application/json'
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetQuizLesson;
