import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Buffer } from 'node:buffer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const W = 1200
const H = 630

// Step 1: Convert the favicon to a PNG at the right size
const logoPng = await sharp(resolve(__dirname, '../public/favicon.svg'))
  .resize(180, 180)
  .png()
  .toBuffer()

// Step 2: Build the background as a simple SVG (no nested SVGs)
const bgSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .name { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 52px; font-weight: 700; fill: #1e1e1e; }
      .title { font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: 700; fill: #2dd4bf; }
      .tag { font-family: 'Courier New', Courier, monospace; font-size: 13px; fill: #999999; letter-spacing: 0.25em; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#f9f7f7"/>

  <!-- Pentagon accent top-right -->
  <polygon points="1200,0 900,0 1200,150" fill="#2dd4bf" opacity="0.08"/>
  <polygon points="1200,150 1050,150 1200,225" fill="#22b8c7" opacity="0.06"/>

  <!-- Pentagon accent bottom-left -->
  <polygon points="0,630 300,630 0,480" fill="#2dd4bf" opacity="0.08"/>
  <polygon points="0,480 150,480 0,405" fill="#22b8c7" opacity="0.06"/>

  <!-- Small terminal dots top-left -->
  <circle cx="30" cy="30" r="6" fill="#1e1e1e" opacity="0.1"/>
  <circle cx="52" cy="30" r="6" fill="#1e1e1e" opacity="0.1"/>
  <circle cx="74" cy="30" r="6" fill="#1e1e1e" opacity="0.1"/>

  <!-- Divider line -->
  <line x1="480" y1="280" x2="480" y2="420" stroke="#2dd4bf" stroke-width="2" opacity="0.3"/>

  <!-- Text content -->
  <text x="500" y="342" class="name">Eduard Rotaru</text>
  <text x="500" y="392" class="title">Full-Stack Developer</text>

  <!-- Small domain watermark -->
  <text x="500" y="520" class="tag">eduardrotaru.dev</text>

  <!-- Decorative hex pattern -->
  <polygon points="1060,500 1095,520 1095,560 1060,580 1025,560 1025,520" fill="#2dd4bf" opacity="0.06"/>
  <polygon points="1060,440 1095,460 1095,500 1060,520 1025,500 1025,460" fill="#22b8c7" opacity="0.04"/>
  <polygon points="1095,460 1130,480 1130,520 1095,540 1060,520 1060,480" fill="#2dd4bf" opacity="0.03"/>
</svg>
`)

const bgPng = await sharp(bgSvg)
  .resize(W, H)
  .png()
  .toBuffer()

// Step 3: Composite the logo onto the background
await sharp(bgPng)
  .composite([
    {
      input: logoPng,
      top: 90,
      left: 150,
    },
  ])
  .png()
  .toFile(resolve(__dirname, '../public/og-image.png'))

console.log('Generated public/og-image.png')
