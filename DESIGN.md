# TRANS STAR design system

Feel: calm, editorial, premium, like vanguardai.co.nz, but with our own palette, type and copy.
Reliability is the product, so the design is steady: big type, quiet body text, lots of space, hairlines.

## Colour

Order of importance: **navy, paper, red.** Tokens live in `src/styles/global.css` (`@theme`).

| Token | Value | Use |
|---|---|---|
| `navy` | `#1D3A66` | Header, hero, dark sections, footer, "after" panel, Call button on paper |
| `navy-2` | `#2A4B7F` | Hover on navy, eyebrow numbers on paper, focus ring |
| `navy-3` | `#24447A` | Tags and photo slots inside navy sections |
| `inv-ink` / `inv-muted` | `#F4F2ED` / `#B7C3D8` | Text on navy |
| `inv-line` / `inv-line-2` | cream at 18% / 42% | Rules on navy |
| `paper` | `#F4F2ED` | Page background (warm off-white) |
| `paper-2` | `#E8E5DD` | Tags on paper |
| `card` | `#FBFAF7` | Cards, inputs, light chips |
| `ink` / `ink-2` | `#15171B` / `#2C2F34` | Headings / body on cards |
| `muted` | `#5B5E66` | Body copy on paper (about 6:1) |
| `line` / `line-2` | ink at 13% / 30% | Rules, input borders |
| `red` | `#C8102E` (NZ flag red) | Quote button, star, highlighted phrase on paper, underline on navy |
| `ok` | `#2E5E45` | "Free" tags only |
| `slot` / `slot-ink` | `#E2DED5` / `#6A6B70` | Photo placeholder on paper |
| `ph` / `ph-ink` | `#F8DDE2` / `#8E0B21` | `[PLACEHOLDER]` tokens in copy (removed before launch) |

**Red on navy:** flag red on navy is about 1.9:1, too low to read. On navy, a highlighted phrase is
cream with a red underline (`.on-navy .hl`), the same treatment as "Same drivers" in the hero.

## Type

