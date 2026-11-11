import { client } from "@/sanity/lib/client"; 
import AudioClient from "./AudioClient";

export const instant = false;

async function getAudioKatalog() {
  const query = `*[_type == "audio"] | order(_createdAt desc) {
    _id,
    title,
    type,
    "coverImageUrl": coverImage.asset->url,
    youtubeUrl,
    "audioUploadUrl": audioUpload.asset->url, // Tambahkan ini untuk MP3
    "videoUploadUrl": videoUpload.asset->url,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function AudioPage() {
  const sanityAudioKatalog = await getAudioKatalog();

  return <AudioClient sanityAudioKatalog={sanityAudioKatalog} />;
}