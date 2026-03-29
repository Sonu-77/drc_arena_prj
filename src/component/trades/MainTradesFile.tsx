"use client";

import React, { useState } from "react";
import TradeLeftPanel from "./TradeLeftPanel";
import TradeRightPanel from "./TradeRightPanel";
import { tradeTabs } from "./tradeData";

const MainTradesFile = () => {
  const [activeAgent, setActiveAgent] = useState<string>(tradeTabs[0].key);
  const TRADER_FRAME_HEIGHT = 738;

  return (
    <section
      className="
    w-full
    overflow-hidden
    px-[clamp(20px,2.2vw,32px)]
     py-[clamp(20px,2.2vw,32px)]
  "
      style={{ minHeight: "100dvh" }}
    >
      <div
        className="
    mx-auto
    grid
    min-h-0
    w-full
    max-w-[1360px]
    grid-cols-[260px_minmax(0,1fr)]
    justify-center
    gap-[clamp(20px,1.8vw,28px)]
    items-start
  "
        style={{
          minHeight: "calc(100dvh - clamp(32px, 3.6vw, 48px))",
        }}
      >
        <TradeLeftPanel activeAgent={activeAgent} />

        <TradeRightPanel
          activeAgent={activeAgent}
          setActiveAgent={setActiveAgent}
        />
      </div>
    </section>
  );
};

export default MainTradesFile;