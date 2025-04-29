import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'


const cookie = Cookie()
const actGetPayments = createAsyncThunk(
    "payment/actGetPayments",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get("/dashboard/payment/index", {
                headers: {
                    Authorization: `Bearer ${cookie.get("token")}`,
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

export default actGetPayments;
