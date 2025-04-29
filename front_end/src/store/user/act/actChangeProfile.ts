import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'
const cookie = Cookie()
type TFormData = {
    email: string;
    name: string;
};

// type TResponse = TProfile
type TResponse = ""

const actChangeProfile = createAsyncThunk(
    "user/actChangeProfile",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>("user/update", formData, {
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

export default actChangeProfile;
