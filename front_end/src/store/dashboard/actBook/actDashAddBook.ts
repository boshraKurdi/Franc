import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
const cookie = Cookie()
const actDashAddBook = createAsyncThunk(
    "dashboard/actDashAddBook",
    async (formData: FormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post(`dashboard/book/store`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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

export default actDashAddBook;
