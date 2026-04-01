"use client";

import React from "react";
import { tradeAgentsData } from "./tradeData";
import { motion, AnimatePresence } from "framer-motion";

type TradeLeftPanelProps = {
  activeAgent: string;
};

const formatCurrency = (value: number) => {
  const abs = Math.abs(value).toLocaleString("en-IN");
  return `${value >= 0 ? "+" : "-"}₹${abs}`;
};

export default function TradeLeftPanel({ activeAgent }: TradeLeftPanelProps) {
  const data = tradeAgentsData[activeAgent];
  const [sessionExpanded, setSessionExpanded] = React.useState(false);
  const TRADER_FRAME_HEIGHT = 748;

  return (
    <aside
      className="w-full max-w-[260px] overflow-hidden"
      style={{
        height: `min(clamp(762px, 74dvh, ${TRADER_FRAME_HEIGHT}px), calc(100dvh - clamp(56px, 7vh, 88px)))`,
        maxHeight: `min(${TRADER_FRAME_HEIGHT}px, calc(100dvh - clamp(56px, 7vh, 10px)))`,
      }}
    >
      <div className="flex h-full min-h-0 w-full max-w-[260px] flex-col">
        <div className="shrink-0">
          <h1 className="beast-heading text-[clamp(26px,2.2vw,32px)] leading-none text-[#F2F3D9]">
            {data.title}
          </h1>

          <p
            className="mt-3 max-w-[260px] text-[clamp(12px,0.95vw,14px)] leading-[1.45] text-[#F2F3D9CC]"
            style={{ fontWeight: 200 }}
          >
            {data.description}
          </p>
        </div>

        <div
          className="
    mt-[clamp(16px,1.5vw,24px)]
    flex-1
    min-h-0
    overflow-hidden
    flex
    flex-col
    gap-[clamp(12px,1.2vw,20px)]
  "
        >
          <div
            className={`"min-h-0 ${sessionExpanded ? "basis-[40%]" : "basis-[40%]"} overflow-hidden"`}
          >
            <PnLCard data={data} />
          </div>

          {!sessionExpanded && (
            <div className="min-h-0 basis-[30%] overflow-hidden">
              <WatchlistCard data={data} />
            </div>
          )}

          <div
            className={
              sessionExpanded
                ? "min-h-0 flex-1 overflow-hidden"
                : "min-h-0 basis-[30%] overflow-hidden"
            }
          >
            <SessionFlowCard
              data={data}
              expanded={sessionExpanded}
              onToggle={() => setSessionExpanded((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function PanelCard({
  children,
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`relative h-full min-h-0 w-full max-w-[260px] overflow-hidden rounded-[28px] p-[1px] ${className}`}
      style={{
        background:
          "linear-gradient(105.41deg, rgba(110, 11, 40, 0.12) 18.81%, rgba(68, 55, 66, 0.12) 60.8%)",
        boxShadow: "0px 0px 8px 0px rgba(110, 11, 40, 0.12)",
      }}
    >
      <div
        className={`flex h-full min-h-0 flex-col overflow-hidden rounded-[27px] p-[clamp(14px,1.3vw,20px)] ${innerClassName}`}
        style={{
          background:
            "linear-gradient(95.76deg, rgba(110, 11, 40, 0.12) 17.01%, rgba(68, 55, 66, 0.12) 77.75%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PnLCard({ data }: { data: (typeof tradeAgentsData)[string] }) {
  return (
    <PanelCard>
      <div className="shrink-0">
        <div className="flex items-center justify-between">
          <p
            className="text-[12px] text-[#F2F3D999]"
            style={{ fontWeight: 500 }}
          >
            P&amp;L
          </p>

          <p
            style={{ fontWeight: 500 }}
            className={`text-[14px] tabular-nums ${
              typeof data.totalPnL === "number"
                ? data.totalPnL >= 0
                  ? "text-[#25DB17]"
                  : "text-[#FF2B2B]"
                : "text-[#F2F3D9]"
            }`}
          >
            {typeof data.totalPnL === "number"
              ? formatCurrency(data.totalPnL)
              : "-"}
          </p>
        </div>

        <div className="mt-3 h-px w-full bg-[#F2F3D914]" />

        <div className="mt-3 flex items-center gap-3 text-[10px] text-[#F2F3D966]">
          <span>{data.summary.trades} Trades</span>
          <span className="inline-block h-[3px] w-[3px] rounded-full bg-[#F2F3D966]" />
          <span>{data.summary.wins} Wins</span>
          <span className="inline-block h-[3px] w-[3px] rounded-full bg-[#F2F3D966]" />
          <span>{data.summary.losses} Losses</span>
        </div>
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
        {data.trades.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-[10px] text-[#F2F3D966]">
              No active positions. The agent is monitoring market conditions.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data.trades.map((item, index) => (
              <div key={`${item.symbol}-${index}`}>
                <div className="flex flex-col gap-2">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      style={{ fontWeight: 500 }}
                      className={`flex items-center justify-center rounded-[4px] px-1 py-0.5 text-[10px] ${
                        item.side === "B"
                          ? "bg-[#25DB171F] text-[#25DB17]"
                          : "bg-[#A5000033] text-[#FF2B2B]"
                      }`}
                    >
                      {item.side}
                    </span>

                    <p
                      className="truncate text-[12px] text-[#F2F3D9]"
                      style={{ fontWeight: 500 }}
                    >
                      {item.symbol}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="flex items-center gap-2 text-[10px] text-[#F2F3D966]"
                      style={{ fontWeight: 400 }}
                    >
                      <span>
                        Qty <span className="text-[#F2F3D999]">{item.qty}</span>
                      </span>

                      <span className="inline-block h-1 w-1 rounded-full bg-[#F2F3D933]" />

                      <span className="text-[#F2F3D999]">
                        Avg {item.avgPrice}
                      </span>
                    </div>

                    <p
                      className={`shrink-0 text-[12px] tabular-nums ${
                        item.pnl >= 0 ? "text-[#25DB17]" : "text-[#C5181B]"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {formatCurrency(item.pnl)}
                    </p>
                  </div>
                </div>

                {index !== data.trades.length - 1 && (
                  <div className="mt-2 h-px w-full bg-[#F2F3D914]" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PanelCard>
  );
}

function WatchlistCard({ data }: { data: (typeof tradeAgentsData)[string] }) {
  return (
    <PanelCard>
      <div className="shrink-0">
        <p
          className="text-[12px] uppercase text-[#F2F3D999]"
          style={{ fontWeight: 500 }}
        >
          Watchlist
        </p>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
        {data.watchlist.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-[10px] text-[#F2F3D966]">
              No items in watchlist.
            </p>
          </div>
        ) : (
          <div>
            {data.watchlist.map((item, index) => (
              <div key={`${item.label}-${index}`}>
                <div
                  className="flex items-center justify-between gap-4"
                  style={{ fontWeight: 500 }}
                >
                  <p className="text-[12px] text-[#F2F3D9]">{item.label}</p>

                  <div className="flex items-center gap-4">
                    <p className="text-[12px] tabular-nums text-[#F2F3D9]">
                      {item.value}
                    </p>

                    <p
                      className={`text-[12px] tabular-nums ${
                        item.positive ? "text-[#25DB17]" : "text-[#C5181B]"
                      }`}
                    >
                      ({item.change})
                    </p>
                  </div>
                </div>

                {index !== data.watchlist.length - 1 && (
                  <>
                    <div className="mt-3 h-px w-full bg-[#F2F3D914]" />
                    <div className="mt-3" />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PanelCard>
  );
}

function SessionFlowCard({
  data,
  expanded,
  onToggle,
}: {
  data: (typeof tradeAgentsData)[string];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <PanelCard className="h-full min-h-0">
      <div className="flex h-full min-h-0 flex-col">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full shrink-0 items-center justify-between text-left"
        >
          <p
            className="text-[12px] uppercase text-[#F2F3D999]"
            style={{ fontWeight: 500 }}
          >
            Session Flow
          </p>

          <svg
            width="14"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`opacity-70 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path
              d="M1.5 1.75L9 9.25L16.5 1.75"
              stroke="#F2F3D966"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
          {data.sessionFlow.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-[10px] text-[#F2F3D966]">
                Session hasn't started yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {data.sessionFlow.map((item, index) => {
                const isLast = index === data.sessionFlow.length - 1;

                return (
                  <div
                    key={`${item.time}-${index}`}
                    className="grid grid-cols-[22px_minmax(70px,auto)_minmax(0,1fr)] items-center gap-2"
                  >
                    {/* Timeline */}
                    <div className="relative flex h-full justify-center self-stretch">
                      {!isLast && (
                        <span className="absolute left-1/2 top-[10px] bottom-[-24px] w-px -translate-x-1/2 border-l border-dashed border-[#F2F3D93D]" />
                      )}

                      <span
                        className={`relative z-[1]  block h-[10px] w-[10px] rounded-full ${
                          item.active
                            ? "bg-[#F2AEA1] shadow-[0_0_12px_#F2AEA1]"
                            : "bg-[#F2F3D9CC] shadow-[0_0_10px_#F2F3D966]"
                        }`}
                      />
                    </div>

                    {/* Time + divider + label */}
                    <div className="grid grid-cols-[auto_minmax(20px,1fr)_auto] items-center gap-2 ">
                      <p
                        className={`text-[12px] leading-none tabular-nums whitespace-nowrap ${
                          item.active ? "text-[#FFD5CC]" : "text-[#F2F3D9CC]"
                        }`}
                        style={{ fontWeight: 400 }}
                      >
                        {item.time}
                      </p>

                      <div className="h-px w-full border-t border-dashed border-[#F2F3D93D]" />

                      <span
                        className={`text-[12px] leading-none whitespace-nowrap ${
                          item.active ? "text-[#FFD5CC]" : "text-[#F2F3D9CC]"
                        }`}
                        style={{ fontWeight: 400 }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PanelCard>
  );
}
