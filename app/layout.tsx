import type { Metadata } from "next";
import "./globals.css";
import HeroVideo from "./HeroVideo";

const title = "Panda Tours & Travels | Premium Kashmir Journeys";
const description = "Tailor-made Kashmir holidays, honeymoon escapes, family tours and hidden-valley journeys crafted by local experts in Srinagar.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Panda Tours & Travels" },
  description,
  keywords: ["Kashmir tour packages", "Kashmir honeymoon", "Srinagar travel agency", "Gulmarg tour", "Pahalgam tour", "Kashmir family holiday"],
  openGraph: {
    type: "website",
    siteName: "Panda Tours & Travels",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Panda Tours & Travels — Kashmir, beautifully yours." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Panda Tours & Travels",
  telephone: "+91 7006982655",
  email: "pandatoursandtravels@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Airport Road / Baghat / Barzulla Bridge",
    addressLocality: "Srinagar",
    addressRegion: "Jammu & Kashmir",
    postalCode: "190005",
    addressCountry: "IN",
  },
  areaServed: "Kashmir",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
        <HeroVideo />
      </body>
    </html>
  );
}
