#!/usr/bin/env node

/**
 * PWA Assets Generation Script
 * Generates all necessary PWA icons and assets
 */

import fs from 'fs'
import path from 'path'

// Icon sizes needed for PWA
const iconSizes = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' }
]

// Apple touch icon sizes
const appleIconSizes = [
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 167, name: 'apple-touch-icon-167x167.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' }
]

// Favicon sizes
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' }
]

// Create placeholder SVG content for the logo
const createLogoSVG = () => `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <!-- Background Circle -->
  <circle cx="256" cy="256" r="240" fill="url(#bg)" stroke="#15803d" stroke-width="8"/>
  
  <!-- Chicken/Feather Icon -->
  <g transform="translate(256,256)">
    <!-- Feather Body -->
    <ellipse cx="0" cy="-20" rx="60" ry="120" fill="#ffffff" opacity="0.9"/>
    
    <!-- Feather Details -->
    <path d="M-40,-80 Q0,-100 40,-80 Q20,-60 0,-70 Q-20,-60 -40,-80" fill="#f0fdf4"/>
    <path d="M-30,-40 Q0,-50 30,-40 Q15,-30 0,-35 Q-15,-30 -30,-40" fill="#f0fdf4"/>
    <path d="M-20,0 Q0,-10 20,0 Q10,10 0,5 Q-10,10 -20,0" fill="#f0fdf4"/>
    <path d="M-15,40 Q0,30 15,40 Q7,50 0,45 Q-7,50 -15,40" fill="#f0fdf4"/>
    
    <!-- Text -->
    <text x="0" y="100" text-anchor="middle" font-family="serif" font-size="32" font-weight="bold" fill="#ffffff">
      N
    </text>
  </g>
</svg>
`.trim()

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// Generate logo SVG
const logoPath = path.join(publicDir, 'logo.svg')
fs.writeFileSync(logoPath, createLogoSVG())

// Generate placeholder favicon.ico content
const generateFavicoContent = () => {
  // This is a very basic ICO file structure - in production, use a proper tool
  return Buffer.from([
    // ICO header
    0x00, 0x00, // Reserved
    0x01, 0x00, // Type: ICO
    0x01, 0x00, // Number of images
    // Image directory entry
    0x10, // Width: 16
    0x10, // Height: 16
    0x00, // Color count
    0x00, // Reserved
    0x01, 0x00, // Color planes
    0x20, 0x00, // Bits per pixel
    0x68, 0x04, 0x00, 0x00, // Image size
    0x16, 0x00, 0x00, 0x00, // Image offset
  ])
}

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generateFavicoContent())

// Create a script that tells users how to generate actual images
const readmePath = path.join(publicDir, 'PWA_ASSETS_README.md')
const readmeContent = `# PWA Assets Generation

This folder contains placeholder assets for your PWA. To generate proper icons:

## Method 1: Online Tools
1. Go to https://realfavicongenerator.net/
2. Upload your logo SVG file (\`logo.svg\`)
3. Download and extract the generated files to this public folder

## Method 2: PWA Asset Generator (Recommended)
\`\`\`bash
pnpm add -D pwa-asset-generator
pnpm pwa:generate-icons
\`\`\`

## Method 3: Manual Creation
Create the following files with your logo:

### PWA Icons:
${iconSizes.map(icon => `- ${icon.name} (${icon.size}x${icon.size}px)`).join('\n')}

### Apple Touch Icons:
${appleIconSizes.map(icon => `- ${icon.name} (${icon.size}x${icon.size}px)`).join('\n')}

### Favicons:
${faviconSizes.map(icon => `- ${icon.name} (${icon.size}x${icon.size}px)`).join('\n')}

### Additional Files:
- favicon.ico (multi-size ICO file)
- safari-pinned-tab.svg (monochrome SVG)
- og-image.jpg (1200x630px for social sharing)
- twitter-image.jpg (1200x600px for Twitter)

## Tips:
- Use PNG format for icons
- Ensure icons are square
- Use transparent backgrounds
- Optimize file sizes
- Test on multiple devices
`

fs.writeFileSync(readmePath, readmeContent)

console.log('✅ PWA assets setup completed!')
console.log('📁 Generated files in public/ directory:')
console.log('   - logo.svg (placeholder logo)')
console.log('   - favicon.ico (basic placeholder)')
console.log('   - PWA_ASSETS_README.md (generation instructions)')
console.log('')
console.log('🚀 Next steps:')
console.log('   1. Replace logo.svg with your actual logo')
console.log('   2. Run: pnpm pwa:generate-icons')
console.log('   3. Or use https://realfavicongenerator.net/')
console.log('')