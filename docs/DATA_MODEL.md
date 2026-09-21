# SilkGrow — Data Model & Demonstration Data Specification

**Purpose:** Define the exact data structures, relationships, integrity rules, and forecast contract used by the SilkGrow MVP.

**Primary source:** Application requirements and architecture documents in `/docs`.

---

# 1. Data Philosophy

The MVP uses realistic demonstration data.

The data must be:

- deterministic
- internally consistent
- plausible enough for a convincing UI
- clearly identified as demonstration data where appropriate
- separate from UI code
- replaceable by future APIs

Do not fabricate claims about actual live market conditions.

---

# 2. Data Directory

Recommended:

```text
data/
├── markets.json
├── cocoonPrices.json
├── silkPrices.json
├── forecasts.json
├── resources.json
├── suppliers.json
└── demoBookings.json
```

---

# 3. Entity Relationships

```text
Market
 ├── Cocoon Prices
 ├── Silk Prices
 └── Forecasts

Supplier
 └── Resources
      └── Bookings

User
 └── Bookings
```

Every reference must resolve.

---

# 4. Identifier Rules

Use stable string IDs.

Examples:

```text
market-ramanagara
market-mysuru

supplier-001

resource-mulberry-leaves

forecast-ramanagara-cocoon-2026-09-20

SG-10291
```

Do not use array indexes as persistent identifiers.

---

# 5. Market Model

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

Initial demonstration markets:

- Ramanagara
- Mysuru
- Channapatna
- Kolar
- Mandya
- Bengaluru

---

# 6. Market Price Model

Use the same structure for cocoon and silk.

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

Example:

```json
{
  "id": "price-ramanagara-cocoon-001",
  "marketId": "market-ramanagara",
  "commodity": "cocoon",
  "productName": "Crossbreed Cocoon",
  "date": "2026-09-20",
  "price": 742,
  "unit": "kg",
  "minPrice": 718,
  "maxPrice": 768,
  "volume": 1842,
  "sourceType": "demo"
}
```

---

# 7. Price Data Rules

Dates use:

```text
YYYY-MM-DD
```

Prices are numeric.

Historical records should be chronologically sortable.

Each market/commodity series should contain enough variation for meaningful charts.

Avoid perfectly linear mock data.

---

# 8. Current Price

Do not duplicate current price as a separate manually maintained field.

Calculate it as:

```text
latest record by date
```

---

# 9. Previous Price

For change calculations:

```text
previous = second latest record
```

If no previous record exists, the UI should handle the unavailable comparison gracefully.

---

# 10. Change Calculation

```text
absoluteChange = currentPrice - previousPrice
```

```text
percentageChange =
((currentPrice - previousPrice) / previousPrice) × 100
```

Presentation rounding belongs in formatting utilities.

---

# 11. Trend Rule

Initial centralized rule:

```text
percentageChange > +1%
    → Increasing

percentageChange < -1%
    → Decreasing

otherwise
    → Stable
```

Do not duplicate or alter this threshold independently across screens.

---

# 12. Forecast Model

```ts
interface ForecastPoint {
  date: string;
  predictedPrice: number;
}

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

---

# 13. Forecast Example

```json
{
  "id": "forecast-ramanagara-cocoon-2026-09-20",
  "marketId": "market-ramanagara",
  "commodity": "cocoon",
  "generatedAt": "2026-09-20",
  "forecastHorizonDays": 7,
  "sourceType": "offline_lstm_demo",
  "forecast": [
    {
      "date": "2026-09-21",
      "predictedPrice": 748
    },
    {
      "date": "2026-09-22",
      "predictedPrice": 755
    },
    {
      "date": "2026-09-23",
      "predictedPrice": 763
    },
    {
      "date": "2026-09-24",
      "predictedPrice": 771
    },
    {
      "date": "2026-09-25",
      "predictedPrice": 779
    },
    {
      "date": "2026-09-26",
      "predictedPrice": 776
    },
    {
      "date": "2026-09-27",
      "predictedPrice": 781
    }
  ]
}
```

---

# 14. Forecast Rules

Forecast points must:

- occur after `generatedAt`
- be sorted chronologically
- contain numeric predicted prices
- align with the forecast horizon

The frontend must not generate arbitrary "AI" predictions using random formulas.

---

# 15. Forecast Trend

Centralize trend logic.

Conceptually:

```text
final forecast > initial forecast + threshold
    → Increasing

