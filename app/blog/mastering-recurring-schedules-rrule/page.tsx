import { BlogPostComponent } from "@/components/BlogPostComponent";
import type { Metadata } from "next";
import portfolioData from "@/portfolio-data.json5";

const postSlug = "mastering-recurring-schedules-rrule";
const postUrl = `${portfolioData.siteMetadata.siteUrl}/blog/${postSlug}`;

export const metadata: Metadata = {
  title: "Mastering Recurring Schedules with RRule - Blog",
  description:
    "A 4-minute primer on RRule (RFC 5545) with live tester links, patterns to copy, and practical tips for implementing recurring schedules in your web applications.",
  keywords: [
    "RRule",
    "Recurring Schedules",
    "Calendar",
    "Scheduling",
    "TypeScript",
    "React",
    "RFC 5545",
    "rrule.js",
  ],
  authors: [{ name: "MD. Huzaifa" }],
  openGraph: {
    title: "Mastering Recurring Schedules with RRule",
    description:
      "Learn how to implement recurring schedules using RRule with practical examples and live testers.",
    type: "article",
    locale: "en_US",
    url: postUrl,
    siteName: "MD. Huzaifa Blog",
    publishedTime: "2026-01-04T00:00:00Z",
    authors: ["MD. Huzaifa"],
    tags: [
      "RRule",
      "Scheduling",
      "Web Development",
      "JavaScript",
      "TypeScript",
    ],
    images: [
      {
        url: `${portfolioData.siteMetadata.siteUrl}/blog-thumbs/rrule-cover.png`,
        width: 1200,
        height: 630,
        alt: "Mastering Recurring Schedules with RRule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mastering Recurring Schedules with RRule",
    description:
      "A 4-minute primer on RRule with live tester links and practical examples.",
    images: [
      `${portfolioData.siteMetadata.siteUrl}/blog-thumbs/rrule-cover.png`,
    ],
  },
};

const tableOfContents = [
  { id: "tldr", title: "TL;DR", level: 1 },
  { id: "quickstart", title: "Quickstart", level: 1 },
  { id: "test-it", title: "Test RRule Live", level: 1 },
  { id: "patterns", title: "Patterns to Copy", level: 1 },
  { id: "tips", title: "Practical Tips", level: 1 },
  { id: "conclusion", title: "Conclusion", level: 1 },
];

export default function RRuleBlogPost() {
  return (
    <BlogPostComponent
      title="Mastering Recurring Schedules with RRule"
      description="A 4-minute primer on RRule with a live tester link to craft and validate recurring schedules fast."
      publishDate="2026-01-04"
      readTime="4 min read"
      category="Web Development"
      author="MD. Huzaifa"
      authorLink="https://devhuzaifa.netlify.app/"
      toc={tableOfContents}
      content={
        <>
          <h2 id="tldr">TL;DR</h2>
          <ul>
            <li>
              RRule is the calendar standard (RFC 5545) for recurring events.
            </li>
            <li>
              Use the live tester to validate rules:{" "}
              <a
                href="https://jkbrzt.github.io/rrule/"
                target="_blank"
                rel="noreferrer"
              >
                RRule demo
              </a>
              .
            </li>
            <li>Keep rules simple: FREQ + INTERVAL + COUNT/UNTIL + BYDAY.</li>
            <li>
              Show users a human summary and a short preview before saving.
            </li>
          </ul>

          <h2 id="quickstart">Quickstart</h2>
          <pre>
            <code className="language-ts !border-none !text-blue-500">{`import { RRule } from 'rrule'

const rule = RRule.fromString('FREQ=WEEKLY;INTERVAL=1;COUNT=8;BYDAY=MO,WE')
const occurrences = rule.all() // Dates for 8 Mondays/Wednesdays

console.log(rule.toText()) // "every week on Monday, Wednesday, 8 times"`}</code>
          </pre>

          <h2 id="test-it">Test RRule Live</h2>
          <p>
            Paste your rule into the official playground to see occurrences
            instantly:{" "}
            <a
              href="https://jkbrzt.github.io/rrule/"
              target="_blank"
              rel="noreferrer"
            >
              RRule Demo Tester
            </a>
            . Copy the final string back into your app.
          </p>

          <h2 id="patterns">Patterns to Copy</h2>
          <pre>
            <code className="!border-none !text-blue-500">{`// Weekdays until year-end
RRULE:FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;UNTIL=20261231

// First Monday of every month (6 times)
RRULE:FREQ=MONTHLY;BYDAY=+1MO;COUNT=6

// Every 2 weeks on Tue/Thu (10 occurrences)
RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH;COUNT=10`}</code>
          </pre>

          <h2 id="tips">Practical Tips</h2>
          <ul>
            <li>Cap COUNT (e.g., &lt; 365) to avoid massive result sets.</li>
            <li>Store both the RRule string and the computed end date.</li>
            <li>
              Render a human summary (<code>rule.toText()</code>) plus a
              3-occurrence preview.
            </li>
            <li>
              Validate input: for WEEKLY require BYDAY; require COUNT or UNTIL
              for long spans.
            </li>
            <li>
              Timezone: keep DTSTART in UTC; convert to the user’s TZ when
              displaying.
            </li>
          </ul>

          <h2 id="conclusion">Conclusion</h2>
          <p>
            RRule removes guesswork from recurring schedules. Start simple,
            validate with the live tester, and always show users what will
            happen before you create events.
          </p>

          <h2>Real-World Example: ShiftCare</h2>
          <p>
            A practical application of RRule is{" "}
            <a
              href="https://shift-care-vert.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              ShiftCare
            </a>
            , a staff and booking management system. It uses RRule extensively
            to:
          </p>
          <ul>
            <li>Generate recurring shifts for staff members across months</li>
            <li>Auto-detect conflicts between overlapping bookings</li>
            <li>Provide a calendar view with color-coded shift types</li>
            <li>
              Enable users to edit recurring patterns or individual occurrences
            </li>
          </ul>
          <p>
            <a
              href="https://github.com/434huzaifa/shift-care"
              target="_blank"
              rel="noreferrer"
            >
              ShiftCare on GitHub
            </a>{" "}
            showcases how to integrate RRule into a production scheduling system
            with Prisma, Next.js, and ShadCN UI.
          </p>
        </>
      }
    />
  );
}
