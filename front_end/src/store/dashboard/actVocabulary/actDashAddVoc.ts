import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TAddResponseVoc } from "@customtypes/addResponseType";
const cookie = Cookie()
type TResponse = TAddResponseVoc
const actDashAddVoc = createAsyncThunk(
    "dashboard/actDashAddVoc",
    async (form: FormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/vocabulary/store`, form
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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

export default actDashAddVoc;
