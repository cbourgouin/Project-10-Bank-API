import { configureStore } from "@reduxjs/toolkit";
import profilReducer from "../features/profil";
import loginReducer from "../features/login";
import userPageReducer from "../features/userPage";

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = configureStore({
    reducer: {
        profil: profilReducer,
        login: loginReducer,
        userPage: userPageReducer
    }
}, reduxDevtools);

export default store;