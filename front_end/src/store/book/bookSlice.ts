import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetCourses from "./act/actGetCourses";
import { TBook } from "@customtypes/bookType";
import actGetBooks from "./act/actGetCourses";
import actShowBook from "./act/actShowCourse";
// import actUpdateProfile from "./act/actUpdateProfile";
interface IAuthState {
    books: TBook[] | null,
    book: TBook | null,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    books: null,
    book: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        actCLearBooks: (state) => {
            state.books = null;
        },
        actCLearBook: (state) => {
            state.book = null;
        },

    }
    ,
    extraReducers: (builder) => {
        //get books
        builder.addCase(actGetBooks.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetBooks.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.books = action.payload;

        });
        builder.addCase(actGetBooks.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // show book
        builder.addCase(actShowBook.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actShowBook.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.book = action.payload;
        });
        builder.addCase(actShowBook.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });



    },
})

export {
    actGetCourses,
};
export const { actCLearBook, actCLearBooks } = authSlice.actions;
export default authSlice.reducer