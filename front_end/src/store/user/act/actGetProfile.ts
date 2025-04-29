import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TProfile } from "@customtypes/profileType";
import Cookie from 'cookie-universal'
const cookie = Cookie()

type TResponse = TProfile

const actGetProfile = createAsyncThunk(
    "user/actGetProfile",
    async (_, thunk) => {
        const { rejectWithValue, signal } = thunk;
        try {
            const res = await axios.get<TResponse>("user/profile", {
                signal,

                headers: {
                    // 'Content-Type': 'application/json',
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

export default actGetProfile;
