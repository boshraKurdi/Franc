import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'
const cookie = Cookie()
const actQuizLevel = createAsyncThunk(
    "quiz/actQuizLevel",
    async (id: number, thunk) => {
        const { rejectWithValue, signal } = thunk;

        try {
            const res = await axios.get(`/course/QuizLevel/${id}`,
                {
                    signal,
                    headers: {
                        // 'Content-Type': 'application/json'
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            console.log(res.data.data)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actQuizLevel;
