import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TProfile } from "@customtypes/profileType";
import Cookie from 'cookie-universal'
const cookie = Cookie()


type TResponse = TProfile

const actDeleteAccount = createAsyncThunk(
    "user/actDeleteAccount",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.delete<TResponse>("user/delete", {
                headers: {
                    'Content-Type': 'application/json',
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

export default actDeleteAccount;
