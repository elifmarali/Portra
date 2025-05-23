import Cookies from "js-cookie";
import { authRemove, changeToken } from "./authSlice";
import type { AppDispatch } from "@/lib/redux/store";


// dispatch'i parametre olarak al
export const loadTokenFromCookies = async (dispatch: AppDispatch) => {
  const token = Cookies.get("token") || null;
  dispatch(changeToken(token));
};


export const deleteToken = async (dispatch:AppDispatch) => {
  Cookies.remove("token");
  dispatch(authRemove());
}