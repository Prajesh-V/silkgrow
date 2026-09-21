# SilkGrow — Antigravity Agent Rules

**Purpose:** Mandatory operating rules for any AI coding agent working on SilkGrow.

**Primary builder:** Antigravity

**Critical visual tool:** Google Stitch MCP

---

# 1. Core Operating Principle

Act like a careful senior engineer working under an approved product specification.

The required loop is:

```text
Understand
   ↓
Plan
   ↓
Use Stitch when visual
   ↓
Implement
   ↓
Verify
   ↓
Visual QA when visual
   ↓
Document
   ↓
Continue
```

Do not optimize for code generation volume.

Optimize for:

- correctness
- maintainability
- visual quality
- honest functionality
- deployment reliability

---

# 2. Documentation Is the Contract

Before making meaningful changes, read the relevant documents in `/docs`.

At minimum, understand:

- `PROJECT_CONTEXT.md`
- `PRODUCT_REQUIREMENTS.md`
- `UI_DESIGN.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `IMPLEMENTATION_PLAN.md`
- `TASKS.md`
- `STITCH_WORKFLOW.md`
- `DESIGN_REGISTRY.md`

Do not knowingly implement behavior that contradicts these documents.

---

# 3. Source-of-Truth Priority

When documents or requests appear to conflict, use:

```text
1. Current explicit user instruction
2. PROJECT_CONTEXT.md
3. PRODUCT_REQUIREMENTS.md
4. UI_DESIGN.md
5. ARCHITECTURE.md
6. DATA_MODEL.md
7. IMPLEMENTATION_PLAN.md
8. STITCH_WORKFLOW.md
9. TASKS.md
10. AGENT_RULES.md
11. Existing code
```

If a conflict materially affects architecture or product behavior:

- stop
- identify the conflict
- explain the conflict
- propose the smallest resolution
- ask for confirmation when needed

Do not silently make major architectural decisions.

---

# 4. Mandatory Stitch Rule

Google Stitch MCP is mandatory for frontend/design work.

When a task changes the intended visual experience, Stitch must be used BEFORE implementation.

This includes:

- creating a new screen
- redesigning an existing screen
- changing layout
- changing visual hierarchy
- changing typography
- changing colors
- changing spacing
- changing navigation appearance
- changing chart appearance
- creating visual states
- major responsive visual changes
- significant visual polish

---

# 5. Stitch Is Not Needed for Pure Engineering Tasks

Stitch is normally not required for:

- data updates
- TypeScript fixes
- business logic
- validation logic
- localStorage fixes
- calculation changes
- non-visual refactors
- build configuration
- Git operations
- Vercel configuration

However, if any such change changes the intended visual behavior, treat it as a Stitch task.

---

# 6. No Independent Major UI Design

When Stitch is available, do not independently originate a competing visual design.

Wrong:

```text
Requirement
   ↓
Antigravity invents UI
   ↓
Stitch later
```

Required:

```text
Requirement
   ↓
Stitch
   ↓
Approved design
   ↓
Antigravity implementation
```

---

# 7. Stitch Artifact Requirement

Every major user-facing screen must have a traceable Stitch design artifact/reference before implementation is considered ready.

The actual artifact/reference mechanism must be based on what the configured Stitch MCP actually supports.

Examples may include:

- Stitch screen/project identifier
- generated/exported screen
- exported HTML/code
- screenshot/export
- another persistent Stitch result that can be revisited reliably

Never invent an artifact ID.

If the available tooling does not provide a persistent identifier, document exactly what reference is available.

---

# 8. Screen Completion Gate

A major frontend screen is complete only when:

```text
[ ] Requirements understood
[ ] Stitch used
[ ] Design reviewed
[ ] Stitch artifact/reference recorded
[ ] Implementation completed
[ ] Data/logic connected
[ ] Responsive behavior checked
[ ] Visual QA passed
```

---

# 9. Design Registry Rule

`docs/DESIGN_REGISTRY.md` tracks the state of every major visual screen.

Whenever a screen moves between states, update the registry.

Do not mark a screen `COMPLETE` until its Stitch, implementation, and visual QA requirements are satisfied.

---

# 10. Preserve the Design System

Once the SilkGrow visual system is established:

- reuse components
- reuse patterns
- reuse spacing conventions
- reuse typography
- reuse navigation
- reuse chart treatment

Do not create a new visual language for each page.

If a new design requires a new pattern, use Stitch to establish/refine it first.

---

# 11. Stitch Refinement Rule

Prefer iterative refinement of the established design.

Do not create unrelated redesigns because:

- a screen is difficult to code
- one component is inconvenient
- an alternative looks interesting

Major visual direction changes require explicit approval.

---

# 12. Responsive Rule

Every major user-facing screen must be reviewed on:

- mobile
- tablet
- desktop

Do not treat responsiveness as an optional final step.

---

# 13. Accessibility Rule

At minimum:

- semantic structure
- form labels
- visible focus
- keyboard navigation
- readable contrast
- status text that does not depend only on color
- accessible chart context
- suitable touch target sizes

Accessibility implementation is an engineering responsibility, but it must align with the visual design.

---

# 14. Data / UI Separation

Do not scatter large mock datasets through UI components.

Prefer:

```text
data/
   ↓
