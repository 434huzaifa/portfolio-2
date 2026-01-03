import type { MetadataRoute } from 'next'
import portfolioData from '@/portfolio-data.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioData.siteMetadata.siteUrl

  const blogPosts = [
    {
      url: `${baseUrl}/blog/mastering-recurring-schedules-rrule`,
      lastModified: new Date('2026-01-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/vibe-coding-wallet`,
      lastModified: new Date('2026-01-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...blogPosts,
  ]
}
