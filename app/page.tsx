"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "@/sanity/lib/client";

export default function Home() {
  // 1. State untuk 1 karya terbaru
  const [latestWork, setLatestWork] = useState<any>(null);

  // 2. Fetcher Sanity
  useEffect(() => {
    const fetchLatestWork = async () => {
      try {
        // Mengambil 1 data paling baru ([0])
        const query = `*[_type in ["audio", "visual"]] | order(_createdAt desc)[0] {
          _id,
          _type,
          title,
          "imageUrl": coverImage.asset->url
        }`;

        const data = await client.fetch(query);
        setLatestWork(data);
      } catch (error) {
        console.error("Gagal mengambil data dari Sanity:", error);
      }
    };

    fetchLatestWork();
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

  const togglePiP = async (videoId: string) => {
    const video = document.getElementById(videoId) as HTMLVideoElement;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Gagal membuka Picture-in-Picture:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black font-sans">

      {/* PENAMBAHAN: CSS KHUSUS UNTUK ANIMASI MARQUEE RUNNING TEXT */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}} />

      {/* 1. HERO SECTION (ASLI) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4">
        <div className="absolute z-0 w-full max-w-4xl h-[50vh] md:h-[65vh] overflow-hidden opacity-50 rounded-lg">
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

      {/* 2. TENTANG SECTION (ASLI) */}
      <section className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12 relative z-20 flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full mb-12 md:mb-16">
          <div className="lg:col-span-5 flex flex-col items-center text-center gsap-fade-up">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-neutral-900 leading-tight mb-6 whitespace-nowrap">
              TENTANG
            </h3>
            <div className="relative w-40 md:w-48 aspect-square overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200">
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
              <Link href="https://www.instagram.com/renjana_renjana/" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <span className="truncate">@renjana</span>
              </Link>
              <Link href="https://www.instagram.com/jefrylamariang_/" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <span className="truncate">@jefrylamariang_</span>
              </Link>
              <Link href="https://www.youtube.com/@RENJANA1402" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
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

      {/* 3. LAYANAN KAMI SECTION (ASLI) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="gsap-fade-up flex flex-col items-end text-right w-full mb-16">
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-4 text-[#c8a15e]">
            Layanan Kami
          </h3>
          <p className="text-white/80 max-w-xl text-sm md:text-base leading-relaxed">
            Dedikasi kami terbagi dalam industri kreatif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MUSIC PRODUCTION */}
          <div className="gsap-fade-up bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-[#C5A880]/30 transition-colors duration-500 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-3 text-white">Music Production</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
              Pembuatan lagu, beat, recording, hingga proses mixing untuk memperkuat emosi dan nyawa dari setiap karya suara.
            </p>
            <div className="w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-white/5 relative mb-6 group">
              <video id="video-music" autoPlay loop muted playsInline onClick={toggleMute} title="Klik untuk menyalakan/mematikan suara" className="w-full h-full object-cover cursor-pointer">
                <source src="/videos/musik1.mp4" type="video/mp4" />
              </video>
              <button onClick={() => togglePiP("video-music")} className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:bg-[#c8a15e] hover:text-black" title="Putar Melayang (Picture-in-Picture)">
                Zoom
              </button>
            </div>
            <Link href="/audio" className="mt-auto block w-full py-3.5 text-center bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-[#C5A880] hover:text-black hover:border-[#C5A880] transition-all duration-300">
              Jelajahi Musik
            </Link>
          </div>

          {/* VIDEO & VISUAL */}
          <div className="gsap-fade-up bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-[#C5A880]/30 transition-colors duration-500 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-3 text-white">Video & Visual</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
              Editing foto, pembuatan video musik, hingga konten kreatif. Kami merangkai momen menjadi cerita yang hidup.
            </p>
            <div className="w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-white/5 relative mb-6 group">
              <video id="video-visual" autoPlay loop muted playsInline onClick={toggleMute} title="Klik untuk menyalakan/mematikan suara" className="w-full h-full object-cover cursor-pointer">
                <source src="/videos/video1.mp4" type="video/mp4" />
              </video>
              <button onClick={() => togglePiP("video-visual")} className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:bg-[#c8a15e] hover:text-black" title="Putar Melayang (Picture-in-Picture)">
                Zoom
              </button>
            </div>
            <Link href="/visual" className="mt-auto block w-full py-3.5 text-center bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-[#C5A880] hover:text-black hover:border-[#C5A880] transition-all duration-300">
              Lihat Karya Visual
            </Link>
          </div>

          {/* MERCHANDISE */}
          <div className="gsap-fade-up bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-[#C5A880]/30 transition-colors duration-500 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-3 text-white">Merchandise</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
              Desain katalog dan lini pakaian eksklusif yang merepresentasikan identitas gaya Renjana.
            </p>
            <div className="w-full aspect-video rounded-xl relative group mb-6">
              <div className="absolute top-0 right-0 w-[70%] h-[90%] rounded-xl overflow-hidden border border-white/10 z-0 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500">
                <Image src="/images/baju2.jpg" alt="Baju 2" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 w-[75%] h-[90%] rounded-xl overflow-hidden border-2 border-[#0a0a0a] z-10 shadow-2xl group-hover:translate-y-2 group-hover:-translate-x-2 transition-transform duration-500">
                <Image src="/images/baju1.jpg" alt="Baju 1" fill className="object-cover" />
              </div>
            </div>
            <Link href="/merchandise" className="mt-auto block w-full py-3.5 text-center bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-[#C5A880] hover:text-black hover:border-[#C5A880] transition-all duration-300">
              Katalog Merchandise
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SNEAK PEEK / BENTO BOX - (SECTION BARU) */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 gsap-fade-up">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-[#c8a15e]">Karya Terbaru</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px] gsap-fade-up">

          {/* BOX KIRI (STATIS) - Ruang Kreatif Kami */}
          <div className="md:col-span-8 bg-[#0a0a0a] rounded-3xl overflow-hidden relative group border border-white/5">
            <Image src="/images/renjana-logo.jpg" alt="Studio" fill className="object-cover opacity-30 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
              <h3 className="text-2xl font-bold text-white relative z-10">Ruang Kreatif Kami</h3>
            </div>
          </div>

          {/* BOX KANAN (DINAMIS) - 1 Karya Terbaru dari Sanity */}
          <div className="md:col-span-4 bg-[#c8a15e] rounded-3xl overflow-hidden relative p-8 flex flex-col justify-between group">
            {latestWork ? (
              <>
                {/* Background image dari Sanity (Jika diunggah) */}
                {latestWork.imageUrl && (
                  <Image
                    src={latestWork.imageUrl}
                    alt={latestWork.title || 'Karya Renjana'}
                    fill
                    className="object-cover opacity-20 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 z-0"
                  />
                )}

                <div className="relative z-10">
                  <span className="text-black font-black uppercase text-xs tracking-widest border border-black/20 px-3 py-1 rounded-full">Terbaru</span>
                  <h3 className="text-2xl font-black text-black mt-4">
                    {latestWork.title || "Karya Tanpa Judul"}
                  </h3>
                </div>

                <Link href={`/${latestWork._type}`} className="relative z-10 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  ↗
                </Link>
              </>
            ) : (
              // Loading state saat data sedang ditarik
              <div className="flex items-center justify-center h-full text-black/50 font-bold">
                Memuat...
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 6. RUNNING TEXT (MARQUEE) - (SECTION BARU) */}
      <section className="w-full py-6 md:py-8 bg-[#c8a15e] text-black overflow-hidden border-y-4 border-white my-10">
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee flex items-center gap-8 md:gap-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-12 shrink-0">
                <span className="text-3xl md:text-5xl font-black uppercase tracking-widest">Music Production</span>
                <span className="text-3xl md:text-5xl">✦</span>
                <span className="text-3xl md:text-5xl font-black uppercase tracking-widest outline-text opacity-70">Visual Arts</span>
                <span className="text-3xl md:text-5xl">✦</span>
                <span className="text-3xl md:text-5xl font-black uppercase tracking-widest">Exclusive Merchandise</span>
                <span className="text-3xl md:text-5xl">✦</span>
                <span className="text-3xl md:text-5xl font-black uppercase tracking-widest outline-text opacity-70">Creative Studio</span>
                <span className="text-3xl md:text-5xl">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MARI BERKOLABORASI SECTION (ASLI) */}
      <section className="py-10 px-6 md:px-12 max-w-5xl mx-auto mb-10">
        <div className="gsap-fade-up bg-neutral-900/60 border border-white/5 p-8 md:p-16 rounded-[2.5rem] text-center hover:border-[#C5A880]/30 transition-all duration-700 relative overflow-hidden">
          {/* Latar Belakang Dekoratif CTA */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#c8a15e]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#c8a15e]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-6 text-[#c8a15e]">
              Mari Berkolaborasi
            </h3>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
              Kami selalu terbuka untuk merespons ide kreatif Anda. Mari duduk bersama berdiskusi dan wujudkan karya nyata bersama Renjana Studio.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link href="https://wa.me/6285259380736" target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#c8a15e] text-black rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-all duration-300 shadow-lg shadow-[#c8a15e]/20">
                Chat via WA
              </Link>
              <Link href="mailto:renjanahouse1@gmail.com" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-300">
                Kirim Email
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}