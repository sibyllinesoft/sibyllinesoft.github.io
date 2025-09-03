/**
 * Custom Eleventy filters for the Sibylline Software website
 */

export default {
  /**
   * Format a date object into a readable string
   * @param {Date|string} dateObj - Date to format
   * @returns {string} Formatted date string or empty string if invalid
   */
  readableDate: (dateObj) => {
    if (!dateObj) {
      return '';
    }
    const date = new Date(dateObj);
    if (isNaN(date.getTime())) {
      return '';
    }
    // Use UTC to avoid timezone issues with date-only strings
    return date.toLocaleDateString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: 'numeric', 
      day: 'numeric'
    });
  },

  /**
   * Format a date object into HTML date string (YYYY-MM-DD format)
   * @param {Date|string} dateObj - Date to format
   * @returns {string} HTML date string or empty string if invalid
   */
  htmlDateString: (dateObj) => {
    if (!dateObj) {
      return '';
    }
    const date = new Date(dateObj);
    if (isNaN(date.getTime())) {
      return '';
    }
    // Use UTC to avoid timezone issues with date-only strings  
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * Get the first n elements of an array
   * @param {Array} array - Source array
   * @param {number} n - Number of elements to take (negative values take from end)
   * @returns {Array} Array slice
   */
  head: (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  }
};