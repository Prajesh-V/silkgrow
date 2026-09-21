# SilkGrow — Product Requirements

**Purpose:** Define the exact MVP behavior and acceptance criteria.

**Design rule:** Every user-facing screen or material visual change must go through the mandatory Stitch workflow defined in `STITCH_WORKFLOW.md`.

---

# 1. Requirement Philosophy

A feature is complete only when:

- functional behavior works
- approved Stitch design exists where applicable
- implementation matches the intended visual design
- responsive behavior works
- accessibility basics pass
- relevant acceptance criteria pass
- previous functionality remains intact

---

# 2. Application Routes

The intended MVP route structure is:

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

The exact routing implementation may vary internally, but user-facing behavior should remain equivalent.

---

# 3. Onboarding Requirements

## ONB-001 — Welcome Screen

The welcome screen must communicate:

- SilkGrow branding
- what the application does
- primary Get Started action

### Acceptance Criteria

- branding is visible
- value proposition is understandable quickly
- Get Started works
- mobile layout is usable
- approved Stitch design exists

---

## ONB-002 — User Information

Collect:

- Name
- Phone number
- Market/location

### Acceptance Criteria

- name is required
- phone number has reasonable client-side validation
- market is required
- validation errors are understandable
- valid submission reaches dashboard

No real OTP is required.

---

## ONB-003 — Demo Session

Create a lightweight browser-local user session.

### Acceptance Criteria

- valid session survives refresh
- logout clears the session
- no external authentication provider is required
- session state does not require a backend

---

## ONB-004 — Demonstration Disclosure

Where market information is demonstration data, show an appropriate non-intrusive label such as:

`Demonstration Market Data`

---

# 4. Dashboard Requirements

## DASH-001 — Greeting

Show:

- user name
- selected market
- current date

Example:

```text
Good morning, Kanishk

Ramanagara Market
20 September 2026
```

---

## DASH-002 — Cocoon Summary

Show:

- current cocoon price
- unit
- absolute change
- percentage change
- trend state

The value should come from the centralized market data layer.

---

## DASH-003 — Silk Summary

Show:

- current silk price
- unit
- absolute change
- percentage change
- trend state

---

## DASH-004 — Forecast Summary

Show:

- forecast value
- forecast direction
- predicted favorable window
- action to open full forecast

---

## DASH-005 — Quick Actions

Provide clear access to:

- Market
- AI Forecast
- Resources
- My Bookings

---

## DASH-006 — AI Insight

Show one concise insight derived from available market/forecast data.

The insight must not invent unsupported causes such as weather, policy, or demand unless those variables actually exist in the data.

---

# 5. Market Intelligence Requirements

## MKT-001 — Market Selection

Allow users to select among the demonstration markets:

- Ramanagara
- Mysuru
- Channapatna
- Kolar
- Mandya
- Bengaluru

Changing the market must update related market information consistently.

---

## MKT-002 — Cocoon Price

Show:

- current price
- unit
- absolute change
- percentage change
- selected market
- trend

---

## MKT-003 — Silk Price

Show equivalent information for silk.

---

## MKT-004 — Historical Data

Provide:

- 7-day trend
- 30-day trend

Charts must include:

- understandable dates
- readable prices
- unit context
- usable tooltips
- responsive sizing

---

## MKT-005 — Commodity Selection

Provide a clear way to switch between cocoon and silk information without creating unnecessary duplicated page structures.

---

## MKT-006 — Trend State

Use centralized logic for:

- Increasing
- Decreasing
- Stable

Do not create independent trend rules across components.

---

# 6. AI Forecast Requirements

## AI-001 — Current Context

The forecast screen must show the current cocoon price before showing future estimates.

---

## AI-002 — Historical/Forecast Distinction

The main chart must clearly distinguish historical data from forecast data.

The point at which the forecast begins must be obvious.

---

## AI-003 — Seven-Day Forecast

Display seven future forecast points.

Each point must contain:

- date
- predicted price

---

## AI-004 — Forecast Direction

Derive:

