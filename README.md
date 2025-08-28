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

## Technology Stack

- **Static Site Generator**: Eleventy 4.0 (alpha)
- **Template Engine**: Nunjucks for layouts, Markdown for content
- **Styling**: Custom CSS with component-based architecture
- **Search**: Pagefind for client-side search
- **Hosting**: GitHub Pages with custom domain
- **Package Manager**: npm with Node.js 20+
