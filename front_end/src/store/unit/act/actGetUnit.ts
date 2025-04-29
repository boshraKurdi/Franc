import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'

const cookie = Cookie()

const actGetUnits = createAsyncThunk(
    "unit/actGetUnits",
    async (id: number, thunk) => {
        const { rejectWithValue, signal } = thunk;

        try {
            const res = await axios.get(`/course/GetUnits/${id}`,
                {
                    signal,
                    headers: {
                        // 'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`

                    }
                },
            );
            return res.data.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetUnits;
