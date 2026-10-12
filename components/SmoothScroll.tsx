"use client";

// 1. Tambah import ini untuk mengecek halaman aktif
import { usePathname } from "next/navigation"; 
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // 2. Simpan URL halaman saat ini ke dalam variabel
  const pathname = usePathname();

  // 3. Jika URL depannya "/studio", tampilkan konten biasa TANPA efek Lenis
  if (pathname && pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  // Jika di halaman lain, gunakan pengaturan asli milikmu
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}