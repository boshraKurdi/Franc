import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'


const actGetCertificate = createAsyncThunk(
    "user/actGetCertificate",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;
        const cookie = Cookie()
        try {
            const res = await axios.get(`user/certificate/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            return res.data.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetCertificate;
