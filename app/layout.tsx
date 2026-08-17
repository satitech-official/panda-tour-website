import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "pandatoursandtravels.com";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Panda Tours & Travels | Premium Kashmir Journeys";
  const description = "Tailor-made Kashmir holidays, honeymoon escapes, family tours and hidden-valley journeys crafted by local experts in Srinagar.";

  return {
    metadataBase: new URL(origin),
    title: { default: title, template: "%s | Panda Tours & Travels" },
    description,
    keywords: ["Kashmir tour packages", "Kashmir honeymoon", "Srinagar travel agency", "Gulmarg tour", "Pahalgam tour", "Kashmir family holiday"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: origin,
      siteName: "Panda Tours & Travels",
      title,
      description,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Panda Tours & Travels — Kashmir, beautifully yours." }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Panda Tours & Travels",
  url: "https://pandatoursandtravels.com",
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
      </body>
    </html>
  );
}
