import { client } from "@/sanity/lib/client"; 
import AudioClient from "./AudioClient";

export const instant = false;

// Fungsi ambil data di Server
async function getAudioKatalog() {
  const query = `*[_type == "audio"] | order(_createdAt desc) {
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

export default async function AudioPage() {
  const sanityAudioKatalog = await getAudioKatalog();

  // Kirim data yang didapat dari server ke komponen Client
  return <AudioClient sanityAudioKatalog={sanityAudioKatalog} />;
}