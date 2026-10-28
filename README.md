# Gainleadx — Independent Investigative Journalism & Controversial UK Debates

A pixel-perfect, responsive broadsheet investigative blog and publishing platform built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Sanity CMS.

---

## 🌟 Publication Focus & Key Features

- **Hard-Hitting Controversial UK Debates**:
  - Independent investigative reporting on Britain's most critical public debates: NHS privatisation and PFI debt, the Small Boats & Channel asylum procurement crisis, the two-child benefit cap, London ghost mansions & offshore land banking, the Crown's sovereign wealth exemptions, water company dividend extraction & sewage spills, and civil liberties under modern public order acts.
- **British Broadsheet Newspaper Aesthetic**:
  - Centered high-contrast Didone nameplate `GAINLEADX`, live London GMT clock dateline, double-rules, and authoritative editorial typography.
  - Whistleblower submission actions and tip-off desk.
- **Category Inquest Submenu**:
  - Categorized by urgent UK debates: `POLITICS`, `IMMIGRATION`, `NHS & HEALTH`, `ECONOMY & HOUSING`, `CIVIL LIBERTIES`, `MONARCHY`.
- **HiAnime-Style Ranked Carousel & Spotlight Slider**:
  - Continuous 60fps auto-sliding ticker of top trending UK debates and animated spotlight inquest cards with smooth pause on hover.
- **Confidential Whistleblower Desk**:
  - Encrypted, anonymous evidence submission desk with source protection guidelines.
- **Hidden Sanity CMS Studio Route**:
  - Fully functional headless CMS at `/studio` for editors, with all public-facing CMS studio badges and mentions discreetly hidden from visitors.

---

## 🛠️ Sanity CMS Backend Schema

The Sanity backend schema (`sanity/schemaTypes/post.ts`) defines the document model:

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The editorial title of the blog post |
| `slug` | `slug` | Auto-generated from title |
| `isFeatured` | `boolean` | Toggles the prominent overlapping hero card presentation |
| `category` | `string` | **Populates the vertical left-edge watermark/label** |
| `mainImage` | `image` | Responsive image with hotspot cropping and alt text |
| `excerpt` | `text` | Clean sans-serif summary paragraph |
| `publishedAt` | `datetime` | Publication timestamp |
| `body` | `array` | Rich portable text blocks with headings, quotes, links |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Sanity CMS (Optional)
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Add your Sanity Project ID and Dataset.
*(Note: If no Sanity credentials are provided, the site automatically boots in Demo Mode with the exact curated fallback dataset matching the design!)*

### 3. Launch Development Server
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) to view the blog.
- Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage content in Sanity Studio directly inside Next.js!
