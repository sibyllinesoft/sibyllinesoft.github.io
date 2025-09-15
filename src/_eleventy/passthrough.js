/**
 * Passthrough copy configuration for the Sibylline Software website
 * Defines which files and directories should be copied directly to the output
 */

export default {
  /**
   * Configure all passthrough copy rules
   * @param {EleventyConfig} eleventyConfig - Eleventy configuration object
   * @param {Object} paths - Centralized paths configuration
   */
  setup: (eleventyConfig, paths) => {
    // Copy static assets
    eleventyConfig.addPassthroughCopy(paths.css);
    eleventyConfig.addPassthroughCopy(paths.img);
    eleventyConfig.addPassthroughCopy(paths.js);
    eleventyConfig.addPassthroughCopy(paths.styles);
    
    // Copy analysis models and JavaScript modules
    eleventyConfig.addPassthroughCopy('src/analysis');
    
    // Copy CNAME and other root files for GitHub Pages
    paths.rootFiles.forEach(file => {
      eleventyConfig.addPassthroughCopy(file);
    });
  }
};