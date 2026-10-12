"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
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

  return (
    <main className="min-h-screen bg-black font-sans">

      {/* 1. HERO SECTION */}
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

      {/* 2. TENTANG SECTION */}
      <section className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12 relative z-20 flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full mb-12 md:mb-16">

          {/* Bagian Kiri: Judul & Logo */}
          <div className="lg:col-span-5 flex flex-col items-center text-center gsap-fade-up">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-neutral-900 leading-tight mb-6 whitespace-nowrap">
              TENTANG
            </h3>


            <div className="relative w-40 md:w-48 aspect-square overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200">
              <Image
                src="/images/renjana-logo.jpg"
                alt="Renjana Studio Profile"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Bagian Kanan: Teks & Sosial Media */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-start lg:pt-12 gsap-fade-up">
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-4 text-justify">
              Renjana Studio adalah wadah kreatif yang berfokus pada eksplorasi audio dan visual. Kami hadir untuk menerjemahkan ide dan emosi ke dalam karya nyata, mulai dari produksi musik—seperti pembuatan lagu, meracik <i>beat</i>, proses rekaman, hingga tahap mixing.
            </p>
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-8 text-justify">
              Di lini visual, kami mengeksekusi produksi foto dan <i>editing</i> baik itu foto wisuda, foto pre-wedding, foto brand, dan juga desain, tak hanya itu kami juga melayani produksi video, meliputi video musik, konten kreatif, dan berbagai medium visual lainnya. Lebih dari sekadar studio, Renjana juga menghadirkan identitas gaya melalui karya desain dan lini <i>merchandise</i> eksklusif kami.
            </p>

            {/* Tombol Sosial Media */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
              <Link href="https://www.instagram.com/renjana_renjana/" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                <span className="truncate">@renjana</span>
              </Link>
              <Link href="https://www.instagram.com/jefrylamariang_/" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                <span className="truncate">@jefrylamariang_</span>
              </Link>
              <Link href="https://www.youtube.com/@RENJANA1402" target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold text-neutral-800 uppercase tracking-wider truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                <span className="truncate">RENJANA</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Kutipan Tambahan */}
        <div className="w-full text-center gsap-fade-up">
          <p className="font-bold italic text-lg md:text-xl text-neutral-900 tracking-wide">
            "Dari Adonara dan sekarang di Yogyakarta"
          </p>
        </div>
      </section>

      {/* 3. LAYANAN KAMI SECTION */}
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
          <div className="gsap-fade-up bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-[#C5A880]/30 transition-colors duration-500 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-3 text-white">Music Production</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
              Pembuatan lagu, beat, recording, hingga proses mixing untuk memperkuat emosi dan nyawa dari setiap karya suara.
            </p>
            <div className="w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-white/5 relative mb-6 group">
              <video autoPlay loop muted playsInline onClick={toggleMute} title="Klik untuk menyalakan/mematikan suara" className="w-full h-full object-cover cursor-pointer">
                <source src="/videos/musik.mp4" type="video/mp4" />
              </video>
            </div>
            <Link href="/audio" className="mt-auto block w-full py-3.5 text-center bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-[#C5A880] hover:text-black hover:border-[#C5A880] transition-all duration-300">
              Jelajahi Musik
            </Link>
          </div>

          <div className="gsap-fade-up bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-[#C5A880]/30 transition-colors duration-500 flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-3 text-white">Video & Visual</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
              Editing foto, pembuatan video musik, hingga konten kreatif. Kami merangkai momen menjadi cerita yang hidup.
            </p>
            <div className="w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-white/5 relative mb-6 group">
              <video autoPlay loop muted playsInline onClick={toggleMute} title="Klik untuk menyalakan/mematikan suara" className="w-full h-full object-cover cursor-pointer">
                <source src="/videos/video.mp4" type="video/mp4" />
              </video>
            </div>
            <Link href="/visual" className="mt-auto block w-full py-3.5 text-center bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-[#C5A880] hover:text-black hover:border-[#C5A880] transition-all duration-300">
              Lihat Karya Visual
            </Link>
          </div>

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

      {/* 4. MARI BERKOLABORASI SECTION */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10">
        <div className="gsap-fade-up bg-[#0a0a0a] border border-white/5 p-8 md:p-16 rounded-3xl text-center hover:border-[#C5A880]/30 transition-all duration-700">
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-6 text-[#c8a15e]">
            Mari Berkolaborasi
          </h3>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
            Kami selalu terbuka untuk merespons ide kreatif Anda. Mari berdiskusi dan wujudkan karya nyata bersama Renjana Studio.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {/* Tombol WhatsApp */}
            <Link 
              href="https://wa.me/6285259380736" 
              target="_blank" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Hubungi (WA)
            </Link>
            
            {/* Tombol Email */}
            <Link 
              href="mailto:renjanahouse1@gmail.com"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Kirim Email
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}