import Cookies from "js-cookie";
import { changeToken } from "./authSlice";

// dispatch'i parametre olarak al
export const loadTokenFromCookies = async (dispatch: any) => {
  const token = Cookies.get("token") || null;
  dispatch(changeToken(token));
};
