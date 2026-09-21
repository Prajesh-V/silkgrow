# SilkGrow — Project Context

## 1. Product Identity

**Project Name:** SilkGrow  
**Product Type:** Smart sericulture decision-support web application  
**Primary Users:** Sericulture farmers  
**Primary Deployment:** Vercel  
**Architecture Style:** Lightweight, frontend-first MVP with structured demonstration data

SilkGrow is designed to make important sericulture market information and resource-planning functionality accessible through one simple application.

---

# 2. Product Vision

SilkGrow combines three practical capabilities:

1. **Cocoon and silk market intelligence**
2. **AI-assisted cocoon price forecasting**
3. **Sericulture resource booking**

The product should feel like a credible agricultural technology application rather than a generic CRUD project or a collection of unrelated AI-generated screens.

The MVP deliberately prioritizes:

- product quality over feature count
- clear farmer-friendly UX
- strong visual design
- realistic demonstration data
- transparent AI forecasting
- smooth end-to-end flows
- simple deployment
- minimal infrastructure

---

# 3. Core User Questions

SilkGrow is built around three questions.

### 3.1 What is happening in the market?

The farmer should be able to see:

- current cocoon price
- current silk price
- recent price changes
- historical trends
- selected market/location

### 3.2 What could happen next?

The farmer should be able to see:

- short-term cocoon price forecasts
- forecast direction
- predicted favorable selling window
- a simple explanation of the forecast

The forecast is decision-support information, not a guarantee.

### 3.3 What resources can I arrange?

The farmer should be able to:

- browse resources
- view suppliers
- check availability
- see price and quantity
- see estimated delivery
- simulate a booking
- view booking history

---

# 4. Core Modules

## Module A — AI Price Prediction

This is the primary AI feature.

The module should provide:

- current cocoon price
- historical price trend
- 7-day forecast
- forecast direction
- predicted favorable selling window
- concise AI market insight
- forecast disclaimer

The intended ML workflow is:

```text
Historical Price Data
        ↓
Preprocessing
        ↓
Offline LSTM Training
        ↓
Forecast Generation
        ↓
Forecast JSON
        ↓
SilkGrow Frontend
```

The production web application does **not** require a continuously running Python inference server for the MVP.

If the model is not available during early frontend development, the frontend may use an explicitly labeled demonstration forecast dataset that follows the approved forecast contract.

---

## Module B — Cocoon & Silk Market Intelligence

This module should provide:

### Cocoon

- current price
- absolute change
- percentage change
- 7-day trend
- 30-day trend
- market/location

### Silk

- current price
- absolute change
- percentage change
- 7-day trend
- 30-day trend
- market/location

The module should classify movement as:

- Increasing
- Decreasing
- Stable

using centralized business logic.

---

## Module C — Resource Booking

The resource module is a lightweight demonstration marketplace.

Possible resources:

- Mulberry leaves
- Cocoons
- Rearing trays
- Disinfectants
- Other sericulture supplies

A resource may display:

- resource name
- supplier
- unit price
- unit
- available quantity
- minimum order quantity
- availability
- estimated delivery
- booking action

Bookings are demonstration bookings stored in browser-local state.

---

# 5. Primary User Journey

The main farmer journey is:

```text
Welcome
   ↓
Simple Onboarding
   ↓
Dashboard
   ↓
┌──────────────┬───────────────┬───────────────┐
│              │               │               │
▼              ▼               ▼               │
Market         AI Forecast     Resources       │
│              │               │               │
▼              ▼               ▼               │
Price Data     Forecast        Resource Detail │
Trends         Insight         │               │
                              ▼               │
                           Booking            │
                              │               │
                              ▼               │
                         Confirmation         │
                              │               │
                              ▼               │
                         My Bookings          │
```

The user should always be able to return to the dashboard.

---

# 6. User Experience Principles

The application must be understandable without knowledge of:

- machine learning
- software development
- APIs
- databases
- forecasting terminology

Important information should be visible quickly.

The interface should prefer:

- clear labels
- large readable prices
- concise descriptions
- simple charts
- obvious actions
- meaningful feedback

---

# 7. AI and Forecasting Honesty

SilkGrow must never imply that its forecasts guarantee a profitable outcome.

Use:

- Predicted price
- Forecast
- Expected trend
- Estimated
- Predicted favorable window

Do not use:

- Guaranteed profit
- Guaranteed best day
- Certain future price
- Guaranteed market movement

Required forecast disclaimer:

> AI forecasts are estimates based on historical patterns. Actual market prices may differ.

The forecast should be treated as decision-support information.

---

# 8. Data Strategy

The MVP uses realistic demonstration data.

Demonstration data must:

- be deterministic
- be internally consistent
- look plausible
- support meaningful charts
- support multiple markets and trends
- be clearly distinguishable from verified live information

Do not silently present fictional prices as actual live market prices.

---

# 9. Demonstration Markets

Initial demonstration markets may include:

- Ramanagara
- Mysuru
- Channapatna
- Kolar
- Mandya
- Bengaluru

These are demonstration locations unless real data is later integrated.

---

# 10. Deployment Philosophy

The intended production path is:

```text
GitHub
   ↓
Vercel
   ↓
Next.js Application
```

The MVP intentionally does not require:

- PostgreSQL
- MongoDB
- Firebase
- Redis
- FastAPI
- Flask
- dedicated ML inference server
- Docker
- Kubernetes
- real OTP service
- real payment gateway
- real supplier backend

These are future possibilities, not MVP requirements.

---

# 11. Frontend / Stitch Strategy

Google Stitch MCP is a **mandatory development-time design tool** for SilkGrow.

Stitch is the visual design authority for:

- screen design
- visual hierarchy
- component appearance
- page layout
- responsive visual design
- chart presentation
- navigation appearance
- visual refinement

Antigravity is the engineering authority for:

- Next.js/React implementation
- routing
- state
- data integration
- validation
- persistence
- business logic
- testing
- accessibility implementation
- build
- deployment

The required workflow is:

```text
Requirement
    ↓
Stitch MCP
    ↓
Design / Refine
    ↓
Approved Design Artifact
    ↓
Antigravity Implementation
    ↓
Visual QA
```

A major UI task must not be considered complete without a traceable Stitch design artifact/reference.

Stitch is not a production runtime dependency.

See `STITCH_WORKFLOW.md` for the detailed process.

---

# 12. Scope Boundaries

The MVP is intentionally limited.

### Not included in MVP

- real payment processing
- production authentication
- real OTP
- real supplier onboarding
- real logistics tracking
- live market-price APIs
- production financial accounting
- IoT devices
- multi-service backend infrastructure
- runtime Python ML inference
- complex recommendation engines

New major capabilities require explicit approval.

---

# 13. Future Expansion

Possible later additions include:

- real market APIs
- real supplier accounts
- payment processing
- real authentication
- regional language support
- financial management
- farmer expense tracking
- weather integration
- notifications
- live forecasting
- cloud database
- advanced ML models
- mobile application

None of these should be implemented during the MVP unless specifically approved.

---

# 14. Definition of Success

SilkGrow MVP is successful when a new user can:

1. open the application
2. complete onboarding
3. reach the dashboard
4. understand current cocoon/silk market conditions
5. inspect historical price movement
6. understand the AI forecast
7. see a predicted favorable selling window
8. browse resources
9. inspect a resource
10. complete a simulated booking
11. see the booking in My Bookings
12. use the application comfortably on mobile and desktop

---

# 15. Core Product Principle

> Build fewer things extremely well.

SilkGrow should feel like one coherent, trustworthy product rather than a large collection of shallow features.
