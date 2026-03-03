import type { Metadata } from 'next'
import portfolioData from '@/portfolio-data'

export const metadata: Metadata = {
  title: 'Blog — MD. Huzaifa | Web Development & Software Engineering Articles',
  description:
    'Technical articles and guides on software engineering, web development, React, Next.js, Node.js, and modern full-stack technologies. Real-world insights from a freelance developer.',
  keywords: [
    // Blog-specific + dev-hire intent
    'web development blog',
    'software engineering articles',
    'freelance developer blog',
    'full stack developer tutorials',
    'React tutorials',
    'Next.js guides',
    'Node.js development',
    'TypeScript tips',
    // Original tech tags
    'blog',
    'software engineering',
    'web development',
    'tutorials',
    'guides',
    'RRule',
    'scheduling',
  ],
  authors: [{ name: 'MD. Huzaifa' }],
  openGraph: {
    title: 'Blog — MD. Huzaifa | Freelance Full Stack Developer',
    description:
      'Technical articles on software engineering, web development, and modern technologies.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MD. Huzaifa — Freelance Full Stack Developer',
    url: `${portfolioData.siteMetadata.siteUrl}/blog`,
    images: [
      {
        url: `${portfolioData.siteMetadata.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MD. Huzaifa — Freelance Developer Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — MD. Huzaifa | Web Development Articles',
    description:
      'Technical articles on software engineering and web development.',
    images: [`${portfolioData.siteMetadata.siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${portfolioData.siteMetadata.siteUrl}/blog`,
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
