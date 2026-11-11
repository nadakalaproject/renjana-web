import { defineField, defineType } from "sanity";

export const visual = defineType({
  name: "visual",
  title: "Katalog Visual",
  type: "document",
  // INI ADALAH BAGIAN SOP UNTUK KLIEN
  description: 'SOP PENGISIAN MEDIA (PILIH SALAH SATU SAJA):\n' +
    '1. KARYA YOUTUBE: Isi Link YouTube saja (Thumbnail akan ditarik otomatis. Aman tanpa Cover).\n' +
    '2. VIDEO PENDEK: Upload Video (Kosongkan Link YouTube).\n' +
    '3. FOTO / ARTWORK Saja: Upload Gambar Cover saja (Kosongkan Link YouTube & Video).\n\n' +
    'PRIORITAS TAMPIL: YouTube -> Upload Video -> Gambar Cover.',
  fields: [
    defineField({
      name: "title",
      title: "Judul Karya",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Jenis Visual",
      description: "Contoh: Music Video, Artwork, Photography",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUpload',
      title: 'Upload Video Pendek (Prioritas 2)',
      type: 'file',
      description: 'Gunakan JIKA TIDAK ADA link YouTube. Upload video kompresi di sini.',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: "coverImage",
      title: "Gambar Cover / Thumbnail / Foto Karya",
      type: "image",
      description: 'Jika karya berupa Foto/Desain, upload di sini. Jika menggunakan link YouTube, ini tidak wajib.',
      options: { hotspot: true },
    }),
    defineField({
      name: "youtubeUrl",
      title: "Link YouTube (Prioritas Utama / 1)",
      type: "url",
      description: "Masukkan URL YouTube. Jika diisi, Upload Video di atas akan diabaikan oleh sistem web.",
    }),
    defineField({
      name: "description",
      title: "Deskripsi Singkat",
      type: "text",
    }),
  ],
});