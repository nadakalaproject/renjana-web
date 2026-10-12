"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AudioClient({ sanityAudioKatalog }: { sanityAudioKatalog: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    { title: "Music Production", desc: "Pembuatan aransemen dan komposisi musik orisinal dari awal hingga tahap akhir." },
    { title: "Recording", desc: "Sesi rekaman vokal dan instrumen dengan standar kualitas studio profesional." },
    { title: "Beatmaking", desc: "Pembuatan beat kustom dan penyediaan beat siap pakai (Beat for Sale) untuk berbagai genre." },
    { title: "Mixing & Mastering", desc: "Penyempurnaan frekuensi, dinamika, dan kejernihan audio agar karya siap dirilis ke publik." }
  ];

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
        
        {/* HEADER & DESKRIPSI */}
        <div className="mb-20 flex flex-col items-center text-center gsap-fade">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-[#c8a15e] mb-12">
            Audio
          </h1>
          <div className="max-w-3xl text-neutral-400 text-sm md:text-base leading-relaxed">
            <p>
              Renjana Studio memproduksi karya musik orisinal yang mengeksplorasi resonansi emosi dan ritme. Kami bereksperimen dengan berbagai genre untuk menghasilkan karakter suara yang khas.
            </p>
          </div>
        </div>

        {/* SECTION LAYANAN KAMI */}
        {/* Di sini aku ubah margin bawahnya menjadi mb-32 dan md:mb-40 untuk jarak ekstra */}
        <div className="mb-32 md:mb-40 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 gsap-fade">
          
          <div className="lg:w-1/3 shrink-0 w-full flex lg:justify-start justify-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
              Layanan Kami
            </h2>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {services.map((service, idx) => (
              <div key={idx} className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 hover:border-[#c8a15e]/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          
        </div>

        {/* SECTION KATALOG */}
        <div className="mb-24 gsap-fade">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Katalog Arsip & Produksi</h2>
          
          {sanityAudioKatalog.length === 0 ? (
            <p className="text-neutral-500 text-sm italic">Belum ada karya yang diunggah.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sanityAudioKatalog.map((item: any) => {
                const isClickable = item.youtubeUrl ? true : false;
                const CardWrapper = isClickable ? Link : "div";
                const linkProps = isClickable ? { href: item.youtubeUrl, target: "_blank", rel: "noopener noreferrer" } : {};

                return (
                  <CardWrapper 
                    key={item._id} 
                    {...linkProps} 
                    className={`flex flex-col group ${isClickable ? "cursor-pointer" : ""}`}
                  >
                    <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden rounded-xl border border-white/10 mb-4">
                      <Image 
                        src={item.coverImageUrl || "/images/renjana-logo.jpg"} 
                        alt={item.title || "Audio Cover"} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{item.type}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors">{item.title}</h3>
                      <p className="text-neutral-400 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </CardWrapper>
                )
              })}
            </div>
          )}
        </div>

        {/* SECTION CALL TO ACTION */}
        <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-10 md:p-16 text-center flex flex-col items-center justify-center gsap-fade">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c8a15e] mb-4">Mari Utarakan Ide Anda</h2>
          <p className="text-neutral-400 max-w-xl mb-8 leading-relaxed">
            Kami selalu terbuka untuk berkolaborasi dan menerjemahkan visi Anda menjadi karya audio yang luar biasa.
          </p>
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-[#c8a15e] text-[#0a0a0a] font-bold rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>

      </div>
    </main>
  );
}