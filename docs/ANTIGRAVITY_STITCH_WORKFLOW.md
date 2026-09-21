# SilkGrow — Antigravity Stitch Workflow Report

**Created:** 2026-09-20  
**Agent:** Antigravity  
**Phase:** 0 — Understanding Gate

---

## 1. When Stitch MUST Be Used

Stitch is mandatory **before implementation** whenever a task changes the intended visual experience of SilkGrow. Specific triggers:

- Creating any new user-facing screen (welcome, onboarding, dashboard, market, forecast, resources, resource details, booking review, confirmation, My Bookings, profile)
- Establishing the design system (colors, typography, spacing, shapes, buttons, cards, inputs, badges)
- Designing the application shell (desktop sidebar navigation, mobile bottom navigation, header)
- Creating or redesigning any major visual component (stat cards, trend badges, charts, resource cards, booking cards, quantity selectors, empty/loading/error states)
- Changing the visual layout, hierarchy, or composition of an existing screen
- Changing typography, colors, spacing, or navigation appearance
- Changing chart presentation or adding new chart types
- Creating responsive visual behavior for a screen
- Significant visual polish or refinement

**The 12 mandatory screen gates:**

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

None of these may begin implementation without an approved Stitch design.

---

## 2. When Stitch Is NOT Required

Stitch is not needed for purely engineering tasks that do not change the visual experience:

- TypeScript type definitions and fixes
- Business logic (price calculation, trend classification, favorable window logic, booking total calculation, quantity validation, booking ID generation)
- Data layer work (JSON file creation, lib/ utilities)
- localStorage implementation (storage utility, safe parsing, reset behavior)
- Non-visual routing logic
- Build configuration (next.config.js, package.json)
- Git operations
- Vercel configuration and deployment
- Code refactoring that preserves visual output
- Fixing validation logic
- Updating demonstration data values

**Exception:** If any of these tasks incidentally changes the visual result (e.g., a data change causes a new empty state to appear), it becomes a Stitch-aware task.

---

## 3. The Exact Stitch → Antigravity Handoff

### Verified Stitch MCP Capabilities

The configured Stitch MCP exposes the following tools, all verified as accessible:

| Tool | Purpose |
|------|---------|
| `create_project` | Create a Stitch project container (returns project ID) |
| `list_projects` | List all accessible projects |
| `get_project` | Retrieve project details including screen instances and design system |
| `delete_project` | Delete a project |
| `generate_screen_from_text` | Generate a new screen from a text prompt within a project |
| `edit_screens` | Edit existing screens using a text prompt |
| `generate_variants` | Generate design variants of existing screens (with creative range: REFINE/EXPLORE/REIMAGINE and aspect controls: LAYOUT/COLOR_SCHEME/IMAGES/TEXT_FONT/TEXT_CONTENT) |
| `get_screen` | Retrieve screen details (code, screenshot) |
| `list_screens` | List all screens in a project |
| `create_design_system` | Create a design system with colors, fonts, roundness, spacing, typography tokens |
| `update_design_system` | Update an existing design system |
| `list_design_systems` | List design systems for a project |
| `apply_design_system` | Apply a design system to selected screens |
| `upload_design_md` | Upload a DESIGN.md file to a project |
| `create_design_system_from_design_md` | Create a design system from an uploaded DESIGN.md |

### The Handoff Workflow

```
1. Understand requirements for the screen/component
         ↓
2. Inspect existing SilkGrow design system for consistency
         ↓
3. Call generate_screen_from_text with a detailed prompt
   (specifying projectId, prompt, deviceType, designSystem)
         ↓
4. Retrieve generated screen via get_screen
         ↓
5. Review against requirements (content, hierarchy, accessibility)
         ↓
6. If refinement needed: call edit_screens or generate_variants
         ↓
7. Record the Stitch artifact reference (project ID + screen ID)
         ↓
8. Antigravity implements the approved design in Next.js/React
   (may adapt internal code structure while preserving visual intent)
         ↓
9. Run the application and perform visual QA
         ↓
10. If implementation mismatch: fix code
    If design needs to change: return to Stitch
```

---

## 4. How a Design Becomes Approved

A design is approved when:

1. **Requirements coverage** — The screen addresses all relevant requirement IDs
2. **Design system coherence** — The screen uses the established SilkGrow visual system (colors, typography, spacing, components)
3. **Responsive intent** — Mobile, tablet, and desktop considerations are addressed (using deviceType parameter for mobile-first generation, then reviewing for other sizes)
4. **Content accuracy** — Representative data values are used (realistic prices, units, market names)
5. **Product requirement alignment** — No missing critical elements (e.g., forecast disclaimer, demonstration data label)
6. **Stitch artifact recorded** — The project ID and screen ID are documented in the Design Registry

The approval is recorded by updating `docs/DESIGN_REGISTRY.md` to move the screen status from `IN_DESIGN` → `DESIGN_REVIEW` → `APPROVED`.

---

## 5. What Artifact/Reference Is Available in This Environment

The Stitch MCP provides **persistent project and screen identifiers** that serve as traceable design artifacts:

### Primary Reference: Project ID + Screen ID

- **Project ID:** Numeric string (e.g., `4044680601076201931`), returned by `create_project` and `list_projects`
- **Screen ID:** Hex string (e.g., `98b50e2ddc9943efb387052637738f61`), returned by `generate_screen_from_text` and `list_screens`
- **Full resource name:** `projects/{projectId}/screens/{screenId}`

