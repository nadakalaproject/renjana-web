"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Fungsi untuk mengambil ID Video YouTube secara otomatis
const getYoutubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

export default function AudioClient({ sanityAudioKatalog }: { sanityAudioKatalog: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // State menyimpan seluruh data karya yang diklik untuk ditampilkan di Pop-up
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

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
                const hasYoutube = !!item.youtubeUrl;
                const hasUploadedVideo = !!item.videoUploadUrl;
                const hasUploadedAudio = !!item.audioUploadUrl;

                const ytId = hasYoutube ? getYoutubeId(item.youtubeUrl) : null;
                const ytThumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

                // Prioritas gambar: Cover Sanity -> Thumbnail YT -> Kosong jika cuma video -> Logo Renjana
                const imageUrl = item.coverImageUrl || ytThumbnail || (hasUploadedVideo ? null : "/images/renjana-logo.jpg");

                return (
                  <div 
                    key={item._id}
                    onClick={() => setSelectedItem(item)}
                    className="flex flex-col group cursor-pointer"
                  >
                    <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden rounded-xl border border-white/10 mb-4 flex items-center justify-center">
                      {hasUploadedVideo && !item.coverImageUrl && !hasYoutube ? (
                        <video 
                          src={item.videoUploadUrl}
                          className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                          preload="metadata"
                        />
                      ) : (
                        <img 
                          src={imageUrl!} 
                          alt={item.title || "Audio Cover"} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        />
                      )}

                      {/* IKON PLAY SVG */}
                      {(hasYoutube || hasUploadedVideo || hasUploadedAudio) && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/60 w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-sm shadow-lg text-white border border-white/20">
                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                          {item.type || "Audio"}
                        </span>
                        {(hasYoutube || hasUploadedVideo || hasUploadedAudio) && (
                          <span className="text-[10px] bg-[#c8a15e]/20 text-[#c8a15e] px-2 py-0.5 rounded uppercase font-semibold">
                            {hasUploadedAudio ? "Audio" : "Video"}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#c8a15e] transition-colors">{item.title}</h3>
                      <p className="text-neutral-400 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

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

      {/* POP-UP DETAIL KARYA & MEDIA PLAYER */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-50 text-white hover:text-[#c8a15e] bg-black/50 w-10 h-10 flex items-center justify-center rounded-full transition-colors border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            {/* AREA MEDIA KIRI */}
            <div className="w-full md:w-2/3 bg-black flex flex-col items-center justify-center relative min-h-[320px] md:min-h-[500px] p-6">
              {selectedItem.youtubeUrl ? (
                <iframe 
                  src={`https://www.youtube.com/embed/${getYoutubeId(selectedItem.youtubeUrl)}?autoplay=1`} 
                  className="w-full h-full absolute inset-0"
                  allow="autoplay; fullscreen"
                />
              ) : selectedItem.videoUploadUrl ? (
                <video 
                  src={selectedItem.videoUploadUrl} 
                  controls 
                  autoPlay 
                  controlsList="nodownload"
                  poster={selectedItem.coverImageUrl}
                  onCanPlay={(e) => { e.currentTarget.volume = 0.5 }} // Volume awal 50%
                  className="w-full max-h-[85vh] object-contain shadow-2xl bg-black"
                />
              ) : selectedItem.audioUploadUrl ? (
                // TAMPILAN KHUSUS PEMUTAR MP3 + COVER ALBUM
                <div className="flex flex-col items-center justify-center w-full max-w-md gap-6">
                  <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img 
                      src={selectedItem.coverImageUrl || "/images/renjana-logo.jpg"} 
                      alt={selectedItem.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <audio 
                    src={selectedItem.audioUploadUrl} 
                    controls 
                    autoPlay 
                    controlsList="nodownload"
                    onCanPlay={(e) => { e.currentTarget.volume = 0.5 }} // Volume awal 50%
                    className="w-full rounded-full"
                  />
                </div>
              ) : (
                // JIKA HANYA GAMBAR COVER
                <img 
                  src={selectedItem.coverImageUrl || "/images/renjana-logo.jpg"} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              )}
            </div>

            {/* AREA DETAIL TEKS KANAN */}
            <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col overflow-y-auto bg-neutral-900">
              <div className="flex-grow">
                <span className="text-xs font-bold uppercase tracking-widest text-[#c8a15e] mb-2 block">
                  {selectedItem.type || "Audio"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {selectedItem.title}
                </h2>
                <div className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line mb-8">
                  {selectedItem.description || "Tidak ada deskripsi untuk karya ini."}
                </div>
              </div>

              {/* TOMBOL YOUTUBE EKSTRA */}
              {selectedItem.youtubeUrl && (
                <a 
                  href={selectedItem.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#c8a15e] text-black rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-white transition-all shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  Tonton / Dengarkan di YouTube
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </main>
  );
}