import { SUPPORTED_CRYPTOS } from "@/hooks/useCryptoPrices";

export default function CryptoIcon({
  symbol,
  size = 24,
}: {
  symbol: string;
  size?: number;
}) {
  const crypto = SUPPORTED_CRYPTOS.find((c) => c.symbol === symbol);
  const color = crypto?.color || "#D4953A";

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.45,
      }}
    >
      {symbol.charAt(0)}
    </div>
  );
}