- Increasing
- Decreasing
- Stable

from forecast data.

---

## AI-005 — Predicted Favorable Window

Display a window derived from current price and forecast data.

Use wording such as:

`Predicted favorable window`

Never:

`Guaranteed best day`

or:

`Guaranteed maximum profit`

---

## AI-006 — AI Explanation

Provide one simple explanation of the forecast direction.

Example:

> The forecast indicates a short-term upward movement compared with the current market price.

Do not invent causal explanations unsupported by the dataset.

---

## AI-007 — Forecast Disclaimer

Display:

> AI forecasts are estimates based on historical patterns. Actual market prices may differ.

---

## AI-008 — Forecast Contract

The UI must depend on a stable forecast data contract.

The source can later change from demonstration data to real offline LSTM output without requiring a redesign of the forecast interface.

---

# 7. Resource Requirements

## RES-001 — Resource Catalogue

Display resource cards containing:

- name
- description
- price
- unit
- availability
- supplier
- delivery estimate
- primary action

---

## RES-002 — Resource Details

Display:

- name
- description
- supplier
- supplier location where available
- price
- unit
- available quantity
- minimum order quantity
- delivery estimate
- quantity selector
- calculated total
- booking CTA

---

## RES-003 — Quantity Validation

Prevent:

- zero
- negative quantity
- below minimum order
- above available quantity

---

## RES-004 — Resource Status

Support:

- available
- limited
- unavailable

Unavailable resources cannot be booked.

---

## RES-005 — Supplier Data

Supplier information is demonstration data.

The UI must not imply an actual commercial relationship.

---

# 8. Booking Requirements

## BOOK-001 — Booking Review

Before confirmation, show:

- resource
- supplier
- quantity
- unit price
- total
- estimated delivery

---

## BOOK-002 — Total Calculation

Use:

```text
total = unit price × quantity
```

The value must be calculated.

---

## BOOK-003 — Booking Confirmation

After confirmation, create a local booking record containing:

- booking ID
- resource ID
- supplier ID
- resource name snapshot
- supplier name snapshot
- quantity
- unit price
- total
- booking date
- estimated delivery
- status

---

## BOOK-004 — Booking ID

Generate readable IDs such as:

`SG-10291`

Do not hardcode the same ID for every booking.

---

## BOOK-005 — My Bookings

Display:

- booking ID
- resource
- quantity
- amount
- estimated delivery
- status

---

# 9. Persistence Requirements

## DATA-001 — User

Persist the demo user locally.

## DATA-002 — Market

Persist selected market locally where useful.

## DATA-003 — Bookings

Persist user-created bookings locally.

## DATA-004 — Reset

Provide a development/demo reset mechanism for local state.

---

# 10. Responsive Requirements

All major screens must work on:

- mobile
- tablet
- desktop

No critical horizontal overflow is acceptable.

---

# 11. Accessibility Requirements

At minimum:

- semantic headings
- form labels
- accessible controls
- visible focus
- keyboard navigation
- readable contrast
- status information not dependent only on color
- textual context for charts

---

# 12. Visual Design Requirements

A user-facing feature is not visually complete unless:

1. relevant Stitch design work was completed
2. an approved design artifact/reference exists
3. implementation matches the approved design intent
4. responsive visual behavior was reviewed
5. visual QA passed

---

# 13. Quality Requirements

The MVP should:

- build successfully
- have no critical runtime errors
- avoid unnecessary dependencies
- keep data separate from UI
- preserve existing features
- remain deployable to Vercel

---

# 14. Explicit MVP Exclusions

Do not implement unless separately approved:

- real OTP
- production auth
- payments
- live logistics
- live market APIs
- real supplier onboarding
- production accounting
- IoT
- persistent backend
- runtime ML server
- unrelated features

---

# 15. Requirement Traceability

Every implementation task should identify the requirement IDs it satisfies.

Example:

```text
Dashboard:
DASH-001
DASH-002
DASH-003
DASH-004
DASH-005
DASH-006
```

A task cannot be considered complete if its acceptance criteria are not verified.
