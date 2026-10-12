import { client } from "@/sanity/lib/client"; 
import VisualClient from "./VisualClient";

export const instant = false;

// Fungsi ambil data Visual di Server
async function getVisualKatalog() {
  const query = `*[_type == "visual"] | order(_createdAt desc) {
    _id,
    title,
    type,
    "coverImageUrl": coverImage.asset->url,
    youtubeUrl,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function VisualPage() {
  const sanityVisualKatalog = await getVisualKatalog();

  // Kirim data ke komponen Client untuk dianimasikan
  return <VisualClient sanityVisualKatalog={sanityVisualKatalog} />;
}