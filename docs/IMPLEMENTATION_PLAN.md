# SilkGrow — Agentic Implementation Plan

**Purpose:** Define the exact order in which Antigravity should build SilkGrow.

**Primary rule:** Do not optimize for speed by skipping design, verification, or integration gates.

---

# 1. Build Philosophy

SilkGrow must be built incrementally.

The approved cycle is:

```text
Understand
   ↓
Plan
   ↓
Stitch Design
   ↓
Approve Design
   ↓
Implement
   ↓
Connect Data / Logic
   ↓
Run + Verify
   ↓
Visual QA
   ↓
Document Progress
   ↓
Continue
```

Do not build the entire application in one pass.

Do not implement a major UI before its Stitch design gate has passed.

---

# 2. Phase 0 — Understanding Gate

## Objective

Before any implementation, Antigravity must understand the project and verify the available Stitch MCP workflow.

## Tasks

- Read all `/docs` files.
- Inspect the repository.
- Verify Stitch MCP is available.
- Determine the actual Stitch capabilities exposed in the environment.
- Identify genuine contradictions.
- Create:
  - `docs/ANTIGRAVITY_UNDERSTANDING.md`
  - `docs/ANTIGRAVITY_STITCH_WORKFLOW.md`
  - `docs/ANTIGRAVITY_OPEN_QUESTIONS.md`

## Important

Do not:

- scaffold the app
- install dependencies
- create pages
- create components
- create mock datasets
- implement ML
- deploy

## Gate

Antigravity must stop and wait for explicit authorization before beginning Phase 1.

---

# 3. Phase 1 — Repository and Application Foundation

## Objective

Create the smallest clean Next.js foundation.

## Implementation

- Initialize Next.js.
- Use TypeScript.
- Configure the agreed styling system.
- Configure the App Router or equivalent approved routing approach.
- Add only justified dependencies.
- Create initial project directories.
- Configure metadata.
- Create the base layout.
- Add Git configuration.

## Verify

```bash
npm install
npm run dev
npm run build
```

## Gate

The application starts locally and the production build succeeds.

---

# 4. Phase 2 — Stitch Design System + App Shell

## Objective

Establish the visual system before detailed screens.

## Stitch Tasks

Use Stitch MCP to design/refine:

- application shell
- navigation
- mobile navigation
- typography hierarchy
- colors
- spacing rhythm
- buttons
- cards
- badges
- inputs
- page containers
- chart container treatment

## Required Artifact

Record a traceable Stitch design reference in the project.

Do not invent an artifact identifier if the configured Stitch tooling does not provide one.

## Implementation

Implement the approved visual system.

## Verify

Review:

- mobile
- tablet
- desktop

## Gate

The shell and design primitives are visually coherent and usable.

---

# 5. Phase 3 — Onboarding

## Objective

Create the first complete user flow.

## Stitch Tasks

Design:

- welcome
- onboarding form
- validation states
- empty/error feedback where relevant

## Implementation

Build:

- welcome screen
- onboarding form
- name validation
- phone validation
- market selection
- local demo session
- logout behavior

## Verify

Test:

- valid submission
- invalid submission
- refresh
- logout
- missing localStorage data

## Gate

A new user can reliably enter the application.

---

# 6. Phase 4 — Dashboard

## Objective

Create the main command center.

## Stitch Tasks

Design/refine:

- greeting
- market context
- cocoon card
- silk card
- forecast summary
- quick actions
- AI insight
- demonstration-data disclosure

## Implementation

Connect:

- current market
- latest cocoon price
- latest silk price
- changes
- trend
- forecast summary
- AI insight

## Verify

Change market and verify all relevant values update consistently.

## Gate

The dashboard clearly communicates the entire product at a glance.

---

# 7. Phase 5 — Market Intelligence

## Objective

Provide useful cocoon and silk market exploration.

## Stitch Tasks

Design/refine:

- market selector
- commodity selector
- current price cards
- trend states
- 7-day chart
- 30-day chart
- responsive chart behavior
- empty/error states if required

## Implementation

Connect:

- `markets.json`
- `cocoonPrices.json`
- `silkPrices.json`
- market business logic
- chart components

## Verify

Test every demonstration market for both commodities.

## Gate

Market values, calculations, charts, and filters behave consistently.

---

# 8. Phase 6 — AI Forecast

## Objective

Build the primary AI-facing user experience.

## Stitch Tasks

Design/refine:

- current price context
- forecast summary
- historical/forecast chart
- forecast legend
- 7-day forecast
- predicted favorable window
- AI insight
- disclaimer
- responsive chart behavior

## Implementation

Connect:

- `forecasts.json`
- forecast utilities
- current price
- forecast trend
- favorable-window logic

## Important

Do not introduce a runtime Python ML service.

The frontend consumes forecast output.

## Verify

Test:

- increasing forecast
- decreasing forecast
- stable forecast
- favorable-window calculation
- disclaimer presence
- mobile chart usability

## Gate

The prediction experience is honest, understandable, and visually strong.

---

# 9. Phase 7 — Resource Marketplace

## Objective

Build resource discovery and resource details.

## Stitch Tasks

Design/refine:

