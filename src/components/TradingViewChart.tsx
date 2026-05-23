import { useEffect, useRef } from "react";

type Props = {
  symbol: string;
  exchange?: string;
  height?: number;
};

export default function TradingViewChart({
  symbol,
  exchange = "BINANCE",
  height = 450,
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `${exchange}:${symbol}`,
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "rgba(10, 10, 10, 1)",
      gridColor: "rgba(255, 255, 255, 0.03)",
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(script);
  }, [symbol, exchange]);

  return (
    <div
      className="tradingview-widget-container w-full rounded-xl overflow-hidden border border-white/[0.08]"
      style={{ height }}
    >
      <div
        className="tradingview-widget-container__widget"
        ref={container}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
