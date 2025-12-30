# Portfolio Website

A modern, SEO-friendly portfolio website built with Next.js, TypeScript, and JSON-driven content management.

## Features

- ✅ **SEO Optimized**: Meta tags, semantic HTML, and static generation
- ✅ **Dark/Light Mode**: Smooth theme switching with localStorage persistence
- ✅ **JSON-Driven Content**: Easy content management through portfolio-data.json
- ✅ **Fully Responsive**: Mobile-first design that works on all devices
- ✅ **Dynamic Sections**: Show/hide content with "See More" functionality
- ✅ **Fast & Lightweight**: Static export for optimal performance
- ✅ **Modern Stack**: Next.js 14, TypeScript, CSS Modules

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with SEO meta tags
│   ├── page.tsx            # Main page with section rendering
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── Navigation.tsx      # Sticky navigation with mobile menu
│   ├── Hero.tsx           # Hero section with intro
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills grid with categories
│   ├── Experience.tsx     # Work experience timeline
│   ├── Projects.tsx       # Projects showcase
│   ├── Awards.tsx         # Awards and achievements
│   ├── Contact.tsx        # Contact information
│   ├── Footer.tsx         # Footer component
│   └── *.module.css       # Component-specific styles
├── contexts/
│   └── ThemeContext.tsx   # Dark/light theme context
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   └── portfolio-utils.ts # Validation and utility functions
├── portfolio-data.json    # All portfolio content (EDIT THIS!)
├── package.json
├── tsconfig.json
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Dependencies**

```bash
npm install
```

2. **Edit Your Portfolio Data**

Open `portfolio-data.json` and update with your information:
- Personal details (name, title, description)
- Work experience
- Skills and technologies
- Projects
- Awards and achievements
- Contact information
- Social links

3. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

4. **Build for Production**

```bash
npm run build
```

This generates a static export in the `out/` folder.

5. **Preview Production Build**

```bash
npm run start
```

## Content Management

### portfolio-data.json Structure

The JSON file controls all content and section ordering:

#### Key Sections:

- **siteMetadata**: SEO information (title, description, keywords)
- **hero**: Landing section with name, title, and CTA buttons
- **about**: Professional summary and highlights
- **skills**: Tech stack organized by categories
- **experience**: Work history with highlights
- **projects**: Showcased projects with features and links
- **awards**: Achievements and certifications
- **contact**: Contact information and social links
- **sectionOrder**: Array defining the order of sections

#### Visibility Control:

```json
{
  "visible": true,          // Show by default
  "showInSeeMore": true     // Show only when "See More" is clicked
}
```

Use these properties to control which items appear initially vs. behind "See More" buttons.

### JSON Validation

The site validates your JSON data on load. If validation fails:
1. Check browser console for specific errors
2. Ensure all required fields are present
3. Verify array structures match the expected format

## Customization

### Colors & Theming

Edit CSS variables in `app/globals.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --accent-primary: #0066cc;
  /* ... more variables */
}

[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  /* ... dark theme overrides */
}
```

### Section Order

Change the order of sections by editing the `sectionOrder` array in `portfolio-data.json`:

```json
"sectionOrder": [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "awards",
  "contact"
]
```

### Adding New Projects/Experience

Simply add new objects to the respective arrays in `portfolio-data.json`. The site will automatically render them.

## Deployment

### Static Export (Recommended)

The site is configured for static export. You can deploy to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag the `out/` folder to Netlify
- **GitHub Pages**: Copy `out/` contents to your repo
- **Any Static Host**: Upload the `out/` folder

### Environment-Specific Setup

No environment variables needed! Everything is managed through `portfolio-data.json`.

## SEO Features

- Semantic HTML5 structure
- Meta tags for social sharing (Open Graph, Twitter Cards)
- Canonical URLs
- Keyword optimization
- Mobile-friendly viewport
- Fast loading with static generation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Static HTML generation for instant loads
- CSS Modules for optimized styles
- No unnecessary JavaScript
- Optimized for Core Web Vitals

## Tips for Customization

1. **Update Social Links**: Replace dummy links in `portfolio-data.json` with your actual profiles
2. **Add Real Projects**: Replace example projects with your real work
3. **Optimize Images**: If you add images later, use Next.js Image component
4. **Keep It Simple**: Follow the "MUST DO / SKIP" guidelines from website_section.txt
5. **Test Responsiveness**: Check on mobile, tablet, and desktop sizes

## Troubleshooting

**Site shows "Portfolio Data Invalid":**
- Check browser console for validation errors
- Ensure all required JSON fields are present
- Verify JSON syntax is valid (use a JSON validator)

**Theme not persisting:**
- Check if localStorage is enabled in your browser
- Clear browser cache and try again

**Build errors:**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Ensure Node.js version is 18+

## License

This portfolio template is free to use for personal and commercial projects.

## Support

For issues or questions:
1. Check the JSON validation in browser console
2. Review the TypeScript types in `lib/types.ts`
3. Ensure all components are imported correctly

---

**Ready to deploy?** Update your content in `portfolio-data.json`, run `npm run build`, and deploy the `out/` folder!
