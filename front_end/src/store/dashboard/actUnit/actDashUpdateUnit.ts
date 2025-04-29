import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TUnitProps } from "@customtypes/unitType";
type TResponse = ""
const cookie = Cookie()
const actDashUpdateUnit = createAsyncThunk(
    "dashboard/actDashUpdateUnit",
    async (formData: TUnitProps, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/unit/update/${formData.id}`, formData
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            return formData;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDashUpdateUnit;
