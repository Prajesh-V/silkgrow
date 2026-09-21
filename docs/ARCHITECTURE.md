# SilkGrow — Technical Architecture

**Purpose:** Define the approved MVP technical architecture, boundaries, data flow, deployment model, and responsibilities of Antigravity and Stitch.

**Primary deployment target:** Vercel

**Architecture principle:** Keep the MVP as simple as possible while preserving clean separation of concerns and future replaceability.

---

# 1. Architecture Decision

SilkGrow is a single lightweight Next.js application.

The intended MVP production flow is:

```text
GitHub
   ↓
Vercel
   ↓
Next.js Application
   ↓
Structured Demo Data
+
Forecast JSON
+
Browser-local State
```

No persistent application backend is required for the MVP.

---

# 2. Technology Direction

Preferred frontend stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts or another lightweight React charting library
- Lucide React or another single consistent icon system

The exact package versions should be selected from the currently appropriate stable ecosystem when implementation begins.

Do not add libraries simply because they are popular.

Every additional dependency should have a clear purpose.

---

# 3. Runtime Architecture

The MVP runtime should primarily consist of:

```text
┌──────────────────────────────────────────────┐
│               SILKGROW APP                   │
│                                              │
│  Next.js / React                             │
│        │                                     │
│        ├── UI Components                     │
│        ├── Page/Route Logic                  │
│        ├── Domain Utilities                  │
│        └── Data Access                       │
│                                              │
│  Data                                        │
│   ├── Market JSON                            │
│   ├── Forecast JSON                          │
│   ├── Resource JSON                          │
│   └── Supplier JSON                          │
│                                              │
│  Browser State                               │
│   ├── Demo User                              │
│   ├── Selected Market                        │
│   └── Demo Bookings                           │
└──────────────────────────────────────────────┘
```

---

# 4. Recommended Project Structure

Use a structure similar to:

```text
silkgrow/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   │
│   ├── onboarding/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── market/
│   │   └── page.tsx
│   │
│   ├── forecast/
│   │   └── page.tsx
│   │
│   ├── resources/
│   │   ├── page.tsx
│   │   └── [resourceId]/
│   │       └── page.tsx
│   │
│   ├── bookings/
│   │   └── page.tsx
│   │
│   └── profile/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── common/
│   ├── dashboard/
│   ├── market/
│   ├── forecast/
│   ├── resources/
│   └── bookings/
│
├── data/
│   ├── markets.json
│   ├── cocoonPrices.json
│   ├── silkPrices.json
│   ├── forecasts.json
│   ├── resources.json
│   ├── suppliers.json
│   └── demoBookings.json
│
├── lib/
│   ├── market.ts
│   ├── forecast.ts
│   ├── booking.ts
│   ├── storage.ts
│   ├── formatting.ts
│   └── validation.ts
│
├── types/
│   ├── market.ts
│   ├── forecast.ts
│   ├── resource.ts
│   ├── booking.ts
│   └── user.ts
│
├── public/
│   ├── images/
│   └── icons/
│
└── docs/
```

The exact internal organization can evolve, but separation between UI, domain logic, and data should remain.

---

# 5. Route Architecture

Recommended user-facing routes:

```text
/
/onboarding
/dashboard
/market
/forecast
/resources
/resources/[resourceId]
/bookings
/profile
```

The root route should determine whether to show the welcome experience or continue the existing demo session, according to the final routing implementation.

---

# 6. Rendering Strategy

Use Next.js rendering capabilities pragmatically.

Interactive areas may use client components where necessary.

Examples:

- market selectors
- charts
- quantity controls
- booking interactions
- localStorage
- onboarding state

Do not make every component a client component without reason.

Do not introduce server infrastructure merely to avoid a client component.

---

# 7. State Management

Do not introduce a large global state library for the MVP.

Prefer:

- React state
- small Context providers only when genuinely shared state requires them
- localStorage for browser persistence

Likely shared state:

- demo user
- selected market
- demo bookings

Keep state as close as practical to where it is used.

---

# 8. Local Persistence

Recommended keys:

```text
silkgrow:user
silkgrow:selectedMarket
silkgrow:bookings
```

All direct localStorage access should be wrapped in a utility.

The utility must gracefully handle:

- server/client differences
- missing values
- malformed JSON
- unexpected object shapes
- storage failures

---

# 9. Domain Data Flow — Market

```text
Selected Market
      ↓
Market Data
      ↓
Latest + Previous Record
      ↓
Price Change Calculation
      ↓
Trend Calculation
      ↓
Dashboard / Market UI
```

The dashboard and market page should reuse the same market logic.

Do not independently calculate market changes in separate components.

---

# 10. Domain Data Flow — Forecast

```text
Forecast JSON
      ↓
Selected Market
      ↓
Forecast Selection
      ↓
Forecast Trend
      ↓
Favorable Window
      ↓
AI Insight
      ↓
Forecast UI
```

The forecast UI should not know how the model was trained.

Its contract is the forecast data structure.

---

# 11. Domain Data Flow — Resources

```text
Resource Data
      ↓
Resource Selection
      ↓
Supplier Lookup
      ↓
Resource Details
      ↓
Quantity Selection
      ↓
Booking Validation
```

---

# 12. Domain Data Flow — Booking

```text
Resource
   ↓
Quantity
   ↓
Validation
   ↓
Unit Price
   ↓
Total Calculation
   ↓
Booking Record
   ↓
Local Storage
   ↓
Confirmation
   ↓
My Bookings
```

No server-side order creation is required for the MVP.

---

# 13. Data Contracts

The application should use explicit TypeScript types.

Example:

