# SilkGrow — Design Registry

**Purpose:** Maintain a traceable record of Stitch design progress for every major SilkGrow screen.

**Rule:** A major screen cannot be considered visually complete without an approved Stitch design/reference and a passed visual QA review.

---

# 1. Status Definitions

```text
NOT_STARTED
IN_DESIGN
DESIGN_REVIEW
APPROVED
IMPLEMENTING
IMPLEMENTED
VISUAL_QA
COMPLETE
BLOCKED
```

---

# 2. Artifact Rule

The `Stitch Artifact / Reference` field must contain an actual traceable reference available from the configured Stitch workflow.

Examples may include:

- Stitch screen/project ID
- persistent design reference
- exported artifact path
- screenshot path
- another documented Stitch result that can be reliably revisited

Do not invent references.

If the configured Stitch MCP does not expose a persistent identifier, document the available artifact/reference mechanism instead.

## Verified Artifact Mechanism (2026-09-20)

The configured Stitch MCP has been verified. It exposes persistent identifiers:

- **Project ID:** Numeric string returned by `create_project` (e.g., `4044680601076201931`)
- **Screen ID:** Hex string returned by `generate_screen_from_text` (e.g., `98b50e2ddc9943efb387052637738f61`)
- **Full reference format:** `projects/{projectId}/screens/{screenId}`

These references can be used with `get_screen` for retrieval, `edit_screens` for refinement, and `generate_variants` for alternatives. Screenshots are available via download URLs on each screen.

The `Stitch Artifact / Reference` column below will use the `projects/{id}/screens/{id}` format once design work begins.

---

# 3. Screen Registry

| Screen | Requirement IDs | Stitch Status | Stitch Artifact / Reference | Implementation | Visual QA | Overall |
|---|---|---|---|---|---|---|
| App Shell | — | APPROVED | Mobile: projects/8451019231577833876/screens/33281911a98e4e498fd01aadf8cbee78<br>Desktop: projects/8451019231577833876/screens/1c9fe54c41184fcd8074f9c035e90298 | IMPLEMENTED | PASS | COMPLETE |
| Welcome | ONB-001 | APPROVED | (Combined with Onboarding) | IMPLEMENTED | PASS | COMPLETE |
| Onboarding | ONB-002, ONB-003, ONB-004 | APPROVED | Mobile: projects/8451019231577833876/screens/eec57e2edda2433d92e0bdf94c150ff0<br>Desktop: projects/8451019231577833876/screens/4956ff7128394e7cb3c83221d6cee4b1 | IMPLEMENTED | PASS | COMPLETE |
| Dashboard | DASH-001–DASH-006 | APPROVED | Mobile: projects/8451019231577833876/screens/397a6d6e76fe4f0abe657553faf5a4e6<br>Desktop: projects/8451019231577833876/screens/01d44f6414aa4231a29afbc58fb0ecbe | IMPLEMENTED | PASS | COMPLETE |
| Market | MKT-001–MKT-006 | APPROVED | Mobile: projects/8451019231577833876/screens/08723558c6c547b6abdaa0528c69fdec<br>Desktop: projects/8451019231577833876/screens/d0d223a9056546279142bccd54ee3f7f | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| AI Forecast | AI-001–AI-008 | APPROVED | Mobile: projects/8451019231577833876/screens/f339620dadc64d41870029d1cea50807<br>Desktop: projects/8451019231577833876/screens/8ca8c45f002246f4aeb9206cd9d89a6d | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Resources | RES-001–RES-005 | APPROVED | Mobile: projects/8451019231577833876/screens/d489699388dd4a3887dd4081b52fea6e<br>Desktop: projects/8451019231577833876/screens/22fb02f1a9d24b9496c336a764378dc4 | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Resource Details | RES-002–RES-004 | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Booking Review | BOOK-001, BOOK-002 | APPROVED | Mobile: projects/8451019231577833876/screens/a9fdad12e4f54090be60cd36adc9d1d3<br>Desktop: projects/8451019231577833876/screens/b1851d0dd620478f83f6436c4b316b7f | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Booking Confirmation | BOOK-003, BOOK-004 | APPROVED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Profile & Settings | PROF-001–PROF-004 | APPROVED | Mobile: projects/8451019231577833876/screens/fbe840eb250b453bad520900f456b8d5<br>Desktop: projects/8451019231577833876/screens/6b08a2fd96884446872fc3a7a8c3490d | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Profile | — | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |

---

# 4. Shared Component Registry

Major shared visual components should also be traceable.

| Component | Stitch Status | Artifact / Reference | Implementation | Visual QA | Overall |
|---|---|---|---|---|---|
| App Navigation | APPROVED | (See App Shell) | IMPLEMENTED | PASS | COMPLETE |
| Mobile Navigation | APPROVED | (See App Shell) | IMPLEMENTED | PASS | COMPLETE |
| Stat Card | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Trend Badge | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| AI Insight Card | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Price Chart | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Forecast Chart | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Resource Card | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Booking Card | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Quantity Selector | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Status Badge | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Empty State | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Error State | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| Loading/Skeleton State | NOT_STARTED | — | NOT_STARTED | NOT_STARTED | NOT_STARTED |

---

# 5. Approval Rule

For a screen to move from `DESIGN_REVIEW` to `APPROVED`:

- requirements have been checked
- the Stitch design is coherent with the existing system
- responsive intent is considered
- no major product requirement is missing
- an actual artifact/reference is recorded

---

# 6. Implementation Rule

A screen may move to `IMPLEMENTING` only after:

```text
Stitch Status = APPROVED
```

Do not implement a major screen UI while its Stitch design remains `NOT_STARTED`, `IN_DESIGN`, or `DESIGN_REVIEW`.

---

# 7. Visual QA Rule

After implementation:

```text
Implementation
   ↓
Visual QA
```

Compare:

- typography
- spacing
- hierarchy
- layout
- component proportions
- chart presentation
- navigation
- responsive behavior

If visual QA fails:

- keep implementation status as `IMPLEMENTED`
- set visual QA to an appropriate failure/blocking state
- fix through implementation or return to Stitch if the design itself changed

---

# 8. Completion Rule

A screen can be marked `COMPLETE` only when:

```text
Stitch Status = APPROVED
Implementation = IMPLEMENTED
Visual QA = PASS
```

---

# 9. Change Log

Use this section to record major visual design changes.

## Entry Format

```text
Date:
Screen:
Reason:
Stitch change:
Implementation impact:
```

Do not rewrite history for major visual decisions.

