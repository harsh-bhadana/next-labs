import { NextResponse } from "next/server";

type Stock = {
  symbol: string;
  price: number;
  change: number;
};

type AggregatedData = {
  timestamp: string;
  stocks: Stock[];
  sources: {
    name: string;
    latency: number;
    status: "ok" | "slow" | "error";
  }[];
};

// Mock data sources
async function fetchGlobalMarkets(): Promise<Stock[]> {
  await new Promise(r => setTimeout(r, 100)); // 100ms
  return [
    { symbol: "AAPL", price: 185.92 + (Math.random() * 2 - 1), change: 0.45 },
    { symbol: "MSFT", price: 420.55 + (Math.random() * 3 - 1.5), change: -0.12 }
  ];
}

async function fetchTechIndex(): Promise<Stock[]> {
  await new Promise(r => setTimeout(r, 450)); // 450ms (simulating a slower RPC)
  return [
    { symbol: "NVDA", price: 875.28 + (Math.random() * 10 - 5), change: 2.34 },
    { symbol: "TSLA", price: 175.45 + (Math.random() * 5 - 2.5), change: -1.85 }
  ];
}

async function fetchLegacyFeed(): Promise<Stock[]> {
  await new Promise(r => setTimeout(r, 200)); // 200ms
  return [
    { symbol: "IBM", price: 182.10 + (Math.random() * 1 - 0.5), change: 0.05 },
    { symbol: "INTC", price: 42.30 + (Math.random() * 2 - 1), change: -0.78 }
  ];
}

export async function GET() {
  const start = Date.now();
  
  // High-performance pattern: Fetch all upstream sources in parallel
  const [global, tech, legacy] = await Promise.all([
    fetchGlobalMarkets(),
    fetchTechIndex(),
    fetchLegacyFeed()
  ]);

  const duration = Date.now() - start;

  const response: AggregatedData = {
    timestamp: new Date().toISOString(),
    stocks: [...global, ...tech, ...legacy],
    sources: [
      { name: "GlobalMarkets", latency: 100, status: "ok" },
      { name: "TechIndex", latency: 450, status: "slow" },
      { name: "LegacyFeed", latency: 200, status: "ok" }
    ]
  };

  return NextResponse.json(response, {
    headers: {
      "X-BFF-Duration": `${duration}ms`,
      "Cache-Control": "s-maxage=2, stale-while-revalidate=4"
    }
  });
}
