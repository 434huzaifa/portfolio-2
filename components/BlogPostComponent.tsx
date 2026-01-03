'use client'

import Link from 'next/link'
import styles from './BlogPost.module.css'

interface BlogPostContent {
  title: string
  description: string
  publishDate: string
  readTime: string
  category: string
  author: string
  toc: Array<{ id: string; title: string; level: number }>
  content: React.ReactNode
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function BlogPostComponent({
  title,
  description,
  publishDate,
  readTime,
  category,
  author,
  toc,
  content,
}: BlogPostContent) {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.readTime}>{readTime}</span>
          <time className={styles.date}>
            {formatDate(publishDate)}
          </time>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>MH</div>
          <div>
            <p className={styles.authorName}>{author}</p>
            <p className={styles.authorRole}>Software Engineer</p>
          </div>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {toc.length > 0 && (
          <aside className={styles.toc}>
            <h3>Table of Contents</h3>
            <nav>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${styles.tocLink} ${
                    styles[`level${item.level}`]
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>
        )}

        <main className={styles.content}>{content}</main>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to All Articles
          </Link>
          <div className={styles.sharing}>
            <p>Share this article:</p>
            <div className={styles.shareLinks}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://mdhuzaifa.dev/blog`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </article>
  )
}
