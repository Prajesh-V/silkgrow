# SilkGrow — Antigravity Understanding Report

**Created:** 2026-09-20  
**Agent:** Antigravity  
**Phase:** 0 — Understanding Gate

---

## 1. What SilkGrow Is

SilkGrow is a decision-support web application for sericulture (silk farming) in India. It targets a specific, real agricultural domain — sericulture — and provides three types of value through a single, simple application: market intelligence, AI-assisted forecasting, and resource procurement simulation.

The product is deliberately not a generic dashboard, not a CRUD exercise, and not a marketplace platform. It is a focused tool that answers three practical questions a sericulture farmer would actually ask:

1. What is happening in the market right now?
2. What might happen in the near future?
3. What resources can I arrange?

SilkGrow should feel like a credible agricultural technology startup product — calm, trustworthy, farmer-friendly, and intentional.

---

## 2. The Three Core Product Modules

### Module A — AI Price Prediction

The headline feature. Displays the current cocoon price, a 7-day LSTM-based forecast, the forecast direction (increasing/decreasing/stable), a predicted favorable selling window, a concise AI-generated insight, and a mandatory disclaimer. The forecast is decision-support — never a guarantee.

### Module B — Cocoon & Silk Market Intelligence

Provides current prices, absolute and percentage changes, trend classification, and historical charts (7-day and 30-day) for both cocoon and silk commodities across six demonstration Karnataka markets. Movement is classified as Increasing/Decreasing/Stable using a centralized ±1% threshold rule.

### Module C — Resource Booking

A lightweight demonstration marketplace for sericulture supplies (mulberry leaves, cocoons, rearing trays, disinfectants, etc.). Farmers can browse resources with supplier details, select quantities with validation, simulate bookings, and view booking history. Bookings are stored entirely in browser localStorage — no server-side order creation.

---

## 3. The Target User

A sericulture farmer in Karnataka, India. The farmer may not know anything about machine learning, APIs, databases, or forecasting terminology. The interface must be immediately understandable, with clear labels, large readable prices, obvious actions, and meaningful feedback. The design should communicate agricultural warmth combined with modern data clarity.

---

## 4. The Primary User Journey

```
Welcome → Onboarding (Name, Phone, Market) → Dashboard → Market Intelligence / AI Forecast / Resources → Resource Details → Booking Review → Booking Confirmation → My Bookings
```

The dashboard is the command center. From there, the user can navigate to any of the three core modules. The resource path extends through details, quantity selection, review, confirmation, and My Bookings. Profile is accessible throughout. The user can always return to the dashboard.

---

## 5. The Vercel-First Architecture

```
GitHub → Vercel → Next.js Application → Structured Demo Data + Forecast JSON + Browser-local State
```

This is a single Next.js application deployed through Vercel's git-integrated platform. There is no application backend, no database, no API server, no ML inference server. The entire runtime is a static Next.js application served by Vercel's edge network.

The technology stack is:
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Recharts (or equivalent lightweight chart library)
- Lucide React (icons)

State management uses React state, small Context providers where genuinely shared state is needed, and localStorage for persistence. No large global state library.

---

## 6. Why the MVP Does Not Require a Persistent Backend

The MVP is intentionally scoped so that every data need can be satisfied by:

- **Static JSON files** for demonstration market data, forecasts, resources, and suppliers
- **Browser localStorage** for the demo user session, selected market, and user-created bookings
- **Offline-generated forecast JSON** for the LSTM predictions

There is no user registration requiring a database, no payment processing requiring a payment gateway, no real supplier inventory requiring an API, no live market data requiring a market feed, and no real-time ML inference requiring a Python server. The demo user session is entirely client-side. Bookings are localStorage records. This makes the deployment trivially simple — push to GitHub, Vercel builds and deploys.

---

## 7. The Mock-Data Strategy

All market prices, forecasts, resources, and suppliers are realistic demonstration data stored in structured JSON files under `data/`:

- `markets.json` — 6 Karnataka markets (Ramanagara, Mysuru, Channapatna, Kolar, Mandya, Bengaluru)
- `cocoonPrices.json` — 30 days of history per market (~180 records)
- `silkPrices.json` — 30 days of history per market (~180 records)
- `forecasts.json` — 7 forecast points per market (~42 points)
- `resources.json` — Sericulture supplies with status, pricing, quantities
- `suppliers.json` — Demo supplier records
- `demoBookings.json` — Seed booking records

The data must be deterministic, internally consistent, plausible, and clearly labeled as demonstration data (via `sourceType: "demo"` and `sourceType: "offline_lstm_demo"`). Prices should have realistic variation — not perfectly linear. Different markets should behave differently. Not every forecast should increase. Data access flows through `lib/` utilities, not directly from components.

---

## 8. The LSTM/Forecasting Strategy

The approved flow is:

```
Historical Price Data → Offline Preprocessing → Offline LSTM Training → Forecast Generation → forecasts.json → SilkGrow Frontend
```

The frontend consumes a stable forecast contract (`Forecast` with `ForecastPoint[]`). It does not know or care how the model was trained. The forecast JSON can initially be demonstration data following the same contract. When a real LSTM model produces output, the JSON file is replaced — the frontend needs no architectural changes.

The frontend must NEVER:
- Contain model training code
- Run PyTorch/TensorFlow
- Generate random "AI" predictions in the browser
- Imply guaranteed outcomes

