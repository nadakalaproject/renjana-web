"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MerchandiseClient({ sanityMerchKatalog }: { sanityMerchKatalog: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  // State untuk pratinjau foto ukuran penuh (fullscreen)
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);

  const steps = [
    { 
      step: "01", 
      title: "Pilih Produk", 
      desc: "Jelajahi etalase produk merchandise orisinal Renjana Studio dan pilih item yang Anda minati." 
    },
    { 
      step: "02", 
      title: "Konfirmasi via WA", 
      desc: "Klik produk untuk menghubungi WhatsApp kami. Tanyakan ketersediaan stok, dan detail produk." 
    },
    { 
      step: "03", 
      title: "Pembayaran & Kirim", 
      desc: "Lakukan transaksi sesuai arahan admin dan produk siap dikirimkan langsung ke alamat Anda." 
    }
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

  const getWaLink = (productName?: string) => {
    const phone = "6285259380736";
    const text = productName 
      ? `Halo Renjana Studio, saya berminat membeli merchandise: *${productName}*. Apakah stok masih tersedia?`
      : `Halo Renjana Studio, saya berminat membeli merchandise Anda. Boleh minta informasi produk dan stoknya?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & DESKRIPSI */}
        <div className="mb-20 flex flex-col items-center text-center gsap-fade">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-[#c8a15e] mb-8">
            Merchandise
          </h1>
          <div className="max-w-3xl text-neutral-400 text-sm md:text-base leading-relaxed">
            <p>
              Rilisan barang cetak dan sandang resmi dari Renjana Studio. Dirancang khusus dengan estetika visual khas studio untuk melengkapi gaya dan karya harian Anda.
            </p>
          </div>
        </div>

        {/* SECTION TAHAP PEMBELIAN */}
        <div className="mb-32 md:mb-40 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 gsap-fade">
          <div className="lg:w-1/3 shrink-0 w-full flex lg:justify-start justify-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
              Cara Pemesanan
            </h2>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 relative">
                <span className="text-xs font-black text-[#c8a15e] tracking-widest uppercase mb-2 block">
                  Tahap {item.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION KATALOG MERCHANDISE */}
        <div className="mb-24 gsap-fade">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-4 gap-2">
            <h2 className="text-2xl font-bold text-white">Etalase Produk</h2>
            <p className="text-xs text-[#c8a15e] font-medium tracking-wide flex items-center gap-1.5">
              <span>💡</span> Klik gambar produk untuk melihat foto lengkap & detail ukuran
            </p>
          </div>
          
          {!sanityMerchKatalog || sanityMerchKatalog.length === 0 ? (
            <p className="text-neutral-500 text-sm italic">Belum ada produk merchandise yang diunggah.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {sanityMerchKatalog.map((item: any) => {
                const images = item.images || [];
                const coverImg = images.length > 0 ? images[0] : "/images/renjana-logo.jpg";
                const secondImg = images.length > 1 ? images[1] : null;

                return (
                  <div 
                    key={item._id} 
                    className="flex flex-col group cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item);
                      setActiveImgIndex(0);
                    }}
                  >
                    <div className="relative w-full aspect-square mb-4 pt-2 pr-2">
                      {secondImg && (
                        <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-3 rounded-xl overflow-hidden border border-white/10 bg-neutral-800 opacity-60 group-hover:rotate-6 group-hover:translate-x-3 transition-all duration-500">
                          <Image 
                            src={secondImg} 
                            alt="Secondary View" 
                            fill 
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="relative z-10 w-full h-full bg-neutral-900 overflow-hidden rounded-xl border border-white/10">
                        <Image 
                          src={coverImg} 
                          alt={item.title || "Merch Cover"} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        />
                        {item.status && (
                          <span className="absolute top-3 right-3 z-20 bg-black/80 backdrop-blur-md text-[#c8a15e] text-[10px] font-bold uppercase px-2.5 py-1 rounded border border-[#c8a15e]/30">
                            {item.status}
                          </span>
                        )}
                        {images.length > 1 && (
                          <span className="absolute bottom-3 left-3 z-20 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded border border-white/10">
                            +{images.length - 1} foto
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 z-10">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#c8a15e] transition-colors">{item.title}</h3>
                      <p className="text-[#c8a15e] text-sm font-semibold">{item.price}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* SECTION CALL TO ACTION WA */}
        <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-10 md:p-16 text-center flex flex-col items-center justify-center gsap-fade">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c8a15e] mb-4">
            Apakah Anda berminat membeli merchandise kami?
          </h2>
          <p className="text-neutral-400 max-w-xl mb-8 leading-relaxed">
            Pesan sekarang melalui WhatsApp resmi kami. Tim kami siap memberikan informasi detail mengenai produk, pembayaran, dan pengiriman.
          </p>
          <a 
            href={getWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#c8a15e] text-[#0a0a0a] font-bold rounded-full hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
          >
            Pesan Sekarang via WA
          </a>
        </div>

      </div>

      {/* MODAL DETAIL PRODUK */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => {
            setSelectedProduct(null);
            setIsFullImageOpen(false);
          }}
        >
          <div 
            className="bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => {
                setSelectedProduct(null);
                setIsFullImageOpen(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl font-bold z-10"
            >
              ✕
            </button>

            {/* SISI KIRI: Foto Utama (Bisa Diklik ke Fullscreen) & Thumbnail */}
            <div className="md:w-1/2 flex flex-col gap-4">
              <div 
                className="relative w-full aspect-square bg-neutral-900 rounded-xl overflow-hidden border border-white/10 cursor-zoom-in group"
                onClick={() => setIsFullImageOpen(true)}
              >
                <Image 
                  src={selectedProduct.images?.[activeImgIndex] || "/images/renjana-logo.jpg"} 
                  alt={selectedProduct.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                  Perbesar Foto
                </span>
              </div>

              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedProduct.images.map((imgUrl: string, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border ${activeImgIndex === idx ? "border-[#c8a15e]" : "border-white/10 opacity-60 hover:opacity-100"}`}
                    >
                      <Image 
                        src={imgUrl} 
                        alt="Thumbnail" 
                        fill 
                        sizes="64px"
                        className="object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SISI KANAN: Detail & Beli */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c8a15e] block mb-1">
                  {selectedProduct.status}
                </span>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.title}</h2>
                <p className="text-xl font-semibold text-[#c8a15e] mb-4">{selectedProduct.price}</p>
                <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line mb-6">
                  {selectedProduct.description || "Tidak ada deskripsi tambahan."}
                </p>
              </div>

              <a 
                href={getWaLink(selectedProduct.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-[#c8a15e] text-[#0a0a0a] font-bold rounded-xl hover:bg-white transition-colors mt-4"
              >
                Pesan via WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

      {/* LIGHTBOX FULLSCREEN FOTO UTAMA */}
      {isFullImageOpen && selectedProduct && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-10"
          onClick={() => setIsFullImageOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button 
              onClick={() => setIsFullImageOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#c8a15e] text-sm font-bold transition-colors flex items-center gap-1"
            >
              ✕ Tutup Pratinjau
            </button>
            <div className="relative w-full h-full">
              <Image 
                src={selectedProduct.images?.[activeImgIndex] || "/images/renjana-logo.jpg"} 
                alt="Full Size Preview" 
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