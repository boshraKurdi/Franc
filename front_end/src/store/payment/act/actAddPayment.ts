import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal'
type TFormData = {
    cvc: string;
    number: number;
    type: string;
    book_id: number;
    price: number
};
const cookie = Cookie()

const actAddPayment = createAsyncThunk(
    "payment/actAddPayment",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post("/payment/store", JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookie.get('token')}`
                }
                ,
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

export default actAddPayment;
