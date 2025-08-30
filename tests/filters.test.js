import { describe, it, expect } from 'vitest';
import customFilters from '../src/_eleventy/filters.js';

describe('Custom Eleventy Filters', () => {
  describe('readableDate filter', () => {
    it('should format a valid date object correctly', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const result = customFilters.readableDate(date);
      // Note: toLocaleDateString() output can vary by locale, so we test format
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should format a valid date string correctly', () => {
      const dateString = '2024-01-15';
      const result = customFilters.readableDate(dateString);
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('should return empty string for null input', () => {
      expect(customFilters.readableDate(null)).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(customFilters.readableDate(undefined)).toBe('');
    });

    it('should return empty string for invalid date', () => {
      expect(customFilters.readableDate('invalid-date')).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(customFilters.readableDate('')).toBe('');
    });
  });

  describe('htmlDateString filter', () => {
    it('should format a valid date object to YYYY-MM-DD', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const result = customFilters.htmlDateString(date);
      expect(result).toBe('2024-01-15');
    });

    it('should format a valid date string to YYYY-MM-DD', () => {
      const dateString = '2024-01-15T12:00:00Z';
      const result = customFilters.htmlDateString(dateString);
      expect(result).toBe('2024-01-15');
    });

    it('should return empty string for null input', () => {
      expect(customFilters.htmlDateString(null)).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(customFilters.htmlDateString(undefined)).toBe('');
    });

    it('should return empty string for invalid date', () => {
      expect(customFilters.htmlDateString('invalid-date')).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(customFilters.htmlDateString('')).toBe('');
    });
  });

  describe('head filter', () => {
    const testArray = [1, 2, 3, 4, 5];

    it('should return first n elements when n is positive', () => {
      expect(customFilters.head(testArray, 3)).toEqual([1, 2, 3]);
      expect(customFilters.head(testArray, 1)).toEqual([1]);
      expect(customFilters.head(testArray, 0)).toEqual([]);
    });

    it('should return last n elements when n is negative', () => {
      expect(customFilters.head(testArray, -2)).toEqual([4, 5]);
      expect(customFilters.head(testArray, -1)).toEqual([5]);
    });

    it('should return entire array when n is larger than array length', () => {
      expect(customFilters.head(testArray, 10)).toEqual(testArray);
    });

    it('should work with empty array', () => {
      expect(customFilters.head([], 3)).toEqual([]);
      expect(customFilters.head([], -1)).toEqual([]);
    });

    it('should work with string arrays', () => {
      const stringArray = ['a', 'b', 'c', 'd'];
      expect(customFilters.head(stringArray, 2)).toEqual(['a', 'b']);
      expect(customFilters.head(stringArray, -1)).toEqual(['d']);
    });
  });
});