import { useState, useEffect } from 'react';

// Common interfaces
export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  sparkline: { time: string; value: number }[];
}

export interface SectorPerformance {
  name: string;
  todayReturn: number;
  weekReturn: number;
  monthReturn: number;
  topStock: { symbol: string; change: number };
  worstStock: { symbol: string; change: number };
  summary: string;
}

// Generate an initial random sparkline
const generateSparkline = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice;
  for (let i = 0; i < 20; i++) {
    currentPrice = currentPrice * (1 + (Math.random() * 0.04 - 0.02));
    data.push({ time: `${i}:00`, value: currentPrice });
  }
  return data;
};

// Initial Ticker Data
const INITIAL_TICKERS: Record<string, TickerData> = {
  SPY: { symbol: 'SPY', name: 'S&P 500', price: 546.21, change: 4.12, changePercent: 0.76, volume: '45.2M', sparkline: generateSparkline(540) },
  QQQ: { symbol: 'QQQ', name: 'NASDAQ 100', price: 478.95, change: 6.84, changePercent: 1.45, volume: '32.1M', sparkline: generateSparkline(470) },
  DIA: { symbol: 'DIA', name: 'Dow Jones', price: 391.45, change: -1.24, changePercent: -0.32, volume: '28.4M', sparkline: generateSparkline(392) },
  IWM: { symbol: 'IWM', name: 'Russell 2000', price: 204.11, change: 2.11, changePercent: 1.05, volume: '18.9M', sparkline: generateSparkline(202) },
  BTC: { symbol: 'BTC', name: 'Bitcoin', price: 68421.50, change: 1250.00, changePercent: 1.86, volume: '32.4B', sparkline: generateSparkline(67000) },
  ETH: { symbol: 'ETH', name: 'Ethereum', price: 3540.20, change: 85.40, changePercent: 2.47, volume: '14.2B', sparkline: generateSparkline(3450) },
  GLD: { symbol: 'GLD', name: 'Gold', price: 218.45, change: 1.25, changePercent: 0.58, volume: '8.4M', sparkline: generateSparkline(217) },
  SLV: { symbol: 'SLV', name: 'Silver', price: 28.32, change: 0.42, changePercent: 1.51, volume: '12.1M', sparkline: generateSparkline(27.9) },
  OIL: { symbol: 'USO', name: 'WTI Crude', price: 78.45, change: -0.85, changePercent: -1.07, volume: '15.6M', sparkline: generateSparkline(79) },
  DXY: { symbol: 'DXY', name: 'US Dollar', price: 104.25, change: -0.15, changePercent: -0.14, volume: '-', sparkline: generateSparkline(104.4) },
};

