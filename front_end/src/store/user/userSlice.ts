
import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetProfile from "@store/user/act/actGetProfile";
import { TProfile } from "@customtypes/profileType";
import actChangeProfile from "@store/user/act/actChangeProfile";
import actDeleteAccount from "@store/user/act/actDeleteAccount";
import { TCetrtificate } from "@customtypes/certificate";
import actGetCertificate from "./act/actGetCertificate";
// import actUpdateProfile from "./act/actUpdateProfile";
interface IAuthState {
    user: TProfile | null,
    certificates: TCetrtificate | null,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    user: null,
    certificates: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
    ,
    extraReducers: (builder) => {
        //register
        builder.addCase(actGetProfile.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProfile.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.user = action.payload;

        });
        builder.addCase(actGetProfile.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // login
        builder.addCase(actChangeProfile.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actChangeProfile.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.userData = action.payload;
        });
        builder.addCase(actChangeProfile.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //logout
        builder.addCase(actDeleteAccount.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actDeleteAccount.fulfilled, (state, action) => {
            state.loading = "succeeded";
            // state.userData = null;
        });
        builder.addCase(actDeleteAccount.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });
        //get certificate
        builder.addCase(actGetCertificate.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCertificate.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.certificates = action.payload;
        });
        builder.addCase(actGetCertificate.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


    },
})

export {
    actDeleteAccount, actGetProfile, actChangeProfile,
};
export default authSlice.reducer