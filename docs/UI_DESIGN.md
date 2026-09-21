# SilkGrow — UI Design Specification

**Purpose:** Define the visual language, screen hierarchy, responsive intent, and design-quality rules for SilkGrow.

**Authority:** Google Stitch MCP is the required visual design authority for SilkGrow frontend work.

**Related documents:**
- `PROJECT_CONTEXT.md`
- `PRODUCT_REQUIREMENTS.md`
- `STITCH_WORKFLOW.md`

---

# 1. Design Objective

SilkGrow should look like a credible, polished agricultural technology product.

The visual experience should combine:

- agricultural warmth
- market-data clarity
- modern SaaS quality
- simplicity for farmers
- strong information hierarchy

It should NOT look like:

- a generic admin dashboard
- a banking clone
- a university CRUD application
- an overly futuristic AI interface
- a cluttered e-commerce marketplace

The product should feel calm, useful, trustworthy, and intentional.

---

# 2. Design Authority

Google Stitch MCP is the design authority for:

- page composition
- visual hierarchy
- layout
- typography
- spacing
- color system
- component appearance
- navigation appearance
- chart presentation
- responsive visual design
- visual refinement
- visual alternatives
- major empty/loading/error states

Antigravity is responsible for turning approved designs into maintainable application code and connecting them to real application data and behavior.

A design task is not complete until an identifiable Stitch design artifact/reference exists.

The implementation may differ internally from Stitch-generated code when necessary for maintainability, but the approved visual intent must be preserved.

---

# 3. Visual Personality

SilkGrow should communicate:

### Natural

Subtle agricultural influence through:

- botanical color choices
- restrained organic shapes
- subtle nature-inspired accents

Avoid literal cartoon farming imagery.

### Intelligent

Market and forecast information should feel analytical and trustworthy.

Use:

- clean charts
- strong numerical hierarchy
- concise insights
- meaningful trend indicators

### Human

The interface should feel welcoming to a farmer.

Avoid excessive technical terminology and visual complexity.

---

# 4. Color Direction

Use a restrained visual palette.

## Primary

Deep botanical green for:

- primary actions
- active navigation
- important accents
- brand identity

## Supporting Green

Use softer greens for:

- positive states
- subtle backgrounds
- supporting highlights

## Warm Accent

A restrained gold/amber family may represent:

- silk-related content
- special insights
- market highlights

## Neutral System

Use a calm neutral range for:

- background
- surfaces
- borders
- primary text
- secondary text
- muted text

## Semantic States

Use dedicated semantic treatment for:

- positive
- negative
- warning
- neutral

Do not rely on color alone.

Avoid:

- neon colors
- excessive gradients
- glow effects
- dark futuristic “AI” themes unless explicitly approved through Stitch

---

# 5. Typography

Use one highly readable sans-serif family.

Create an obvious hierarchy:

```text
Display
Page Heading
Section Heading
Card Heading
Body
Supporting Text
Caption
```

Prices should be visually dominant.

Prefer:

```text
₹742
/kg
```

with strong numerical emphasis over burying the value in long copy.

Typography should remain readable on small screens.

---

# 6. Spacing and Rhythm

Use a consistent spacing scale.

All major spacing should feel like it belongs to the same system.

Use consistent spacing between:

- page sections
- card groups
- headings
- labels
- controls
- chart containers

Do not introduce arbitrary one-off spacing values simply to solve individual screens.

---

# 7. Shape and Elevation

Use moderate rounded corners.

Suggested hierarchy:

- smaller radius for inputs and compact controls
- medium radius for standard cards
- larger radius for major feature surfaces

Use subtle elevation and/or borders.

Avoid:

- heavy drop shadows
- excessive floating cards
- every element appearing elevated

---

# 8. Iconography

Use one consistent icon system.

Preferred:

- Lucide React or equivalent

Rules:

- consistent stroke weight
- consistent visual size
- consistent icon alignment

Do not mix multiple unrelated icon libraries unless explicitly necessary.

---

# 9. Responsive Layout

The application is mobile-first.

## Mobile

Prioritize:

- one-column layouts
- clear touch targets
- compact navigation
- readable charts
- stacked cards
- reduced visual density

## Tablet

Allow:

- two-column layouts
- broader chart areas
- more breathing room

## Desktop

Allow:

- sidebar navigation
- multi-column dashboard
- wider charts
- information-dense but readable layouts

Do not create separate duplicated page implementations for each device size.

---

# 10. Application Shell

## Desktop

Conceptual structure:

