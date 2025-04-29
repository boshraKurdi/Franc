import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetUnits from "./act/actGetUnit";
import { TUnit } from "@customtypes/unitType";
import actGetQuizUnit from "./act/actGetQuizUnit";
import { TQuizUnit, } from "@customtypes/QuizType";
import actGetAllUnits from "./act/actGetAllUnits";
interface IAuthState {
    units: TUnit[] | null,
    loading: TLoading;
    error: string | null;
    quizes: TQuizUnit | null
}
const initialState: IAuthState = {
    units: null,
    loading: "idle",
    error: null,
    quizes: null
}
const authSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        actCLearUnit: (state) => {
            state.units = null;
        },

    }
    ,
    extraReducers: (builder) => {
        //get units by level
        builder.addCase(actGetUnits.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetUnits.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.units = action.payload;

        });
        builder.addCase(actGetUnits.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get all unit
        builder.addCase(actGetAllUnits.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetAllUnits.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.units = action.payload;

        });
        builder.addCase(actGetAllUnits.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get quiz unit
        builder.addCase(actGetQuizUnit.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetQuizUnit.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quizes = action.payload;

        });
        builder.addCase(actGetQuizUnit.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

    },
})

export {
    actGetUnits,
};
export const { actCLearUnit } = authSlice.actions;
export default authSlice.reducer