- resource catalogue
- resource card
- supplier block
- availability state
- delivery information
- resource detail page
- quantity selector

## Implementation

Connect:

- `resources.json`
- `suppliers.json`
- resource lookup logic

## Verify

Test:

- available resource
- limited resource
- unavailable resource
- invalid resource ID

## Gate

Users can navigate cleanly from catalogue to a resource detail.

---

# 10. Phase 8 — Booking

## Objective

Create a complete local booking flow.

## Stitch Tasks

Design/refine:

- quantity interaction
- booking review
- confirmation
- booking status
- My Bookings

## Implementation

Build:

- quantity validation
- total calculation
- booking ID generation
- booking creation
- local persistence
- confirmation
- booking history

## Verify

Test:

- minimum quantity
- normal quantity
- maximum available quantity
- quantity above stock
- unavailable resource
- refresh after booking
- booking display

## Gate

A user can complete a simulated booking end-to-end.

---

# 11. Phase 9 — Integration

## Objective

Verify the complete user journey.

Required flow:

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
Booking Confirmation
   ↓
My Bookings
```

Also verify navigation to Profile.

## Gate

No broken core path remains.

---

# 12. Phase 10 — Responsive and Accessibility Pass

## Objective

Make the entire product usable across device classes.

## Test

- narrow mobile
- standard mobile
- tablet
- laptop
- wide desktop

## Accessibility

Check:

- headings
- labels
- keyboard navigation
- focus states
- color contrast
- status semantics
- chart text summaries
- touch target size

## Gate

No critical responsive or accessibility issue remains.

---

# 13. Phase 11 — Visual QA

## Objective

Compare the implementation against the approved Stitch work.

For every major screen:

```text
Stitch Artifact
      ↓
Actual Render
      ↓
Visual Comparison
      ↓
Mismatch?
   /       \
 no         yes
 |           |
Done     Determine cause
            |
      ┌─────┴─────┐
      ↓           ↓
Implementation  Design
issue            issue
      ↓           ↓
Fix code       Return to
               Stitch
```

## Review

Check:

- typography
- spacing
- alignment
- color
- hierarchy
- component size
- charts
- navigation
- responsive behavior
- empty/loading/error states

## Gate

Every major screen has passed visual QA.

---

# 14. Phase 12 — Code Quality

## Review

Remove:

- unused imports
- dead components
- duplicate business logic
- duplicate styles
- unnecessary dependencies
- placeholder text
- console errors
- accidental debug code

Ensure:

- UI and data remain separated
- business rules are centralized
- components remain reusable
- documentation reflects implementation

## Gate

No known critical code-quality issue remains.

---

# 15. Phase 13 — Production Build

Run:

```bash
npm run build
```

Resolve all blocking:

- TypeScript errors
- route errors
- import errors
- client/server boundary problems
- asset problems

## Gate

Production build passes cleanly.

---

# 16. Phase 14 — Vercel Deployment

## Steps

1. Commit the stable project.
2. Push to GitHub.
3. Import into Vercel.
4. Confirm framework/build detection.
5. Deploy.
6. Run production smoke test.

## Production Smoke Test

Verify:

- welcome
- onboarding
- dashboard
- market
- forecast
- resources
- booking
- My Bookings
- profile
- refresh behavior
- mobile layout

## Gate

Production URL works end-to-end.

---

# 17. Implementation Unit Rule

Each task should be small enough that the agent can answer:

- what changed?
- why did it change?
- which requirements were satisfied?
- what was tested?
- what remains?

Avoid large unbounded instructions.

---

# 18. Stitch Gate Rule

For every visual phase:

```text
[ ] Requirements understood
[ ] Stitch used
[ ] Design reviewed
[ ] Traceable Stitch artifact/reference recorded
[ ] Implementation complete
[ ] Responsive review complete
[ ] Visual QA complete
```

No visual phase is complete without all of these.

---

# 19. ML Timing Rule

Do not block frontend work waiting for a real LSTM.

The approved order is:

```text
Forecast contract
      ↓
Demo forecast JSON
      ↓
Forecast UI
      ↓
Frontend complete
      ↓
Offline LSTM refinement
      ↓
Replace forecast JSON if desired
```

The frontend should not need architectural changes when forecast values are replaced.

---

# 20. Scope Drift Rule

If Antigravity identifies an interesting enhancement:

- document it
- do not implement it automatically

Examples:

- weather integration
- live market feeds
- payments
- production authentication
- supplier accounts
- real delivery tracking

---

# 21. Progress Tracking

Maintain a project progress document:

```text
docs/PROGRESS.md
```

At each phase completion, record:

- completed phase
- completed requirement IDs
- Stitch status
- functional QA status
- visual QA status
- known issues
- next phase

---

# 22. Final Completion Definition

SilkGrow is complete when a first-time user can:

- enter the application
- understand the dashboard
- inspect current market information
- inspect historical trends
- understand the AI forecast
- see a predicted favorable window
- browse resources
- complete a simulated booking
- view booking history
- use the product on mobile and desktop
- complete the full flow without critical errors

Do not define completion by lines of code or number of files.

Define completion by product quality and verified behavior.
