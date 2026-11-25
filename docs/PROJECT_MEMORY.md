# Gratitude Candles — Project Memory

> Living handover document for future development sessions. Update this file whenever a meaningful product, design, architecture, deployment, or operational decision changes.

## 1. Project identity

- **Brand:** Gratitude Candles
- **Production website:** https://gratitudecandles.in
- **GitHub repository:** https://github.com/sjaiswal210-beep/gratitude-candles
- **Hosting/deployment:** Vercel
- **Primary goal:** A polished, mobile-friendly ecommerce storefront focused on Gratitude Candles products.
- Use the exact brand name **“Gratitude Candles”** (not “Glow & Form”).

## 2. Working principles and non-negotiables

1. Preserve the latest working storefront and its product catalogue. Do not restore an older snapshot over newer work.
2. Before changing a file, inspect the current version on the repository's default branch.
3. Make changes directly in the GitHub repository and allow the connected Vercel project to deploy from the production branch.
4. Keep the experience mobile-first and visually consistent across the home, product, cart, and checkout journeys.
5. Do not remove products or alter product data as part of unrelated UI fixes.
6. Keep existing backend API rewrites and payment/order integrations intact unless a change is explicitly required and verified.
7. Do not claim a payment or order flow is fully tested unless a real end-to-end test has been completed.
8. Never place credentials, API secrets, private tokens, or customer personal data in this document or source control.

## 3. Current storefront structure

The recovered/current storefront uses a lightweight HTML, CSS, and browser-JavaScript structure rather than assuming a Next.js application.

Key files known from the working repository:

| File | Purpose |
|---|---|
| `index.html` | Storefront homepage and social-sharing metadata |
| `styles.css` | Shared styling and responsive/mobile presentation |
| `script.js` | Storefront browser-side behaviour |
| `products.json` | Product catalogue |
| `cart.html`, `cart.js` | Shopping cart page and behaviour |
| `checkout.html`, `checkout.js` | Checkout and UPI payment-link generation |
| `admin-orders.html`, `admin-orders.js` | Order administration interface |
| `vercel.json` | Vercel routing/rewrites, including backend API routing |

The catalogue had **103 product entries** at the time of the storefront recovery. Treat the current `products.json` on the production branch as the source of truth; re-check the live file before quoting a current count or editing catalogue data.

## 4. Backend and routing notes

The frontend relies on API routes proxied through Vercel rewrites. The known rewrite targets are:

- `/api/orders` → the separate Gratitude Candles backend deployment
- `/api/admin-orders` → the separate Gratitude Candles backend deployment

The rewrite configuration is in `vercel.json`. Preserve these routes when editing Vercel configuration.

The backend implementation was not present in the repository root during the recent checkout investigation. Do not assume that backend source code is available in this repository. Inspect the deployed API or locate its actual source repository before attempting backend changes.

## 5. Brand and visual decisions

- Keep the brand presentation clean, warm, premium, and welcoming.
- Prefer light backgrounds over large black/dark sections where the design calls for a softer appearance.
- The logo/icon should remain an image mark without unnecessary text or phone-number clutter when used as a compact icon.
- The logo artwork should not be forced entirely inside a circle if that distorts the intended composition.
- Keep the logo/favicon separate from the social-sharing preview image; changing one must not accidentally replace every logo reference.
- Mobile navigation should use the current icon-based treatment consistently across pages.
- Cart summary styling should not look like an unintended nested card or duplicate bordered panel.

## 6. Product imagery and social sharing

- The social preview image was set to a square crop of the product image for **Design 5**.
- The Open Graph and Twitter preview metadata are maintained in `index.html`.
- The selected source image in the repository was:
  `0b81a3da-b348-427e-a6c8-00e37cd4dd6e.jpeg`
- The preview image is served through an image-resizing URL to produce a 1200 × 1200 crop.
- WhatsApp and other platforms may cache link previews. A metadata change in the website does not guarantee that an already-cached preview refreshes immediately.

## 7. Cart and checkout notes

### Cart
- The cart page was updated to use the current mobile icon navigation.
- A layout fix was made to remove the unintended nested cart-summary appearance and align the floating mobile navigation.
- When editing cart UI, check both the summary layout and mobile safe-area spacing.

