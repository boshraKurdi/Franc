import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TRegAuth } from "@customtypes/TRegAuth";

type TFormData = {
    email: string;
    password: string;
};

type TResponse = TRegAuth

const actLogin = createAsyncThunk(
    "auth/actLogin",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>("auth/login/", JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            }
            );
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLogin;
