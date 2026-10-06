# TRANS STAR website

One-page marketing site for TRANS STAR LTD, a small Auckland cold chain carrier.
The page has one job: get the visitor to **call 022 075 1526** or **request a quote**.

## Stack and commands
- Astro 7 (static output) + Tailwind v4 via `@tailwindcss/vite`. No UI framework.
- Font: `@fontsource-variable/schibsted-grotesk` (self-hosted). Wordmark is outlined SVG, no font needed.
- Dev-only: `opentype.js` (outlines the wordmark in `scripts/build-logo.mjs`).
- **No new dependencies without asking the owner.** No animation libraries, CMS, analytics.

```
npm run dev      # http://localhost:4321
npm run build    # must pass before every commit
npm run preview  # serve dist/
npm run logo -- <Archivo-Expanded-ExtraBold.ttf>   # rebuild logo set (see script header)
```

## Layout of the repo
- `src/pages/index.astro`: the page. `src/components/`: sections and `PhotoSlot`.
- `src/styles/global.css`: tokens (`@theme`) and the few shared component classes.
- `assets/`: logo files and `assets/photos/<name>.jpg` (picked up by `PhotoSlot` at build).
- `content/copy.md`: approved copy. Change copy there first, then in the page.
- `DESIGN.md`: tokens, components, rules. `PHOTO_LIST.md`: shot list.
- `references/`: owner's reference screenshots. Not published.

## Design rules (details in DESIGN.md)
1. Navy leads, paper supports, red accents. Order of importance: navy, paper, red.
2. Red only on: the quote button, the star, highlighted headline phrases, the hero underline.
3. On navy, a highlighted phrase is cream with a red underline (class `hl` inside `.on-navy`).
   Never red text on navy: too little contrast.
4. Big, tight headlines (weight 600-700, tracking -0.04em) over quiet muted body text.
5. Section heads: numbered eyebrow in cols 1-3, headline in cols 4-12 (12-col grid, 24px gap).
6. Hairline rules instead of boxes. Cards only where something must stand apart.
7. Call and Request a quote buttons are equal size and weight; they differ only in hue.
8. Paper and navy sections alternate. Changing background = full padding both sides.
9. No gradients (including fade masks), no emoji, no icon grids, no stock photos, no generated images.
10. Motion: scroll reveal and the worries band only. Everything off under `prefers-reduced-motion`.

## Content rules
- NZ English. Prices excl. GST. Plain-spoken, steady, a little dry.
- Never invent statistics, clients, testimonials, certifications, insurance details, fleet specs or awards.
  Unknown facts go in as `[PLACEHOLDER: ...]` and are listed at the end of every pass.
  Owner wants insurance, form service, photos and domain kept as placeholders as long as possible;
  tell the owner as soon as any of them blocks progress.
- Never name the principal contractor (Hall's) or use its branding. Say "a major NZ cold chain operator".
- No superlatives (longest-serving, best, #1) unless the owner confirms them.
- Worries in the scrolling band are anonymous thoughts: no names, no quote marks, never testimonials.
- Example figures (times, temperatures, sites) are labelled "Illustrative".
- Don't copy copy, images or code from any reference site.
- Don't infer anyone's pronouns from their name; write around it.

### Confirmed facts (use freely)
- 20+ years in logistics; over a decade of dry goods delivery for restaurant brands, now cold chain.
- Currently contracts to a major NZ cold chain operator.
- Owner: Emilian (still drives). Crew: Amogh, Ashish, Ronald.
- 2 trucks: UD 14 pallets, Mitsubishi 15 pallets. Chilled and frozen in one load. Set points 2°C to -18°C.
- Whole Auckland region. Sunday to Friday, any time of day. No Saturdays for now.
- Temperatures recorded by hand; photo proof sent the same day on request.
- No minimum load. Regular runs need at least 48 hours' notice.
- First delivery free, one per new business. Return trips or a second load are billed.
  Urgent loads can sometimes be the first delivery, decided on the call.
- Quote requests: call back within one business day.
- Promises the owner confirmed: "same drivers / same faces at your dock", "you hear it from us first".
- Crew are happy to be named on the site.
- Logo (star + Archivo Expanded wordmark) is approved. Keep it.
- Phone 022 075 1526 (tel:+64220751526). Email trans_starnz@yahoo.co.nz. Domain (not bought yet): transstar.co.nz.

## Quality bar
- `npm run build` passes. No console errors.
- Works at 390px and 1440px; no horizontal scroll; tap targets at least 44px.
- Every image has alt text (decorative ones `alt=""`). Every form field has a label.
- Text contrast meets WCAG AA (4.5:1 body, 3:1 large text).
- Every section traces to a purpose in DESIGN.md's page map.
- Commit after each pass on branch `site-v1`.
