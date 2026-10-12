import { defineField, defineType } from "sanity";

export const visual = defineType({
  name: "visual",
  title: "Katalog Visual",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul Karya",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Jenis Visual (Contoh: Music Video, Artwork, Photography)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar Cover / Thumbnail",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "Link YouTube (Opsional - Jika berupa video)",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Deskripsi Singkat",
      type: "text",
    }),
  ],
});