"use client";

import Link from "next/link";
import styles from "./Blog.module.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DraggableThemeToggle from "@/components/DraggableThemeToggle";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useEffect } from "react";
import Prism from "prismjs";

// language support
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  category: string;
  slug: string;
  image?: string;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiByeD0iMTYiIGZpbGw9IiM1NjVmNmYiLz4KPHRleHQgeD0iNjAwIiB5PSIzMTUiIGZvbnQtc2l6ZT0iNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgU2Vnb2UgLCBzYW5zLXNlcmlmIj5CbG9nIFRodW1ibmFpbDwvdGV4dD4KPC9zdmc+";

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Mastering Recurring Schedules with RRule",
    description:
      "A quick-start primer on RRule with a live tester link to craft and validate recurring schedules fast.",
    publishDate: "2026-01-04",
    readTime: "4 min read",
    category: "Web Development",
    slug: "mastering-recurring-schedules-rrule",
    image: "/blog-thumbs/rrule-cover.png",
  },
  {
    id: "2",
    title: "Vibe Coding Wallet: Building a playful payments experience",
    description:
      "What I learned shipping the Vibe Coding Fake Wallet project: onboarding, security cues, and delight for builders.",
    publishDate: "2026-01-04",
    readTime: "3 min read",
    category: "Product & Engineering",
    slug: "vibe-coding-wallet",
    image: "/blog-thumbs/vibe-coding.webp",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <DraggableThemeToggle />
      <main className={styles.container}>
        <div className={styles.backNav}>
          <Link href="/" className={styles.backButton}>
            ← Back to Profile
          </Link>
        </div>
        <div className={styles.header}>
          <h1 className={styles.title}>Technical Blog</h1>
          <p className={styles.subtitle}>
            Articles on software engineering, web development, and modern
            technologies
          </p>
        </div>

        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={post.image ?? FALLBACK_IMAGE}
                  alt={post.title}
                  className={styles.image}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_IMAGE) {
                      target.src = FALLBACK_IMAGE;
                    }
                  }}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.description}>{post.description}</p>
                <div className={styles.footer}>
                  <time className={styles.date}>
                    {formatDate(post.publishDate)}
                  </time>
                  <Link href={`/blog/${post.slug}`} className={styles.link}>
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </ThemeProvider>
  );
}
