"use client";
import HomeContainer from "@/containers/HomeContainer";
import { IAuth } from "@/lib/redux/features/auth/authSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadTokenFromCookies } from "@/lib/redux/features/auth/loadTokenFromCookies";

export default function Home() {
  const dispatch = useDispatch();
  const auth: IAuth = useSelector((state: any) => state.auth);
  useEffect(() => {
    loadTokenFromCookies(dispatch)
  }, [])
  useEffect(()=>{
    console.log("auth : " ,auth)
  },[auth])
  return (
    <HomeContainer />
  );
}
