import { createSlice } from "@reduxjs/toolkit";
import { TLanguage } from "@customtypes/languageType";
type initialStateType = {
    language: TLanguage
}
const initialState: initialStateType = { language: "French" }
const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguageToFrench: (state) => {
            state.language = "French";
        },
        changeLanguageToArabic: (state) => {
            state.language = "Arabic";
        }
    }
})

export const { changeLanguageToFrench, changeLanguageToArabic } = languageSlice.actions;
export default languageSlice.reducer;