### Checkout and UPI
- Checkout creates an order through the order API and then builds a UPI payment URI and QR code from the returned order reference and amount.
- A recent fix was committed to normalize order reference and amount values before constructing the UPI URI. This prevents object values from being coerced into the literal string `[object Object]`.
- The code now checks that a usable order reference and positive amount exist before presenting payment details.
- If payment fields are incomplete, checkout displays an error rather than generating a malformed payment link.
- **Important verification status:** this frontend normalization change was committed, but do not represent it as a verified real-money payment. Confirm the production deployment is ready and test with a safe test order/payment flow before declaring checkout fully resolved.

## 8. Recent implementation history

The following commits are useful landmarks on the repository's main branch:

| Commit | Change |
|---|---|
| `714dc6d18875a10f2827188eb38f585b4ef2c119` | Refresh cart mobile navigation icons |
| `c960ebda110132d611a636d648d9c5d5a7408e03` | Fix cart summary nesting and align mobile navigation |
| `a449c473cf80bd1686a58376bfe4189865ab83da` | Initial social preview image update; later corrected |
| `3e96484c74aacb6c51cf54743ce021dba44aa80e` | Restore logo references and limit the change to share metadata |
| `20753710070727571ac15d81249ced8cb131af3f` | Fix UPI payment link object values |

The production domain is intended to remain attached to the latest production deployment. Verify deployment status and domain assignment after significant pushes rather than assuming a commit is live immediately.

## 9. Deployment and release checklist

Before a production change:

- [ ] Read the latest version of every file being changed.
- [ ] Confirm product data and existing routes are preserved.
- [ ] Check for accidental broad replacements (especially logo, metadata, and shared CSS).
- [ ] Commit the intended change to the production branch.
- [ ] Confirm the corresponding Vercel deployment reaches **Ready**.
- [ ] Confirm `https://gratitudecandles.in` serves the expected release.
- [ ] Test the affected journey on a mobile viewport.
- [ ] For checkout changes, verify order reference, amount, UPI URI, QR, and WhatsApp confirmation text. Do not make a real payment unless explicitly intended.

## 10. Open verification items

These are follow-up checks, not claims that the items are currently broken:

1. Confirm the latest checkout-fix deployment is **Ready** and serving on the production domain.
2. Test checkout with a safe test order and confirm the actual API response shape for order ID and amount.
3. Verify UPI app handoff and QR scanning on a real mobile device without completing an unintended payment.
4. Confirm the Design 5 social preview is refreshed by WhatsApp after its cache is updated.
5. Re-check the current catalogue count and ensure all expected products remain visible.
6. Verify cart, checkout, and admin-order pages after any shared CSS or routing change.

## 11. Session handover instructions

When continuing this project in a future session:

1. Read this file first.
2. Inspect the live repository and current production deployment; this document is a handover, not a substitute for current source code.
3. Identify the exact requested change and its impact on product data, cart, checkout, admin, and API routing.
4. Make the smallest safe change, preserve existing working behaviour, and update this document when decisions or architecture change.
5. Report exactly what was committed and whether Vercel deployment was confirmed **Ready**. Distinguish code committed, deployment ready, and functionality tested.


---

## 12. Product, order and customer journey reference

### Storefront
The storefront is intended to be a premium, mobile-first catalogue for candles, home décor and gifting. Preserve the current brand identity, product photography, catalogue identifiers and warm visual language. The current implementation is lightweight HTML, CSS and browser JavaScript; do not assume a Next.js application or initiate a framework migration for routine changes.

### Catalogue
- `products.json` is the current catalogue source of truth.
- A prior snapshot contained 103 products; always recalculate the count from the current file.
- Preserve product IDs, image paths, category, product names and ordering unless the owner explicitly requests a catalogue change.
- A missing/null price means price-on-request. Never invent a price or allow checkout to use a guessed amount.

### Cart
- The browser cart uses localStorage; the known key is `gratitude_candle_cart_v1`.
- This is browser/device-local state, not a cross-device account cart.
- Test add, quantity update, removal, subtotal and price-on-request handling after cart changes.

