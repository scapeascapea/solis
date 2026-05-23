import { useState, useEffect } from "react";

export type Crypto = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  color: string;
  pair: string;
  tvSymbol: string;
  tvExchange: string;
};

export const SUPPORTED_CRYPTOS: Crypto[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 97450,
    change24h: 1.12,
    color: "#F7931A",
    pair: "BTCUSDT",
    tvSymbol: "BTCUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3847,
    change24h: -0.87,
    color: "#627EEA",
    pair: "ETHUSDT",
    tvSymbol: "ETHUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 190.42,
    change24h: 2.34,
    color: "#9945FF",
    pair: "SOLUSDT",
    tvSymbol: "SOLUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "monero",
    symbol: "XMR",
    name: "Monero",
    price: 218.5,
    change24h: 0.45,
    color: "#FF6600",
    pair: "XMRUSDT",
    tvSymbol: "XMRUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "litecoin",
    symbol: "LTC",
    name: "Litecoin",
    price: 89.32,
    change24h: -1.23,
    color: "#345D9D",
    pair: "LTCUSDT",
    tvSymbol: "LTCUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    price: 1.0002,
    change24h: 0.01,
    color: "#26A17B",
    pair: "USDTUSD",
    tvSymbol: "USDTUSD",
    tvExchange: "BINANCE",
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    price: 1.0,
    change24h: 0.0,
    color: "#2775CA",
    pair: "USDCUSD",
    tvSymbol: "USDCUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "bitcoin-cash",
    symbol: "BCH",
    name: "Bitcoin Cash",
    price: 452.18,
    change24h: -0.56,
    color: "#0AC18E",
    pair: "BCHUSDT",
    tvSymbol: "BCHUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.185,
    change24h: 3.21,
    color: "#C2A633",
    pair: "DOGEUSDT",
    tvSymbol: "DOGEUSDT",
    tvExchange: "BINANCE",
  },
  {
    id: "tron",
    symbol: "TRX",
    name: "TRON",
    price: 0.245,
    change24h: 1.85,
    color: "#FF060A",
    pair: "TRXUSDT",
    tvSymbol: "TRXUSDT",
    tvExchange: "BINANCE",
  },
];

export function useCryptoPrices() {
  const [prices, setPrices] = useState<Crypto[]>(SUPPORTED_CRYPTOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrices() {
      try {
        const ids = SUPPORTED_CRYPTOS.map((c) => c.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
          { signal: AbortSignal.timeout(10000) }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        if (cancelled) return;

        setPrices((prev) =>
          prev.map((crypto) => {
            const d = data[crypto.id];
            if (!d) return crypto;
            return {
              ...crypto,
              price: d.usd,
              change24h: d.usd_24h_change ?? crypto.change24h,
            };
          })
        );
      } catch {
        /* keep defaults */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { prices, loading };
}