```text
┌───────────────────────────────────────────────────────────┐
│ Brand / Header                              Profile       │
├────────────────┬──────────────────────────────────────────┤
│ Navigation     │                                          │
│                │              Main Content                 │
│ Dashboard      │                                          │
│ Market         │                                          │
│ AI Forecast    │                                          │
│ Resources      │                                          │
│ My Bookings    │                                          │
│ Profile        │                                          │
└────────────────┴──────────────────────────────────────────┘
```

## Mobile

Conceptual structure:

```text
┌───────────────────────────────┐
│ Brand                 Profile │
├───────────────────────────────┤
│                               │
│          Main Content         │
│                               │
│                               │
├───────────────────────────────┤
│ Home Market AI Resources ...  │
└───────────────────────────────┘
```

The exact component composition must come from Stitch.

---

# 11. Navigation

Primary destinations:

- Dashboard
- Market
- AI Forecast
- Resources
- My Bookings
- Profile

The active destination must be visually obvious.

Navigation should remain consistent across all authenticated screens.

---

# 12. Welcome Screen

The first impression should be simple and confident.

Hierarchy:

```text
SilkGrow
↓
Short value proposition
↓
Brief supporting text
↓
Get Started
```

Do not overload the first screen with metrics or technical information.

---

# 13. Onboarding

Keep onboarding lightweight.

Required information:

- name
- phone number
- market/location

The design should emphasize simplicity and trust.

Validation feedback should appear clearly without overwhelming the form.

---

# 14. Dashboard

The dashboard is the main command center.

Recommended hierarchy:

```text
Greeting
    ↓
Market context
    ↓
Cocoon + Silk summary
    ↓
AI forecast summary
    ↓
Quick actions
    ↓
AI market insight
```

## Market Summary Cards

Cocoon:

```text
COCOON
₹742 / kg
↑ 4.2%
```

Silk:

```text
SILK
₹6,842 / kg
↑ 1.8%
```

Avoid unnecessary secondary metrics in the first visual layer.

---

# 15. AI Forecast Summary Card

The dashboard forecast card should feel important but consistent with the rest of the system.

Example:

```text
AI PRICE FORECAST

₹779 / kg
Expected upward trend

Predicted favorable window
26–28 September

[View Forecast]
```

Do not style the card as if the AI guarantees the result.

---

# 16. AI Market Insight

Use a concise visual block.

Example:

```text
AI MARKET INSIGHT

Cocoon prices show a short-term
upward trend based on recent
historical price patterns.
```

Do not invent causal explanations that are not supported by the data.

---

# 17. Market Intelligence Screen

Recommended hierarchy:

```text
Page Header
↓
Market selector
↓
Commodity selector
↓
Current price
↓
Change + trend
↓
7-day chart
↓
30-day chart
```

Tell the user the current situation before presenting detailed history.

---

# 18. Price Cards

Price cards should make the following immediately understandable:

- what commodity
- current price
- unit
- change
- trend

Use visual hierarchy, not excessive decoration.

---

# 19. Historical Charts

Historical charts should include:

- readable dates
- price values
- unit context
- useful tooltips
- responsive dimensions

Avoid excessive gridlines and tiny axis labels.

Chart styling must remain consistent between cocoon and silk views.

---

# 20. AI Forecast Screen

This should be one of the strongest screens in the application.

Recommended structure:

```text
Page Header
↓
Current price + current trend
↓
Forecast summary
↓
Historical → Forecast chart
↓
7-day forecast
↓
Predicted favorable window
↓
AI insight
↓
Forecast disclaimer
```

---

# 21. Historical vs Forecast Visualization

The visual transition must clearly communicate:

```text
Historical Data | Forecast
```

Possible approach:

- historical line uses one treatment
- forecast line uses a distinct treatment
- forecast start is explicitly marked
- chart legend explains both

Do not rely only on color.

The exact visual execution must be approved through Stitch.

---

# 22. Predicted Favorable Window

This component should be visually prominent without implying certainty.

Example:

```text
┌──────────────────────────────────────────┐
│ PREDICTED FAVORABLE WINDOW               │
│                                          │
│ 26–28 September                          │
│                                          │
│ Forecast indicates higher prices         │
│ during this period.                      │
└──────────────────────────────────────────┘
```

Use informational language.

Never visually imply guaranteed profit.

---

# 23. Forecast Disclaimer

Use:

> AI forecasts are estimates based on historical patterns. Actual market prices may differ.

Keep it visible but subordinate to the main forecast content.

---

# 24. Resource Catalogue

The resource catalogue should feel like a clean agricultural supply marketplace.

Resource card hierarchy:

```text
Image/Icon
Resource name
Short description
Price / Unit
Availability
Supplier
Delivery
Primary CTA
```

Example:

