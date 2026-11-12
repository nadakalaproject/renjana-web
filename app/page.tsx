"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "@/sanity/lib/client";

export default function Home() {
  const [latestWork, setLatestWork] = useState<any>(null);
  const [allWorks, setAllWorks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryLatest = `*[_type in ["audio", "visual"]] | order(_createdAt desc)[0] {
          _id,
          _type,
          title,
          "imageUrl": coverImage.asset->url
        }`;
        
        const queryAll = `*[_type in ["audio", "visual"]] | order(_createdAt desc)[0...16] {
          _id,
          _type,
          title,
          "imageUrl": coverImage.asset->url
        }`;

        const [latest, all] = await Promise.all([
          client.fetch(queryLatest),
          client.fetch(queryAll)
        ]);

        setLatestWork(latest);
        setAllWorks(all);
      } catch (error) {
        console.error("Gagal mengambil data dari Sanity:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.utils.toArray(".gsap-fade-up").forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const toggleMute = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.muted = !video.muted;
  };

  const validWorks = allWorks.filter((item) => item.imageUrl);

  return (
    <main className="min-h-screen bg-black font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slide-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slide-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        .animate-slide-left {
          display: flex;
          width: max-content;
          animation: slide-left 35s linear infinite;
        }
        .animate-slide-right {
          display: flex;
          width: max-content;
          animation: slide-right 35s linear infinite;
        }
        .animate-slide-left:hover, .animate-slide-right:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4">
        <div className="absolute z-0 w-full max-w-4xl h-[50vh] md:h-[65vh] overflow-hidden opacity-50">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/renjana-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <h2 className="hero-elem text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4 text-neutral-400">
            Karya Suara, Visual & Gaya
          </h2>
          <h1 className="hero-elem text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider mb-6 text-[#c8a15e] drop-shadow-lg">
            Renjana Studio
          </h1>
          <p className="hero-elem max-w-lg text-neutral-300 mb-10 text-sm md:text-base leading-relaxed">
            Menyajikan harmoni melalui komposisi musik, arahan visual sinematik, dan desain katalog pakaian yang merepresentasikan seni.
          </p>
        </div>
      </section>

      {/* 2. TENTANG SECTION */}
      <section className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12 relative z-20 flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full mb-12 md:mb-16">
          <div className="lg:col-span-5 flex flex-col items-center text-center gsap-fade-up">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-neutral-900 leading-tight mb-6 whitespace-nowrap">
              TENTANG
            </h3>
            <div className="relative w-40 md:w-48 aspect-square overflow-hidden bg-neutral-100 border border-neutral-200">
              <Image src="/images/renjana-logo.jpg" alt="Renjana Studio Profile" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-start lg:pt-12 gsap-fade-up">
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-4 text-justify">
              Renjana Studio adalah wadah kreatif yang berfokus pada eksplorasi audio dan visual. Kami hadir untuk menerjemahkan ide dan emosi ke dalam karya nyata, mulai dari produksi musik—seperti pembuatan lagu, meracik <i>beat</i>, proses rekaman, hingga tahap mixing.
            </p>
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-8 text-justify">
              Di lini visual, kami mengeksekusi produksi foto dan <i>editing</i> baik itu foto wisuda, foto pre-wedding, foto brand, dan juga desain, tak hanya itu kami juga melayani produksi video, meliputi video musik, konten kreatif, dan berbagai medium visual lainnya. Lebih dari sekadar studio, Renjana juga menghadirkan identitas gaya melalui karya desain dan lini <i>merchandise</i> eksklusif kami.
            </p>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
              <Link href="https://www.instagram.com/renjana_renjana/" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <span className="truncate">@renjana</span>
              </Link>
              <Link href="https://www.instagram.com/jefrylamariang_/" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <span className="truncate">@jefrylamariang_</span>
              </Link>
              <Link href="https://www.youtube.com/@RENJANA1402" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <span className="truncate">RENJANA</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full text-center gsap-fade-up">
          <p className="font-bold italic text-lg md:text-xl text-neutral-900 tracking-wide">
            "Dari Adonara dan sekarang di Yogyakarta"
          </p>
        </div>
      </section>

      {/* 3. LAYANAN KAMI SECTION (Visual & Teks Overlay) */}
      <section className="pt-24 pb-8 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="gsap-fade-up mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-4 text-[#c8a15e]">
              Layanan Kami
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed">
              Jelajahi berbagai dedikasi karya kami yang mendemonstrasikan komitmen pada estetika, inovasi, dan kualitas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* KOLOM KIRI: Music Production */}
          <div className="gsap-fade-up relative w-full h-[500px] xl:h-[650px] overflow-hidden bg-neutral-900 group">
            <video autoPlay loop muted playsInline onClick={toggleMute} title="Klik untuk suara" className="absolute inset-0 w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700">
              <source src="/videos/musik1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-8 left-6 right-6 pointer-events-none">
              <h4 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-md">Music Production</h4>
            </div>
          </div>

          {/* KOLOM TENGAH: Design & Merchandise */}
          <div className="flex flex-col gap-6 md:gap-8 h-[500px] xl:h-[650px]">
            {/* Design */}
            <div className="gsap-fade-up relative flex-1 w-full overflow-hidden bg-neutral-900 group">
              <Image src="/images/baju1.jpg" alt="Design" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <h4 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">Design</h4>
              </div>
            </div>

            {/* Merchandise */}
            <div className="gsap-fade-up relative flex-1 w-full overflow-hidden bg-neutral-900 group">
              <Image src="/images/baju2.jpg" alt="Merchandise" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <h4 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">Merchandise</h4>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Video & Visual */}
          <div className="gsap-fade-up relative w-full h-[500px] xl:h-[650px] overflow-hidden bg-neutral-900 group">
            <video autoPlay loop muted playsInline onClick={toggleMute} title="Klik untuk suara" className="absolute inset-0 w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700">
              <source src="/videos/video1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-8 left-6 right-6 pointer-events-none">
              <h4 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-md">Video & Visual</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 RANGKUMAN LAYANAN (CARD PENJELASAN) */}
      <section className="pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Card Music */}
          <div className="gsap-fade-up bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#c8a15e]">Music Production</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
              Pembuatan lagu, beat, recording, hingga proses mixing. Pengalaman audio yang dirancang khusus untuk memperkuat pesan dan emosi.
            </p>
            <Link href="/audio" className="w-max text-white font-bold text-sm hover:text-[#c8a15e] transition-colors duration-300 flex items-center gap-2">
              JELAJAHI MUSIK 
            </Link>
          </div>

          {/* Card Design & Merch */}
          <div className="gsap-fade-up bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#c8a15e]">Design & Merchandise</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
              Identitas gaya dan statement pelengkap dari katalog kami. Eksklusif T-Shirt dan aksesoris dengan desain visual khas Renjana.
            </p>
            <Link href="/merchandise" className="w-max text-white font-bold text-sm hover:text-[#c8a15e] transition-colors duration-300 flex items-center gap-2">
              KATALOG MERCH
            </Link>
          </div>

          {/* Card Visual */}
          <div className="gsap-fade-up bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#c8a15e]">Video & Visual</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
              Editing foto, pembuatan video musik, hingga konten kreatif. Kami merangkai momen menjadi cerita yang hidup dengan sinematografi tajam.
            </p>
            <Link href="/visual" className="w-max text-white font-bold text-sm hover:text-[#c8a15e] transition-colors duration-300 flex items-center gap-2">
              LIHAT KARYA VISUAL
            </Link>
          </div>

        </div>
      </section>

      {/* 4. SNEAK PEEK / KARYA TERBARU */}
      <section className="py-16 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-12 gsap-fade-up">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-[#c8a15e]">Karya Terbaru</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[400px] gsap-fade-up">

          {/* BOX KIRI (STATIS) */}
          <div className="md:col-span-8 bg-[#0a0a0a] overflow-hidden relative group border border-white/10">
            <Image src="/images/renjana-logo.jpg" alt="Studio" fill className="object-cover opacity-30 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
              <h3 className="text-2xl font-bold text-white relative z-10">Ruang Kreatif Kami</h3>
            </div>
          </div>

          {/* BOX KANAN (DINAMIS) */}
          <div className="md:col-span-4 bg-[#c8a15e] overflow-hidden relative p-8 flex flex-col justify-between group">
            {latestWork ? (
              <>
                {latestWork.imageUrl && (
                  <Image
                    src={latestWork.imageUrl}
                    alt={latestWork.title || 'Karya Renjana'}
                    fill
                    className="object-cover opacity-20 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 z-0"
                  />
                )}
                <div className="relative z-10">
                  <span className="text-black font-black uppercase text-xs tracking-widest border border-black/20 px-3 py-1">Terbaru</span>
                  <h3 className="text-2xl font-black text-black mt-4">
                    {latestWork.title || "Karya Tanpa Judul"}
                  </h3>
                </div>
                <Link href={`/${latestWork._type}`} className="relative z-10 w-12 h-12 bg-black flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  ↗
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-black/50 font-bold">
                Memuat...
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. OUR WORK SLIDER */}
      <section className="py-20 overflow-hidden relative border-t border-white/10">
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 gsap-fade-up">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-[#c8a15e]">Galeri</h2>
            <p className="text-neutral-400 text-sm mt-2">Kompilasi dokumentasi visual dan audio terbaru kami.</p>
          </div>
          <Link href="/visual" className="px-8 py-3 bg-white text-black font-bold text-sm hover:bg-[#c8a15e] transition-colors w-max">
            See Details 
          </Link>
        </div>

        {validWorks.length > 0 ? (
          <div className="flex flex-col gap-4 mt-12 w-full">
            <div className="w-full overflow-hidden flex">
              <div className="animate-slide-left gap-4">
                {[...validWorks, ...validWorks, ...validWorks].map((item, index) => (
                  <div key={`top-${index}`} className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] shrink-0 relative overflow-hidden group bg-neutral-900">
                    <Image 
                      src={item.imageUrl}
                      alt={item.title} 
                      fill 
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full overflow-hidden flex">
              <div className="animate-slide-right gap-4">
                {[...validWorks, ...validWorks, ...validWorks].map((item, index) => (
                  <div key={`bottom-${index}`} className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] shrink-0 relative overflow-hidden group bg-neutral-900">
                    <Image 
                      src={item.imageUrl}
                      alt={item.title} 
                      fill 
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-neutral-500 text-sm italic py-10">Memuat katalog...</p>
        )}
      </section>

      {/* SECTION CALL TO ACTION */}
      <section className="py-10 px-6 md:px-12 max-w-5xl mx-auto mb-10">
        <div className="gsap-fade bg-neutral-900/60 border border-white/5 p-8 md:p-16 rounded-[2.5rem] text-center hover:border-[#C5A880]/30 transition-all duration-700 relative overflow-hidden mt-10">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#c8a15e]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#c8a15e]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-6 text-[#c8a15e]">
              Mari Utarakan Ide Anda
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
              Kami selalu terbuka untuk merespons ide kreatif Anda. Mari duduk bersama berdiskusi dan wujudkan karya nyata bersama Renjana Studio.
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
    </main>
  );
}