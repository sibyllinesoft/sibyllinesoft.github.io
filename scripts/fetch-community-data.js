#!/usr/bin/env node

/**
 * Fetch Community Data Script
 * 
 * Downloads the latest community data from the 11ty-community repository
 * to showcase projects built with Eleventy.
 * 
 * This script:
 * 1. Removes the existing builtwith directory to ensure clean data
 * 2. Uses degit to download the latest built-with-eleventy data
 * 3. Places the data in src/_data/builtwith/ for Eleventy to use
 */

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const dataDir = join(projectRoot, 'src', '_data', 'builtwith');

console.log('🚀 Fetching latest community data from 11ty-community...');

try {
  // Remove existing data directory if it exists
  if (existsSync(dataDir)) {
    console.log('🗑️  Removing existing builtwith directory...');
    rmSync(dataDir, { recursive: true, force: true });
  }

  // Download fresh data using degit
  console.log('📥 Downloading fresh community data...');
  execSync('npx degit github:11ty/11ty-community/built-with-eleventy src/_data/builtwith/', {
    cwd: projectRoot,
    stdio: 'inherit'
  });

  console.log('✅ Community data updated successfully!');
  console.log('💡 The data is now available in src/_data/builtwith/');

} catch (error) {
  console.error('❌ Error fetching community data:', error.message);
  process.exit(1);
}