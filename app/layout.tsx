import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Suspense } from "react"; // 1. Tambah import Suspense dari React
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Renjana Studio",
  description: "Music, Video, and Apparel by Renjana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans bg-black text-white antialiased`}>
        {/* 2. Bungkus SmoothScroll dengan Suspense agar usePathname diizinkan Next.js 16 */}
        <Suspense fallback={null}>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </Suspense>
      </body>
    </html>
  );
}