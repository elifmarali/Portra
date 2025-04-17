import {configureStore} from "@reduxjs/toolkit";
import { colorReducer } from "./features/color/colorSlice";
import { themeReducer } from "./features/theme/themeSlice";

export const store = configureStore({
    reducer:{
        color:colorReducer,
        theme: themeReducer
    }
})