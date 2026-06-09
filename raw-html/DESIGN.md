---
name: Monolith Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 88px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
spacing:
  section-gap: 120px
  element-gap: 32px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  max-width: 1200px
---

## Brand & Style
The design system is rooted in the principles of high-end editorial design and intellectual clarity. It is designed to feel authoritative yet invisible, allowing content to lead the experience. The style is a hyper-minimalist execution of modern corporate identity, emphasizing precision, extreme scale contrast, and an uncompromising rejection of decorative elements like gradients or shadows.

The target audience consists of professionals, researchers, and discerning readers who value focus and readability over visual noise. The emotional response is one of calm, sophisticated intelligence and premium quality. It draws heavily from **Minimalism** and **Modern Editorial** movements, utilizing a restricted palette to create a sense of timeless reliability.

## Colors
The palette is strictly monochromatic to ensure maximum focus on information hierarchy. 

- **Primary (#000000):** Used for headlines, primary actions, and badges. It represents authority and permanence.
- **Secondary (#666666):** Reserved for secondary labels, metadata, and placeholder text to provide a clear visual step-down from the primary content.
- **Surface (#F5F5F5):** A very light gray used for card backgrounds and subtle section differentiation without breaking the minimalist aesthetic.
- **Background (#FFFFFF):** The foundation of the design system. Absolute white is used to provide the "breathable" space required for an editorial feel.

## Typography
Typography is the primary tool for expression in this design system. We use **Inter** for its neutral, systematic clarity. 

Key principles:
- **Extreme Contrast:** Headlines are intentionally oversized and tightly tracked to create a "commanding" presence against the generous whitespace.
- **Legibility:** Body text uses a generous 1.6x line-height to ensure comfort during long-form reading.
- **Case Styling:** Small labels and badges often utilize uppercase with slight letter-spacing to distinguish them as functional elements rather than narrative text.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to maintain the integrity of a centered editorial column, while transitioning to a fluid model on mobile.

- **Massive Whitespace:** A minimum of 120px (or 7.5rem) is required between major content sections. This "luxury of space" is what defines the premium feel.
- **Vertical Rhythm:** Elements within a section (e.g., a headline followed by a paragraph) should be spaced at 32px to maintain a clear relationship while avoiding clutter.
- **Grid:** A 12-column grid is used for desktop. For long-form text, content should be restricted to a 6 or 8-column span to prevent line lengths from becoming too wide for comfortable reading.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Flat Outlines** rather than shadows. 

- **Level 0 (Background):** Pure #FFFFFF.
- **Level 1 (Containers):** Soft neutral surfaces (#F5F5F5) or thin 1px solid borders (#000000 or #E5E5E5).
- **No Shadows:** Avoid box-shadows or blurs entirely. To indicate that an element is interactive or "above" the background, use a solid black fill or a defined 1px border.
- **Interaction:** Hover states should be binary (e.g., an outlined button becomes a solid fill, or text decoration appears/disappears).

## Shapes
This design system uses a **Sharp (0px)** roundedness strategy. Every element—including buttons, input fields, and cards—must have perfectly square corners. This reinforces the architectural, grid-based nature of the editorial style and distinguishes it from softer, consumer-grade SaaS interfaces.

## Components
- **Buttons:** Solid #000000 background with #FFFFFF text. No border-radius. High-contrast and utilitarian. Secondary buttons are 1px black outlines with black text.
- **Badges:** Small, rectangular tags with #000000 backgrounds and #FFFFFF labels in `label-bold` style. Used for categories or status.
- **Cards:** Use either a 1px #E5E5E5 border on a white background or a solid #F5F5F5 background with no border. Padding should be generous (min 40px).
- **Input Fields:** 1px solid black bottom border only, or a full 1px light gray rectangle. Focus state is a 2px solid black border.
- **Lists:** Separated by 1px light gray horizontal rules. Ample vertical padding (24px+) between list items.
- **Dividers:** Minimal 1px lines. Use sparingly to separate distinct content blocks when whitespace alone is insufficient.