import { NextResponse } from "next/server";
import type { MarketPrice } from "@/types";

// The AGMARKNET API Endpoint
const API_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const market = searchParams.get("market");
  
  // We only support cocoon prices for the live feed, as silk prices are rarely reliably tracked in this specific endpoint.
  const commodity = "Cocoon";

  const apiKey = process.env.DATA_GOV_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured." }, { status: 500 });
  }
  
  if (!market) {
    return NextResponse.json({ error: "Market parameter is required." }, { status: 400 });
  }

  try {
    // Construct the query URL for the specific state, market, and commodity
    // Note: State is currently hardcoded to Karnataka as per requirements, 
    // but this could be dynamic if needed.
    const queryUrl = new URL(API_URL);
    queryUrl.searchParams.append("api-key", apiKey);
    queryUrl.searchParams.append("format", "json");
    queryUrl.searchParams.append("filters[state]", "Karnataka");
    queryUrl.searchParams.append("filters[commodity]", commodity);
    // AGMARKNET uses specific casing, often UPPERCASE for markets or Proper Case
    queryUrl.searchParams.append("filters[market]", market);
    queryUrl.searchParams.append("limit", "1"); // Only need the latest record

    const response = await fetch(queryUrl.toString(), {
      // Use Next.js caching to revalidate every 1 hour to prevent hammering the API
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    const record = data.records[0];

    // Normalize the date from DD/MM/YYYY to YYYY-MM-DD
    let normalizedDate = new Date().toISOString().split("T")[0];
    if (record.arrival_date) {
      const parts = record.arrival_date.split("/");
      if (parts.length === 3) {
        normalizedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    
    // Fallbacks to min/max if modal is missing
    const price = parseFloat(record.modal_price) || parseFloat(record.max_price) || parseFloat(record.min_price) || 0;

    const normalizedData: MarketPrice = {
      id: `${market.toLowerCase()}-live-${normalizedDate}`,
      marketId: market.toLowerCase(),
      commodity: "cocoon",
      productName: record.variety || "Bivoltine Cocoon",
      date: normalizedDate,
      price: price,
      minPrice: parseFloat(record.min_price) || undefined,
      maxPrice: parseFloat(record.max_price) || undefined,
      unit: "kg",
      sourceType: "government_market_feed",
      sourceUpdatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: normalizedData }, { status: 200 });
  } catch (error) {
    console.error("Live Market Feed Error:", error);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
