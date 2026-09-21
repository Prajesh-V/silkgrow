# SilkGrow — Stitch Workflow

## 1. Purpose

This document defines the mandatory workflow between Google Stitch MCP and Antigravity.

The objective is to make sure that frontend/design work is consistently initiated, refined, and visually governed through Stitch while engineering remains maintainable and controlled by Antigravity.

---

# 2. Core Rule

**If a task changes the intended visual experience, Stitch must be used before implementation.**

This includes:

- new pages
- new visual components
- redesigns
- layout changes
- navigation appearance
- typography
- color system
- spacing
- responsive visual behavior
- chart presentation
- empty/loading/error visual states
- animation or visual interaction design
- significant visual polish

---

# 3. Stitch vs Antigravity Responsibilities

## Stitch

Stitch is responsible for:

- visual exploration
- screen design
- page composition
- design alternatives
- component appearance
- visual hierarchy
- visual responsive behavior
- chart presentation
- visual refinement

## Antigravity

Antigravity is responsible for:

- Next.js/React implementation
- routing
- TypeScript
- application state
- data integration
- business logic
- validation
- localStorage
- accessibility implementation
- testing
- build configuration
- Git
- Vercel deployment

---

# 4. Stitch Is Development-Time Only

Stitch is not part of SilkGrow's production runtime.

Production remains:

```text
GitHub
   ↓
Vercel
   ↓
Next.js
```

Stitch participates before and during implementation:

```text
Requirements
   ↓
Stitch
   ↓
Design Artifact
   ↓
Antigravity
   ↓
Implementation
   ↓
Visual QA
```

Never add runtime Stitch API calls simply because Stitch was used during development.

---

# 5. What Counts as a Visual Task?

Treat a task as visual when the intended appearance or interaction presentation changes.

Examples:

### Stitch REQUIRED

```text
Create the dashboard
Create the market screen
Redesign the forecast page
Make the cards more modern
Change the color palette
Design mobile navigation
Redesign booking confirmation
Improve chart layout
Create a new empty state
Create a loading skeleton
Make the resource catalogue responsive
```

### Stitch NOT REQUIRED

```text
Fix a TypeScript error
Fix localStorage parsing
Change booking calculation
Change JSON data
Fix validation logic
Refactor a non-visual utility
Fix a route that does not affect its visual appearance
Run production build
Configure Vercel
```

If an apparently engineering-only change changes the intended visual result, it becomes a Stitch task.

---

# 6. Mandatory Screen Gate

Every major user-facing screen must have a Stitch design artifact/reference before implementation.

Required screens:

1. App Shell
2. Welcome
3. Onboarding
4. Dashboard
5. Market
6. AI Forecast
7. Resources
8. Resource Details
9. Booking Review
10. Booking Confirmation
11. My Bookings
12. Profile

A screen cannot be marked implementation-ready until the Stitch gate passes.

---

# 7. What Counts as a Stitch Artifact?

A major screen must have a traceable reference to the Stitch work.

Acceptable examples depend on the capabilities available in the configured Stitch MCP, but may include:

- Stitch project/screen identifier
- Stitch-generated screen
- Stitch-exported HTML/code
- saved screenshot/export
- documented Stitch artifact reference
- another persistent Stitch result that Antigravity can reliably reopen/review

The exact artifact mechanism should be determined from the actual Stitch MCP capabilities available in Antigravity.

Do not fabricate IDs or artifact references.

---

# 8. Standard Screen Workflow

For a new screen:

```text
1. Read requirements
        ↓
2. Inspect existing design system
        ↓
3. Identify required content/states
        ↓
4. Call Stitch MCP
        ↓
5. Generate initial design
        ↓
6. Review against requirements
        ↓
7. Refine through Stitch
        ↓
8. Approve final design
        ↓
9. Record artifact/reference
        ↓
10. Implement in Next.js
        ↓
11. Connect data/logic
        ↓
12. Run application
        ↓
13. Perform visual QA
        ↓
14. Fix implementation/design discrepancy
        ↓
15. Mark complete
```

---

# 9. Do Not Skip the Design Stage

Do not implement the UI first and use Stitch afterward merely as decoration or validation.

Wrong:

```text
Requirements
   ↓
Antigravity writes UI
   ↓
Stitch later
```

Required:

```text
Requirements
   ↓
Stitch
   ↓
Approved design
   ↓
Antigravity implementation
```

---

# 10. Design System Establishment

Before generating all major screens, Stitch should establish a shared visual system including:

