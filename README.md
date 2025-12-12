# P-TEK Intelligence (Next.js v14)

> **Quick Netlify Upload Checklist**
> 1. Zip the entire folder (excluding `node_modules` and `.next` if you want a clean upload, but including `package.json`, `.nvmrc`, `netlify.toml`).
> 2. Drag & Drop into Netlify.
> 3. Ensure Build Command is `npm run build` and Publish Directory is `.next`.
> 4. Ensure Node Version is set to 18 (Netlify usually picks this up from `.nvmrc`).

## Overview
P-TEK Intelligence is a real-time, AI-powered news aggregator built with Next.js 14 (App Router) for high-performance, dynamic content delivery. It fetches the latest news from world-class sources (Reuters, TechCrunch, CNBC, etc.) via public RSS feeds and normalizes them into a premium, cinematic interface.

## Features
- **Real-Time Data**: Automatically updates every 60 minutes (ISR).
- **Dynamic Content**: Server-side fetching with fallback mock data if feeds are down.
- **Premium UI**: "Glassmorphism" design, dark mode, ticker, and responsive layout.
- **Zero-Cost**: Uses only free public RSS feeds.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Data**: RSS Parser + Cheerio (for image extraction)
- **Deployment**: Netlify (Serverless Functions supported)

## Project Structure
- `src/app`: Page routes and layouts.
- `src/components`: Reusable UI components (Ticker, NewsCard, Header).
- `src/lib`: Core logic for fetching, parsing, and caching news (rss.js).
- `public`: Static assets (fallback images).
- `netlify.toml`: Netlify build configuration.

## Setup & Local Development
1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

3. **Verify Feeds**
   Run the included diagnostic script to check feed health:
   ```bash
   npm run test:feeds
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Deployment on Netlify
This project is configured for seamless deployment on Netlify.

### Option A: Connect to GitHub (Recommended)
1. Push this repo to GitHub.
2. In Netlify, "New Site from Git".
3. Netlify will auto-detect Next.js.
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
4. Deploy.

### Option B: Drag & Drop ZIP
1. Run `npm run build` locally to ensure no errors.
2. Create a ZIP of the project root (exclude `node_modules` and `.next` to save space, Netlify will rebuild).
3. Drag the ZIP to Netlify Drop.
4. Set Build Settings (if prompt): `npm run build` / `.next`.

## Configuration
- **Feeds**: Edit `src/lib/rss.js` to change source URLs.
- **Revalidation**: Default is 3600 seconds (1 hour). Edit `export const revalidate = 3600;` in page files to change.

## Troubleshooting
- **Images not showing?** The app attempts to find `og:image` or RSS enclosures. If failing, it falls back to `public/fallback.jpg`.
- **Feed timeout?** Feeds have a 2s timeout. If slow, mock data is shown.

---
© 2025 P-TEK Intelligence Logic Systems
