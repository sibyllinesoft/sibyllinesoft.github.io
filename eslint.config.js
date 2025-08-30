import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        
        // Browser globals (for client-side JS)
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        location: 'readonly',
        scrollY: 'readonly',
        URL: 'readonly',
        HTMLElement: 'readonly',
        customElements: 'readonly',
        lucide: 'readonly'
      }
    },
    rules: {
      // Enforce coding standards
      'no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_' 
      }],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      
      // Style consistency
      'indent': ['error', 2],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      
      // Best practices
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error'
    }
  },
  {
    // Specific rules for Node.js files
    files: ['eleventy.config.js', 'scripts/**/*.js', 'config/**/*.js'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly'
      }
    },
    rules: {
      'no-console': 'off' // Allow console in Node.js files
    }
  },
  {
    // Ignore patterns
    ignores: [
      '_site/**',
      'node_modules/**',
      'src/_data/builtwith/**',
      'backup/**',
      'config/**',
      '*.min.js',
      '*.cjs',
      'test-email-obfuscation.html',
      'verify-cloudflare-setup.cjs',
      'cloudflare-email-setup.cjs',
      'src/_includes/snippets/**/*.js',
      'src/_includes/snippets/**/*.cjs'
    ]
  }
];