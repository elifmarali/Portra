import {configureStore} from "@reduxjs/toolkit";
import { colorReducer } from "./features/color/colorSlice";
import { themeReducer } from "./features/theme/themeSlice";
import { authReducer } from "./features/auth/authSlice";
import { portfolioCurrentPageReducer } from "./features/portfolioCurrentPage/portfolioCurrentPageSlice";

export const store = configureStore({
    reducer:{
        color:colorReducer,
        theme: themeReducer,
        auth: authReducer,  
        portfolioCurrentPage : portfolioCurrentPageReducer      
    }
})