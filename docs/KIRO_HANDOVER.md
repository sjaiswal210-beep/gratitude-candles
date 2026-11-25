# Gratitude Candles — Kiro Takeover Handover

**Updated:** 25 November 2026  
**Repository:** https://github.com/sjaiswal210-beep/gratitude-candles  
**Production website:** https://gratitudecandles.in  
**Primary project memory:** [docs/PROJECT_MEMORY.md](./PROJECT_MEMORY.md)

## Purpose

This is the practical takeover brief for Kiro. Read the full project memory linked above before making changes. The memory file is the source of truth for known decisions, current architecture notes, payment safety rules, product requirements and the roadmap.

## Project at a glance

Gratitude Candles is a premium, mobile-first storefront for candles, home décor and gifting products. The current frontend is a lightweight HTML/CSS/browser-JavaScript implementation—not an assumed Next.js application.

Known frontend files:
- `index.html` — storefront and social metadata
- `styles.css` — shared responsive styles
- `script.js` — catalogue and storefront interactions
- `products.json` — product catalogue
- `cart.html`, `cart.js` — cart
- `checkout.html`, `checkout.js` — checkout and UPI handoff
- `admin-orders.html`, `admin-orders.js` — admin order/reconciliation UI
- `vercel.json` — API rewrites

The frontend calls `/api/orders` and `/api/admin-orders`; the backend was noted as a separate Vercel deployment and its source was not found at the repository root in the earlier inspection. Locate the actual backend source before changing APIs. Neon PostgreSQL is part of the previous development direction, but verify the production connection and schema rather than assuming it is active.

## Non-negotiable rules

1. Audit first. Do not rebuild, migrate frameworks or make production changes before reporting findings.
2. Inspect the current default branch and latest contents of every file before editing.
3. Preserve product IDs, catalogue data, product images, logo, brand identity, domain, API rewrites, WhatsApp contact and UPI VPA unless the owner explicitly approves a change.
4. Never commit credentials, database URLs, admin tokens or customer personal data.
5. Server-side code must calculate prices and totals from trusted product data; never trust browser-submitted prices.
6. A UPI intent or QR is only a payment handoff, not proof of payment. Mark payment paid only after independent bank-credit verification and manual reconciliation.
7. Do not store UPI PINs, OTPs or banking credentials.
8. Distinguish code committed, Vercel deployment Ready and functionality tested end-to-end.
9. Make the smallest safe change and test the affected journey on desktop and mobile.
10. Update `docs/PROJECT_MEMORY.md` whenever meaningful architecture, product, design, payment, deployment or operational decisions change.

## Initial audit — required deliverables

Before implementation, return a concise audit containing:

- Repository tree and responsibilities of important files.
- Features confirmed in code versus features verified on production.
- Current product count from the live `products.json`.
- Current Vercel project, production branch, latest deployment status and domain mapping.
- Exact API rewrite destinations and the actual backend source repository/project.
- Actual `/api/orders` and `/api/admin-orders` request/response contracts.
- Neon production connectivity, schema and migration status (without exposing secrets).
- Risks in order creation, duplicate submissions, UPI handoff, manual reconciliation and admin authorization.
- Safe test plan that avoids unintended real payments.
- Prioritized minimal implementation plan.

Do not make production changes during this first audit.

## Core customer journey

Homepage → catalogue/search/filter → product detail → add to bag → cart → delivery details → create order → UPI QR/intent → manual bank-credit verification by the business → order status update.

For price-on-request products, direct the customer to WhatsApp for confirmation. Never generate a checkout amount from an unknown price.

## Core admin journey

Admin authentication → pending orders → independently verify bank credit → enter bank reference → explicitly confirm verification → server validates and records reconciliation → status and audit history updated.

Admin authorization must be enforced on the server, not merely hidden in the browser.

## Suggested work order

**P0: Audit current production and source state.**  
**P1: Verify order creation, server-side pricing, UPI payload, idempotency, admin authorization and manual reconciliation.**  
**P2: Verify product sharing, social preview, catalogue, cart, checkout and mobile UX.**  
**P3: Add operational monitoring, regression tests, backup/recovery documentation and keep project memory current.**

Do not start all roadmap items automatically. Present audit findings and wait for the owner's direction.

## Handover completion report format

For every update, report:
- Objective and scope.
- Files changed.
- Important implementation decisions.
- Tests run and results.
- Commit SHA and branch.
- Vercel deployment status and production URL checked.
- Any unverified items or follow-up risks.
- Whether `docs/PROJECT_MEMORY.md` was updated.

## Session-start prompt

You are taking over updates to the existing Gratitude Candles website. Read `docs/PROJECT_MEMORY.md` and this handover completely. Start with an audit, not implementation. Inspect the latest repository state, Vercel production deployment, API rewrites, separate backend source and Neon schema. Do not rebuild or assume a framework migration. Report confirmed features, unverified items, architecture, risks and a minimal prioritized plan. Do not make production changes during the initial audit. Preserve existing brand/product/payment details and never mark UPI payment as paid without independent bank-credit verification. For subsequent approved changes, make the smallest safe change, test it, report commit/deployment/test status and update the project memory.
