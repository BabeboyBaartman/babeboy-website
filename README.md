# Babeboy Fashion & Lifestyle Website

A static, multi-page marketing website for **Babeboy Fashion & Lifestyle**, a fictional clothing and accessories retail store based in Bloemfontein, Free State, South Africa. The site showcases the store's product catalogue, promotions, and contact information, and is built as a foundation that can later be extended to support online ordering and payment.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)

| | |
|---|---|
| **Organisation** | Babeboy Fashion & Lifestyle |
| **Industry** | Clothing & Fashion (Retail) |
| **Location** | Bloemfontein, Free State, South Africa |
| **Site type** | Static, client-side rendered, multi-page website |
| **Purpose** | Advertise products online, promote offers, and provide a contact channel for a physical retail store |

The site does **not** currently process real transactions, it is an informational and promotional front end. Product data is bundled with the site rather than served by a backend/database.

## Tech Stack

This project intentionally uses **no build tools, frameworks, or package managers**. It is written in plain, framework-free code so it can be understood, maintained, and extended by a beginner developer.

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (hand-written, no preprocessor or framework) |
| Behaviour | JavaScript  |
| Maps | Embedded Google Maps  |

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
