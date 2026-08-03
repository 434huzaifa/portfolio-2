import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'public', 'og-image.png')

const WIDTH = 1200
const HEIGHT = 630

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />

  <circle cx="1080" cy="80" r="220" fill="#38bdf8" opacity="0.08" />
  <circle cx="60" cy="590" r="180" fill="#38bdf8" opacity="0.06" />

  <text x="80" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="#38bdf8" letter-spacing="2">
    MD. HUZAIFA
  </text>

  <text x="80" y="260" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#ffffff">
    Freelance Full Stack
  </text>
  <text x="80" y="335" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#ffffff">
    Developer
  </text>

  <text x="80" y="405" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#94a3b8">
    React · Next.js · Node.js · NestJS
  </text>

  <line x1="80" y1="470" x2="1120" y2="470" stroke="#334155" stroke-width="1" />

  <text x="80" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#64748b">
    Available for hire — remote &amp; worldwide
  </text>
</svg>
`

const buffer = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(outPath, buffer)
console.log(`OG image written to ${outPath} (${buffer.length} bytes)`)
