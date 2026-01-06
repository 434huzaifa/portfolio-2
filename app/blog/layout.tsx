import type { Metadata } from 'next'
import portfolioData from '@/portfolio-data.json5'

export const metadata: Metadata = {
  title: 'Blog - MD. Huzaifa | Software Engineering & Web Development Articles',
  description: 'Technical articles and guides on software engineering, web development, recurring schedules, and modern technologies. Learn from real-world project experiences.',
  keywords: ['blog', 'software engineering', 'web development', 'tutorials', 'guides', 'RRule', 'scheduling'],
  authors: [{ name: 'MD. Huzaifa' }],
  openGraph: {
    title: 'Blog - MD. Huzaifa',
    description: 'Technical articles on software engineering, web development, and modern technologies.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MD. Huzaifa - Software Engineer',
    url: `${portfolioData.siteMetadata.siteUrl}/blog`,
    images: [
      {
        url: `${portfolioData.siteMetadata.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MD. Huzaifa Software Engineer Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - MD. Huzaifa',
    description: 'Technical articles on software engineering and web development.',
    images: [`${portfolioData.siteMetadata.siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
