import { defineField, defineType } from 'sanity'

export const audio = defineType({
  name: 'audio',
  title: 'Katalog Audio',
  type: 'document',
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
      name: 'coverImage',
      title: 'Gambar Cover',
      type: 'image',
      options: {
        hotspot: true, // Memungkinkan kamu memotong (crop) gambar di dashboard
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Link YouTube (Opsional)',
      type: 'url',
      description: 'Masukkan link YouTube jika ada (contoh: https://www.youtube.com/watch?v=...)',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
    }),
  ],
})