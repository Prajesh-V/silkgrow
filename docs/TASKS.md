# SilkGrow — Executable Task Ledger

**Purpose:** Give Antigravity a concrete checklist for executing the approved implementation plan.

**Rule:** Work in order unless the current task explicitly depends on another task.

**Status values:**

```text
[ ] Not started
[-] In progress
[x] Complete
[!] Blocked
```

---

# PHASE 0 — UNDERSTANDING

## T000 — Read documentation

- [ ] Read `PROJECT_CONTEXT.md`
- [ ] Read `PRODUCT_REQUIREMENTS.md`
- [ ] Read `UI_DESIGN.md`
- [ ] Read `ARCHITECTURE.md`
- [ ] Read `DATA_MODEL.md`
- [ ] Read `IMPLEMENTATION_PLAN.md`
- [ ] Read `TASKS.md`
- [ ] Read `AGENT_RULES.md`
- [ ] Read `STITCH_WORKFLOW.md`

---

## T001 — Verify Stitch MCP

- [ ] Confirm configured Stitch MCP is accessible
- [ ] Identify actual available Stitch operations/capabilities
- [ ] Do not invent unsupported operations
- [ ] Record findings

---

## T002 — Understanding report

Create:

```text
docs/ANTIGRAVITY_UNDERSTANDING.md
```

Include:

- product summary
- three core modules
- architecture
- deployment
- data strategy
- ML strategy
- Stitch responsibility
- Antigravity responsibility
- routes
- scope boundaries

---

## T003 — Stitch workflow report

Create:

```text
docs/ANTIGRAVITY_STITCH_WORKFLOW.md
```

Include:

- visual task triggers
- Stitch workflow
- artifact/reference strategy
- visual QA
- responsive workflow
- mismatch handling

---

## T004 — Open questions

Create:

```text
docs/ANTIGRAVITY_OPEN_QUESTIONS.md
```

Only include genuine blockers.

If none:

```text
No blocking contradictions found.
```

---

## T005 — STOP GATE

- [ ] No application code written
- [ ] No dependencies installed
- [ ] No pages created
- [ ] No deployment started
- [ ] Understanding complete
- [ ] User approval requested

**Do not continue until explicitly authorized.**

---

# PHASE 1 — FOUNDATION

## T100 — Next.js setup

- [ ] Initialize Next.js
- [ ] Configure TypeScript
- [ ] Configure Tailwind
- [ ] Configure routing
- [ ] Add justified dependencies only

---

## T101 — Project directories

Create:

```text
app/
components/
data/
lib/
types/
public/
docs/
```

---

## T102 — Base layout

- [ ] root layout
- [ ] metadata
- [ ] global CSS
- [ ] page container
- [ ] typography foundation

---

## T103 — Foundation verification

- [ ] `npm install`
- [ ] `npm run dev`
- [ ] `npm run build`

---

# PHASE 2 — DESIGN SYSTEM + APP SHELL

## T200 — Stitch shell design

**Stitch required**

- [ ] App shell design
- [ ] Desktop navigation
- [ ] Mobile navigation
- [ ] Typography hierarchy
- [ ] Color system
- [ ] Spacing
- [ ] Buttons
- [ ] Cards
- [ ] Inputs
- [ ] Badges
- [ ] Chart container treatment
- [ ] Review design
- [ ] Record traceable Stitch artifact/reference

---

## T201 — Shell implementation

- [ ] Implement approved design
- [ ] Implement desktop navigation
- [ ] Implement mobile navigation
- [ ] Implement shared UI primitives
- [ ] Preserve Stitch hierarchy

---

## T202 — Shell QA

- [ ] Mobile visual QA
- [ ] Tablet visual QA
- [ ] Desktop visual QA
- [ ] Keyboard/focus check
- [ ] Build check

---

# PHASE 3 — ONBOARDING

## T300 — Stitch onboarding design

**Stitch required**

- [ ] Welcome screen
- [ ] Onboarding form
- [ ] Validation states
- [ ] Review design
- [ ] Record Stitch artifact/reference

---

## T301 — Onboarding implementation

- [ ] Welcome route
- [ ] Onboarding route
- [ ] Name field
- [ ] Phone field
- [ ] Market selector
- [ ] Validation
- [ ] Local demo user
- [ ] Logout behavior

---

## T302 — Onboarding QA

- [ ] Valid form
- [ ] Invalid form
- [ ] Refresh
- [ ] Logout
- [ ] Mobile
- [ ] Desktop
- [ ] Visual comparison to Stitch

