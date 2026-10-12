import { defineField, defineType } from "sanity";

export const merchandise = defineType({
  name: "merchandise",
  title: "Katalog Merchandise",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama Produk",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Harga Produk (Contoh: Rp 150.000)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status Stok",
      type: "string",
      options: {
        list: [
          { title: "Ready Stock", value: "Ready Stock" },
          { title: "Pre-Order", value: "Pre-Order" },
          { title: "Sold Out", value: "Sold Out" },
        ],
      },
      initialValue: "Ready Stock",
    }),
    defineField({
      name: "images",
      title: "Galeri Foto Produk (Foto Utama & Samping/Detail)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Deskripsi Produk & Ukuran (Size Chart)",
      type: "text",
    }),
  ],
});