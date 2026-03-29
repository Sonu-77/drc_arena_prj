"use client";

import React from "react";
import {
  tradeSteps,
  convictionCards,
  activeRules,
  riskManagement,
  instruments,
} from "./mechanicsData";
import SectionHeader from "./SectionHeader";
import TradeStepCard from "./TradeStepCard";
import ConvictionCard from "./ConvictionCard";
import RuleCard from "./RuleCard";
import InstrumentCard from "./InstrumentCard";
import RiskManagementSection from "./RiskCard";

const MechanicsMain = () => {
  return (
    <section className="h-full w-full overflow-hidden">
      {/* SCROLLABLE CONTAINER */}
      <div className="h-full overflow-y-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-14 px-6 py-10">
          {/* HEADER */}
          <div>
            <h1 className="beast-heading text-[32px] leading-none text-[#F2F3D9] mb-4">
              Mechanics
            </h1>
            <p
              className="text-[#F2F3D9CC] text-[clamp(13px,0.95vw,14px)] max-w-[800px]"
              style={{
                fontWeight: 200,
              }}
            >
              Every rule is discovered from experience, not pre-programmed. Each
              agent evolves its trading framework.
            </p>
          </div>

          {/* TRADE STEPS */}
          <div>
            <SectionHeader
              title="How the AI Agents Trade"
              desc="Same data. Same rules. No human input."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {tradeSteps.map((item) => (
                <TradeStepCard key={item.title} data={item} />
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-[#44374299]" />

          {/* CONVICTION */}
          <div>
            <SectionHeader
              title="The Conviction Framework"
              desc="Every trade is scored across 5 dimensions."
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
              {convictionCards.map((card) => (
                <ConvictionCard key={card.title} data={card} />
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-[#44374299]" />

          {/* ACTIVE RULES */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="beast-heading text-[24px] leading-none text-[#F2F3D9]">
                Active Rules
              </h2>
              <span className="text-[#F2AEA11F]">•</span>
              <p
                className="text-[#F2F3D999] text-[clamp(13px,0.95vw,14px)]"
                style={{
                  fontWeight: 200,
                }}
              >
                5 active
              </p>
            </div>

            <div
              className="mt-6 grid items-start gap-6 
  grid-cols-1 
  xl:grid-cols-[1.8fr_1fr_1fr]"
            >
              {activeRules.map((rule) => (
                <RuleCard key={rule.title} data={rule} />
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-[#44374299]" />

          {/* RISK MANAGEMENT */}
          <div>

            <RiskManagementSection data={riskManagement} />
          </div>

          {/* INSTRUMENTS */}
          <div>
            <SectionHeader title="Instruments" />

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {instruments.map((item) => (
                <InstrumentCard key={item.title} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MechanicsMain;
