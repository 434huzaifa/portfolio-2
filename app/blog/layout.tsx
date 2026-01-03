import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - MD. Huzaifa',
  description: 'Technical articles and guides on software engineering, web development, and recurring schedules.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
