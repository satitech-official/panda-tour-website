import type { Metadata } from "next";
import PremiumHome from "./PremiumHome";

export const metadata: Metadata = {
  title: "Panda Tours & Travels | Curated Kashmir Journeys",
  description:
    "Premium, tailor-made Kashmir holidays crafted by local travel experts in Srinagar.",
};

export default function Home() {
  return <PremiumHome />;
}
