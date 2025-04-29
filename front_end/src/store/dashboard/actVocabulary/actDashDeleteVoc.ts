import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TVoc } from "@customtypes/vocabularyType";
type TResponse = TVoc
const cookie = Cookie()
const actDashDeleteVoc = createAsyncThunk(
    "dashboard/actDashDeleteVoc",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.delete<TResponse>(`dashboard/vocabulary/destroy/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            return id;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDashDeleteVoc;
