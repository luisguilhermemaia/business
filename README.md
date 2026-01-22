# Premium Medical White-Label Template

Next.js (App Router) + TypeScript + styled-components starter focused on premium, authority-driven medical sites. Content, theme, and translations live inside brand folders for full white-labeling.

## Getting started
- Install: `npm install`
- Run dev server: `npm run dev` (defaults to brand `karinne-azin`)
- Choose brand: set `NEXT_PUBLIC_BRAND=karinne-azin` (or your new brand id)

## Project structure
- `src/core`: design system, layout, sections, i18n, seo, utils — brand-agnostic.
- `src/brands/<brand>`: theme, content, translations, assets for each brand.
- `content/blog`: MDX posts with frontmatter (`title`, `excerpt`, `date`, `tags`, `slug`).
- `app`: routes composed from core sections + brand content.

## Add a new brand
1) Copy `src/brands/karinne-azin` to `src/brands/<new-brand>`.
2) Update `brand.ts` (id, name, logo path, default locale, locales).
3) Tweak `theme.ts` (colors/typography) via `createBrandTheme`.
4) Edit `content.ts` (doctor profile, services, booking mode/message, location, metadata, home section order).
5) Provide translations JSON in `translations/` for each locale.
6) Place assets (e.g., logo) under `public/brands/<new-brand>/`.
7) Run with `NEXT_PUBLIC_BRAND=<new-brand>` — no core imports need changes.

## Translations (i18n)
- Add/update JSON files under `src/brands/<brand>/translations/`.
- Keys can be nested (`nav.home`, `booking.fullName`, etc.). Missing keys fall back to the default locale or to the key itself.
- Language switcher persists the last choice in `localStorage`.

## Blog
- Create MDX files in `content/blog/` with frontmatter and body content.
- Blog index supports search + tag filtering; post pages show reading time plus prev/next links.
- Sitemap/robots are generated automatically (`/sitemap.xml`, `/robots.txt`).

## Booking flow
- Brand config controls booking mode:
  - `whatsapp`: opens `wa.me` with the brand template message.
  - `api`: POSTs to `/api/booking` (stubbed) and shows success feedback.
- Form fields: full name, email/phone, preferred date, time window, message (basic validation included).

## Customizing theme/content
- Adjust design tokens in `src/brands/<brand>/theme.ts` (colors, spacing, typography).
- Modify section order/visibility via `content.home.sections`.
- Update sections copy in `content.ts` or translations; no core code changes needed.
