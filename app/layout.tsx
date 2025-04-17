import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReduxProvider from "./ReduxProvider";
import { ITheme } from "@/lib/redux/interfaces/ITheme";
import { useSelector } from "react-redux";

export const metadata: Metadata = {
  title: "Portra - Kendi Portfolyonu Oluştur ve Paylaş",
  description:
    "Portra ile kendi dijital portfolyonu oluştur, projelerini sergile ve yeteneklerini dünyayla paylaş. Ücretsiz, kolay kullanımlı ve mobil uyumlu portfolyo platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="vsc-initialized" >
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="mainContainer">{children}</main>
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
