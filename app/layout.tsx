import type { Metadata } from "next";
import "./globals.css";
import portfolioData from "@/portfolio-data.json5";
import "prismjs/themes/prism-tomorrow.css";
import Script from "next/script";
export const metadata: Metadata = {
  title: portfolioData.siteMetadata.title,
  description: portfolioData.siteMetadata.description,
  keywords: portfolioData.siteMetadata.keywords,
  authors: [{ name: portfolioData.siteMetadata.author }],
  creator: portfolioData.siteMetadata.author,
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
        alt: "MD. Huzaifa - Software Engineer Portfolio",
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
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    google: "google-site-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.siteMetadata.author,
    url: portfolioData.siteMetadata.siteUrl,
    jobTitle: "Software Engineer",
    description: portfolioData.siteMetadata.description,
    image: `${portfolioData.siteMetadata.siteUrl}/Huzaifa.png`,
    sameAs: [
      "https://github.com/434huzaifa",
      "https://linkedin.com/in/md-huzaifa",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "Backend Architecture",
      "Microservices",
      "FinTech",
      "React",
      "TypeScript",
      "NestJS",
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