final forecast < initial forecast - threshold
    → Decreasing

otherwise
    → Stable
```

The exact threshold can reuse the project's central forecast logic.

---

# 16. Predicted Favorable Window

The favorable window should be derived from data.

Suggested process:

```text
Current market price
       ↓
7-day forecast
       ↓
Identify forecast points above current price
       ↓
Select a meaningful favorable period
       ↓
Display as predicted favorable window
```

The UI must never call this:

- guaranteed best day
- guaranteed maximum price
- guaranteed profit

---

# 17. Forecast Insight

An insight should be derived only from available information.

Example:

> The forecast indicates a short-term upward movement compared with the current market price.

Do not invent weather, demand, policy, or supply explanations unless those factors actually exist in the model data.

---

# 18. Supplier Model

```ts
interface Supplier {
  id: string;
  name: string;
  location: string;
  deliveryEstimate: string;
  isDemo: boolean;
}
```

Supplier records are demonstration records.

---

# 19. Resource Model

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

---

# 20. Resource Categories

Use categories such as:

```text
mulberry-leaves
cocoons
rearing-equipment
disinfectants
other
```

---

# 21. Resource Status

```text
available
limited
unavailable
```

Unavailable resources cannot be booked.

---

# 22. Resource Quantity Rules

For a booking:

```text
quantity > 0
quantity >= minimumOrderQuantity
quantity <= availableQuantity
```

All must pass before confirmation.

---

# 23. Resource Price

Store numeric values:

```json
{
  "price": 48,
  "unit": "kg"
}
```

Do not store formatted currency strings in numeric fields.

Formatting belongs in the presentation layer.

---

# 24. Booking Model

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

# 25. Booking Snapshot Rule

When creating a booking, store:

- resource name snapshot
- supplier name snapshot

This keeps booking history readable even if demo catalog records change.

---

# 26. Booking Total

Always calculate:

```text
total = unitPrice × quantity
```

Never hardcode a booking total.

---

# 27. Booking ID

Use a readable generated ID:

```text
SG-10291
```

The implementation must avoid duplicate IDs within the current booking collection.

---

# 28. Demo Booking Records

`demoBookings.json` may contain initial demonstration records for the My Bookings screen.

User-created bookings should be stored in browser-local state.

Do not modify static JSON files during runtime.

---

# 29. Demo User

```ts
interface DemoUser {
  name: string;
  phone: string;
  marketId: string;
  createdAt: string;
}
```

No production password/authentication credential is part of the MVP.

---

# 30. Local Storage

Recommended keys:

```text
silkgrow:user
silkgrow:selectedMarket
silkgrow:bookings
```

All localStorage operations should pass through a storage utility.

---

# 31. Data Integrity Rules

The dataset must satisfy:

- every price references an existing market
- every forecast references an existing market
- every resource references an existing supplier
- booking references remain resolvable
- all prices are non-negative
- all quantities are non-negative
- minimum order quantity is positive
- forecast dates are after generation date
- historical records precede forecast records

---

# 32. Mock Data Realism

Variation should include:

- small daily movements
- occasional stronger changes
- rising periods
- falling periods
- stable periods
- different market behaviors
- different supplier availability
- different delivery estimates

Do not make every market's prices move in identical patterns.

Do not make every forecast increase.

---

# 33. Recommended Dataset Size

For each market:

- 30 days cocoon history
- 30 days silk history
- 7 cocoon forecast points

With 6 markets:

```text
180 cocoon records
180 silk records
42 forecast points
```

This is enough for a convincing MVP without creating unnecessary payload size.

---

# 34. Source Labels

Demonstration market records should use:

```text
sourceType: "demo"
```

Forecast records should use:

```text
sourceType: "offline_lstm_demo"
```

This keeps provenance explicit.

---

# 35. Data / UI Separation

The data model must remain independent from Stitch.

Stitch determines how information is displayed.

The underlying entity structures should not change merely because the visual design changes.

---

# 36. Future API Compatibility

Keep the interface between data access and UI stable.

Current:

```text
JSON
 ↓
Data utilities
 ↓
Components
```

Future:

```text
API
 ↓
Data utilities
 ↓
Components
```

The goal is to replace the data provider without rewriting the entire frontend.
