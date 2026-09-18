# Babeboy Fashion & Lifestyle — Website

A static, multi-page marketing website for **Babeboy Fashion & Lifestyle**, a fictional clothing and accessories retail store based in Bloemfontein, Free State, South Africa. The site showcases the store's product catalogue, promotions, and contact information, and is built as a foundation that can later be extended to support online ordering and payment.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Pages](#pages)
6. [Data Model](#data-model)
7. [Architecture Notes](#architecture-notes)
8. [Styling & Design System](#styling--design-system)
9. [Configuration & Customisation](#configuration--customisation)
10. [Browser Support](#browser-support)
11. [Known Limitations](#known-limitations)
12. [Roadmap](#roadmap)
13. [Credits](#credits)

---

## Overview

| | |
|---|---|
| **Organisation** | Babeboy Fashion & Lifestyle |
| **Industry** | Clothing & Fashion (Retail) |
| **Location** | Bloemfontein, Free State, South Africa |
| **Site type** | Static, client-side rendered, multi-page website |
| **Purpose** | Advertise products online, promote offers, and provide a contact channel for a physical retail store |

The site does **not** currently process real transactions — it is an informational and promotional front end. Product data is bundled with the site rather than served by a backend/database.

## Tech Stack

This project intentionally uses **no build tools, frameworks, or package managers**. It is written in plain, framework-free code so it can be understood, maintained, and extended by a beginner developer.

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (hand-written, no preprocessor or framework) |
| Behaviour | Vanilla JavaScript (ES6, no libraries) |
| Data | JavaScript array literal (`data/products.js`) |
| Maps | Embedded Google Maps (`iframe`) |
| Images | Hotlinked stock photography ([loremflickr.com](https://loremflickr.com)) |

There is no server-side code, database, or API in this repository. Everything runs entirely in the browser.

## Project Structure

```
babeboy-website/
├── index.html          # Homepage
├── about.html           # About Us page
├── products.html         # Product catalogue with category filtering
├── offers.html           # Special offers / promotions
├── gallery.html          # Image gallery
├── contact.html          # Contact details, maps, contact form
├── enquiry.html           # Product enquiry form
│
├── css/
│   └── style.css         # Single global stylesheet for all pages
│
├── js/
│   └── script.js         # All client-side behaviour (see below)
│
├── data/
│   └── products.js        # Product catalogue, as a JS array (the "database")
│
├── images/               # (empty by default) Place local product photos here
├── documents/             # (empty by default) Project documentation/research
│
└── README.md              # This file
```

This structure follows the file organisation defined in the project brief: separate folders for CSS, JS, images, documents, and (optionally) additional pages.

## Getting Started

No installation, build step, or package manager is required.

### Option A — Open directly (simplest)

1. Unzip/clone the project folder.
2. Double-click `index.html` to open it in your default browser.

This works out of the box because product data is loaded via a `<script src="data/products.js">` tag rather than `fetch()`. A `<script>` tag can read a local file directly, so there are no CORS restrictions to work around.

### Option B — Serve locally (recommended for development)

Serving the folder over HTTP is still good practice once you start adding real assets, testing on multiple devices, or deploying:

```bash
# From inside the babeboy-website/ folder
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

### Deployment

Because this is a fully static site (HTML/CSS/JS only, no server-side processing), it can be deployed to any static hosting provider without configuration, for example:

- GitHub Pages
- Netlify
- Vercel
- Any standard shared web hosting / cPanel account

Simply upload the contents of the `babeboy-website/` folder to the host's public directory (e.g. `public_html`).

## Pages

| File | Description |
|---|---|
| `index.html` | Hero banner, brief intro, 4 featured products (pulled dynamically from `data/products.js`), promotion teaser |
| `about.html` | Business history, mission, vision, core values, and team |
| `products.html` | Full product catalogue with a working **category filter** (All / T-Shirts / Jeans / Jackets / Sneakers / Caps / Bags / Accessories) |
| `offers.html` | Current promotions and discounts |
| `gallery.html` | Photo gallery of the store and products |
| `contact.html` | Phone, email, physical address, business hours, social links, **two embedded maps** (main store + second location), and a contact form |
| `enquiry.html` | A product-specific enquiry form (name, email, phone, product of interest, message) |

Every page shares the same `<header>` navigation bar (with a mobile hamburger menu) and `<footer>`, both defined directly in each HTML file (see [Known Limitations](#known-limitations) regarding duplication).

## Data Model

Product data lives in **`data/products.js`** as a single JavaScript constant, `PRODUCTS`, which is an array of product objects:

```js
const PRODUCTS = [
  {
    id: 1,                                   // Number — unique identifier
    name: "Classic Black T-Shirt",           // String — product name
    category: "T-Shirts",                    // String — must match a value used in the filter buttons on products.html
    price: 199,                              // Number — price in South African Rand (no currency symbol, no decimals)
    image: "https://loremflickr.com/...",     // String — image URL or local path (e.g. "images/tshirt1.jpg")
    description: "A comfortable, everyday..." // String — short product description
  },
  // ...more products
];
```

### Why a `.js` file instead of `.json`?

The original prototype stored data in `data/products.json` and loaded it with `fetch()`. This was changed to `data/products.js` (a plain JS file that declares the `PRODUCTS` array) because:

- `fetch()` requests to local files fail in most browsers under the `file://` protocol due to CORS restrictions, meaning the site would only work when served from a local/remote web server.
- A `<script src="data/products.js">` tag has no such restriction — the browser simply parses it as JavaScript, so the site works identically whether it's opened directly or served over HTTP.
- It keeps the project dependency-free and simple to understand for a beginner developer, with no asynchronous loading, network requests, or error handling for failed fetches to reason about.

### Adding, editing, or removing a product

Open `data/products.js` and edit the `PRODUCTS` array directly:

```js
{
  id: 15,
  name: "New Product Name",
  category: "Accessories",
  price: 259,
  image: "images/my-photo.jpg",
  description: "A short description of the product."
}
```

No other file needs to change — both the homepage (featured products) and the products page (full catalogue + filters) read from this same array automatically.

## Architecture Notes

### `js/script.js`

All interactive behaviour is implemented in a single script, loaded on every page. Each responsibility is isolated in its own clearly-commented section:

| Section | Responsibility |
|---|---|
| 1. Mobile Navigation Menu | Toggles the `.show` class on the nav list when the hamburger icon is clicked |
| 2. Product Rendering | `loadProducts(targetElementId, limit)` reads from the global `PRODUCTS` array and renders product cards into a given container. `displayProducts()` builds the actual card markup |
| 3. Category Filtering | `setupFilterButtons()` wires up the filter buttons on `products.html` to re-render `PRODUCTS` filtered by category |
| 4. Enquiry Form | Intercepts form submission (`preventDefault`), shows a confirmation message, and resets the form |
| 5. Contact Form | Same pattern as the enquiry form |
| 6. Footer Year | Sets the current year in the footer automatically via `Date().getFullYear()` |

Each function checks whether its target element exists on the current page before running, so the same `script.js` file can safely be shared across all seven pages without errors.

**Script load order matters.** `data/products.js` must be included *before* `js/script.js` in any page that renders products, since `script.js` reads the `PRODUCTS` global variable at call time:

```html
<script src="data/products.js"></script>
<script src="js/script.js"></script>
<script>
  loadProducts("featuredProducts", 4); // page-specific call
</script>
```

### No client-side routing / no SPA framework

Each `.html` file is a standalone page with its own `<head>`, navigation, and footer. Navigating between pages is a full page load (standard multi-page website behaviour), not a single-page application. This keeps the project easy to reason about and consistent with the "pure HTML/CSS/JS, no advanced programming" requirement.

## Styling & Design System

All styling is centralised in `css/style.css` and driven by CSS custom properties defined once in `:root`:

```css
:root {
  --color-black: #111111;
  --color-white: #ffffff;
  --color-gold: #d4af37;
  --color-light-grey: #f5f5f5;
  --color-dark-grey: #333333;
}
```

| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#111111` | Header, footer, hero backgrounds |
| `--color-white` | `#ffffff` | Page background, card backgrounds |
| `--color-gold` | `#d4af37` | Accents, links, buttons, highlights |
| `--color-light-grey` | `#f5f5f5` | Alternating section backgrounds |
| `--color-dark-grey` | `#333333` | Body text |

The layout uses CSS Grid (`.grid`, `.gallery-grid`, `.footer-grid`, `.values-grid`) and Flexbox (`.navbar`, `.hero .container`, `.about-block`) for responsiveness, with a single mobile breakpoint:

```css
@media (max-width: 768px) {
  /* Collapses nav into a hamburger menu, stacks the contact grid, etc. */
}
```

## Configuration & Customisation

| What to change | Where |
|---|---|
| Store contact details, business hours | `contact.html` (`.contact-info-item` blocks) |
| Map locations | `contact.html` — replace the search text inside each Google Maps `iframe` `src` attribute |
| Products (add/edit/remove) | `data/products.js` |
| Colour scheme | `css/style.css` → `:root` custom properties |
| Social media links | `.social-icons` blocks in every page's `<footer>` |
| Images | See below |

### Using your own photography instead of stock images

By default, all images are pulled from [loremflickr.com](https://loremflickr.com), a free service that serves real, keyword-matched stock photographs — no attribution or API key required. To replace them with your own photos:

1. Save your image files inside the `images/` folder (e.g. `images/tshirt-black.jpg`).
2. Update the relevant `image` value in `data/products.js` (for products) or the `src` attribute of the relevant `<img>` tag directly in the HTML (for the hero image, About Us photos, team photos, and Gallery photos) to point at your local file, e.g.:
   ```html
   <img src="images/tshirt-black.jpg" alt="Classic Black T-Shirt">
   ```


