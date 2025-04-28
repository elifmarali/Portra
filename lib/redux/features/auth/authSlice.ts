import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  name?: string | null;
  surname?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
}

const initialState: IAuth = {
  name: null,
  surname: null,
  username: null,
  email: null,
  password: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeToken: (state, action: PayloadAction<string | null>) => {
      if(action.payload!==null){
       const jwtDecode = parseJwt(action.payload);
       state.name=jwtDecode.name;
       state.surname=jwtDecode.surname;
       state.email=jwtDecode.email;
       state.username=jwtDecode.username;
       state.password=jwtDecode.password;
       state.role=jwtDecode.role;
      }
    },
    authRemove : (state) => {
      state.email=null;
      state.name=null;
      state.password=null;
      state.role=null;
      state.username=null;
      state.surname=null;
    }
  },
});

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode hatası:", error);
    return {};
  }
}


export const { changeToken, authRemove } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const currentAuth = (state: { auth: IAuth }) => state.auth;