Required disclaimer on every forecast view: "AI forecasts are estimates based on historical patterns. Actual market prices may differ."

---

## 9. The Role of Stitch

Google Stitch MCP is the **mandatory visual design authority** for SilkGrow. It owns:

- Screen design and page composition
- Visual hierarchy and layout
- Typography, colors, spacing
- Component appearance
- Navigation appearance
- Chart presentation
- Responsive visual design
- Visual alternatives and refinement
- Empty/loading/error visual states

Stitch is a **development-time tool**. It participates before and during implementation. It does NOT become a runtime dependency. No Stitch API calls in production.

The workflow is: Requirement → Stitch → Generate/Refine Design → Review → Approved Artifact → Antigravity Implementation → Visual QA.

A major UI task cannot be considered complete without a traceable Stitch design artifact.

---

## 10. The Role of Antigravity

Antigravity is the **engineering authority**. It owns:

- Next.js/React implementation of approved Stitch designs
- Routing (App Router)
- TypeScript types and data contracts
- Application state management
- Data integration (JSON → lib/ → components)
- Business logic (price changes, trends, forecast direction, favorable window, booking totals, validation)
- localStorage persistence
- Accessibility implementation
- Testing and verification
- Build configuration
- Git operations
- Vercel deployment

Antigravity does NOT independently originate major visual designs. It translates approved Stitch designs into maintainable code, connecting them to real data and logic.

---

## 11. The Routes

```
/                    Welcome (root, redirects based on session)
/onboarding          Name, phone, market selection
/dashboard           Main command center
/market              Market intelligence with charts
/forecast            AI forecast screen
/resources           Resource catalogue
/resources/[id]      Resource details with quantity selector
/bookings            My Bookings
/profile             User profile with logout
```

---

## 12. The Data Entities

| Entity | Key Fields | Storage |
|--------|-----------|---------|
| Market | id, name, district, state, country, isDemo | Static JSON |
| MarketPrice | id, marketId, commodity, productName, date, price, unit, sourceType | Static JSON |
| Forecast | id, marketId, commodity, generatedAt, forecastHorizonDays, forecast[], sourceType | Static JSON |
| ForecastPoint | date, predictedPrice | Nested in Forecast |
| Supplier | id, name, location, deliveryEstimate, isDemo | Static JSON |
| Resource | id, name, category, description, supplierId, price, unit, availableQuantity, minimumOrderQuantity, deliveryEstimate, status, isDemo | Static JSON |
| Booking | id, resourceId, supplierId, resourceNameSnapshot, supplierNameSnapshot, quantity, unitPrice, total, bookingDate, estimatedDelivery, status | localStorage |
| DemoUser | name, phone, marketId, createdAt | localStorage |

Referential integrity: every price → market, every forecast → market, every resource → supplier. Booking snapshots resource/supplier names at creation time.

---

## 13. The Implementation Phases

| Phase | Focus | Stitch Required |
|-------|-------|----------------|
| 0 | Understanding Gate (this phase) | No |
| 1 | Next.js Foundation | No |
| 2 | Design System + App Shell | YES |
| 3 | Onboarding | YES |
| 4 | Dashboard | YES |
| 5 | Market Intelligence | YES |
| 6 | AI Forecast | YES |
| 7 | Resource Marketplace | YES |
| 8 | Booking Flow | YES |
| 9 | Integration Testing | No |
| 10 | Responsive + Accessibility | Visual review |
| 11 | Visual QA | YES (comparison) |
| 12 | Code Quality | No |
| 13 | Production Build | No |
| 14 | Vercel Deployment | No |

Each phase has explicit gates. No phase should be skipped. Visual phases cannot proceed without Stitch design approval.

---

## 14. The Scope Boundaries

**Explicitly excluded from MVP:**
- Real payment processing
- Production authentication / real OTP
- Real supplier onboarding / accounts
- Real logistics tracking
- Live market-price APIs
- Production financial accounting
- IoT devices
- Multi-service backend infrastructure
- Runtime Python ML inference
- Complex recommendation engines
- Weather integration
- Notifications
- Multi-language support

Any of these require explicit approval before implementation.

---

## 15. The Deployment Strategy

1. Develop locally with `npm run dev`
2. Verify with `npm run build` at milestones
3. Commit stable state to Git
4. Push to GitHub
5. Import into Vercel
6. Vercel auto-detects Next.js, builds, deploys
7. Run production smoke test on the deployed URL

No production secrets are needed for the MVP. No environment variables required. No database connections. No external service dependencies.

---

## 16. The Rules That Must Not Be Violated

1. **Stitch before implementation** for any visual task
2. **No persistent backend** unless explicitly approved
3. **No runtime ML inference** — frontend consumes forecast JSON
4. **No fake AI** — never generate random browser-side predictions and call them LSTM
5. **No guarantee language** — forecasts are estimates, not certainties
6. **Centralized business logic** — no duplicate trend/change/validation rules across components
7. **Data/UI separation** — JSON → lib/ → components, never large datasets inside page files
8. **Incremental build** — follow the phase plan, don't one-shot the entire application
9. **Design Registry traceability** — every major screen needs a Stitch artifact reference
10. **No scope creep** — document interesting ideas, do not silently implement them
11. **Verification before completion** — a feature is not done because code was written
12. **Honest data labeling** — demo data is never presented as verified live market data
