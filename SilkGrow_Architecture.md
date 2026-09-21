# SilkGrow - Project Architecture & Technical Presentation

## 1. Project Overview
SilkGrow is an intelligent, frontend-first web application engineered specifically for the sericulture (silk farming) industry. It empowers farmers and stakeholders with actionable, data-driven insights through a robust dashboard featuring live market intelligence, predictive forecasting, and resource management tools.

## 2. Technical Stack
The application is built on a modern, high-performance React ecosystem designed for rapid rendering, scalability, and seamless deployment.

### Core Frameworks
* **Next.js (App Router)**: Provides the core framework architecture, server-side route definitions, and optimized asset delivery.
* **React 18 + TypeScript**: Ensures type-safe component development, strict interface contracts (e.g., `MarketPrice`, `Forecast`), and predictable state management.

### Styling & UI
* **Tailwind CSS**: A utility-first CSS framework providing a fully custom, responsive design system. Includes a meticulously engineered semantic Dark Mode overlay without requiring heavy UI component libraries.
* **Lucide React**: Supplies lightweight, scalable SVG iconography used consistently throughout the interface.
* **Recharts**: Powers the dynamic Data Visualization engine, specifically utilized for the 7/14/30-day historical and predictive market trajectory graphs.

### Data & State Management
* **Browser LocalStorage**: Handles session persistence (active farmer profile, selected market) without requiring a heavy backend database.
* **Static JSON Datastore**: Provides high-reliability mock data for historical cocoon/raw silk pricing, IoT sensor readings, and regional resource mappings.
* **Next.js Server API Routes**: Houses the secure server-side proxy (`/api/market`) to safely interface with external government APIs without exposing credentials to the client bundle.

## 3. Architecture Design

### Frontend-First Architecture
SilkGrow is architected as a lightweight, frontend-driven "Smart Client." Instead of maintaining a complex, expensive monolithic backend, the application relies on an edge-ready architecture that pushes logic directly to the user's browser, paired with Serverless API Routes for external integrations.

### Key Components
1. **Market Intelligence Engine**: 
   * Reads from local historical JSON datasets.
   * Dynamically merges with live daily spot prices (via the `combineWithLivePrice` algorithm).
   * Calculates instantaneous percentage shifts, volatility, and trend directions.
2. **AI Predictive Forecasting Module**:
   * Evaluates historical price arrays.
   * Projects 7-day, 14-day, and 30-day peak yields.
   * Analyzes trajectory slopes to declare optimal harvest/selling windows for the farmer.
3. **Notification & State System**:
   * Uses React state to manage localized alerts.
   * Fully responsive fixed-viewport positioning to guarantee the UI never overflows across mobile devices.

## 4. Live Data Integration (AGMARKNET)
A defining feature of SilkGrow is its real-time connection to the Government of India's Open Government Data (data.gov.in) agricultural market feed.

* **Secure Proxy**: The Next.js API route fetches data using a server-side `DATA_GOV_API_KEY`.
* **Graceful Fallback**: If the government API returns empty records or goes offline, the `fetchLiveMarketData` pipeline safely intercepts the `null` response. The application seamlessly falls back to the static historical dataset, guaranteeing that the charts and application never crash.
* **Dynamic Chart Injection**: Live prices are injected chronologically into the dataset before passing to the `Recharts` engine, allowing the AI forecast line to anchor flawlessly to the newest real-world data point.

## 5. Deployment Strategy
* **Platform**: Optimized for Vercel edge deployment.
* **Environment Variables**: Securely manages the AGMARKNET API key via Vercel's encrypted environment variables.
* **Caching**: Utilizes Next.js `revalidate` caching inside the API proxy to cache external data for 1 hour, preventing API rate-limiting while ensuring farmers receive daily price updates.
