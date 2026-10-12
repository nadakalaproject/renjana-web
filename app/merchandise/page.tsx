import { client } from "@/sanity/lib/client"; 
import MerchandiseClient from "./MerchandiseClient";

export const instant = false;

async function getMerchandiseKatalog() {
  const query = `*[_type == "merchandise"] | order(_createdAt desc) {
    _id,
    title,
    price,
    status,
    "images": images[].asset->url,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function MerchandisePage() {
  const sanityMerchKatalog = await getMerchandiseKatalog();
  return <MerchandiseClient sanityMerchKatalog={sanityMerchKatalog} />;
}