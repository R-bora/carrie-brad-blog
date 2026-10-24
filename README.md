# Carrie Brad Editorial Blog & Sanity CMS Backend

A pixel-perfect, responsive editorial blog modeled after high-end Showit templates, integrated with Next.js 14 App Router, TypeScript, Tailwind CSS, and a Sanity CMS publishing backend.

---

## 🌟 Key Features & Design Details

- **Pixel-Perfect Header**:
  - Logo "CARRIE BRAD" on the far left with signature editorial letter spacing.
  - Centered navigation links: `HOME`, `ABOUT`, `SERVICES`, `PORTFOLIO`, `BLOG`, `CONTACT`.
  - Solid black uppercase `CONTACT` pill button alongside crisp Instagram and Facebook icons.
- **Moody Hero Section**:
  - Dark smoky atmospheric background texture with Didone serif title `THE BLOG`.
  - Centered uppercase tracking subtitle: *"STAY UP TO DATE ON TIPS, TRICKS, & TRENDS FOR SOCIAL MEDIA & DIGITAL MARKETING"*.
- **Category Submenu**:
  - Flowing cursive script *"Browse the blog :"* on the left.
  - Horizontally spaced uppercase category filters (`SOCIAL MEDIA`, `WELLNESS`, `BUSINESS`, `COPYWRITING`) with dynamic interactive filtering.
- **Featured Post with Overlapping Layout**:
  - Warm flatlay photography with book, eyeglasses, and coffee.
  - Dark circular badge titled `READ THE LATEST` rotated on the top-left edge of the image.
  - Crisp white content box overlapping the right edge of the image with all-caps serif headline, sans-serif excerpt, and sand-toned `READ POST` button.
- **3-Column Grid with Strict Typography Hierarchy**:
  - **Vertical Category Text**: Each thumbnail features vertical uppercase category text running along its left edge (`SMALL BUSINESS`, `COPYWRITING`, `SOCIAL MEDIA`, `PERSONAL`, `MARKETING`, `REAL ESTATE`).
  - **Strict Font Order below thumbnail**:
    1. High-contrast **Serif Title**
    2. Legible **Sans-serif Excerpt**
    3. Centered **Italicized *Read More* ⟶** link with arrow.

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
