import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const actGetBooks = createAsyncThunk(
    "book/actGetBooks",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get("home/GetBook",
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            return res.data.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetBooks;