```ts
interface Market {
  id: string;
  name: string;
  district?: string;
  state: string;
  country: string;
  isDemo: boolean;
}
```

```ts
interface MarketPrice {
  id: string;
  marketId: string;
  commodity: "cocoon" | "silk";
  productName: string;
  date: string;
  price: number;
  unit: string;
  minPrice?: number;
  maxPrice?: number;
  volume?: number;
  sourceType: "demo";
}
```

```ts
interface ForecastPoint {
  date: string;
  predictedPrice: number;
}
```

```ts
interface Forecast {
  id: string;
  marketId: string;
  commodity: "cocoon";
  generatedAt: string;
  forecastHorizonDays: number;
  forecast: ForecastPoint[];
  sourceType: "offline_lstm_demo";
}
```

```ts
interface Supplier {
  id: string;
  name: string;
  location: string;
  deliveryEstimate: string;
  isDemo: boolean;
}
```

```ts
interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  supplierId: string;
  price: number;
  unit: string;
  availableQuantity: number;
  minimumOrderQuantity: number;
  deliveryEstimate: string;
  status: "available" | "limited" | "unavailable";
  isDemo: boolean;
}
```

```ts
interface Booking {
  id: string;
  resourceId: string;
  supplierId: string;
  resourceNameSnapshot: string;
  supplierNameSnapshot: string;
  quantity: number;
  unitPrice: number;
  total: number;
  bookingDate: string;
  estimatedDelivery: string;
  status:
    | "confirmed"
    | "processing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
}
```

---

# 14. Data Layer

Keep demonstration data outside UI components.

Preferred:

```text
data/*.json
     ↓
lib/*.ts
     ↓
React components
```

Do not embed large datasets directly inside route files.

---

# 15. Business Logic Layer

Centralize business rules in `lib/`.

## `lib/market.ts`

Responsible for:

- latest price
- previous price
- absolute change
- percentage change
- trend
- historical filtering

## `lib/forecast.ts`

Responsible for:

- forecast lookup
- forecast trend
- favorable window
- simple forecast insight

## `lib/booking.ts`

Responsible for:

- quantity validation
- total calculation
- booking ID generation
- booking creation

## `lib/storage.ts`

Responsible for:

- user persistence
- selected market persistence
- booking persistence
- safe parsing/reset behavior

---

# 16. Forecast Architecture

The frontend should use a stable forecast contract.

The intended development flow is:

```text
Historical Dataset
      ↓
Offline Preprocessing
      ↓
Offline LSTM Training
      ↓
Evaluation
      ↓
Forecast Generation
      ↓
forecasts.json
      ↓
SilkGrow Frontend
```

No persistent Python runtime is required for the MVP.

The actual ML work may live outside the production Next.js runtime.

---

# 17. ML Separation

The frontend must NOT contain:

- model training
- GPU code
- PyTorch runtime
- TensorFlow runtime
- inference server
- training loops

unless the product requirements are explicitly changed.

The frontend consumes model output.

---

# 18. Stitch Development Architecture

Google Stitch MCP is a development-time dependency for visual work.

It does not belong inside the production runtime.

```text
              DEVELOPMENT
                   │
             Google Stitch
                   │
             Design Artifact
                   │
                   ▼
              Antigravity
                   │
             Next.js Code
                   │
                   ▼
                GitHub
                   │
                   ▼
                Vercel
```

Stitch should be used before implementation for new or materially changed visual tasks.

See `STITCH_WORKFLOW.md`.

---

# 19. Ownership Boundary

## Stitch

Owns:

- visual design
- layout
- appearance
- responsive visual intent
- visual iteration

## Antigravity

Owns:

- application code
- routing
- state
- data
- business logic
- validation
- persistence
- accessibility implementation
- testing
- build
- deployment

A design change should originate through Stitch.

A code/logic change should be handled by Antigravity.

---

# 20. Vercel Constraints

The MVP should not rely on:

- persistent local filesystem
- background workers
- long-running processes
- always-on backend servers
- GPU
- machine-specific paths
- state stored only in server memory

The ideal MVP should require no production secret.

If a future external service is introduced, document it and use environment variables.

---

# 21. Dependency Strategy

Preferred core dependencies should remain small.

Candidates:

- Next.js
- React
- TypeScript
- Tailwind
- Recharts
- Lucide React

Before adding another package, ask:

1. What exact requirement does it satisfy?
2. Can the requirement be met with existing tools?
3. Does the dependency increase maintenance or deployment complexity?

If the answer is unclear, do not add it.

---

# 22. Error Handling

The application should gracefully handle:

- missing JSON data
- invalid resource IDs
- malformed localStorage
- invalid booking quantities
- missing forecast data
- unsupported navigation state

Users should receive human-readable messages.

Do not display raw stack traces in user-facing screens.

---

# 23. Performance Strategy

Prioritize:

- small client bundle
- optimized images
- limited third-party code
- reasonable dataset sizes
- reusable components
- minimal rerenders

Do not add unnecessary animations or large visual assets.

---

# 24. Security and Honesty

The demo authentication flow is not production authentication.

The demo booking flow is not a real purchase.

The mock market data is not verified live market data.

The forecast is not guaranteed.

Documentation and UI copy should reflect what the system actually does.

---

# 25. Future Evolution

If requirements later justify a production backend, the architecture can evolve to:

```text
Next.js
   ↓
API Layer
   ├── Market
   ├── Forecast
   └── Booking
          ↓
       Database

Forecast API
      ↓
   ML Service
      ↓
     LSTM
```

Do not implement this future architecture for the MVP.

---

# 26. Final Architecture Principle

> Build the simplest architecture that can convincingly demonstrate the complete SilkGrow product.

Complexity is not a quality metric.