---

# PHASE 4 — DASHBOARD

## T400 — Stitch dashboard design

**Stitch required**

Design/refine:

- [ ] greeting
- [ ] market context
- [ ] cocoon card
- [ ] silk card
- [ ] forecast summary
- [ ] quick actions
- [ ] AI insight
- [ ] demo-data label

Then:

- [ ] Review
- [ ] Approve
- [ ] Record artifact/reference

---

## T401 — Dashboard implementation

- [ ] Greeting
- [ ] Market context
- [ ] Cocoon summary
- [ ] Silk summary
- [ ] Forecast summary
- [ ] Quick actions
- [ ] AI insight
- [ ] Demonstration-data disclosure

---

## T402 — Dashboard data integration

- [ ] Connect selected market
- [ ] Connect latest cocoon price
- [ ] Connect latest silk price
- [ ] Connect changes
- [ ] Connect trend
- [ ] Connect forecast summary

---

## T403 — Dashboard QA

- [ ] Switch markets
- [ ] Verify values change consistently
- [ ] Mobile QA
- [ ] Desktop QA
- [ ] Stitch visual comparison

---

# PHASE 5 — MARKET INTELLIGENCE

## T500 — Stitch market design

**Stitch required**

Design:

- [ ] market selector
- [ ] commodity selector
- [ ] cocoon price card
- [ ] silk price card
- [ ] trend states
- [ ] 7-day chart
- [ ] 30-day chart
- [ ] responsive behavior
- [ ] loading/empty/error states as relevant
- [ ] Review
- [ ] Record artifact/reference

---

## T501 — Market data types

- [ ] Market type
- [ ] MarketPrice type

---

## T502 — Market data

- [ ] `markets.json`
- [ ] `cocoonPrices.json`
- [ ] `silkPrices.json`

---

## T503 — Market utilities

- [ ] latest price
- [ ] previous price
- [ ] absolute change
- [ ] percentage change
- [ ] trend classification
- [ ] historical filtering

---

## T504 — Market UI

- [ ] Market selector
- [ ] Commodity selector
- [ ] Price cards
- [ ] Trend state
- [ ] 7-day chart
- [ ] 30-day chart

---

## T505 — Market QA

Test every market:

- [ ] Ramanagara
- [ ] Mysuru
- [ ] Channapatna
- [ ] Kolar
- [ ] Mandya
- [ ] Bengaluru

For both:

- [ ] Cocoon
- [ ] Silk

Then:

- [ ] mobile
- [ ] desktop
- [ ] visual comparison

---

# PHASE 6 — AI FORECAST

## T600 — Stitch forecast design

**Stitch required**

Design:

- [ ] current price context
- [ ] forecast summary
- [ ] historical/forecast chart
- [ ] forecast legend
- [ ] 7-day forecast
- [ ] favorable window
- [ ] AI insight
- [ ] disclaimer
- [ ] responsive chart
- [ ] Review
- [ ] Record artifact/reference

---

## T601 — Forecast data

- [ ] Forecast type
- [ ] ForecastPoint type
- [ ] `forecasts.json`
- [ ] Seven points per market

---

## T602 — Forecast utilities

- [ ] forecast lookup
- [ ] forecast trend
- [ ] favorable-window logic
- [ ] simple insight generation

---

## T603 — Forecast UI

- [ ] Current price
- [ ] Forecast summary
- [ ] Historical/forecast chart
- [ ] Seven-day forecast
- [ ] Trend
- [ ] Favorable window
- [ ] Insight
- [ ] Disclaimer

---

## T604 — Forecast QA

Verify:

- [ ] increasing state
- [ ] decreasing state
- [ ] stable state
- [ ] favorable-window calculation
- [ ] disclaimer
- [ ] mobile chart
- [ ] desktop chart
- [ ] Stitch comparison

---

# PHASE 7 — RESOURCES

## T700 — Stitch resource design

**Stitch required**

Design:

- [ ] catalogue
- [ ] resource card
- [ ] supplier section
- [ ] availability state
- [ ] delivery estimate
- [ ] resource details
- [ ] quantity selector
- [ ] Review
- [ ] Record artifact/reference

---

## T701 — Resource data

- [ ] Resource type
- [ ] Supplier type
- [ ] `resources.json`
- [ ] `suppliers.json`

---

## T702 — Resource catalogue

- [ ] Resource cards
- [ ] Price
- [ ] Unit
- [ ] Availability
- [ ] Supplier
- [ ] Delivery

---

## T703 — Resource details

