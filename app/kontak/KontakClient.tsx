"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function KontakClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gsap-fade").forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20 flex flex-col items-center text-center gsap-fade">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-[#c8a15e] mb-6">
            Kontak
          </h1>
          <p className="max-w-2xl text-neutral-400 text-sm md:text-base leading-relaxed">
            Punya ide proyek musik, visual, atau tertarik dengan produk merchandise kami? Mari utarakan gagasan Anda dan ciptakan karya luar biasa bersama Renjana Studio.
          </p>
        </div>

        {/* SPLIT LAYOUT KONTAK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 gsap-fade">
          
          {/* KOLOM KIRI: KONTAK UTAMA & WA */}
          <div className="flex flex-col justify-between bg-neutral-900/50 border border-white/10 rounded-2xl p-8 md:p-10">
            <div>
              <span className="text-xs font-bold text-[#c8a15e] uppercase tracking-widest block mb-2">
                Respon Cepat & Bisnis
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Mari Diskusi Langsung
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Kami siap membantu kebutuhan produksi Audio, Visual, maupun pemesanan Merchandise. Silakan hubungi kami melalui saluran terdekat Anda.
              </p>

              <div className="flex flex-col gap-6">
                {/* Email */}
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Email Resmi</span>
                  <a 
                    href="mailto:renjanahouse1@gmail.com" 
                    className="text-lg md:text-xl font-semibold text-white hover:text-[#c8a15e] transition-colors"
                  >
                    renjanahouse1@gmail.com
                  </a>
                </div>

                {/* Nomor WA */}
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">WhatsApp Studio</span>
                  <a 
                    href="https://wa.me/6285259380736" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl font-semibold text-white hover:text-[#c8a15e] transition-colors"
                  >
                    +62 852-5938-0736
                  </a>
                </div>
              </div>
            </div>

            {/* Tombol Langsung WA */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <a 
                href="https://wa.me/6285259380736?text=Halo%20Renjana%20Studio,%20saya%20ingin%20berdiskusi%20mengenai%20proyek/produk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-block text-center py-4 bg-[#c8a15e] text-[#0a0a0a] font-bold rounded-xl hover:bg-white transition-colors"
              >
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>

          {/* KOLOM KANAN: SOSIAL MEDIA & KREATOR */}
          <div className="flex flex-col gap-6">
            
            {/* CARD SOSIAL MEDIA RENJANA */}
            <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8">
              <span className="text-xs font-bold text-[#c8a15e] uppercase tracking-widest block mb-2">
                Kanal Resmi
              </span>
              <h3 className="text-xl font-bold text-white mb-6">Renjana Studio Network</h3>

              <div className="flex flex-col gap-4">
                {/* Instagram Renjana */}
                <a 
                  href="https://www.instagram.com/renjana_renjana/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-neutral-800/50 border border-white/5 rounded-xl hover:border-[#c8a15e]/50 hover:bg-neutral-800 transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-[#c8a15e] transition-colors">Instagram Studio</span>
                    <span className="text-xs text-neutral-400">@renjana_renjana</span>
                  </div>
                  <span className="text-xs text-[#c8a15e] font-bold uppercase">Kunjungi</span>
                </a>

                {/* YouTube Renjana */}
                <a 
                  href="https://www.youtube.com/@RENJANA1402" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-neutral-800/50 border border-white/5 rounded-xl hover:border-[#c8a15e]/50 hover:bg-neutral-800 transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-[#c8a15e] transition-colors">YouTube Channel</span>
                    <span className="text-xs text-neutral-400">@RENJANA1402</span>
                  </div>
                  <span className="text-xs text-[#c8a15e] font-bold uppercase">Kunjungi</span>
                </a>
              </div>
            </div>

            {/* CARD FOUNDER / KREATOR */}
            <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8">
              {/* Warna diubah menjadi text-[#c8a15e] */}
              <span className="text-xs font-bold text-[#c8a15e] uppercase tracking-widest block mb-2">
                Personal Profile
              </span>
              <h3 className="text-xl font-bold text-white mb-4">Jefry Lamariang</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                Terhubung langsung dengan penggagas di balik karya audio dan visual Renjana Studio.
              </p>

              <a 
                href="https://www.instagram.com/jefrylamariang_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-neutral-800/50 border border-white/5 rounded-xl hover:border-[#c8a15e]/50 hover:bg-neutral-800 transition-all group"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white group-hover:text-[#c8a15e] transition-colors">Instagram Founder</span>
                  <span className="text-xs text-neutral-400">@jefrylamariang_</span>
                </div>
                <span className="text-xs text-[#c8a15e] font-bold uppercase">Kunjungi</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}