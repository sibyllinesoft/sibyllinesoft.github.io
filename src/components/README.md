# Component Library

A collection of reusable, accessible, and themeable HTML components for the Sibylline Software website.

## Design Principles

- **Semantic HTML**: All components use proper HTML5 semantic elements
- **Accessibility First**: WCAG 2.1 AA compliant with proper ARIA attributes
- **CSS Custom Properties**: Themeable using CSS custom properties for colors, spacing, and typography
- **Progressive Enhancement**: Components work without JavaScript and are enhanced with JS when available
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Component Architecture

Each component follows these conventions:

### CSS Custom Properties
Components use a consistent naming pattern for CSS custom properties:
```css
--component-property-modifier: value;
```

### Data Attributes
Configuration is handled through data attributes:
```html
<div data-component="component-name" data-variant="variant-name">
```

### CSS Classes
Classes follow BEM (Block Element Modifier) methodology:
```css
.component {}
.component__element {}
.component--modifier {}
```

## Available Components

### Layout Components
- **Card Container** (`card-container.html`) - Generic card layout with header, body, and footer
- **Modal Template** (`modal-template.html`) - Accessible modal dialog with backdrop

### UI Components  
- **Icon Component** (`icon-component.html`) - Scalable icon system with accessibility support
- **Loading Spinner** (`loading-spinner.html`) - Animated loading indicator
- **CTA Section** (`cta-section.html`) - Call-to-action section with button and content

## Theme Variables

Global CSS custom properties that all components use:

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --color-error: #dc2626;
  --color-success: #16a34a;
  --color-warning: #d97706;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Typography */
  --font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-heading: 'Inter', var(--font-family-primary);
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Border Radius */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 0.75rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;

  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

## Usage Guidelines

### Including Components
Components can be included in your HTML templates using server-side includes or by copying the component markup.

### Customization
Override CSS custom properties to customize component appearance:

```css
.my-custom-card {
  --card-background: var(--color-primary);
  --card-text-color: white;
  --card-border-radius: var(--border-radius-xl);
}
```

### JavaScript Enhancement
Components that require JavaScript functionality should:
1. Work without JavaScript (progressive enhancement)
2. Use data attributes for configuration
3. Follow consistent event naming patterns
4. Be accessible via keyboard navigation

## Browser Support

Components are tested and supported in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

All components follow WCAG 2.1 AA guidelines and include:
- Proper semantic markup
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader compatibility

## Contributing

When adding new components:
1. Follow the established naming conventions
2. Include proper accessibility attributes
3. Use CSS custom properties for theming
4. Add usage examples in component comments
5. Test with keyboard navigation and screen readers
6. Update this README with component documentation