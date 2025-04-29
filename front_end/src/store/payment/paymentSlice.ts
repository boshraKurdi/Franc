import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actAddPayment from "./act/actAddPayment";
import actGetPayments from "./act/actGetPayments";
import { TPayment } from "@customtypes/paymentType";
import actUpdatePayment from "./act/actUpdatePayment";
// import actUpdateProfile from "./act/actUpdateProfile";
interface IAuthState {
    payments: TPayment[] | null,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    payments: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        clearPay: (state) => {
            state.payments = null;
        },
    }
    ,
    extraReducers: (builder) => {
        //pay
        builder.addCase(actAddPayment.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAddPayment.fulfilled, (state,) => {
            state.loading = "succeeded";

        });
        builder.addCase(actAddPayment.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // get payments
        builder.addCase(actGetPayments.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetPayments.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.payments = action.payload;
        });
        builder.addCase(actGetPayments.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // update payments
        builder.addCase(actUpdatePayment.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actUpdatePayment.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actUpdatePayment.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
    },
})

export {
    actAddPayment, actGetPayments,
};
export const { clearPay } = authSlice.actions;
export default authSlice.reducer