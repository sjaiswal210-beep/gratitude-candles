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
