import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '@utils/axiosErrorHandler';
import { TRegAuth } from "@customtypes/TRegAuth";
type TFormData = {
    name: string;
    email: string;
    password: string;
};
type TResponse = TRegAuth
const actRegister = createAsyncThunk(
    "auth/actRegister",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>("auth/register", JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            });
            return res.data;


        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actRegister;
