import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TAddResponseType } from "@customtypes/addResponseType";
type TResponse = TAddResponseType
const cookie = Cookie()
const actDashAddCourses = createAsyncThunk(
    "dashboard/actDashAddCourses",
    async (formData: FormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/course/store`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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

export default actDashAddCourses;
