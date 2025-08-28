import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import navigationPlugin from '@11ty/eleventy-navigation';
import mermaidPlugin from '@kevingimbel/eleventy-plugin-mermaid';

// Import modularized configurations
import customFilters from './src/_eleventy/filters.js';
import customCollections from './src/_eleventy/collections.js';
import passthroughConfig from './src/_eleventy/passthrough.js';

// Centralized path configuration
const PATHS = {
  input: 'src',
  output: '_site',
  includes: '_includes',
  layouts: '_includes/layouts',
  
  // Content paths
  articles: 'src/articles/*.md',
  
  // Asset paths
  css: 'src/css',
  img: 'src/img',
  js: 'src/js',
  styles: 'src/styles',
  
  // Root files for GitHub Pages
  rootFiles: ['CNAME', '.nojekyll']
};

export default function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addPlugin(mermaidPlugin);

  // Configure passthrough copy
  passthroughConfig.setup(eleventyConfig, PATHS);

  // Add custom filters
  Object.keys(customFilters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, customFilters[filterName]);
  });

  // Add custom collections
  Object.keys(customCollections).forEach(collectionName => {
    eleventyConfig.addCollection(collectionName, function(collectionApi) {
      return customCollections[collectionName](collectionApi, PATHS);
    });
  });

  return {
    dir: {
      input: PATHS.input,
      output: PATHS.output,
      includes: PATHS.includes,
      layouts: PATHS.layouts
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
}