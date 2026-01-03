import { BlogPostComponent } from '@/components/BlogPostComponent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Coding Wallet: Building a playful payments experience - Blog',
  description:
    'A 3-minute recap of designing and shipping the Vibe Coding Fake Wallet project with a focus on onboarding, trust, and delight.',
  keywords: ['Vibe Coding', 'Fake Wallet', 'Product Design', 'React', 'TypeScript'],
}

const tableOfContents = [
  { id: 'tldr', title: 'TL;DR', level: 1 },
  { id: 'what-we-built', title: 'What we built', level: 1 },
  { id: 'tech', title: 'Stack & approach', level: 1 },
  { id: 'lessons', title: 'Lessons learned', level: 1 },
  { id: 'links', title: 'Links & credits', level: 1 },
]

export default function VibeCodingWalletPost() {
  return (
    <BlogPostComponent
      title="Vibe Coding Wallet: Building a playful payments experience"
      description="A 3-minute recap of designing and shipping the Vibe Coding Fake Wallet project with a focus on onboarding, trust, and delight."
      publishDate="2026-01-04"
      readTime="3 min read"
      category="Product & Engineering"
      author="MD. Huzaifa"
      toc={tableOfContents}
      content={
        <>
          <h2 id="tldr">TL;DR</h2>
          <ul>
            <li>Built a playful web wallet demo for Vibe Coding to showcase virtual balances and transactions.</li>
            <li>Prioritized trust cues (clear limits, confirm dialogs) and delight (microcopy, color feedback).</li>
            <li>Kept scope tight: auth-less demo, fake ledger, instant reset for quick trial loops.</li>
          </ul>

          <h2 id="what-we-built">What we built</h2>
          <p>
            A browser-based “fake wallet” that lets users top up, transfer, and view a mini ledger without real money. The goal: help Vibe Coding demo flows fast and gather usability feedback before wiring real payments.
          </p>
          <ul>
            <li>Balance card with quick actions (add funds, send, reset).</li>
            <li>Transaction list with friendly status badges and category pills.</li>
            <li>Guardrails: max top-up, confirm modal on send, clear error states.</li>
          </ul>

          <h2 id="tech">Stack & approach</h2>
          <ul>
            <li><strong>Frontend:</strong> Next.js, TypeScript, Tailwind.</li>
            <li><strong>State:</strong> Local state + derived ledger; no backend required for demo speed.</li>
            <li><strong>UX:</strong> Empty-state templates, optimistic updates with rollback on validation fail.</li>
          </ul>

          <h2 id="lessons">Lessons learned</h2>
          <ul>
            <li>Show limits early: “Max top-up 500” reduced failed attempts.</li>
            <li>Make reversal obvious: a single “Reset wallet” button sped up test loops.</li>
            <li>Explain statuses in plain language; gamers prefer short, confident copy over finance jargon.</li>
          </ul>

          <h2 id="links">Links & credits</h2>
          <ul>
            <li>Repo: <a href="https://github.com/434huzaifa/fake-wallet" target="_blank" rel="noreferrer">fake-wallet on GitHub</a></li>
            <li>Live: <a href="https://fake-wallet.netlify.app/" target="_blank" rel="noreferrer">fake-wallet.netlify.app</a></li>
            <li>Team: built with the Vibe Coding crew; shipped fast, learned faster.</li>
          </ul>
        </>
      }
    />
  )
}
