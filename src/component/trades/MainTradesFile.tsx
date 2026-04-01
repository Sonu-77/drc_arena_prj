"use client";

import React, { useState } from "react";
import TradeLeftPanel from "./TradeLeftPanel";
import TradeRightPanel from "./TradeRightPanel";
import { tradeTabs } from "./tradeData";

const MainTradesFile = () => {
  const [activeAgent, setActiveAgent] = useState<string>(tradeTabs[0].key);

  return (
    <section
      className="
        w-full
        overflow-hidden
        px-[clamp(20px,2.2vw,32px)]
        pt-[clamp(20px,2.2vw,32px)]
        pb-[clamp(12px,1.4vw,18px)]
      "
      style={{ height: "100dvh" }}
    >
      <div
        className="
          mx-auto
          grid
          h-full
          min-h-0
          w-full
          max-w-[1360px]
          grid-cols-[260px_minmax(0,1fr)]
          items-start
          justify-center
          gap-[clamp(20px,1.8vw,28px)]
        "
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