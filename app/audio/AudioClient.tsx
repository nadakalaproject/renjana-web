"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AudioClient({ sanityAudioKatalog }: { sanityAudioKatalog: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    { title: "Music Production", desc: "Pembuatan aransemen, komposisi musik, dan produksi audio dari ide mentah hingga lagu utuh." },
    { title: "Recording & Tracking", desc: "Sesi perekaman vokal dan instrumen profesional dengan standar peralatan industri studio." },
    { title: "Mixing & Mastering", desc: "Penyelarasan frekuensi, dinamika audio, dan proses akhir agar karya musik siap rilis di semua platform." },
    { title: "Jingle & Scoring", desc: "Pembuatan musik komersial untuk iklan, podcast, jingle media, hingga penataan musik latar film/video." }
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
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-[#c8a15e] mb-8">
            Audio
          </h1>
          <div className="max-w-3xl text-neutral-400 text-sm md:text-base leading-relaxed">
            <p>
              Divisi Audio Renjana Studio berfokus pada penciptaan identitas suara yang kuat dan berkarakter. Kami memadukan eksplorasi musikalitas dengan standar produksi teknis untuk menghasilkan karya audio yang berjiwa.
            </p>
          </div>
        </div>

        {/* SECTION LAYANAN KAMI */}
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

        {/* SECTION KATALOG AUDIO */}
        <div className="mb-24 gsap-fade">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Katalog Karya Audio</h2>
          
          {sanityAudioKatalog.length === 0 ? (
            <p className="text-neutral-500 text-sm italic">Belum ada karya yang diunggah.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sanityAudioKatalog.map((item: any) => {
                const coverImg = item.coverImageUrl || "/images/renjana-logo.jpg";
                const hasLink = Boolean(item.youtubeUrl);

                const cardContent = (
                  <>
                    <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden rounded-xl border border-white/10 mb-4">
                      <Image 
                        src={coverImg} 
                        alt={item.title || "Audio Cover"} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{item.genre || "Audio"}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#c8a15e] transition-colors">{item.title}</h3>
                      <p className="text-neutral-400 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </>
                );

                return hasLink ? (
                  <a 
                    key={item._id}
                    href={item.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col group cursor-pointer"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div key={item._id} className="flex flex-col group">
                    {cardContent}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      {/* SECTION CALL TO ACTION */}
      <section className="py-10 px-6 md:px-12 max-w-5xl mx-auto mb-10">
        <div className="gsap-fade bg-neutral-900/60 border border-white/5 p-8 md:p-16 rounded-[2.5rem] text-center hover:border-[#C5A880]/30 transition-all duration-700 relative overflow-hidden mt-10">
          {/* Latar Belakang Dekoratif CTA */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#c8a15e]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#c8a15e]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-6 text-[#c8a15e]">
              Mari Utarakan Ide Anda
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
              Punya proyek musik atau audio yang ingin diwujudkan? Kami siap berdiskusi dan membantu merealisasikannya.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link 
                href="/kontak" 
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#c8a15e] text-black rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-all duration-300 shadow-lg shadow-[#c8a15e]/20"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}