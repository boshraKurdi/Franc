import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const actGetCourses = createAsyncThunk(
    "course/actGetCourses",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get("home/GetCourses",
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            return res.data.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetCourses;
