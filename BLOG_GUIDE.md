# How to Add More Blog Posts

This guide explains how to add new blog articles to your blog system.

## Step 1: Create the Blog Post File

Create a new directory under `app/blog/` with your article slug:

```
app/blog/[your-slug]/page.tsx
```

Example: `app/blog/nextjs-best-practices/page.tsx`

## Step 2: Write the Blog Post

Use this template:

```typescript
import { BlogPostComponent } from '@/components/BlogPostComponent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Title - Blog',
  description: 'Your description for SEO',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
}

const tableOfContents = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'section-1', title: 'First Section', level: 1 },
  { id: 'subsection', title: 'Subsection', level: 2 },
  // Add more sections
]

export default function BlogPost() {
  return (
    <BlogPostComponent
      title="Your Article Title"
      description="Your article description"
      publishDate="2025-01-10" // YYYY-MM-DD format
      readTime="10 min read"
      category="Web Development" // Or your category
      author="MD. Huzaifa"
      toc={tableOfContents}
      content={
        <>
          <h2 id="intro">Introduction</h2>
          <p>Your introduction text...</p>
          
          <h2 id="section-1">First Section</h2>
          <p>Your content here...</p>
          
          <h3 id="subsection">Subsection</h3>
          <p>More content...</p>
          
          <pre>
            <code>{`// Code example
console.log('Hello')`}</code>
          </pre>
          
          {/* Add more content */}
        </>
      }
    />
  )
}
```

## Step 3: Add Post to Blog Listing

Edit `app/blog/page.tsx` and add to the `blogPosts` array:

```typescript
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering Recurring Schedules with RRule',
    description: 'A comprehensive guide...',
    publishDate: '2025-01-04',
    readTime: '12 min read',
    category: 'Web Development',
    slug: 'mastering-recurring-schedules-rrule',
    image: '/blog-thumbs/rrule-cover.png',
  },
  // ADD YOUR NEW POST HERE:
  {
    id: '2', // Increment ID
    title: 'Your Article Title',
    description: 'Your article description',
    publishDate: '2025-01-10',
    readTime: '10 min read',
    category: 'Category Name',
    slug: 'your-article-slug', // Must match directory name
    image: '/blog-thumbs/your-image.png', // Optional
  },
]
```

## Step 4: (Optional) Add Cover Image

Place your cover image in `public/blog-thumbs/`:

```
public/blog-thumbs/your-image.png
```

## Writing Best Practices

### Structure
- Use clear heading hierarchy (h2 for main sections, h3 for subsections)
- Each heading should have a matching `id` in table of contents
- Keep paragraphs concise (2-4 sentences)
- Use lists for multiple points

### Code Examples
```typescript
// Wrap code in <pre><code> tags
<pre>
  <code>{`
// Your code here
const example = true;
  `}</code>
</pre>
```

### Tables
```typescript
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Col 1</td>
      <td>Row 1, Col 2</td>
    </tr>
  </tbody>
</table>
```

### Blockquotes
```typescript
<blockquote>
  Important quote or note here
</blockquote>
```

### Links
```typescript
<a href="https://example.com">Link text</a>
```

### Lists
```typescript
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
```

## SEO Tips

1. **Title**: Use your main keyword in the title
2. **Description**: Write a compelling meta description (150-160 chars)
3. **Keywords**: Add relevant keywords to the keywords array
4. **Headings**: Use semantic heading structure (h2 → h3 → h4)
5. **Table of Contents**: Improves internal linking and UX
6. **Links**: Link to related articles where relevant

## Example: Adding a Next.js Article

```typescript
// app/blog/nextjs-best-practices/page.tsx
import { BlogPostComponent } from '@/components/BlogPostComponent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Best Practices - Blog',
  description: 'Expert tips for building performant Next.js applications with modern patterns.',
  keywords: ['Next.js', 'React', 'Web Development', 'Performance'],
}

const tableOfContents = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'file-structure', title: 'Optimal File Structure', level: 1 },
  { id: 'app-router', title: 'Using App Router', level: 2 },
  { id: 'performance', title: 'Performance Optimization', level: 1 },
  { id: 'ssg', title: 'Static Site Generation', level: 2 },
  { id: 'conclusion', title: 'Conclusion', level: 1 },
]

export default function NextJsBlogPost() {
  return (
    <BlogPostComponent
      title="Next.js Best Practices: Building Modern Web Apps"
      description="Expert tips for building performant Next.js applications with modern patterns and conventions."
      publishDate="2025-01-15"
      readTime="15 min read"
      category="Web Development"
      author="MD. Huzaifa"
      toc={tableOfContents}
      content={
        <>
          <h2 id="intro">Introduction</h2>
          <p>Next.js has become the go-to framework for React applications...</p>
          
          <h2 id="file-structure">Optimal File Structure</h2>
          <p>Proper organization is key to maintainability...</p>
          
          <h3 id="app-router">Using App Router</h3>
          <p>The App Router provides several advantages...</p>
          
          <pre>
            <code>{`// app/page.tsx - Root page
export default function Home() {
  return <div>Welcome</div>
}`}</code>
          </pre>
          
          <h2 id="performance">Performance Optimization</h2>
          <p>Performance is critical for user experience...</p>
          
          <h3 id="ssg">Static Site Generation</h3>
          <p>SSG provides the best performance...</p>
          
          <h2 id="conclusion">Conclusion</h2>
          <p>Following these practices will improve your Next.js applications...</p>
        </>
      }
    />
  )
}
```

Then add to `app/blog/page.tsx`:

```typescript
{
  id: '2',
  title: 'Next.js Best Practices: Building Modern Web Apps',
  description: 'Expert tips for building performant Next.js applications with modern patterns and conventions.',
  publishDate: '2025-01-15',
  readTime: '15 min read',
  category: 'Web Development',
  slug: 'nextjs-best-practices',
  image: '/blog-thumbs/nextjs-best-practices.png',
}
```

## Testing Your New Post

1. Add the post to `app/blog/page.tsx`
2. Create the page file at `app/blog/[slug]/page.tsx`
3. Run `npm run dev`
4. Visit `http://localhost:3000/blog` to see your post in the listing
5. Click the "Read Article" link to view the full post

## Build Verification

After adding a new post, run:

```bash
npm run build
```

You should see your new blog post included in the build output:

```
├ ○ /blog                           1.14 kB        97.3 kB
├ ○ /blog/your-new-slug            1.25 kB        97.4 kB
```

---

**Note:** Blog posts are SEO-friendly and support dark mode automatically. No additional styling needed!
