import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export interface IAuth {
  _id?: ObjectId;
  id: number | null;
  name?: string | null;
  surname?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
  loading: boolean;
  myFavoritePortfolios: [] | string[];
  likePortfolios: [] | string[];
  dislikePortfolios: [] | string[];
}

const initialState: IAuth = {
  id: null,
  name: null,
  surname: null,
  username: null,
  email: null,
  password: null,
  role: null,
  loading: false,
  myFavoritePortfolios: [],
  likePortfolios: [],
  dislikePortfolios: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeToken: (state, action: PayloadAction<string | null>) => {
      if (action.payload !== null) {
        const jwtDecode = parseJwt(action.payload);
        state.id = jwtDecode.id;
        state.name = jwtDecode.name;
        state.surname = jwtDecode.surname;
        state.email = jwtDecode.email;
        state.username = jwtDecode.username;
        state.password = jwtDecode.password;
        state.role = jwtDecode.role;
      }
    },
    authRemove: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.password = null;
      state.role = null;
      state.username = null;
      state.surname = null;
      state.loading = false;
      state.myFavoritePortfolios = [];
      state.likePortfolios = [];
      state.dislikePortfolios = [];
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateFavorites: (state, action: PayloadAction<string[]>) => {
      state.myFavoritePortfolios =
        action.payload !== undefined || action.payload !== null
          ? action.payload
          : [];
      sessionStorage.setItem(
        `favoritePortfolios-${state.id}`,
        JSON.stringify(action.payload)
      );
    },
    updateLikes: (state, action: PayloadAction<string[]>) => {
      state.likePortfolios = action.payload || [];
      sessionStorage.setItem(
        `likesPortfolios-${state.id}`,
        JSON.stringify(action.payload || [])
      );
    },
  },
});

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode hatası:", error);
    return {};
  }
}

export const {
  changeToken,
  authRemove,
  changeLoading,
  updateFavorites,
  updateLikes,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
export const currentAuth = (state: { auth: IAuth }) => state.auth;
