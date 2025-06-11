import { NextResponse } from "next/server";
import verifyJWTToken from "./lib/auth/verifyJWTToken";

const AUTH_PAGES = ["/login", "/register"];

const ADMIN_PAGES = ["/panel"];

const AUTH_REQUIRED_PAGES = ["/createPortfolio", "/portfolio/", "/about"]

const isAuthPages = (pathname) => AUTH_PAGES.some(page => pathname.startsWith(page));
const isAuthRequiredPages = (pathname) => AUTH_REQUIRED_PAGES.some(page => pathname.startsWith(page));
const isAdminPages = (pathname) => ADMIN_PAGES.includes(pathname);



export async function middleware(req) {
   const { cookies, nextUrl } = req;
   const token = cookies.get("token")?.value || null;
   const isAuth = token ? await verifyJWTToken(token) : null;

   const { pathname } = nextUrl;

   // 1. Auth sayfasına girmeye çalışan GİRİŞ YAPMIŞ kullanıcı varsa -> yönlendir
   if (isAuthPages(pathname) && isAuth) {
      const nextPath = nextUrl.searchParams.get("next");
      return NextResponse.redirect(new URL(nextPath || "/", req.url));
   }

   // 2. Auth sayfasına girmeye çalışan GİRİŞ YAPMAMIŞ kullanıcı varsa -> izin ver
   if (isAuthPages(pathname) && !isAuth) {
      return NextResponse.next();
   }

   // 3. Giriş yapmadan korumalı sayfaya girmeye çalışan kullanıcı varsa -> login'e yönlendir
   if (isAuthRequiredPages(pathname) && !isAuth) {
      const searchParams = new URLSearchParams(nextUrl.searchParams);
      searchParams.set("next", nextUrl.pathname);
      const response = NextResponse.redirect(
         new URL(`/login?${searchParams}`, req.url)
      );
      response.cookies.delete("token");
      return response;
   }

   // 4. Giriş yapmış ve korumalı sayfalara erişmeye çalışan kullanıcı varsa -> izin ver
   return NextResponse.next();
}
