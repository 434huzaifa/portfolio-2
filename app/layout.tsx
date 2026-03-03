import type { Metadata } from "next";
import "./globals.css";
import portfolioData from "@/portfolio-data";
import "prismjs/themes/prism-tomorrow.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: portfolioData.siteMetadata.title,
    template: `%s | ${portfolioData.siteMetadata.author}`,
  },
  description: portfolioData.siteMetadata.description,
  keywords: portfolioData.siteMetadata.keywords,
  authors: [{ name: portfolioData.siteMetadata.author }],
  creator: portfolioData.siteMetadata.author,
  metadataBase: new URL(portfolioData.siteMetadata.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: portfolioData.siteMetadata.title,
    description: portfolioData.siteMetadata.description,
    type: "website",
    locale: "en_US",
    siteName: portfolioData.siteMetadata.title,
    url: portfolioData.siteMetadata.siteUrl,
    images: [
      {
        url: `${portfolioData.siteMetadata.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MD. Huzaifa — Freelance Full Stack Developer & Web Developer for Hire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.siteMetadata.title,
    description: portfolioData.siteMetadata.description,
    images: [`${portfolioData.siteMetadata.siteUrl}/og-image.png`],
    creator: "@huzaifa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with your Google Search Console code
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Multi-schema JSON-LD: Person + WebSite + ProfessionalService
  // This maximises rich-result eligibility in Google Search.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${portfolioData.siteMetadata.siteUrl}/#person`,
        name: portfolioData.siteMetadata.author,
        url: portfolioData.siteMetadata.siteUrl,
        jobTitle: "Freelance Full Stack Developer",
        description: portfolioData.siteMetadata.description,
        image: {
          "@type": "ImageObject",
          url: `${portfolioData.siteMetadata.siteUrl}/Huzaifa.png`,
          width: 400,
          height: 400,
        },
        sameAs: [
          "https://github.com/434huzaifa",
          "https://linkedin.com/in/md-huzaifa",
        ],
        email: "saadhuzaifa2497@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "Bangladesh",
        },
        knowsAbout: [
          "Software Engineering",
          "Full Stack Development",
          "Backend Architecture",
          "Microservices",
          "FinTech",
          "React",
          "Next.js",
          "TypeScript",
          "NestJS",
          "Node.js",
          "Web Development",
          "API Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${portfolioData.siteMetadata.siteUrl}/#website`,
        url: portfolioData.siteMetadata.siteUrl,
        name: portfolioData.siteMetadata.title,
        description: portfolioData.siteMetadata.description,
        author: { "@id": `${portfolioData.siteMetadata.siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        // Freelance service schema — surfaces in "services near me" results
        "@type": "ProfessionalService",
        "@id": `${portfolioData.siteMetadata.siteUrl}/#service`,
        name: "MD. Huzaifa — Freelance Web Development",
        description:
          "Custom web development services: full-stack apps, REST APIs, React frontends, Node.js/NestJS backends. Available worldwide & remote.",
        url: portfolioData.siteMetadata.siteUrl,
        provider: { "@id": `${portfolioData.siteMetadata.siteUrl}/#person` },
        // Remote + local service area
        areaServed: ["Worldwide", "Remote", "Dhaka, Bangladesh"],
        availableLanguage: ["English", "Bengali"],
        serviceType: [
          "Full Stack Web Development",
          "Frontend Development",
          "Backend Development",
          "API Development",
          "Custom Web Applications",
        ],
        priceRange: "Contact for quote",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${process.env.NEXT_PUBLIC_PROJECT_ID}";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script");
          `}
        </Script>
        <link rel="canonical" href={portfolioData.siteMetadata.siteUrl} />
        <link rel="icon" type="image/png" href="/Huzaifa.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body>{children}</body>
    </html>
  );
}
