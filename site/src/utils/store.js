import { configureStore } from "@reduxjs/toolkit";
import profilReducer from "../features/profil";
import loginReducer from "../features/login";

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = configureStore({
    reducer: {
        profil: profilReducer,
        login: loginReducer
    }
}, reduxDevtools);

export default store;