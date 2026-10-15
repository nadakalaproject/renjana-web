"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Kunci scroll halaman saat sidebar mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Audio", href: "/audio" },
    { name: "Visual", href: "/visual" },
    { name: "Merchandise", href: "/merchandise" },
  ];

  return (
    <>
      {/* NAVBAR HEADER MAIN */}
      <nav className="fixed top-0 left-0 w-full z-40 py-5 px-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo Studio */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/images/renjana-logo.jpg" 
              alt="Renjana Studio Logo" 
              width={120} 
              height={40} 
              className="h-9 w-auto object-contain rounded-sm"
              style={{ width: "auto" }}
            />
            <span className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-white tracking-wide">
              Renjana
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8 items-center text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all duration-300 relative py-1 ${
                    isActive ? "text-[#c8a15e] font-bold" : "text-white hover:text-[#c8a15e]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c8a15e] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Tombol Kontak Desktop */}
          <div className="hidden md:block">
            <Link 
              href="/kontak" 
              className={`text-xs md:text-sm px-5 py-2 rounded-full transition-all duration-300 font-bold ${
                pathname === "/kontak" 
                  ? "bg-[#c8a15e] text-black border border-[#c8a15e]" 
                  : "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black"
              }`}
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Tombol Hamburger Mobile */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-white hover:text-[#c8a15e] focus:outline-none"
            aria-label="Buka Menu Navigasi"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </nav>

      {/* BACKDROP GELAP (Klik area luar untuk menutup) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR DRAWER MOBILE (Geser dari kanan) */}
      <aside 
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#121212] border-l border-white/10 z-50 md:hidden flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header Sidebar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c8a15e]">
              Menu Navigasi
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white text-xl font-bold transition-colors"
              aria-label="Tutup Menu Navigasi"
            >
              ✕
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold transition-colors flex items-center justify-between py-3 px-2 rounded-lg ${
                    isActive ? "text-[#c8a15e] bg-white/5 font-bold" : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#c8a15e]"></span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tombol Kontak & Footer Sidebar */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
          <Link 
            href="/kontak" 
            onClick={() => setIsOpen(false)}
            className={`w-full py-3 text-center text-sm font-bold rounded-xl transition-colors ${
              pathname === "/kontak"
                ? "bg-[#c8a15e] text-black"
                : "bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black"
            }`}
          >
            Hubungi Kami
          </Link>
          <p className="text-[10px] text-neutral-500 text-center uppercase tracking-wider">
            Renjana Studio © 2026
          </p>
        </div>
      </aside>
    </>
  );
}