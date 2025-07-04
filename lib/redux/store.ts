import { configureStore } from "@reduxjs/toolkit";
import { colorReducer } from "./features/color/colorSlice";
import { themeReducer } from "./features/theme/themeSlice";
import { authReducer } from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    color: colorReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
