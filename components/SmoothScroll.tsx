"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: any }) {
  const pathname = usePathname();

  // Jika URL depannya "/studio", tampilkan biasa tanpa efek Lenis
  if (pathname && pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}