- primary/secondary colors
- typography hierarchy
- spacing rhythm
- borders
- radii
- buttons
- inputs
- cards
- badges
- navigation
- chart treatment
- mobile navigation

Later screens should extend this system rather than invent unrelated visual patterns.

---

# 11. Screen-to-Screen Consistency

Before creating a new visual component, inspect the existing approved Stitch patterns.

Ask:

- does this component already exist?
- can it be reused?
- does the new screen require a variation?
- does the variation still fit the design system?

Do not create a new visual language for every page.

---

# 12. Responsive Stitch Workflow

For each major screen, explicitly evaluate:

### Mobile

- hierarchy
- touch targets
- stacked layout
- chart usability
- navigation

### Tablet

- grid behavior
- spacing
- chart width

### Desktop

- navigation
- multi-column layout
- information density

A desktop-only Stitch design is insufficient for a mobile-first screen.

---

# 13. Visual QA Workflow

After Antigravity implements a Stitch design:

1. Run the application.
2. Inspect the actual rendered screen.
3. Compare against the approved Stitch design.
4. Check:
   - spacing
   - typography
   - hierarchy
   - alignment
   - component proportions
   - colors
   - iconography
   - charts
   - responsive behavior
5. Record discrepancies.
6. Resolve them.
7. Re-check.

---

# 14. Resolving Visual Mismatches

There are two cases.

## Case A — Implementation mismatch

The Stitch design remains correct.

Example:

- incorrect padding
- wrong font size
- wrong component width
- broken responsive behavior

In this case, Antigravity fixes the implementation.

## Case B — Design needs to change

The intended product visual design has changed.

In this case:

```text
Antigravity
   ↓
return to Stitch
   ↓
refine design
   ↓
approve
   ↓
update implementation
```

Do not silently change the approved design in code.

---

# 15. Stitch and Business Logic

Stitch should define how information is presented.

It should not define:

- data storage
- business rules
- booking calculations
- authentication architecture
- market calculations
- localStorage format
- domain logic

Those remain engineering responsibilities.

---

# 16. Stitch and Mock Data

Stitch may need realistic content to produce useful screen designs.

When supplying data examples to Stitch:

- use representative values
- keep units realistic
- do not imply that fabricated values are verified live data
- keep the content consistent with `DATA_MODEL.md`

The actual application must later bind the approved design to the canonical data layer.

---

# 17. Stitch and Charts

Charts require particular care.

When designing a chart through Stitch:

- distinguish historical vs forecast
- preserve readable dates
- preserve price units
- show forecast start
- do not imply certainty
- include a legend or textual distinction where needed
- preserve mobile usability

The final chart implementation can use Recharts or another approved lightweight library while matching the Stitch visual intent.

---

# 18. Stitch and Accessibility

Visual design must account for:

- readable contrast
- focus states
- text labels
- non-color-only status
- readable chart context
- touch target size

Antigravity remains responsible for implementing the accessible behavior.

---

# 19. Stitch Iteration Rules

Prefer iterative refinement of the existing SilkGrow design system.

Do not generate a completely unrelated visual direction because:

- a screen is difficult to implement
- a single component needs refinement
- an alternative is aesthetically interesting

Major visual direction changes require explicit approval.

---

# 20. Stitch Artifact Traceability

For each major screen, maintain a traceable reference in the project's design tracking.

At minimum track:

```text
Screen
Design Status
Stitch Artifact/Reference
Implementation Status
Visual QA Status
```

Recommended statuses:

```text
NOT_STARTED
IN_DESIGN
DESIGN_REVIEW
APPROVED
IMPLEMENTED
VISUAL_QA
COMPLETE
```

If a design artifact cannot be persisted through the available Stitch tooling, document the limitation rather than inventing a reference.

---

# 21. Completion Gate

A major visual task is complete only when:

```text
[ ] Stitch used
[ ] Design reviewed
[ ] Stitch artifact/reference exists
[ ] Implementation completed
[ ] Data connected
[ ] Responsive behavior checked
[ ] Visual QA passed
[ ] No unintended visual drift
```

---

# 22. Final Rule

**Stitch is not an optional inspiration tool. It is the visual design stage of the SilkGrow development pipeline.**

Antigravity should not independently originate major UI design when Stitch is available.

The intended relationship is:

```text
STITCH
Design
   ↓
ANTIGRAVITY
Engineering
   ↓
VISUAL QA
   ↓
SILKGROW
```
