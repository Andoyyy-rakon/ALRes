---
name: Professional Resume System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434653'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737784'
  outline-variant: '#c3c6d5'
  surface-tint: '#1d59c1'
  primary: '#003c90'
  on-primary: '#ffffff'
  primary-container: '#0f52ba'
  on-primary-container: '#bcceff'
  inverse-primary: '#b0c6ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#732900'
  on-tertiary: '#ffffff'
  tertiary-container: '#993900'
  on-tertiary-container: '#ffc0a7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00419c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Public Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 24px
  margin: 32px
  max_width: 1200px
---

## Brand & Style

The design system is built upon a **Corporate Modern** aesthetic, prioritizing clarity, trust, and career advancement. It targets professionals seeking a polished, reliable tool to translate their career history into a compelling narrative. The emotional response is one of calm confidence—removing the friction of document formatting through a systematic, organized interface. 

The style leans into minimalism to ensure the user's content remains the hero. By utilizing generous white space and a restrained color palette, the system reduces cognitive load during the data-entry process. The interface feels "quiet" yet "authoritative," mirroring the qualities of a high-end physical stationery set.

## Colors

The color strategy uses high-contrast foundations for impeccable readability and soft sapphire tones for interaction.

- **Primary (Soft Sapphire):** Used for primary actions, progress indicators, and active states. It conveys reliability and professional ambition.
- **Neutral (Charcoal/Navy):** The core color for headings and body text, providing a grounded, premium feel that is easier on the eyes than pure black.
- **Secondary (Slate Gray):** Reserved for meta-information, labels, and secondary UI elements to maintain a clear visual hierarchy.
- **Surface & Accents:** A base of clean white for work areas, supported by very light gray backgrounds and borders to define sections without adding visual noise.

## Typography

This design system utilizes **Public Sans** for its institutional quality and exceptional readability. It strikes a balance between a neutral utility and a modern, friendly character.

- **Headlines:** Use tighter letter-spacing and heavier weights to create strong anchor points for each resume section.
- **Body Text:** Optimized for long-form reading with generous line heights, ensuring that descriptions of work experience remain legible.
- **Labels:** Small-caps or bolded small-scale text is used for form labels and metadata to differentiate user-entered data from the system's structural text.

## Layout & Spacing

The system employs a **Fixed Grid** layout for the main editor and a fluid structure for dashboard views. 

- **The Work Canvas:** A centered, max-width container (1200px) creates a focused environment. 
- **The 8pt Rhythm:** All padding, margins, and heights follow a strict 8px/4px increment system to ensure mathematical harmony.
- **Visual Hierarchy:** Large vertical spacing (40px-64px) is used to separate high-level categories (e.g., Work Experience vs. Education), while tighter spacing (16px-24px) groups related form fields together.
- **Gutter Strategy:** 24px gutters ensure that multi-column layouts (like Date Range + Job Title) remain distinct and readable.

## Elevation & Depth

To avoid the "flat" look while maintaining a modern edge, the system uses **Ambient Shadows** and **Tonal Layering**.

- **Surface Tiers:** The main background is a very soft gray (#F8FAFC), while the resume "paper" or active editor cards are pure white. This subtle tonal difference creates a natural focus.
- **Shadow Profile:** Shadows are extremely diffused with low opacity (4-8%). Use a 2px-4px Y-offset for standard cards to suggest they are resting just above the surface. 
- **Active States:** When a user clicks into a section to edit, the elevation should subtly increase (larger shadow blur) to indicate focus, or use a primary-colored "halo" (2px stroke) rather than a heavy shadow.

## Shapes

The shape language is defined by a **Rounded** aesthetic to soften the professional tone and make the software feel approachable.

- **Standard Elements:** Buttons, input fields, and cards utilize a `0.5rem` (8px) radius.
- **Large Containers:** Modals and main editor panels use `1rem` (16px) to emphasize their role as structural anchors.
- **Interactive Feedback:** Hover states should maintain the same corner radius, ensuring consistency in the silhouette even when visual properties change.

## Components

- **Buttons:** Primary buttons feature a solid sapphire background with white text. Secondary buttons use a subtle gray ghost style with a 1px border. All buttons have a height of 44px for easy interactivity.
- **Input Fields:** Use a subtle 1px border (#E2E8F0). On focus, the border transitions to the primary sapphire with a soft glow. Labels sit above the field in a bold, smaller font size.
- **Progress Steppers:** A horizontal track with rounded nodes indicating the resume-building stages (e.g., Contact -> Experience -> Skills).
- **Skill Chips:** Small, rounded-pill containers with a light blue background and dark blue text, used to represent tags or technical proficiencies.
- **The "Live Preview" Card:** A large, elevated white container on the right side of the screen that updates in real-time, utilizing the same drop shadow rules defined in the Elevation section.
- **Icons:** Use thin-to-medium weight line icons (e.g., Lucide or Phosphor) to match the stroke weight of the typography.