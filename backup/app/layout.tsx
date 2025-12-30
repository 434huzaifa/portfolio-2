import type { Metadata } from 'next';
import './globals.css';
import portfolioData from '@/portfolio-data.json';

export const metadata: Metadata = {
  title: portfolioData.siteMetadata.title,
  description: portfolioData.siteMetadata.description,
  keywords: portfolioData.siteMetadata.keywords,
  authors: [{ name: portfolioData.siteMetadata.author }],
  openGraph: {
    title: portfolioData.siteMetadata.title,
    description: portfolioData.siteMetadata.description,
    type: 'website',
    locale: 'en_US',
    siteName: portfolioData.siteMetadata.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioData.siteMetadata.title,
    description: portfolioData.siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={portfolioData.siteMetadata.siteUrl} />
        <link rel="icon" type="image/png" href="/Huzaifa.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
