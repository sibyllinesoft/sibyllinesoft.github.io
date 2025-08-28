import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js', 'src/**/*.test.js'],
    exclude: [
      'node_modules/**',
      '_site/**',
      'backup/**',
      'src/_data/builtwith/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'src/_eleventy/**/*.js',
        'scripts/**/*.js',
        'eleventy.config.js'
      ],
      exclude: [
        'tests/**',
        'src/_data/**',
        'src/_includes/**',
        'src/js/**' // Exclude browser JS from coverage for now
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
});