lib/
   ↓
components/
   ↓
pages
```

UI components should not become the source of truth for business data.

---

# 15. Business Logic Separation

Centralize shared calculations.

Examples:

- price change
- trend
- forecast direction
- favorable window
- booking total
- quantity validation
- booking ID generation

Do not duplicate the same rule across multiple pages.

---

# 16. Component Reuse

Before creating a new component:

1. Search for an existing component.
2. Determine whether it can be reused or extended.
3. If a new visual pattern is truly needed, use Stitch first.

Avoid near-duplicate components that differ only slightly.

---

# 17. Mock Data Honesty

The MVP uses demonstration data.

Never represent fictional market prices as verified live prices.

Use clear wording where necessary:

- Demonstration Market Data
- Demo Supplier
- AI Forecast
- Predicted
- Estimated

Do not use:

- Guaranteed profit
- Guaranteed best day
- Certain market price

---

# 18. ML Honesty

Do not claim that the deployed application performs live LSTM inference unless it actually does.

The approved MVP approach is:

```text
Offline LSTM
   ↓
Forecast JSON
   ↓
Frontend
```

If demonstration forecast data is being used, keep the provenance clear internally.

---

# 19. Architecture Boundary

Do not introduce, without explicit approval:

- PostgreSQL
- MongoDB
- Firebase
- Redis
- FastAPI
- Flask
- Docker
- Kubernetes
- persistent backend services
- runtime Python inference
- payment gateway
- real OTP
- real supplier backend

The MVP is intentionally lightweight and Vercel-first.

---

# 20. Scope Control

Do not add major features simply because they seem useful.

Examples:

- weather integration
- notifications
- payments
- live market feeds
- supplier accounts
- financial accounting
- logistics tracking
- multilingual expansion

Document possible additions instead of silently implementing them.

---

# 21. File Modification Rule

Before modifying an existing file:

- read it
- understand its responsibility
- inspect related code where necessary

Do not overwrite working files blindly.

---

# 22. Regression Rule

When a new change breaks an existing feature:

1. stop
2. identify the first meaningful regression
3. fix or revert
4. verify again
5. continue only after stability is restored

Do not stack additional features onto a broken state.

---

# 23. Verification Rule

A feature is not complete because code was written.

At minimum:

```text
Implementation
   ↓
Run app/build
   ↓
Test behavior
   ↓
Check console
   ↓
Responsive check if UI changed
   ↓
Visual QA if UI changed
   ↓
Fix issues
   ↓
Verify again
```

---

# 24. Build Rule

At meaningful milestones, run:

```bash
npm run build
```

A failing production build blocks completion of the affected milestone.

---

# 25. Requirement Traceability

When reporting work, identify the requirement IDs satisfied.

Example:

```text
DASH-001
DASH-002
DASH-003
DASH-004
DASH-005
DASH-006
```

Do not claim completion without checking the corresponding acceptance criteria.

---

# 26. Progress Documentation

Maintain:

```text
docs/PROGRESS.md
```

After each meaningful phase, record:

- phase
- completed requirement IDs
- Stitch status
- implementation status
- functional QA status
- visual QA status
- known issues
- next task

---

# 27. Agent Report Format

After a substantial task, report:

```markdown
## Implemented

- ...

## Requirements Satisfied

- ...

## Stitch

- Used / Not required
- Artifact/reference: ...

## Files Changed

- ...

## Verification

- Build: PASS/FAIL
- Functional: PASS/FAIL
- Visual: PASS/FAIL
- Responsive: PASS/FAIL

## Known Issues

- ...

## Next Task

- ...
```

Do not claim `PASS` when you did not verify it.

---

# 28. Ambiguity Rule

For a minor implementation detail that does not affect architecture or product behavior:

- choose the simplest option consistent with the docs

For ambiguity affecting:

- product behavior
- architecture
- data contracts
- external services
- authentication
- user safety or trust

pause and request clarification.

---

# 29. No Fake Complexity

Do not add:

- meaningless AI animations
- fake API infrastructure
- unnecessary microservices
- placeholder enterprise architecture
- technical features with no user value

Complexity must have a real purpose.

---

# 30. Final Principle

The goal is:

> A polished, coherent, honest, maintainable SilkGrow product.

Not:

> The largest possible codebase.
