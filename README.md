# ETOH — Etohcols website handoff

Thai and English B2B ethanol website prototype for the team implementing the production site. The public repository is `wannapap189/ETOH`. It includes the approved visual direction, product guidance, business-application content, quotation-request flows and an SEO migration baseline. This standalone package is source for a local preview, not a production server or a WordPress theme. Sharing the repository does not publish the website.

## Run locally

Requirements: Node.js 20 or later. No npm dependencies or build step are required.

```sh
node server.mjs
```

Open [Thai homepage](http://127.0.0.1:4186/) or [English homepage](http://127.0.0.1:4186/en/). The preview listens only on loopback; the default port is `4186`. Set the `PORT` environment variable to use another port. `npm start` runs the same server.

Useful routes: `/shop/`, `/applications/`, `/industries/`, `/quality/`, `/logistics/`, `/oem/`, `/stock-management/`, `/partner/`, `/cart/` and `/quote/`. Supported English pages use the same path prefixed with `/en/`.

## Current scope

- Responsive green–orange design with light backgrounds, local fonts and packaged images.
- Homepage v25 leads with established bulk-ethanol experience, product quality information and logistics capability, then shows how this foundation supports market expansion and buyer needs: direct access for smaller regional buyers, product selection, delivered costs, sample testing, delivery, documentation and repeat purchasing. OEM is a supporting service. A short brief carries the application, quantity notes and destination province into the quotation form without submitting a lead.
- Eight catalog entries: PHARMOL 95%, 96%, 99.9%; ETOH 95%, 96%, 99.9%, with ETOH 70% and 75% marked as planned.
- 52 business applications across 11 groups, including 29 entries in the small-business filter. Each has a detail page and purpose-specific imagery. The original eight industry categories remain available.
- Server-rendered English for 107 supported routes, alongside the original Thai paths. The language switch retains the page, query and anchor.
- OEM is a supporting Etohcols service, introduced after core supply, quality and logistics on the homepage. `/oem/` explains the project-assessment process and links to the existing OEM enquiry intent. PHARMOL / ETOH remain product families; MUKU remains a separate brand.
- Both Etohcols and MUKU offer OEM and stock support: storage with scheduled release/dispatch, plus stock planning, balance monitoring and replenishment cycles. `/stock-management/` explains scope and project-specific terms; its enquiry uses `intent=stock`. The local MUKU homepage and business page also introduce these services; MUKU service enquiries do not require an already-selected SKU or quantity.
- Quotation list stored in browser localStorage. Forms prepare a copyable request for the user to send; they do not submit leads, reserve stock, take payments or create orders.
- Quality pages explain document types and prominently feature available HALAL documentation, with product scope and validity checked by staff. Actual certificates are supplied by staff on request and are not public downloads.

## Source map

| File or directory | Responsibility |
| --- | --- |
| `server.mjs` | Loopback preview server, assets and preview indexing protection |
| `home-v25.mjs`, `dist/assets/home-v25.css` | Buyer-focused homepage, seven accessible support tabs and short quotation brief |
| `oem-v26.mjs`, `dist/assets/oem-v26.css` | Supporting OEM service page and homepage introduction |
| `stock-v27.mjs`, `dist/assets/stock-v27.css` | Stock-service page and supporting homepage section |
| `muku-services-v27.mjs`, `dist/assets/muku-services-v27.css` | Services within the existing local MUKU preview |
| `etoh.mjs` | Top-level routing, retired-product redirects and localization wrapper |
| `business-v9.mjs`, `content-v10.mjs` | Current main layouts, catalog, products, logistics and request forms |
| `application-catalog-v17.mjs` | Combined business-application catalog; imports the application data, expansion and healthcare modules |
| `applications-v17.mjs` | Business directory, detail pages and homepage discovery |
| `knowledge-v10.mjs`, `articles-v16.mjs` | Product/industry guidance and knowledge articles |
| `documents-v13.mjs`, `document-art-v14.mjs` | Public document explanations and illustrations |
| `partners-v22.mjs` | Distributor recruitment content |
| `localization-v24.mjs`, `locales/en/` | English route list and reviewed translation dictionaries |
| `dist/assets/` | Browser behavior, styles, local fonts and public images |
| `site.mjs`, `content/legacy-content.json` | Legacy-content adapter and reviewed standalone legacy content |
| `seo/` | URL/metadata baseline and migration contract; internal team files, not public assets |

Versioned modules are still imported by the current renderer. Do not remove them merely because their version number is older. This package replaces the earlier raw-HTML runtime dependency with `content/legacy-content.json`; original HTML archives, image-generation provenance and private documents are excluded. Port the reviewed legacy content into the target CMS or build while retaining the route behavior.

## Business rules to preserve

No public prices or payment checkout. PHARMOL is undenatured; ETOH is denatured. There are no PHARMOL 70% or 75% products. Concentration alone does not establish grade, certification or suitability for an application.

The 1 / 5 / 20 L range and repacking system are in preparation. Show readiness accurately. The 1 / 5 L jerrycans are translucent white; 20 L jerrycans have white and black options; 200 L drums are blue plastic, IBCs are 1,000 L and tank containers are 20,000 L. Do not call an IBC an ISO tank. Samples are free; shipping is assessed by destination and confirmed before dispatch.

Keep supplier/manufacturer identities, certificate originals, customer information and internal plans out of public pages and assets. Illustrative business scenes must not be presented as documented customer sites. MUKU is a separate brand and is outside the current Etohcols translation and migration scope.

## Validate changes

From the repository root:

```sh
node scripts/check.mjs
node scripts/check-localization-v24.mjs
node scripts/check-migration.mjs --base-url http://127.0.0.1:4186 --mode preview
```

The HTTP check requires the preview server to be running. Check both languages on desktop and mobile, including search/filters, product selection, the shared quotation list, request summaries, language switching and direct-link refreshes. Update English dictionaries and runtime strings when changing Thai content. Keep product IDs, select values and the `etohcols-cart-v1` storage key independent of display language.

## Production and SEO migration

Read [llms.txt](llms.txt), [SERVER-MIGRATION.txt](seo/SERVER-MIGRATION.txt) and [migration-contract.json](seo/migration-contract.json) before implementation or DNS changes.

Keep `https://etohcols.com` and the existing Thai paths. The baseline contains 33 old sitemap URLs: 32 retained pages and one permanent redirect from `/product/pharmol-70/` to `/undenatured-alcohol/`. `/product/pharmol-75/` is an additional prototype compatibility redirect. The inventory is not proof that all historical URLs are covered or that traffic rankings have been verified.

The preview deliberately uses HTML/HTTP `noindex` and a blocking `robots.txt`. Build separate production indexing, HTTPS, redirect and sitemap configuration. Do not deploy the repository as an unrestricted static directory. Exclude source, internal content data, SEO files, audit routes and reports from public serving. Keep raw archives, provenance and private document originals outside the public build; the preview's file restrictions do not automatically transfer to another host.

Before launch, complete the URL/media inventory, review factual claims and old article search intent, connect and test the chosen lead backend, confirm account-controlled Search Console/analytics access, and prepare backups, DNS/email-record preservation and rollback. Validate the candidate production server using the documented migration checker. Passing local checks does not guarantee production readiness or unchanged search rankings.
