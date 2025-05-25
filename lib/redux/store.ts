import { configureStore } from "@reduxjs/toolkit";
import { colorReducer } from "./features/color/colorSlice";
import { themeReducer } from "./features/theme/themeSlice";
import { authReducer } from "./features/auth/authSlice";
import { portfolioCurrentPageReducer } from "./features/portfolioCurrentPage/portfolioCurrentPageSlice";
import { createPortfolioReducer } from "./features/createPortfolio/createPortfolioSlice";

export const store = configureStore({
  reducer: {
    color: colorReducer,
    theme: themeReducer,
    auth: authReducer,
    portfolioCurrentPage: portfolioCurrentPageReducer,
    createPortfolio: createPortfolioReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