- [ ] Resource identity
- [ ] Supplier
- [ ] Price
- [ ] Stock
- [ ] Minimum order
- [ ] Delivery
- [ ] Quantity selector
- [ ] Total
- [ ] Booking CTA

---

## T704 — Resource QA

Test:

- [ ] available resource
- [ ] limited resource
- [ ] unavailable resource
- [ ] invalid resource route
- [ ] mobile
- [ ] desktop
- [ ] Stitch comparison

---

# PHASE 8 — BOOKING

## T800 — Stitch booking design

**Stitch required**

Design:

- [ ] quantity interaction
- [ ] review
- [ ] confirmation
- [ ] My Bookings
- [ ] status badges
- [ ] Review
- [ ] Record artifact/reference

---

## T801 — Booking logic

- [ ] quantity validation
- [ ] total calculation
- [ ] booking ID generation
- [ ] booking creation
- [ ] snapshot names
- [ ] status handling

---

## T802 — Local persistence

- [ ] storage utility
- [ ] booking persistence
- [ ] safe parsing
- [ ] demo reset

---

## T803 — Booking UI

- [ ] quantity interaction
- [ ] review
- [ ] confirmation
- [ ] My Bookings

---

## T804 — Booking QA

Test:

- [ ] below minimum
- [ ] normal quantity
- [ ] exact available quantity
- [ ] above available
- [ ] unavailable resource
- [ ] refresh after booking
- [ ] My Bookings
- [ ] mobile
- [ ] desktop
- [ ] Stitch comparison

---

# PHASE 9 — INTEGRATION

## T900 — Full flow

Verify:

```text
Welcome
↓
Onboarding
↓
Dashboard
↓
Market
↓
Forecast
↓
Resources
↓
Resource Details
↓
Booking Review
↓
Confirmation
↓
My Bookings
```

---

## T901 — Navigation

- [ ] No dead links
- [ ] Back behavior works
- [ ] Main navigation works
- [ ] Mobile navigation works

---

## T902 — Persistence

- [ ] user survives refresh
- [ ] selected market survives refresh where expected
- [ ] bookings survive refresh
- [ ] malformed localStorage does not crash the app

---

# PHASE 10 — RESPONSIVE + ACCESSIBILITY

## T1000 — Responsive

- [ ] small mobile
- [ ] standard mobile
- [ ] tablet
- [ ] laptop
- [ ] wide desktop

---

## T1001 — Accessibility

- [ ] keyboard navigation
- [ ] focus states
- [ ] labels
- [ ] headings
- [ ] contrast
- [ ] status text
- [ ] chart textual context

---

# PHASE 11 — VISUAL QA

## T1100 — Screen audit

For every major screen:

- [ ] Stitch artifact/reference exists
- [ ] Compare actual render
- [ ] Typography correct
- [ ] Spacing correct
- [ ] Hierarchy correct
- [ ] Icons correct
- [ ] Charts correct
- [ ] Responsive behavior correct
- [ ] Empty/loading/error states correct

Screens:

- [ ] App Shell
- [ ] Welcome
- [ ] Onboarding
- [ ] Dashboard
- [ ] Market
- [ ] AI Forecast
- [ ] Resources
- [ ] Resource Details
- [ ] Booking Review
- [ ] Booking Confirmation
- [ ] My Bookings
- [ ] Profile

---

# PHASE 12 — CODE QUALITY

## T1200

- [ ] Remove unused imports
- [ ] Remove dead code
- [ ] Remove duplicate logic
- [ ] Remove unnecessary dependencies
- [ ] Remove placeholder text
- [ ] Check console
- [ ] Check data/UI separation
- [ ] Check reusable components

---

# PHASE 13 — PRODUCTION BUILD

## T1300

- [ ] `npm run build`
- [ ] Fix all blocking errors
- [ ] Test production routes
- [ ] Check assets
- [ ] Check console
- [ ] Check refresh behavior

---

# PHASE 14 — VERCEL

## T1400

- [ ] Push stable GitHub state
- [ ] Connect Vercel
- [ ] Deploy
- [ ] Run production smoke test

---

# FINAL GATE

Do not mark SilkGrow complete until:

```text
[ ] Product requirements satisfied
[ ] Stitch requirements satisfied
[ ] Every major screen has traceable Stitch artifact/reference
[ ] Visual QA passed
[ ] Responsive QA passed
[ ] Accessibility basics passed
[ ] Booking flow works
[ ] Forecast flow works
[ ] Mock data consistent
[ ] Build passes
[ ] Vercel deployment works
```
