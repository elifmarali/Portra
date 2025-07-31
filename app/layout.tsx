import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReduxProvider from "./ReduxProvider";
import ClientWrapper from "./ClientWrapper";
import { currentFont } from "@/lib/fonts";

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
    <html lang="en" className={currentFont.className}>
      <body className="vsc-initialized" >
        <ReduxProvider>
          <ClientWrapper>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="mainContainer">{children}</main>
              <Footer />
            </div>
          </ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