```text
┌──────────────────────────────────────┐
│ [resource image]                     │
│                                      │
│ Mulberry Leaves                      │
│ Fresh mulberry leaves                │
│                                      │
│ ₹48 / kg                             │
│ 500 kg available                     │
│ ABC Farm Supplies                    │
│ Delivery: 2–3 days                   │
│                                      │
│ [View Details]                       │
└──────────────────────────────────────┘
```

---

# 25. Resource Details

Recommended hierarchy:

```text
Resource identity
↓
Price
↓
Availability
↓
Supplier
↓
Delivery
↓
Quantity
↓
Total
↓
Book Now
```

Avoid unnecessary fields.

---

# 26. Booking Review

The review screen should make the result of the user's action obvious.

Show:

- resource
- supplier
- quantity
- unit price
- total
- estimated delivery

The primary action should be:

`Confirm Booking`

---

# 27. Booking Confirmation

Confirmation should be visually complete.

Example:

```text
✓

Booking Confirmed

SG-10291

Mulberry Leaves
100 kg

₹4,800

Estimated Delivery
24 September

[View My Bookings]
```

Avoid making the user wonder whether the booking succeeded.

---

# 28. My Bookings

Use clean cards or rows.

Display:

- booking ID
- resource
- quantity
- amount
- delivery
- status

Supported status labels may include:

- Confirmed
- Processing
- Out for Delivery
- Delivered
- Cancelled

Only show states that exist in the actual demonstration data.

---

# 29. Profile

The MVP profile can remain intentionally simple.

Show:

- name
- phone number
- selected market
- logout

Avoid expanding the profile area into a large settings system.

---

# 30. Buttons

Use a clear action hierarchy.

### Primary

For the main action.

Examples:

- Get Started
- View Forecast
- Book Now
- Confirm Booking

### Secondary

For supporting actions.

### Tertiary

For low-priority navigation.

Avoid multiple competing primary buttons in the same visual region.

---

# 31. Inputs and Forms

Inputs must have:

- visible labels
- adequate touch height
- clear validation
- sensible spacing
- obvious action controls

Error messages should explain what needs to be fixed.

---

# 32. Empty States

Empty states should explain:

1. what is empty
2. why it may be empty
3. what the user can do next

Example:

```text
No bookings yet

Your confirmed resource bookings
will appear here.

[Browse Resources]
```

---

# 33. Loading States

Use skeletons or local loading indicators when appropriate.

Do not add artificial waiting time purely to make the interface feel more realistic.

---

# 34. Error States

Use human-readable language.

Example:

```text
We couldn't load this information.

Please try again.
```

Avoid technical error codes in the primary UI.

---

# 35. Accessibility

At minimum:

- semantic headings
- meaningful labels
- visible focus states
- keyboard navigation
- readable contrast
- status information not dependent only on color
- supporting text for charts

---

# 36. Visual Anti-Patterns

Do not:

- use excessive gradients
- use neon/glowing AI effects
- make every element a card
- use oversized decorative illustrations that displace useful information
- use too many accent colors
- use inconsistent border radii
- use mixed icon styles
- make charts too dense
- bury key prices in small text
- use color as the only indication of trend
- create ornamental animations without product value

---

# 37. Stitch Screen Generation Order

Use this sequence:

1. App shell
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

This order establishes the design system before detailed screens.

---

# 38. Baseline Stitch Brief

Use this as the baseline creative brief when prompting Stitch:

> Design a premium, modern, mobile-first agricultural technology web application called SilkGrow for sericulture farmers in India.
>
> SilkGrow helps farmers monitor cocoon and silk prices, understand market trends, view AI-assisted price forecasts, and book essential sericulture resources.
>
> The interface should feel calm, trustworthy, professional, modern, farmer-friendly, and data-driven.
>
> Combine subtle agricultural visual language with polished SaaS patterns.
>
> Use a restrained botanical green primary palette, warm neutral surfaces, and subtle gold accents for silk and market highlights.
>
> Use clear typography, strong numerical hierarchy, generous spacing, subtle borders, light elevation, moderate rounded corners, accessible controls, and consistent iconography.
>
> Design mobile first and adapt elegantly to tablet and desktop.
>
> The forecast experience should communicate estimates rather than certainty.
>
> The product should feel like a credible agricultural technology startup, not a generic admin dashboard, a school project, or an overly futuristic AI interface.

---

# 39. Design Completion

A major screen is visually complete only when:

- the Stitch design was generated or refined
- the design was reviewed
- a traceable Stitch artifact/reference exists
- the implementation reflects the approved visual intent
- mobile and desktop were reviewed
- accessibility basics pass
- visual QA passes
