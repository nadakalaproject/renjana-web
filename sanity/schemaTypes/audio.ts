import { defineField, defineType } from 'sanity'

export const audio = defineType({
  name: 'audio',
  title: 'Katalog Audio',
  type: 'document',
  // INI ADALAH BAGIAN SOP UNTUK KLIEN
  description: 'SOP PENGISIAN MEDIA (PILIH SALAH SATU SAJA):\n' +
    '1. KARYA YOUTUBE: Isi Link YouTube saja (Thumbnail akan terisi otomatis).\n' +
    '2. BEAT / LAGU MP3: Upload MP3 dan Gambar Cover (Kosongkan Link YouTube & Video).\n' +
    '3. VIDEO PENDEK: Upload Video (dan Gambar Cover jika perlu. Kosongkan Link YouTube).\n\n' +
    'PRIORITAS TAMPIL: YouTube -> Upload Video -> Upload MP3.',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Karya',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Single / Album', value: 'Single' },
          { title: 'Beat For Sale', value: 'Beat For Sale' },
          { title: 'Mixing & Mastering', value: 'Mixing & Mastering' },
          { title: 'Music Production', value: 'Music Production' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'audioUpload',
      title: 'Upload Audio / MP3 (Prioritas 3)',
      type: 'file',
      description: 'Gunakan HANYA JIKA karya berupa lagu/beat tanpa video. Upload file MP3/WAV untuk pemutar audio langsung di web.',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'videoUpload',
      title: 'Upload Video Cuplikan (Prioritas 2)',
      type: 'file',
      description: 'Gunakan HANYA JIKA tidak ada link YouTube. Upload video pendek (dibawah 15mb) di sini.',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Gambar Cover (Wajib Jika Mengupload MP3)',
      type: 'image',
      description: 'Gambar ini akan menjadi kotak utama karya. Jika menggunakan link YouTube, ini tidak wajib diisi.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Link YouTube (Prioritas Utama / 1)',
      type: 'url',
      description: 'Jika link ini diisi, maka MP3 atau Upload Video di atas TIDAK AKAN DITAMPILKAN di pop-up web.',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
    }),
  ],
})