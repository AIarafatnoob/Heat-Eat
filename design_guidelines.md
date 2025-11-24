# Design Guidelines: Heat & Eat Home-Cooked Meal Delivery

## Design Approach
Reference-based approach inspired by **Sweetgreen** and **Chipotle's** online ordering interfaces, emphasizing clean food presentation, intuitive selection flows, and appetizing visual hierarchies.

## Color Palette
- **Primary**: #E67E22 (warm orange) - CTAs, active states, brand elements
- **Secondary**: #27AE60 (fresh green) - success states, healthy indicators
- **Accent**: #F39C12 (golden yellow) - highlights, badges, special offers
- **Background**: #FFFFFF (white) - main background
- **Text**: #2C3E50 (dark slate) - body text, headings
- **Cards**: #F8F9FA (light grey) - card backgrounds, sections

## Typography
- **Primary Font**: Poppins (headings, navigation, CTAs)
- **Secondary Font**: Inter (body text, descriptions)
- **Tertiary Font**: Open Sans (nutritional info, captions)

**Hierarchy**:
- Hero headline: Poppins 48px/56px bold
- Section headers: Poppins 36px/42px semibold
- Card titles: Poppins 20px/28px medium
- Body text: Inter 16px/24px regular
- Nutritional data: Open Sans 14px/20px regular
- Navigation: Poppins 15px/22px medium

## Layout System
- **Spacing**: Use Tailwind units of 4, 5, 6, 8, 10, 12, 16, 20 (e.g., p-4, m-8, gap-6)
- **Standard section padding**: py-16 md:py-20 lg:py-24
- **Container max-width**: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- **Card spacing**: 20px gaps between elements
- **Border radius**: rounded-xl (12px) for cards, rounded-lg (8px) for buttons

## Navigation
- **Desktop**: Horizontal navigation with logo left, menu items center, WhatsApp order button right
- **Logo scaling**: Full size initially (h-12), scales to h-10 on scroll, smooth transition-all duration-300
- **Mobile**: Hamburger menu triggering full-screen modal overlay with vertical menu items
- **Sticky behavior**: Fixed position with backdrop-blur and subtle shadow on scroll
- **Z-index**: z-50 to stay above content

## Hero Section
- **Large hero image**: Full-width appetizing home-cooked meal spread (1920x800px recommended)
- **Content overlay**: Centered text with semi-transparent dark overlay (bg-black/40)
- **Headline**: "Crafted with Care, Served with Heart" - white text, Poppins bold
- **Subheadline**: Benefits of home-cooked meals - white text with slight transparency
- **CTA button**: Blurred background (backdrop-blur-md bg-white/20), no hover/active interactions specified
- **Customer reviews carousel**: Positioned below hero, testimonial cards with 5-star ratings, customer photos

## Quick Select Carousel
- **Layout**: Horizontal scrollable carousel with snap-scroll behavior
- **Cards**: Meal cards (280px width) with image, name, price range
- **Multi-select**: Checkbox-style selection with orange border/background when active
- **Size toggle**: Regular/Large buttons below each item, dynamic pricing update
- **Nutritional counter**: Sticky floating card showing running totals (calories, protein, carbs, fats)
- **Visual feedback**: Scale animation on selection (scale-105), orange accent highlight

## Complete Menu Display
- **Grid layout**: 3-column desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), 1-column mobile
- **Card structure**: 
  - Food image (16:9 aspect ratio)
  - Item name (Poppins medium)
  - Pricing with size options
  - Nutritional badges (calories, protein, carbs, fats in pills)
  - Add to order button (primary orange)
- **Items to display**: French Fry, Chicken Nuggets, Chicken Roll, Chicken Boll, Chicken Fry, Vegetable Roll, Naga Shingara, Chicken Kabab, Samucha, Chicken Tikka Kabab
- **Hover state**: Subtle lift with shadow-lg transition

## WhatsApp Integration
- **Sticky order button**: Fixed bottom-right on desktop (bottom-8 right-8), full-width bottom bar on mobile
- **Badge indicator**: Shows item count in orange circle
- **Order summary modal**: Displays selected items, sizes, quantities, total nutritional breakdown
- **WhatsApp message format**: Pre-formatted with emoji separators, line breaks for readability

## Micro-Interactions
- **Scroll animations**: Fade-in on scroll for sections (intersection observer)
- **Card hover**: Gentle lift (translateY -4px) with shadow transition
- **Button ripple**: Subtle scale pulse on click
- **Counter animations**: Number incrementing animation for nutritional values
- **Carousel drag**: Smooth momentum scrolling with visual feedback

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grids, compact spacing)
- Desktop: > 1024px (3-column grids, full features)

## Images Required
1. **Hero image**: Home-cooked meal spread with warm, inviting lighting (1920x800px)
2. **Menu item photos**: High-quality food photography for all 10 items (square 600x600px)
3. **Customer testimonial photos**: 3-4 customer headshots (circular crop)
4. **Logo**: Heat & Eat brand logo (SVG preferred)

## Accessibility
- Minimum touch target: 44x44px for all interactive elements
- Focus indicators: Orange outline (ring-2 ring-orange-500)
- Alt text: Descriptive text for all food images
- ARIA labels: For carousel navigation, modal controls

## Performance Considerations
- Lazy loading for menu item images
- Optimized image sizes with responsive srcset
- CSS animations using transform/opacity only
- Debounced scroll listeners