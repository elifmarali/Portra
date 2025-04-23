import { NextResponse } from "next/server";
import verifyJWTToken from "./lib/auth/verifyJWTToken";

const AUTH_PAGES = ["/login", "/register"];

const ADMIN_PAGES = ["/panel"];

const AUTH_REQUIRED_PAGES = ["/createPortfolio", "/portfolio/:id", "/about"]

const isAuthPages = (pathname) => AUTH_PAGES.includes(page => pathname.startsWith(page));

const isAdminPages = (pathname) => ADMIN_PAGES.includes(pathname);

const isAuthRequiredPages = (pathname) => AUTH_REQUIRED_PAGES.includes(pathname);

export async function middleware(req) {
   const { cookies, nextUrl } = req;

   // Çerezden token'ı al
   const token = cookies.get('token')?.value || null;

   // Token'ı kontrol et (geçerli olup olmadığını)
   const isAuth = token ? await verifyJWTToken(token) : null;
   console.log("hasVerifiedToken : ", isAuth);

   const { pathname } = nextUrl;
   console.log(`pathname ; ${pathname}`)
   // Eğer kullanıcı auth sayfaslarından birine girmeyi deniyorsa
   if (isAuthPages(pathname)) {
      // Daha önceden giriş yaptıysa
      if (!isAuth) {
         return NextResponse.redirect(new URL("/", req.url))
      }
      // Daha önceden giriş yapmadıysa
      return NextResponse.next();  // giriş yapmamışsa auth sayfalarına girmesi doğal
   }

   // Kullanıcı giriş yapmadan Auth zorunlu olan sayfalardan birine girmeye çalışılırsa
   if (isAuthRequiredPages(pathname) && !isAuth) {
      const searchParams = new URLSearchParams(nextUrl.searchParams);
      searchParams.set("next", nextUrl.pathname);

      // Yeni yanıt oluştur ve çerezi sil
      const response = NextResponse.redirect(
         new URL(`/login?${searchParams}`, req.url)
      );
      response.cookies.delete("token");
      return response;
   }

   else if (isAuthRequiredPages(pathname) && isAuth) {
      return NextResponse.next();
   }

   return NextResponse.next();
}