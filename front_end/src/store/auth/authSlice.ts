import { createSlice } from "@reduxjs/toolkit";
import actRegister from './act/actRegister';
import { TLoading } from "@customtypes/loadingType";
import actLogin from "./act/actLogin";
import { isString } from "@customtypes/isString";
import actLogout from "./act/actLogout";
import { TRegAuth } from "@customtypes/TRegAuth";
// import actUpdateProfile from "./act/actUpdateProfile";
interface IAuthState {
    userData: TRegAuth | null,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    userData: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state) => {
            state.userData = null;
        },
    }
    ,
    extraReducers: (builder) => {
        //register
        builder.addCase(actRegister.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actRegister.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.userData = action.payload;

        });
        builder.addCase(actRegister.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // login
        builder.addCase(actLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.userData = action.payload;
        });
        builder.addCase(actLogin.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //logout
        builder.addCase(actLogout.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actLogout.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.userData = null;
        });
        builder.addCase(actLogout.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // //update profile
        // builder.addCase(actUpdateProfile.pending, (state) => {
        //     state.loading = "pending";
        //     state.error = null;
        // });
        // builder.addCase(actUpdateProfile.fulfilled, (state, action) => {
        //     state.loading = "succeeded";
        //     // state.user = action.payload;
        // });
        // builder.addCase(actUpdateProfile.rejected, (state, action) => {
        //     state.loading = "failed";
        //     if (isString(action.payload)) {
        //         state.error = action.payload;
        //     }
        // });
    },
})

export {
    actRegister, actLogin, actLogout,
    // actUpdateProfile
};
export const { authLogout } = authSlice.actions;
export default authSlice.reducer