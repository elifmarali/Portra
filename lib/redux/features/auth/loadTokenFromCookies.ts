import Cookies from "js-cookie";
import { authRemove, changeToken } from "./authSlice";

// dispatch'i parametre olarak al
export const loadTokenFromCookies = async (dispatch: any) => {
  const token = Cookies.get("token") || null;
  dispatch(changeToken(token));
};


export const deleteToken = async (dispatch: any) => {
  Cookies.remove("token");
  dispatch(authRemove());
}