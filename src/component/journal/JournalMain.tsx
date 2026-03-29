"use client";

import React, { useMemo, useState } from "react";
import { filterJournalEntries, journalAgents, journalEntries, tradeLogData } from "./journalData";
import JournalOverviewSection from "./JournalOverviewSection";
import JournalTradeLogSection from "./JournalTradeLogSection";
// import {
//   journalAgents,
//   journalEntries,
//   tradeLogData,
//   filterJournalEntries,
// } from "./journalData";
// import JournalOverviewSection from "./JournalOverviewSection";
// import JournalTradeLogSection from "./JournalTradeLogSection";

type DateRange = {
  from: Date;
  to: Date;
};

const JournalMain = () => {
  const [activeAgent, setActiveAgent] = useState<string>(journalAgents[0].id);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(
    journalEntries[0]?.id || null
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 1, 18),
  });

  const activeAgentEntries = useMemo(() => {
    return journalEntries.filter((item) => item.agentId === activeAgent);
  }, [activeAgent]);

  const filteredEntries = useMemo(() => {
    return filterJournalEntries(activeAgentEntries, activeFilter, dateRange);
  }, [activeAgentEntries, activeFilter, dateRange]);

  const selectedEntry = useMemo(() => {
    const found = filteredEntries.find((item) => item.id === selectedEntryId);
    return found || filteredEntries[0] || null;
  }, [filteredEntries, selectedEntryId]);

  React.useEffect(() => {
    if (!filteredEntries.length) {
      setSelectedEntryId(null);
      return;
    }

    const stillExists = filteredEntries.some((item) => item.id === selectedEntryId);
    if (!stillExists) {
      setSelectedEntryId(filteredEntries[0].id);
    }
  }, [filteredEntries, selectedEntryId]);

  React.useEffect(() => {
    const firstEntryForAgent = journalEntries.find((item) => item.agentId === activeAgent);
    setSelectedEntryId(firstEntryForAgent?.id || null);
    setActiveFilter("all");
  }, [activeAgent]);

  return (
    <section
      className="
        h-[calc(100vh-clamp(72px,7vw,96px))]
        min-h-0
        w-full
        overflow-y-auto
        overflow-x-hidden
        px-[clamp(20px,2.2vw,32px)]
        pt-[clamp(24px,2.4vw,36px)]
        pb-[clamp(56px,7vw,96px)]
      "
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[clamp(28px,2.6vw,40px)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h1 className="beast-heading text-[32px] leading-none text-[#F2F3D9]">
            Journal
          </h1>

          <p
            className="max-w-[620px] text-[14px] leading-[1.6] text-[#F2F3D9CC] md:pt-1 md:text-right"
            style={{ fontWeight: 200 }}
          >
            Trade recaps, lessons learned, rules evolved. The agent&apos;s thinking,
            unfiltered.
          </p>
        </div>

        <div className="flex flex-wrap gap-[clamp(12px,1.2vw,20px)]">
          {journalAgents.map((agent) => {
            const isActive = activeAgent === agent.id;

            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent.id)}
                style={{ fontWeight: 500 }}
                className={`rounded-full border px-[clamp(16px,1.5vw,22px)] py-[clamp(10px,0.95vw,14px)] text-[14px] leading-none transition-all duration-200 ${
                  isActive
                    ? "border-[#6E0B2833] bg-[#DA596F1F] text-[#DA596F] shadow-[0_0_16px_rgba(110,11,40,0.4)]"
                    : "border-[#DA596F14] bg-[#DA596F14] text-[#6E0B28]"
                }`}
              >
                {agent.label}
              </button>
            );
          })}
        </div>

        <JournalOverviewSection
          entries={filteredEntries}
          selectedEntry={selectedEntry}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedEntryId={selectedEntryId}
          setSelectedEntryId={setSelectedEntryId}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <JournalTradeLogSection rows={tradeLogData} />
      </div>
    </section>
  );
};

export default JournalMain;