One family: **Schibsted Grotesk Variable** (400-900). Body 17px / 1.55.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero H1 | `clamp(42px, 6.2vw, 96px)` | 600 | 0.98 | -0.045em |
| Section H2 | `clamp(34px, 4.4vw, 68px)` | 700 | 1.02 | -0.04em |
| Quote H2 | `clamp(44px, 5.6vw, 84px)` | 700 | 0.98 | -0.05em |
| H3 | `clamp(22px, 2.1vw, 30px)` | 700 | 1.05 | -0.03em |
| Stat number | `clamp(52px, 6vw, 92px)` | 700 | 0.92 | -0.055em |
| Eyebrow | 12px uppercase | 600 | 1.3 | +0.14em |
| Section lead | `clamp(17px, 1.3vw, 19px)` | 400 | 1.55 | 0 |

Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`; numbers in columns use tabular figures.

## Layout and spacing

- Max content width 1320px, side padding `clamp(20px, 4vw, 56px)`.
- 12 columns, 24px gap from 960px up. Section head: eyebrow cols 1-3, H2 cols 4-12, lead cols 4-9.
- Section padding `--sec-y: clamp(72px, 9vw, 128px)`. Between two paper sections, only one gap
  (next section has no top padding). When the background changes, both sides get full padding.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Radii: 16 (cards, photos), 10 (buttons, inputs), 999 (chips).
- Sticky header 70px. Anchor jumps leave header height + 40px (`scroll-padding-top`).

## Buttons (ArcBest idea: equal weight)

`Request a quote` (red) and `Call 022 075 1526` (navy on paper, paper on navy).
Same height 52px (44px in the header), 16px / 600, radius 10. On phones they stack full width.
A sticky bottom bar on phones holds Call | Request a quote in equal halves.

## Logo (placeholder)

Original five-point star, 10 vertices, inner radius 0.40 of outer, drawn from the proportions of the
NZ flag stars in `assets/nz-stars-logo-for-star.jpg`. A single star, not the Southern Cross arrangement.
Wordmark: star + "TRANS STAR" in Archivo Expanded ExtraBold, outlined to paths.

| File | Use |
|---|---|
| `assets/logo.svg` | Star only, red |
| `assets/logo-wordmark.svg` | Site use: red star, text `currentColor` |
| `assets/logo-wordmark-on-navy.svg` / `-on-paper.svg` | Fixed colours for documents, email, signage |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | Navy tile, red star with cream outline |

**This is a placeholder.** The final logo should come from a designer or an image tool.

## Components

| Component | Purpose |
|---|---|
| `Header` | Wordmark on navy, 4 anchor links, Call + Quote |
| `PhotoSlot` | Shows `assets/photos/<name>.jpg` if present, else a labelled neutral block |
| `SectionHead` | Numbered eyebrow + H2 (+ lead) on the 12-col grid |
| `WorriesBand` | Three rows of anonymous worry chips, slow horizontal loop |
| `WhyWhat` | Four rows: why runs go wrong / what we do |
| `StatsBand` | Navy band of four confirmed numbers (Mainfreight idea) |
| `BeforeAfter` | Two panels, an illustrative morning run two ways |
| `Steps` + runway | Three steps with the "you don't pay until here" bar (Hemut idea) |
| `Team` | Owner portrait + crew list |
| `Coverage` | Facts list + photo |
| `QuoteForm` + `Faq` | Short form, native `<details>` FAQ |
| `MobileBar` | Sticky Call / Quote on phones |
| `Footer` | Wordmark, contact, illustrative + GST note |

### PhotoSlot

`<PhotoSlot name="hero-truck-dawn" ratio="16/9" brief="..." alt="..." />`
At build time it globs `assets/photos/*.{jpg,jpeg,JPG,JPEG}`. If `<name>.jpg` exists it renders an
optimised responsive `<Picture>` (AVIF/WebP) with the given alt text. Otherwise it renders a `slot`
block showing `PHOTO · <name>` and the brief. Dropping in a correctly named file and rebuilding
replaces the placeholder with no code changes. `variant="background"` fills its parent (hero) and
adds the navy scrim (`--hero-scrim`, solid, no gradient).

## Page map (every section has one job)

| # | Section | Background | Purpose |
|---|---|---|---|
| | Header | navy | Brand, navigation, both CTAs always one tap away |
| | Hero | navy (photo) | Who, what, where in five seconds; CTA pair; free first delivery |
| 01 | The problem + worries band | paper | Name the pain for shippers and operators |
| 02 | Why runs go wrong / What we do | paper | Turn each worry into a practice |
| 03 | The record | navy | Prove reliability with confirmed numbers |
| 04 | Before and after | paper | Show the difference on one illustrative morning |
| 05 | How we work | navy | Make starting risk-free: free first delivery, runway |
| 06 | Who you're dealing with | paper | A named, accountable owner and crew |
| 07 | Coverage | navy | Qualify: region, days, hours, temperatures, trucks, notice |
| 08 | Get a quote + FAQ | paper | Convert; answer the last objections |
| | Footer | navy | Contact, legal, illustrative note |

## Motion

- Scroll reveal: fade up 16px over 0.8s (`--ease-soft`), staggered. Content is visible without JS.
- Worries band: three rows drift sideways (80-92s loop, middle row reversed), pause on hover.
- Nothing else animates. Under `prefers-reduced-motion`, both are off and the chips wrap in place.

## Banned

Gradients (including mask fades), emoji, generic icon grids, stock photos, AI-generated images,
red text on navy, competing CTAs, invented claims.

## Reference ideas (one each, never the look)

- vanguardai.co.nz: overall feel, numbered eyebrows, worries band, why/what table, before/after.
- hemut.com: "you don't pay until here" timeline, adapted to the free first delivery.
- mainfreight.com: plain NZ voice, stats band, simple quote request.
- arcb.com: equal-weight CTA buttons.
