import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice";
import course from "./course/courseSlice";
import language from "./language/language";
import quiz from './quiz/quizSlice';
import unit from './unit/unitSlice';
import lesson from './lesson/lessonSlice';
import user from './user/userSlice';
import dashboard from './dashboard/dashboard'
import book from './book/bookSlice'
import payment from './payment/paymentSlice'
// import favorite from "./Favorite/favoriteSlice";
// import theme from "./themeSlice/themeSlice";
// import chapters from "./chaptersSlice/chaptersSlice";
// import comments from "./commentsSlice/commentsSlice";
// import categories from "./categorySlice/categorySlice";
// import replies from "./repliesSlice/repliesSlice";
// import users from './usersSlice/userSlice';
// import supervisors from './supervisorSlice/supervisorSlice';
// const rootPersistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["cart", "auth"],
// };
const rootPersistConfig = {
    key: "root",
    storage,
    whitelist: ["language", "theme"],
};

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["userData"],
};


const rootReducer = combineReducers({
    language,
    course,
    quiz,
    unit,
    lesson, payment,
    user,
    dashboard,
    book,
    auth: persistReducer(authPersistConfig, auth),
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
