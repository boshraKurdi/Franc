import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'
import { RootState } from "@store/index";
type TFormData = {
    username: string;
    password: string;
};

type TResponse = {
    message: string, statue: string
}
const cookie = Cookie()
const actLogout = createAsyncThunk(
    "auth/actLogout",
    async (_, thunk) => {
        const { rejectWithValue, getState } = thunk;
        // const { auth } = getState() as RootState

        try {
            const res = await axios.post<TResponse>("auth/logout",{} ,{
                headers: {
                    "Authorization": `Bearer ${cookie.get("token")}`,
                },
            }
            );
            cookie.remove("token");
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLogout;