These identifiers are persistent — they can be used later to:
- Retrieve the screen for review (`get_screen`)
- Edit the screen (`edit_screens`)
- Generate variants (`generate_variants`)
- Apply design system changes (`apply_design_system`)

### Secondary References

- **Screenshot URLs** — Each screen has a `downloadUrl` for its screenshot, available via `get_screen`
- **Screen code/HTML** — Available via `get_screen` response
- **Design system asset IDs** — Available via `list_design_systems`

### What to Record in the Design Registry

For each screen, record:
```
Stitch Project: projects/{projectId}
Stitch Screen: projects/{projectId}/screens/{screenId}
```

This provides a reliable, persistent reference that can be revisited, refined, or compared during visual QA.

---

## 6. How the Design Registry Will Be Updated

The registry at `docs/DESIGN_REGISTRY.md` will be updated at each status transition:

| Transition | Trigger |
|-----------|---------|
| `NOT_STARTED` → `IN_DESIGN` | Stitch `generate_screen_from_text` called |
| `IN_DESIGN` → `DESIGN_REVIEW` | Initial design generated, review underway |
| `DESIGN_REVIEW` → `APPROVED` | Design passes requirements check, artifact recorded |
| `APPROVED` → `IMPLEMENTING` | Antigravity begins Next.js implementation |
| `IMPLEMENTING` → `IMPLEMENTED` | Implementation code complete |
| `IMPLEMENTED` → `VISUAL_QA` | Visual comparison against Stitch artifact |
| `VISUAL_QA` → `COMPLETE` | Visual QA passes |
| Any → `BLOCKED` | Blocking issue discovered |

The `Stitch Artifact / Reference` column will contain the actual Stitch screen resource name (e.g., `projects/XXXX/screens/YYYY`).

---

## 7. How Visual QA Will Work

After implementing a Stitch-approved design:

1. **Run the application** (`npm run dev`)
2. **Navigate to the implemented screen**
3. **Retrieve the Stitch reference** via `get_screen` to access the screenshot/code
4. **Compare** the actual render against the Stitch design for:
   - Typography (font family, size, weight, hierarchy)
   - Spacing (margins, padding, gaps)
   - Alignment (horizontal, vertical)
   - Color (backgrounds, text, accents, borders)
   - Hierarchy (visual prominence matches)
   - Component proportions (card sizes, button sizes)
   - Chart presentation (axes, labels, legends, tooltips)
   - Navigation (active state, placement, icons)
   - Responsive behavior (mobile, tablet, desktop)
   - Empty/loading/error states
5. **Record discrepancies**
6. **Classify** as implementation fix or design change
7. **Resolve** and re-check

---

## 8. How Visual Mismatches Are Handled

### Case A — Implementation Mismatch

The Stitch design is correct; the code doesn't match it.

Examples: wrong padding, wrong font size, wrong component width, broken responsive behavior.

**Action:** Antigravity fixes the implementation code. No Stitch interaction needed.

### Case B — Design Needs to Change

The product visual design itself needs to change (new requirement, user feedback, discovered usability issue).

**Action:**
1. Return to Stitch (`edit_screens` or `generate_variants`)
2. Refine the design
3. Review and approve the updated design
4. Update the Stitch artifact reference in the Design Registry
5. Update the implementation to match

Do not silently change the approved design in code without updating Stitch.

---

## 9. How Responsive Design Is Handled

Stitch supports `deviceType` parameter with values: `MOBILE`, `DESKTOP`, `TABLET`, `AGNOSTIC`.

The SilkGrow approach:

1. **Primary design: MOBILE** — Generate the initial design using `deviceType: "MOBILE"` (mobile-first as per UI_DESIGN.md)
2. **Desktop adaptation** — Either generate a separate desktop variant using `generate_variants` with `deviceType: "DESKTOP"`, or use `edit_screens` to refine for desktop
3. **Implementation** — Build responsive CSS/Tailwind that adapts from the mobile base to tablet and desktop breakpoints
4. **Visual QA** — Review actual renders at narrow mobile, standard mobile, tablet, laptop, and wide desktop widths

A desktop-only Stitch design is insufficient for a mobile-first screen.

---

## 10. How Design Consistency Will Be Maintained Across Screens

### Design System Approach

1. **Create a SilkGrow design system** using `create_design_system` with:
   - Botanical green primary color
   - Light color mode
   - Appropriate sans-serif fonts (e.g., Inter for body, Plus Jakarta Sans or similar for headlines)
   - Moderate roundness (ROUND_EIGHT or ROUND_TWELVE)
   - Spacing scale
   - Typography hierarchy

2. **Apply the design system** to all screens using `apply_design_system` and the `designSystem` parameter in `generate_screen_from_text`

3. **Use the baseline Stitch brief** from UI_DESIGN.md §38 when generating screens to maintain consistent creative direction

### Component Reuse

Before creating a new visual component:
1. Check if the component already exists in an approved Stitch screen
2. If it does, reuse the same visual pattern
3. If a new pattern is needed, generate it through Stitch using `generate_variants` with `creativeRange: "REFINE"` to stay close to the established system

### Iterative Refinement Over Redesign

- Prefer `edit_screens` and `generate_variants` with `REFINE` creative range over generating entirely new designs
- Major visual direction changes require explicit user approval
- Use the `aspects` parameter in `generate_variants` to focus changes (LAYOUT, COLOR_SCHEME, TEXT_FONT, TEXT_CONTENT, IMAGES) rather than changing everything
