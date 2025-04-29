import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '@utils/axiosErrorHandler';

const actUpdatePayment = createAsyncThunk(
    "payment/actUpdatePayment",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post(`dashboard/payment/update/${id}`, {}, {
                headers: { 'Content-Type': 'application/json' },
            });
            return res.data;


        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actUpdatePayment;
