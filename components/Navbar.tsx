"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Daftar menu navigasi utama
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Audio", href: "/audio" },
    { name: "Visual", href: "/visual" },
    { name: "Merchandise", href: "/merchandise" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Gambar dan Teks Bersampingan */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image 
            src="/images/renjana-logo.jpg" 
            alt="Renjana Studio Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto object-contain rounded-sm"
            style={{ width: "auto" }}
          />
          <span className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-white tracking-wide">
            Renjana
          </span>
        </Link>

        {/* Menu Links Utama dengan Indikator Aktif */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 relative py-1 ${
                  isActive
                    ? "text-[#c8a15e] font-bold"
                    : "text-white hover:text-[#c8a15e]"
                }`}
              >
                {link.name}
                {/* Garis bawah penanda aktif */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c8a15e] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Tombol Kontak (Berubah Gaya Saat Aktif) */}
        {(() => {
          const isKontakActive = pathname === "/kontak";
          return (
            <Link 
              href="/kontak" 
              className={`text-xs md:text-sm px-5 py-2 rounded-full transition-all duration-300 font-bold ${
                isKontakActive 
                  ? "bg-[#c8a15e] text-black border border-[#c8a15e]" 
                  : "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black"
              }`}
            >
              Hubungi Kami
            </Link>
          );
        })()}

      </div>
    </nav>
  );
}