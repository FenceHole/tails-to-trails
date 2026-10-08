# Tails to Trails

Website for Tails to Trails, LLC: dog walking, pack walks, in-home dog boarding, cat sitting and yard clean up in Pittsburgh, PA.

Built with React, Vite and Tailwind CSS. At build time every page is rendered to its own static HTML file, with its own title, description, canonical URL and structured data. The browser then takes over, so search engines and link previews see real content without running any JavaScript.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home |
| `/dog-walking-pittsburgh/` | Dog walking |
| `/pack-walks-pittsburgh/` | Pack walks |
| `/dog-boarding-pittsburgh/` | Dog boarding and sitting |
| `/cat-sitting-pittsburgh/` | Cat sitting |
| `/yard-cleanup-pittsburgh/` | Yard clean up |

Any other URL gets `404.html`.

## Run it locally

```sh
npm install
npm run dev        # dev server
npm run build      # production build into dist/public
npm run preview    # serve the production build
npm run typecheck
```

## Where to edit things

- `src/content/site.ts`: phone number, every price, page titles and paths, and the site address. Prices and the phone number are not written anywhere else.
- `src/content/services.ts`: the copy and FAQ for each service page.
- `src/content/faqs.ts`: the home page FAQ. It also feeds the FAQ structured data.
- `public/og-image.png`: the picture shown when the site is shared. It is a fixed image with the headline and phone number baked in, so replace it if either changes.

Only add facts the owner has published. Reviews, ratings, neighborhoods, hours, certifications and years in business are left out until they are confirmed.

## Deploying on Vercel

`vercel.json` sets the build command, the output folder (`dist/public`), trailing slashes on page URLs and long-term caching for the hashed files in `/assets`.

Set the `VITE_SITE_URL` environment variable in the Vercel project once the final domain is known, for example `https://www.example.com` with no trailing slash. Canonical links, Open Graph tags, the sitemap, `robots.txt` and the structured data all use it. Without it they point at `https://vet-van-fleet-infograph-716h.vercel.app`.

## Build notes

`package.json` pins `rollup` to 4.63.1 through `overrides`. Version 4.64.0 made the production build take about four minutes instead of a few seconds. Remove the override once a newer Rollup is confirmed to build quickly.