### Checkout and UPI
- The frontend sends order/customer details to `POST /api/orders`, then uses the API response's order reference and amount to create the UPI URI/QR.
- UPI VPA previously confirmed in project code/decisions: `7350785606@ybl`. Do not change it without owner approval.
- The API must calculate the amount from trusted product data on the server. Never trust a client-submitted price or total.
- QR generation or opening a UPI app is not payment confirmation.
- The accepted operating process is independent manual bank-credit verification before an order is marked paid. Never auto-mark paid based on a redirect, screenshot or customer assertion.
- Never collect or store UPI PINs, OTPs or banking credentials.

### Admin reconciliation
- The admin UI calls `/api/admin-orders` using a Bearer token and includes a bank-reference field plus an explicit bank-credit confirmation.
- Authorization must be enforced server-side. Never hardcode the token in frontend code or this document.
- Preserve an audit trail of who reconciled the order, when, and the bank reference. Do not expose customer order data publicly.

### WhatsApp and social
- WhatsApp business contact used in the website: `+91 98336 77693`; international link format: `919833677693`.
- Instagram: https://www.instagram.com/gratitudecandles51/
- Facebook: https://www.facebook.com/share/1Kd3A8fzoM/?mibextid=wwXIfr
- Verify current product-specific share behaviour on the live site before claiming it is complete.
- Keep logo/favicon separate from the Design 5 square social preview image. The selected image filename in the existing project memory is `0b81a3da-b348-427e-a6c8-00e37cd4dd6e.jpeg`.

## 13. Architecture and backend boundaries

### Confirmed frontend / routing boundaries
- Frontend pages and browser logic are in the repository files listed above.
- Vercel rewrites in `vercel.json` proxy `/api/orders` and `/api/admin-orders` to a separate backend deployment.
- Backend source was not found at the repository root during the prior inspection. Locate its actual repository/project before attempting backend changes.
- A Neon PostgreSQL connection was part of the earlier development direction, but the current production connection, schema and migration state must be verified. Do not assume Neon is live merely because it was previously connected.

### API contract to verify (not to assume)
`POST /api/orders`: validate customer details and product IDs/quantities; load trusted prices server-side; calculate amount server-side; create order and line items transactionally; return a stable scalar order reference and amount; protect against duplicate submissions.

`GET /api/admin-orders`: require server-side admin authentication; return only authorized order data; support safe filtering/pagination where available.

`POST /api/admin-orders`: require server-side admin authentication; validate order state, bank reference and explicit independent bank-credit confirmation; prevent duplicate reconciliation; write an audit record.

These are target requirements. Inspect the deployed backend's actual request/response contract before changing frontend/backend shapes.

### Suggested logical data entities (inspect actual schema first)
- `products`: stable product ID, name, category, description, image URL, nullable price, active flag, timestamps.
- `orders`: internal ID, unique public order reference, customer/delivery fields, server-calculated amount, currency, order/payment status, timestamps.
- `order_items`: order FK, product ID, product name/price snapshots, quantity and line total.
- `payment_reconciliations`: order FK, payment method, bank reference, verifier, verified timestamp and note.
- `order_status_history`: order FK, old/new status, actor, reason and timestamp.

Do not create duplicate tables or migrate statuses until the live database and existing data have been inspected.

## 14. Security, quality and operational requirements

- Keep Neon/database credentials, admin tokens and API secrets in Vercel environment variables; never commit them.
- Use parameterized SQL, server-side authorization, input validation, rate limiting/abuse protection and idempotency where appropriate.
- Do not log full customer addresses, phone numbers, tokens or sensitive payment information unnecessarily.
- Do not trust browser-submitted totals, product prices or payment status.
- Make errors actionable and preserve form input when safe.
- Keep UI accessible: semantic HTML, keyboard-operable modals, labels, focus states and adequate contrast.
- Optimize product imagery and test real mobile safe areas/fixed navigation overlap.
- Distinguish code committed, deployment Ready, and functionality end-to-end tested.

## 15. PRD summary

