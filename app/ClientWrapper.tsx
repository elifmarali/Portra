"use client";
import { IAuth } from "@/lib/redux/features/auth/authSlice";
import { loadTokenFromCookies } from "@/lib/redux/features/auth/loadTokenFromCookies";
import { selectColor } from "@/lib/redux/features/color/colorSlice";
import { selectTheme } from "@/lib/redux/features/theme/themeSlice";
import { colorOptions } from "@/lists/color";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IAuthState {
  auth: IAuth;
}

function ClientWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const color = useSelector(selectColor);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      // Sadece daha önce yenilenmediyse yenile
      if (!sessionStorage.getItem("reloaded")) {
        sessionStorage.setItem("reloaded", "true");
        window.location.reload();
      }
    } else {
      // Token varsa flag'i temizle, böylece gerektiğinde tekrar yenileme olur
      sessionStorage.removeItem("reloaded");
    }
  }, []);

  useEffect(() => {
    loadTokenFromCookies(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-dark", colorOptions[color].dark);
    root.style.setProperty("--color-light", colorOptions[color].light);
    if (theme === "dark") {
      root.style.setProperty("--color", "#fff");
      root.style.setProperty("--label-color", "#fff");
      root.style.setProperty("--border-color", colorOptions[color].light);
    } else {
      root.style.setProperty("--color", colorOptions[color].dark);
      root.style.setProperty("--label-color", "#403e3e");
      root.style.setProperty("--border-color", "#b4a8a8");
    }
  }, [color, theme]);

  return <>{children}</>;
}

export default ClientWrapper;
