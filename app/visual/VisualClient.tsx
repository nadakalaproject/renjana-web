"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VisualClient({ sanityVisualKatalog }: { sanityVisualKatalog: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // State untuk menyimpan URL gambar yang sedang diperbesar di modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const services = [
    { title: "Video Production", desc: "Pembuatan Music Video, After Movie, dan konten video kreatif dari pra hingga pasca produksi." },
    { title: "Photography", desc: "Sesi foto profesional untuk wisuda, profile, dokumentasi, komersial, pre-wedding, dan lain lain." },
    { title: "Graphic Design", desc: "Pembuatan desain sampul album (Artwork), poster acara, dan identitas visual untuk rilisan karya." },
    { title: "Color Grading", desc: "Penyuntingan warna tingkat lanjut agar visual tampil lebih sinematik, hidup, dan berkarakter." }
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
            Visual
          </h1>
          <div className="max-w-3xl text-neutral-400 text-sm md:text-base leading-relaxed">
            <p>
              Divisi Visual Renjana Studio menerjemahkan suara dan cerita ke dalam bentuk rupa yang memukau. Kami berfokus pada estetika gambar yang sinematik dan desain yang berkarakter untuk memperkuat identitas setiap karya.
            </p>
          </div>
        </div>

        {/* SECTION LAYANAN KAMI (SPLIT LAYOUT) */}
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
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Katalog Visual & Dokumentasi</h2>
          
          {sanityVisualKatalog.length === 0 ? (
            <p className="text-neutral-500 text-sm italic">Belum ada karya yang diunggah.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sanityVisualKatalog.map((item: any) => {
                const hasYoutube = item.youtubeUrl ? true : false;
                const imageUrl = item.coverImageUrl || "/images/renjana-logo.jpg";

                return (
                  <div 
                    key={item._id} 
                    className="flex flex-col group cursor-pointer"
                    onClick={() => {
                      if (hasYoutube) {
                        window.open(item.youtubeUrl, "_blank", "noopener,noreferrer");
                      } else {
                        setSelectedImage(imageUrl);
                      }
                    }}
                  >
                    <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden rounded-xl border border-white/10 mb-4">
                      <Image 
                        src={imageUrl} 
                        alt={item.title || "Visual Cover"} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{item.type}</span>
                        {hasYoutube && (
                          <span className="text-[10px] bg-[#c8a15e]/20 text-[#c8a15e] px-2 py-0.5 rounded uppercase font-semibold">Video</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors">{item.title}</h3>
                      <p className="text-neutral-400 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* SECTION CALL TO ACTION */}
        <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-10 md:p-16 text-center flex flex-col items-center justify-center gsap-fade">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c8a15e] mb-4">Mari Utarakan Ide Anda</h2>
          <p className="text-neutral-400 max-w-xl mb-8 leading-relaxed">
            Kami selalu terbuka untuk berkolaborasi dan menerjemahkan visi Anda menjadi karya visual yang luar biasa.
          </p>
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-[#c8a15e] text-[#0a0a0a] font-bold rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>

      </div>

      {/* MODAL POP-UP / LIGHTBOX UNTUK PRATINJAU GAMBAR BESAR */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#c8a15e] text-lg font-bold transition-colors"
            >
              ✕ Tutup
            </button>
            <div className="relative w-full h-full">
              <Image 
                src={selectedImage} 
                alt="Visual Preview" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}