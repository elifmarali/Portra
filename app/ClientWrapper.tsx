"use client";
import { IAuth } from "@/lib/redux/features/auth/authSlice";
import { loadTokenFromCookies } from "@/lib/redux/features/auth/loadTokenFromCookies";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IAuthState {
  auth: IAuth;
}

function ClientWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const auth: IAuth = useSelector((state: IAuthState) => state.auth);
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  useEffect(() => {
    loadTokenFromCookies(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-dark", colorOptions[color].dark);
    root.style.setProperty("--color-light", colorOptions[color].light);
    if (theme === "dark") {
      root.style.setProperty("--color", colorOptions[color].light);
      root.style.setProperty("--label-color", colorOptions[color].light);
      root.style.setProperty("--border-color", colorOptions[color].light);
    } else {
      root.style.setProperty("--color", colorOptions[color].dark);
      root.style.setProperty("--label-color", "#342f2f");
      root.style.setProperty("--border-color", "#b4a8a8");
    }
  }, [color, theme]);

  return <>{children}</>;
}

export default ClientWrapper;
