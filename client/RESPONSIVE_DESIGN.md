# Responsive Design System

## Overview

This document outlines the responsive design system implemented in the TehWiz e-commerce platform. The design follows a mobile-first approach using TailwindCSS with custom responsive utilities.

## Breakpoints

| Breakpoint | Prefix | Min Width | Use Case |
|------------|--------|-----------|----------|
| Mobile | `sm:` | 640px | Small tablets and phones |
| Tablet | `md:` | 768px | Tablets and small laptops |
| Desktop | `lg:` | 1024px | Desktop screens |
| Large Desktop | `xl:` | 1280px | Large desktop screens |
| Extra Large | `2xl:` | 1536px | Very large screens |

## Responsive Grid System

### Product Grids
- **Mobile (1 column)**: `grid-cols-1`
- **Tablet (2 columns)**: `sm:grid-cols-2`
- **Desktop (3-4 columns)**: `lg:grid-cols-3 xl:grid-cols-4`

### Category Grids
- **Mobile (2 columns)**: `grid-cols-2`
- **Tablet (3 columns)**: `sm:grid-cols-3`
- **Desktop (6 columns)**: `lg:grid-cols-6`

## Typography Scale

### Responsive Text Sizes
```css
/* Mobile-first approach */
text-xs    /* 0.75rem - 12px */
text-sm    /* 0.875rem - 14px */
text-base  /* 1rem - 16px */
text-lg    /* 1.125rem - 18px */
text-xl    /* 1.25rem - 20px */
text-2xl   /* 1.5rem - 24px */
text-3xl   /* 1.875rem - 30px */
text-4xl   /* 2.25rem - 36px */
text-5xl   /* 3rem - 48px */
```

### Responsive Typography Pattern
```jsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>
```

## Spacing System

### Responsive Padding/Margin
```css
/* Mobile-first spacing */
p-4 sm:p-6 lg:p-8    /* Padding */
m-4 sm:m-6 lg:m-8    /* Margin */
gap-4 sm:gap-6 lg:gap-8  /* Grid gaps */
```

### Container Spacing
```css
.container-responsive {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

## Component Patterns

### Header Component
- **Mobile**: Collapsible menu with hamburger icon
- **Tablet+**: Full navigation with search bar
- **Desktop**: All elements visible with proper spacing

### Product Cards
- **Mobile**: Single column, stacked layout
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns with hover effects

### Forms
- **Mobile**: Stacked inputs, full-width buttons
- **Desktop**: Side-by-side layouts where appropriate

## Custom Utilities

### Aspect Ratios
```css
.aspect-square    /* 1:1 ratio */
.aspect-video     /* 16:9 ratio */
.aspect-photo     /* 4:3 ratio */
```

### Line Clamping
```css
.line-clamp-1     /* Single line with ellipsis */
.line-clamp-2     /* Two lines with ellipsis */
.line-clamp-3     /* Three lines with ellipsis */
```

### Responsive Visibility
```css
.mobile-only      /* Visible only on mobile */
.mobile-hidden    /* Hidden on mobile */
.tablet-only      /* Visible only on tablet */
.desktop-only     /* Visible only on desktop */
```

## Animation System

### Responsive Animations
```css
.animate-fade-in    /* Fade in animation */
.animate-slide-up   /* Slide up animation */
.animate-slide-down /* Slide down animation */
.animate-scale-in   /* Scale in animation */
```

## Best Practices

### 1. Mobile-First Approach
- Start with mobile styles
- Add responsive modifiers for larger screens
- Use `sm:`, `md:`, `lg:`, `xl:` prefixes

### 2. Flexible Images
- Use `aspect-ratio` utilities
- Implement `object-cover` for consistent sizing
- Add `max-width: 100%` for responsive images

### 3. Touch-Friendly Design
- Minimum 44px touch targets on mobile
- Adequate spacing between interactive elements
- Clear visual feedback for touch interactions

### 4. Performance Considerations
- Use `transform` and `opacity` for animations
- Implement lazy loading for images
- Optimize for mobile data usage

### 5. Accessibility
- Maintain proper contrast ratios
- Ensure keyboard navigation works
- Provide alternative text for images

## Component Examples

### Responsive Product Card
```jsx
<div className="card-responsive">
  <div className="aspect-square overflow-hidden">
    <img 
      src={product.image} 
      alt={product.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  <div className="p-3 sm:p-4">
    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1 text-sm sm:text-base line-clamp-2">
      {product.name}
    </h3>
    <div className="flex items-center justify-between">
      <span className="text-base sm:text-lg font-bold text-blue-600">
        ${product.price}
      </span>
      <div className="flex items-center">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="text-xs sm:text-sm text-gray-600 ml-1">
          {product.rating}
        </span>
      </div>
    </div>
  </div>
</div>
```

### Responsive Button
```jsx
<button className="btn-primary">
  Add to Cart
</button>
```

### Responsive Input
```jsx
<input 
  type="text" 
  placeholder="Search products..."
  className="input-responsive"
/>
```

## Testing Checklist

- [ ] Test on mobile devices (320px - 768px)
- [ ] Test on tablets (768px - 1024px)
- [ ] Test on desktop (1024px+)
- [ ] Verify touch interactions work properly
- [ ] Check that text remains readable at all sizes
- [ ] Ensure images scale appropriately
- [ ] Test navigation functionality on all screen sizes
- [ ] Verify forms are usable on mobile devices
- [ ] Check that animations perform well on mobile
- [ ] Test with different browser zoom levels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Future Enhancements

1. **Container Queries**: Implement when browser support improves
2. **CSS Grid Subgrid**: For more complex layouts
3. **Logical Properties**: For better RTL support
4. **CSS Custom Properties**: For dynamic theming
5. **Intersection Observer**: For performance optimizations

---

*This responsive design system ensures a consistent and optimal user experience across all devices and screen sizes.* 