**Business outcome:** Convert product discovery into enquiries and confirmed orders through a trustworthy, elegant storefront.

**Customer capabilities:** brand discovery; catalogue browsing; search/filter; product detail and imagery; cart; price-on-request enquiry; delivery details; order creation; UPI QR/intent handoff; WhatsApp support; clear order/payment status.

**Admin capabilities:** secure order viewing; pending-payment identification; independent bank-credit reconciliation; bank-reference capture; status updates and audit history.

**Non-functional requirements:** mobile-first responsiveness, fast image loading, accessible interactions, secure server validation, reliable/idempotent order creation, clear error recovery, search/social metadata, backups and recovery procedure.

## 16. UI/UX brief

- Mood: warm, calm, thoughtful, handmade and premium; product photography is the focus.
- Preserve the current ivory/light and earthy visual direction.
- Existing type direction noted in the storefront: DM Sans for interface text and Playfair Display for expressive headings. Verify before changing.
- Keep product cards readable, images prominent and navigation consistent on mobile.
- Fixed navigation and floating WhatsApp action must not cover content or checkout controls.
- Product details should show name, category/design identifier, imagery, price or price-on-request, and a clear action.
- Checkout should show an itemized summary and server-confirmed total, order reference, honest pending-reconciliation messaging and WhatsApp support.

## 17. Prioritized Kiro roadmap

**P0 — Audit before editing**
1. Inspect current default branch and repository tree.
2. Inspect production domain and Vercel deployment.
3. Identify backend source project/repository and actual API contract.
4. Verify Neon connection, schema and migrations.
5. Baseline-test homepage, catalogue, cart, checkout and admin.

**P1 — Order/payment reliability**
1. Verify server-side price calculation and order creation.
2. Verify order reference/amount response contract.
3. Verify duplicate-submission handling.
4. Test UPI URI/QR values without making an unintended payment.
5. Verify manual reconciliation and audit history.
6. Verify admin authorization and customer-data protection.

**P2 — Customer experience**
1. Verify product-specific sharing and social preview.
2. Improve checkout recovery/error messaging where needed.
3. Test catalogue, filters, cart and mobile navigation.
4. Validate social metadata/cache behaviour.

**P3 — Operations**
1. Add safe order filtering/status history if absent.
2. Add API error monitoring.
3. Document backups/recovery.
4. Add regression tests for order/payment flows.
5. Keep this project memory current.

Do not automatically implement the entire roadmap. Audit first and propose the smallest safe next step.

## 18. Kiro takeover prompt

Paste this into Kiro when attaching this file:

> You are taking over updates to the existing Gratitude Candles website. Read `docs/PROJECT_MEMORY.md` completely before doing anything.
>
> Repository: https://github.com/sjaiswal210-beep/gratitude-candles  
> Production: https://gratitudecandles.in
>
> Start with an audit, not a rebuild. Inspect the current default branch, source files, Vercel configuration, production deployment, separate backend project/source, actual API contracts and Neon schema. The current storefront is lightweight HTML/CSS/browser JavaScript; do not assume Next.js or migrate frameworks for routine work.
>
> First report: (1) repository/file map, (2) confirmed implemented features, (3) code-only or production-unverified features, (4) actual backend and database architecture, (5) checkout/payment/admin risks, (6) a prioritized minimal update plan. Do not make production changes during this initial audit.
>
> Preserve product IDs/data/images, logo, domain, WhatsApp details, UPI VPA and API rewrites unless I explicitly approve a change. Never expose secrets or customer data. Never mark an order paid merely because a UPI intent/QR was opened; payment requires independent bank-credit verification and manual reconciliation.
>
> For every later change: inspect the latest file first; make the smallest safe change; preserve existing behaviour; test the affected journey; report exact files changed, commit SHA, deployment status and what was actually tested; then update this project memory.

## 19. Verification status

This file records known repository decisions and implementation history. It is not proof that the current production deployment, backend, Neon connection, real-money payment or end-to-end order workflow is healthy. Re-verify each before changing or declaring it complete. If this document conflicts with current code or production behaviour, inspect and report the difference; do not silently overwrite working behaviour.
