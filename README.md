# Sibylline Software 🔮

- https://sibyllinesoft.github.io/

The official website for Sibylline Software, built with the [Eleventy static site generator](https://github.com/11ty/eleventy/). This project is based on the official 11ty.dev theme and architecture.

## Project Goal

This website serves as the digital presence for Sibylline Software, showcasing our innovative AI-powered products and services. Built with Eleventy, it demonstrates modern static site generation principles while maintaining excellent performance and developer experience.

## Architecture Overview

The site follows Eleventy's recommended structure with some custom enhancements:

### Key Directories
- **`src/`** - Source files for the website
  - **`_includes/`** - Reusable templates, layouts, and components
  - **`_data/`** - Global data files and configuration
  - **`articles/`** - Blog posts and articles (Markdown files)
  - **`components/`** - Reusable UI components
  - **`styles/`** - CSS styling files
  - **`img/`** - Static images and assets
- **`_site/`** - Generated output (auto-created during build)
- **`eleventy.config.js`** - Main Eleventy configuration

### Core Logic Location
- **Filters**: Date formatting, array manipulation (in `eleventy.config.js`)
- **Collections**: Article grouping and filtering (in `eleventy.config.js`)
- **Passthrough Copy**: Static asset handling (CSS, JS, images)

## Running Locally

```bash
# Install dependencies
npm install

# Fetch latest community data from 11ty ecosystem
npm run get-new-data

# Start development server
npm start
# Alternative: npx @11ty/eleventy --serve
```

Browse to http://localhost:8091/ (configured port, will bump if taken).

## Available Scripts

### Development Scripts
- **`npm start`** - Start development server with live reload (port 8091)
- **`npm run start-production`** - Start server with production environment variables

### Build Scripts  
- **`npm run build`** - Build the site for development
- **`npm run build-production`** - Full production build with data refresh and search indexing

### Data Management Scripts
- **`npm run get-new-data`** - Fetch latest community projects from [11ty/11ty-community](https://github.com/11ty/11ty-community)
  - Removes existing `./src/_data/builtwith/` directory
  - Downloads fresh community data using `degit`
  - Required for showcasing community projects

### Quality Assurance Scripts
- **`npm run format`** - Format code using Prettier
- **`npm run check-links`** - Validate internal links in generated site
- **`npm run create-search-index`** - Generate search index using Pagefind

## Content Management

### Adding New Articles
1. Create a new Markdown file in `src/articles/`
2. Use this frontmatter template:
```yaml
---
title: "Your Article Title"
date: 2024-01-15
published: true
excerpt: "Brief description for listings"
---
```
3. Articles with `published: false` won't appear in public listings but are available at `/articles/allArticles/`

### Adding Components
1. Create HTML files in `src/components/`
2. Components are automatically available at `/components/[component-name]/`
3. Follow the existing naming convention (kebab-case)

### Hexborne mailing list

The Hexborne article includes its signup section immediately after the closing call to action. The live form is [Hexborne updates](https://hexborne.kit.com/4964b43368), managed in [Kit](https://app.kit.com/forms/designers/9912213/edit). Public embed values are stored in `src/_data/hexborneMailingList.json`.

The account uses Kit's free plan. New subscribers must confirm their email address. The sender is `Nathan at Hexborne <nathan@sibylline.dev>`. To replace the form:

1. Create an inline form in Kit under **Grow → Landing Pages & Forms**.
2. In **Embed → JavaScript**, copy the script's `data-uid` into `uid` and its `src` into `embedUrl`.
3. Copy the form's direct link from **Embed → Share** into `signupUrl`. This also provides a signup link when JavaScript is disabled or the embed is blocked.
4. Run `npm run build` and check the article. Set its `published` frontmatter to `true` when the signup is ready.

Use the public embed values only; no API key is needed. The integration follows [Kit's form embedding instructions](https://help.kit.com/en/articles/4009572-form-embedding-basics). If only `signupUrl` is configured, the section links to the hosted signup page. Until a form is configured, it displays a coming-soon message and does not collect email addresses.

Kit's sending-domain records are configured in Cloudflare DNS for `sibylline.dev`: the `ckespa` CNAME, `cka._domainkey` and `cka2._domainkey` DKIM CNAMEs, and the `_dmarc` TXT record. Keep the CNAMEs set to **DNS only**. Check sending-domain verification in Kit's email settings if delivery stops working.

Setup verification on 2026-09-13: the embedded form accepted a test signup, its confirmation email from `nathan@sibylline.dev` arrived in Gmail's inbox, and the confirmation link completed the subscription. All four DNS records resolve publicly, but Kit still reports a sending-domain validation mismatch. Recheck **Validate** in [Kit's email settings](https://app.kit.com/account_settings/email) after DNS propagation; domain authentication is not yet confirmed by Kit.

## Technology Stack

- **Static Site Generator**: Eleventy 4.0 (alpha)
- **Template Engine**: Nunjucks for layouts, Markdown for content
- **Styling**: Custom CSS with component-based architecture
- **Search**: Pagefind for client-side search
- **Hosting**: GitHub Pages with custom domain
- **Package Manager**: npm with Node.js 20+

### Hexborne screenshot gallery

The Hexborne article includes a ten-image gallery after its gameplay introduction. Edit `src/_data/hexborneGallery.json` to change the order, captions, or image paths. Images in `src/img/hexborne/` are 1920×1080 WebP screenshots with separate 320×180 thumbnails. The gallery supports thumbnail selection, previous/next controls, arrow keys, touch swipes, and a native dialog viewer. Escape closes the viewer and returns focus to the image link. Image links remain usable without JavaScript.

Captured from the local Godot 4.7 Mono game on September 13, 2026, using the presented AI match runner with seed 71017. The collection includes the title screen, ley transit loading screen, and Temperate, Gloamfen, Ember Badlands, and Snow matches around round three. Gameplay captures use camera zooms of 0.65, 1.8, and 4.5. The original PNGs and temporary capture driver are retained locally in `/tmp/hexborne-article-captures/`; the driver was removed from the game source after capture.
