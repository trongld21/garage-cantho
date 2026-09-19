# GARAGE TÂY NAM BỘ - EUROPEAN PREMIUM AUTOMOTIVE DESIGN SYSTEM

## 1. BRAND IDENTITY & PHILOSOPHY
- **Core Positioning**: "Precision. Performance. Trust."
- **Visual Aesthetic**: Modern European Automotive (Inspired by Porsche, Mercedes-Benz, BMW, Audi, Range Rover).
- **Tone**: High-end, minimal, spacious, authoritative, technology-driven.

---

## 2. COLOR SYSTEM

### Base Palette (Automotive Dark)
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `color-bg-deep` | `#0A0A0A` | Primary background, full height hero |
| `color-bg-graphite` | `#161616` | Card backgrounds, subtle elevated panels |
| `color-bg-surface` | `#202020` | Input backgrounds, dropdowns, sticky header background |
| `color-bg-surface-hover`| `#2A2A2A` | Hover states for interactive surfaces |

### Typography Colors
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `color-text-primary` | `#F5F5F5` | Headings, hero text, high emphasis text |
| `color-text-secondary` | `#A8A8A8` | Body copy, subtitles, captions |
| `color-text-muted` | `#666666` | Form labels, metadata, inactive tabs |

### Accents & Indicators
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `color-accent-gold` | `#C7A35A` | Champagne Gold: Primary luxury accents, badges, highlights |
| `color-accent-titanium` | `#D6D6D6` | Titanium Silver: Subtle metallic borders, secondary accents |
| `color-accent-red` | `#E53935` | Crimson Emergency Red: 24/7 Rescue, Urgent Alerts, Primary CTA |
| `color-accent-emerald` | `#10B981` | Success states, vehicle availability |

---

## 3. TYPOGRAPHY SYSTEM

- **Primary Font Family**: `Inter`, `Plus Jakarta Sans`, `system-ui`, `sans-serif`
- **Heading Styles**:
  - `Display Hero`: `clamp(48px, 6vw, 96px)` | Weight 800 | Line-height 1.05 | Letter spacing `-0.03em`
  - `H1 / Section Headline`: `clamp(32px, 4vw, 56px)` | Weight 700 | Line-height 1.15 | Letter spacing `-0.02em`
  - `H2 / Card Title`: `24px - 32px` | Weight 600 | Line-height 1.25
  - `H3 / Subheading`: `18px - 22px` | Weight 600
- **Body Styles**:
  - `Body Large`: `18px` | Line-height `1.6`
  - `Body Standard`: `16px` | Line-height `1.6`
  - `Caption / Muted`: `14px` | Line-height `1.5`
  - `Overline / Eyebrow`: `12px` | Weight 700 | Uppercase | Letter spacing `0.15em` (`#C7A35A` Gold)

---

## 4. BUTTON SYSTEM

Height: `48px - 54px` | Radius: `6px` (Sleek angular European style, avoid pill shapes)

### Variants
1. **Primary Gold CTA**:
   - `bg-[#C7A35A] text-[#0A0A0A] font-bold hover:bg-[#D4B26A] transition-all`
   - Subtle scale transform `scale-[1.01]` on hover.
2. **Primary Crimson Rescue CTA**:
   - `bg-[#E53935] text-white font-bold hover:bg-[#D32F2F] transition-all`
3. **Secondary Titanium Outline**:
   - `border border-[#333333] text-[#F5F5F5] hover:border-[#C7A35A] hover:text-[#C7A35A] bg-[#161616]/50`
4. **Ghost / Minimal**:
   - `text-[#A8A8A8] hover:text-white px-4 py-2 hover:bg-[#202020]`

---

## 5. CONTAINER & LAYOUT SYSTEM

- **Desktop Container Max Width**: `1440px` (`max-w-7xl` or custom `max-w-[1400px]`)
- **Spacing Scale**:
  - Section Padding: `py-20` to `py-32` on Desktop (`py-12` to `py-16` on Mobile)
  - Element Spacing: `gap-8` to `gap-12`
  - Grid Gaps: `gap-6` (cards), `gap-12` (editorial split layout)

---

## 6. ANIMATION & MICRO-INTERACTIONS

- **Framework**: `framer-motion`
- **Transitions**:
  - Duration: `300ms` - `500ms`
  - Easing: `[0.16, 1, 0.3, 1]` (Custom cubic-bezier for smooth European motion)
- **Patterns**:
  - `FadeUp`: `y: 20 -> 0`, `opacity: 0 -> 1`
  - `HeadlineReveal`: Staggered character or line reveal
  - `ImageScale`: Micro scale `1.03` on image wrapper hover
  - `ModalDrawer`: Smooth backdrop fade with slide-up modal / right drawer on mobile

---

## 7. RESPONSIVE BREAKPOINTS
- `xs`: `375px` (Small Mobile)
- `sm`: `640px` (Mobile Large)
- `md`: `768px` (Tablet)
- `lg`: `1024px` (Small Laptop)
- `xl`: `1280px` (Desktop)
- `2xl`: `1536px` (Ultra Wide)
