import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'
import { RootState } from "@store/index";
import { TProgress } from "@customtypes/progressType";
type TResponse = TProgress;
const cookie = Cookie()
const actAddProgress = createAsyncThunk(
    "quiz/actAddProgress",
    async (form: object, thunk) => {
        const { rejectWithValue, signal, getState } = thunk;
        const { language } = getState() as RootState;
        const url = language.language === 'French' ? `/progress/AddProgress` : `/progress/AddProgress?lang=ar`
        try {
            const res = await axios.post<TResponse>(url, JSON.stringify(form),
                {
                    signal,
                    headers: {
                        'Content-Type': 'application/json',
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

export default actAddProgress;
