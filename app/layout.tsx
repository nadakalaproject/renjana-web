import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Suspense } from "react"; 
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
  title: {
    default: "Renjana Studio | Music, Visual, and Apparel",
    template: "%s | Renjana Studio"
  },
  description: "Renjana Studio melayani jasa profesional untuk music producer, mixing, beat making, fotografi (termasuk foto outdoor), video making, hingga video editor. Temukan karya audio, visual, dan merchandise terbaik kami.",
  keywords: [
    "musik produser", 
    "mixing", 
    "mastering", 
    "beat maker", 
    "fotografi", 
    "foto outdoor", 
    "video making", 
    "video editor", 
    "renjana studio",
    "jasa video",
    "jasa audio"
  ],
  icons: {
    icon: "/images/renjana-logo.jpg",
    shortcut: "/images/renjana-logo.jpg",
    apple: "/images/renjana-logo.jpg",
  },
  openGraph: {
    title: "Renjana Studio | Creative House",
    description: "Melayani jasa music producer, mixing, fotografi, foto outdoor, dan video making profesional.",
    url: "https://renjanastudio.com",
    siteName: "Renjana Studio",
    locale: "id_ID",
    type: "website",
  },
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