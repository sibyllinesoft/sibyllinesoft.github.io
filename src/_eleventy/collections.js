/**
 * Custom Eleventy collections for the Sibylline Software website
 */

export default {
  /**
   * Published articles collection - only shows articles with published: true
   * @param {CollectionAPI} collectionApi - Eleventy collection API
   * @returns {Array} Array of published articles in reverse chronological order
   */
  articles: (collectionApi, paths) => {
    return collectionApi.getFilteredByGlob(paths.articles)
      .filter(item => item.data.published === true)
      .reverse();
  },

  /**
   * All articles collection - includes both published and unpublished articles
   * Useful for admin purposes and drafts review
   * @param {CollectionAPI} collectionApi - Eleventy collection API
   * @returns {Array} Array of all articles in reverse chronological order
   */
  allArticles: (collectionApi, paths) => {
    return collectionApi.getFilteredByGlob(paths.articles)
      .reverse();
  }
};