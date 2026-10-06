# trans-star-genesis

Website for **TRANS STAR LTD**, a small chilled and frozen transport business in Auckland, New Zealand.
One page, one job: get people to call or request a quote.

## Run it

Needs Node.js 22.12 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Where things are

- `content/copy.md`: all the words on the site
- `DESIGN.md`: colours, type, components and the page map
- `PHOTO_LIST.md`: the photos the site needs and how to shoot them
- `assets/photos/`: drop photos here, named as in PHOTO_LIST.md, and rebuild
- `assets/logo*.svg`, `public/favicon.*`: logo set (approved; rebuild with `npm run logo`)
- `CLAUDE.md`: working rules for Claude Code