export const useMockTickerData = () => {
  const [tickers, setTickers] = useState<Record<string, TickerData>>(INITIAL_TICKERS);

  useEffect(() => {
    // Tick every 2 seconds to simulate live websocket
    const interval = setInterval(() => {
      setTickers((prev) => {
        const next = { ...prev };
        const symbolsToUpdate = Object.keys(next).filter(() => Math.random() > 0.4); // Randomly update some
        
        symbolsToUpdate.forEach(symbol => {
          const t = next[symbol];
          const volatility = symbol === 'BTC' || symbol === 'ETH' ? 0.002 : 0.0005; 
          const movePercent = (Math.random() * volatility * 2) - volatility;
          
          const newPrice = t.price * (1 + movePercent);
          const priceDiff = newPrice - t.price;
          
          const newSparkline = [...t.sparkline.slice(1), { time: new Date().toLocaleTimeString(), value: newPrice }];
          
          next[symbol] = {
            ...t,
            price: newPrice,
            change: t.change + priceDiff,
            changePercent: t.changePercent + (movePercent * 100),
            sparkline: newSparkline
          };
        });
        
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return tickers;
};

// Sector Data Mock
export const MOCK_SECTORS: SectorPerformance[] = [
  { name: 'Technology', todayReturn: 1.45, weekReturn: 3.2, monthReturn: 8.5, topStock: { symbol: 'NVDA', change: 4.2 }, worstStock: { symbol: 'INTC', change: -1.2 }, summary: 'AI infrastructure spending continues to drive massive sector-wide momentum.' },
  { name: 'Healthcare', todayReturn: -0.4, weekReturn: 1.1, monthReturn: 2.3, topStock: { symbol: 'LLY', change: 2.1 }, worstStock: { symbol: 'PFE', change: -1.8 }, summary: 'Mixed results as GLP-1 makers surge while traditional pharma struggles with pipeline cliffs.' },
  { name: 'Finance', todayReturn: 0.8, weekReturn: 2.4, monthReturn: 4.1, topStock: { symbol: 'JPM', change: 1.5 }, worstStock: { symbol: 'C', change: -0.5 }, summary: 'Banks rally on expectations of fewer rate cuts, boosting net interest margin forecasts.' },
  { name: 'Energy', todayReturn: -1.2, weekReturn: -3.5, monthReturn: -2.1, topStock: { symbol: 'XOM', change: 0.2 }, worstStock: { symbol: 'CVX', change: -1.5 }, summary: 'Oil prices drag on sector performance amid global demand concerns and high inventory.' },
  { name: 'Consumer', todayReturn: 0.2, weekReturn: -0.5, monthReturn: 1.2, topStock: { symbol: 'AMZN', change: 1.8 }, worstStock: { symbol: 'NKE', change: -2.4 }, summary: 'Discretionary spending shows weakness at the low end, but premium brands maintain pricing power.' },
  { name: 'Industrials', todayReturn: 0.6, weekReturn: 1.8, monthReturn: 3.4, topStock: { symbol: 'CAT', change: 1.9 }, worstStock: { symbol: 'BA', change: -3.2 }, summary: 'Defense and infrastructure names outperform while aerospace faces supply chain headwinds.' },
  { name: 'Utilities', todayReturn: -0.8, weekReturn: -1.2, monthReturn: 0.5, topStock: { symbol: 'NEE', change: -0.1 }, worstStock: { symbol: 'DUK', change: -1.1 }, summary: 'Higher yields apply pressure to dividend-yielding bond proxies in the sector.' },
  { name: 'Materials', todayReturn: 0.4, weekReturn: 0.9, monthReturn: 1.8, topStock: { symbol: 'FCX', change: 2.5 }, worstStock: { symbol: 'NEM', change: -0.8 }, summary: 'Copper miners rally on electrification trends and supply shortages.' },
  { name: 'Real Estate', todayReturn: -1.5, weekReturn: -2.8, monthReturn: -4.5, topStock: { symbol: 'PLD', change: -0.5 }, worstStock: { symbol: 'ARE', change: -2.5 }, summary: 'Commercial real estate continues to suffer under the weight of sustained high interest rates.' },
  { name: 'Communication', todayReturn: 1.1, weekReturn: 2.5, monthReturn: 5.2, topStock: { symbol: 'META', change: 2.3 }, worstStock: { symbol: 'DIS', change: -0.9 }, summary: 'Digital ad spending remains robust, driving strong cash flows for mega-cap platforms.' },
];

export const MOCK_MOVERS = {
  gainers: [
    { symbol: 'SMCI', name: 'Super Micro', price: 924.50, change: 12.4, volume: '8.2M', sparkline: generateSparkline(850) },
    { symbol: 'ARM', name: 'Arm Holdings', price: 145.20, change: 8.5, volume: '12.5M', sparkline: generateSparkline(135) },
    { symbol: 'CELH', name: 'Celsius', price: 82.40, change: 6.2, volume: '5.1M', sparkline: generateSparkline(78) },
    { symbol: 'PLTR', name: 'Palantir', price: 25.60, change: 5.8, volume: '45.2M', sparkline: generateSparkline(24) },
  ],
  losers: [
    { symbol: 'TSLA', name: 'Tesla', price: 172.40, change: -4.5, volume: '65.4M', sparkline: generateSparkline(180) },
    { symbol: 'BA', name: 'Boeing', price: 185.20, change: -3.8, volume: '15.2M', sparkline: generateSparkline(192) },
    { symbol: 'LULU', name: 'Lululemon', price: 345.10, change: -5.2, volume: '4.8M', sparkline: generateSparkline(360) },
    { symbol: 'SNOW', name: 'Snowflake', price: 154.20, change: -3.1, volume: '8.9M', sparkline: generateSparkline(160) },
  ]
};

// Portfolio Mock Data
export const MOCK_PORTFOLIO_HOLDINGS = [
  { symbol: 'MSFT', name: 'Microsoft', shares: 45, avgPrice: 320.50, currentPrice: 415.20, dayChange: 1.2 },
  { symbol: 'AAPL', name: 'Apple', shares: 120, avgPrice: 155.40, currentPrice: 178.50, dayChange: -0.4 },
  { symbol: 'NVDA', name: 'NVIDIA', shares: 35, avgPrice: 450.20, currentPrice: 895.40, dayChange: 3.5 },
  { symbol: 'GOOGL', name: 'Alphabet', shares: 60, avgPrice: 110.80, currentPrice: 142.60, dayChange: 0.8 },
  { symbol: 'AMZN', name: 'Amazon', shares: 80, avgPrice: 125.40, currentPrice: 175.20, dayChange: 1.1 },
  { symbol: 'BTC', name: 'Bitcoin', shares: 0.25, avgPrice: 42000, currentPrice: 68421, dayChange: 1.8 },
];

export const generatePortfolioHistory = (days: number) => {
  const data = [];
  let value = 150000;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    value = value * (1 + (Math.random() * 0.02 - 0.008));
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value)
    });
  }
  return data;
};
