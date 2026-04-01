"use client";

import React, { useEffect, useRef, useState } from "react";
import { FeedItem, tradeAgentsData, tradeTabs } from "./tradeData";
import { AnimatePresence, motion } from "framer-motion";

type TradeRightPanelProps = {
  activeAgent: string;
  setActiveAgent: React.Dispatch<React.SetStateAction<string>>;
};

const TradeRightPanel = ({
  activeAgent,
  setActiveAgent,
}: TradeRightPanelProps) => {
  const data = tradeAgentsData[activeAgent];
  const TRADER_FRAME_HEIGHT = 748;

  const activeTabIndex = tradeTabs.findIndex((tab) => tab.key === activeAgent);
  const isFirstActive = activeTabIndex === 0;
  const isLastActive = activeTabIndex === tradeTabs.length - 1;

  const feedScrollRef = useRef<HTMLDivElement | null>(null);
  const [fadeTop, setFadeTop] = useState("0");
  const [fadeBottom, setFadeBottom] = useState("1");
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(80);
  const [showScrollbar, setShowScrollbar] = useState(false);

  useEffect(() => {
    const el = feedScrollRef.current;
    if (!el) return;

    const updateScrollUI = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const atTop = scrollTop <= 2;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
      const hasOverflow = scrollHeight > clientHeight + 2;

      if (!hasOverflow) {
        setFadeTop("0");
        setFadeBottom("0");
        setShowScrollbar(false);
        return;
      }

      setFadeTop(atTop ? "0" : "1");
      setFadeBottom(atBottom ? "0" : "1");
      setShowScrollbar(true);

      const visibleRatio = clientHeight / scrollHeight;
      const nextThumbHeight = Math.max(56, clientHeight * visibleRatio);
      const maxThumbTop = clientHeight - nextThumbHeight;
      const scrollableDistance = scrollHeight - clientHeight;
      const nextThumbTop =
        scrollableDistance > 0
          ? (scrollTop / scrollableDistance) * maxThumbTop
          : 0;

      setThumbHeight(nextThumbHeight);
      setThumbTop(nextThumbTop);
    };

    updateScrollUI();

    el.addEventListener("scroll", updateScrollUI);
    window.addEventListener("resize", updateScrollUI);

    return () => {
      el.removeEventListener("scroll", updateScrollUI);
      window.removeEventListener("resize", updateScrollUI);
    };
  }, [activeAgent, data]);

  const panelRadiusClass = isFirstActive
    ? "rounded-tr-[28px] rounded-br-[28px] rounded-bl-[28px] rounded-tl-none"
    : isLastActive
      ? "rounded-tl-none rounded-bl-[28px] rounded-br-[28px] rounded-tr-[28px]"
      : "rounded-tl-none rounded-bl-[32px] rounded-br-[28px] rounded-tr-[28px]";

  const panelInnerRadiusClass = isFirstActive
    ? "rounded-tr-[28px] rounded-br-[28px] rounded-bl-[28px] rounded-tl-none"
    : isLastActive
      ? "rounded-tl-none rounded-bl-[28px] rounded-br-[28px] rounded-tr-none"
      : "rounded-tl-none rounded-bl-[28px] rounded-br-[28px] rounded-tr-none";

  return (
    <section
      className="w-full max-w-[1060px] justify-self-center overflow-hidden"
      style={{
        height: `min(clamp(762px, 74dvh, ${TRADER_FRAME_HEIGHT}px), calc(100dvh - clamp(56px, 7vh, 10px)))`,
        maxHeight: `min(${TRADER_FRAME_HEIGHT}px, calc(100dvh - clamp(56px, 7vh, 10px)))`,
      }}
    >
      <div className="flex h-full min-h-0 min-w-0 w-full flex-col overflow-hidden">
        {/* Tabs */}
        <div className="shrink-0 w-full">
          <div className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full items-end gap-[clamp(6px,0.8vw,12px)] pb-0">
              {tradeTabs.map((tab) => {
                const isActive = activeAgent === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveAgent(tab.key)}
                    className={[
                      "relative shrink-0 rounded-t-[20px] px-[clamp(20px,1.5vw,24px)]",
                      "py-[clamp(10px,1vw,12px)] text-[clamp(14px,1vw,16px)]",
                      "transition-all duration-200",
                      isActive
                        ? "text-[#DA596F] bg-[#44374233]"
                        : "text-[#DA596F] bg-[#44374233] opacity-60",
                    ].join(" ")}
                    style={{
                      fontWeight: 500,
                      borderBottom: "none",
                      marginBottom: "-1px",
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panel body */}
        <div className="min-h-0 flex-1 overflow-hidden pb-[clamp(8px,1vh,14px)]">
          <div
            className={`
              flex
              h-full
              min-h-0
              w-full
              max-w-[1060px]
              flex-col
              overflow-hidden
              p-px
              bg-[linear-gradient(150.35deg,rgba(68,55,66,0.2)_37.24%,rgba(110,11,40,0.2)_77.16%)]
              ${panelRadiusClass}
            `}
          >
            <div
              className={`flex h-full min-h-0 w-full flex-col overflow-hidden `}
            >
              <div className="min-h-0 flex-1 pb-[clamp(16px,2vw,26px)]">
                <div className="flex h-full min-h-0 flex-col overflow-hidden">
                  <div className="min-h-0 flex-1 pt-[clamp(14px,1.5vw,22px)]">
                    <div className="relative h-full min-h-0 w-full">
                      <div
                        ref={feedScrollRef}
                        className="fade-on-scroll h-full w-full"
                        data-fade-top={fadeTop}
                        data-fade-bottom={fadeBottom}
                      >
                        <div className="px-[clamp(14px,1.6vw,28px)]">
                          <div className="flex min-h-full flex-col gap-[clamp(14px,1.4vw,24px)] pb-[72px] pr-[18px]">
                            {data.conversation.length !== 0 && (
                              <div className="px-7">
                                <div
                                  className="flex h-[clamp(42px,4vw,50px)] items-center justify-center rounded-[8px] px-4 text-center uppercase"
                                  style={{
                                    background: "#25DB171F",
                                    color: "#25DB17",
                                    fontWeight: 500,
                                    fontSize: "clamp(10px,1vw,12px)",
                                  }}
                                >
                                  {data.marketStatus.label}
                                  <span className="mx-3 inline-block h-[4px] w-[4px] rounded-full bg-[#25DB1733]" />
                                  <span
                                    className="text-[#25DB1766]"
                                    style={{ fontWeight: 400 }}
                                  >
                                    {data.marketStatus.time}
                                  </span>
                                </div>
                              </div>
                            )}

                            {data.conversation.length === 0 ? (
                              <div className="flex h-full min-h-[500px] items-center justify-center">
                                <p
                                  className="max-w-[820px] text-center text-[clamp(10px,0.8vw,12px)] text-[#F2F3D966]"
                                  style={{ fontWeight: 400 }}
                                >
                                  The agent hasn't entered its session yet. Once
                                  it goes live, you'll see its moves, reasoning,
                                  and market commentary here in real time.
                                </p>
                              </div>
                            ) : (
                              <>
                                {data.conversation.map((item) => (
                                  <FeedRow key={item.id} item={item} />
                                ))}
                              </>
                            )}

                            {data.conversation.length !== 0 && (
                              <div className="px-7">
                                <div
                                  className="flex h-[clamp(42px,4vw,50px)] items-center justify-center rounded-[8px] px-4 text-center uppercase"
                                  style={{
                                    background: "#C5181B1F",
                                    color: "#C5181B",
                                    fontWeight: 500,
                                    fontSize: "clamp(10px,1vw,12px)",
                                  }}
                                >
                                  MARKET Closed
                                  <span className="mx-3 inline-block h-[4px] w-[4px] rounded-full bg-[#C5181B33]" />
                                  <span
                                    className="text-[#C5181B66]"
                                    style={{ fontWeight: 400 }}
                                  >
                                    03:30 pm
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {showScrollbar && (
                        <>
                          <div
                            className="pointer-events-none absolute right-3 top-0 z-[4] h-full w-[6px] rounded-full"
                            style={{
                              background: "rgba(68, 55, 66, 0.2)",
                              opacity: 0.55,
                            }}
                          />
                          <div
                            className="pointer-events-none absolute right-3 z-[5] w-[6px] rounded-full"
                            style={{
                              top: `${thumbTop}px`,
                              height: `${thumbHeight}px`,
                              background: "rgba(68, 55, 66, 0.75)",
                            }}
                          />
                        </>
                      )}

                      <div
                        className="pointer-events-none absolute left-0 right-0 top-0 z-[3] h-[72px]"
                        style={{
                          background:
                            "linear-gradient(180deg, #1A0F10 0%, rgba(26, 14, 15, 0) 100%)",
                          opacity: fadeTop === "1" ? 1 : 0,
                          transition: "opacity 180ms ease",
                        }}
                      />

                      <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-[72px]"
                        style={{
                          background:
                            "linear-gradient(0deg, #1E080F 0%, rgba(30, 10, 15, 0) 100%)",
                          opacity: fadeBottom === "1" ? 1 : 0,
                          transition: "opacity 180ms ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeRightPanel;

function FeedRow({ item }: { item: FeedItem }) {
  switch (item.type) {
    case "marketStatus":
      return null;

    case "userQuery":
      return <UserQueryCard item={item} />;

    case "agentThought":
      return <AgentThoughtCard item={item} />;

    case "agentResponse":
      return <AgentResponseCard item={item} />;

    case "circuitBreaker":
      return <CircuitBreakerCard item={item} />;

    case "dailyJournal":
      return <DailyJournalCard item={item} />;

    case "positionUpdate":
      return <PositionUpdateCard item={item} />;

    case "tradePlan":
      return <TradePlanCard item={item} />;

    case "tradeExecuted":
      return <TradeExecutedCard item={item} />;

    case "tradeClosed":
      return <TradeClosedCard item={item} />;

    case "tradeSkipped":
      return <TradeSkippedCard item={item} />;

    case "instrumentOverview":
      return <InstrumentOverviewCard item={item} />;

    case "cycleCollapsed":
      return <CycleCard item={item} />;

    case "cycleExpanded":
      return <CycleCard item={item} />;

    default:
      return null;
  }
}

function UserQueryCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className=" flex gap-6">
        {item.time && (
          <div
            className="  pr-2 text-[clamp(8px,0.6vw,10px)] text-[#F2AEA1CC]"
            style={{ fontWeight: 200 }}
          >
            {item.time}
          </div>
        )}
        <div className="flex w-[18px] shrink-0 items-end justify-center pb-2"></div>
      </div>

      <div className="flex w-full justify-end gap-1">
        <div
          className="
            max-w-[min(78%,920px)]
            rounded-tl-[16px]
            rounded-tr-[16px]
            rounded-bl-[16px]
            rounded-br-[8px]
            p-[clamp(10px,0.7vw,12px)]

            text-[13px]
            text-[#F2AEA1]
            text-right
          "
          style={{
            background: "#6E0B2866",

            fontWeight: 300,
          }}
        >
          {item.queryText}
        </div>

        <div className="flex w-[20px] shrink-0 items-end justify-center">
          <img
            src="/arenaIcons/AgentIcon.svg"
            alt="user"
            className="h-[20px] w-[20px]"
          />
        </div>
      </div>
    </div>
  );
}

function AgentThoughtCard({ item }: { item: FeedItem }) {
  const alignRight =
    item.bucket === "EVALUATING" && !!item.text && item.text.length < 90;

  return (
    <div className={`flex gap-2 ${alignRight ? "justify-end" : "justify-end"}`}>
      <div
        className="
          max-w-[min(82%,920px)]
          rounded-[16px]
          px-[clamp(10px,0.8vw,12px)]
          py-[clamp(10px,0.8vw,12px)]
        "
        style={{
          background: "#6E0B2833",
          border: "1px solid rgba(201, 71, 104, 0.22)",
        }}
      >
        <div className=" flex flex-wrap items-center gap-2">
          <span
            className="text-[clamp(10px,0.7vw,12px)] uppercase text-[#DA596F]"
            style={{ fontWeight: 500 }}
          >
            {item.bucket}
          </span>

          {item.bucketState && (
            <>
              <span className="text-[#DA596F33]">•</span>
              <span
                className="text-[clamp(10px,0.7vw,12px)] uppercase text-[#DA596F66]"
                style={{ fontWeight: 400 }}
              >
                {item.bucketState}
              </span>
            </>
          )}
        </div>

        <p
          className="text-[13px] text-[#DA596F99]"
          style={{ fontWeight: 400 }}
        >
          {item.text}
        </p>
      </div>
      <div className="flex w-[18px] shrink-0 items-end justify-center"></div>
    </div>
  );
}

function AgentResponseCard({ item }: { item: FeedItem }) {
  const [expanded, setExpanded] = useState(false);
  const shouldShowExpand = !!item.expandable;

  const previewText = item.shortText || item.text;
  const detailText = item.text;

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2">
        <div className="flex w-[18px] shrink-0 items-end justify-center pb-2" />
        {item.time && (
          <div
            className="pl-4 text-[clamp(8px,0.5vw,10px)] text-[#F2AEA1CC]"
            style={{ fontWeight: 200 }}
          >
            {item.time}
          </div>
        )}
      </div>

      <div className="flex w-full items-end gap-1">
        <div className="flex w-[22px] shrink-0 items-end justify-center">
          <img
            src="/arenaIcons/DraconicIcon.svg"
            alt="assistant"
            className="h-[20px] w-[20px]"
          />
        </div>

        <div
          className="
            max-w-[min(82%,920px)]
            rounded-tl-[16px]
            rounded-tr-[16px]
            rounded-bl-[8px]
            rounded-br-[16px]
            p-[clamp(10px,0.7vw,12px)]
          "
          style={{
            background: "#FF6D001F",
          }}
        >
          <div className="space-y-3">
            <p
              className="text-[13px] text-[#D9B4A5]"
              style={{ fontWeight: 300 }}
            >
              {previewText}
            </p>

            <AnimatePresence initial={false}>
              {shouldShowExpand && expanded && (
                <motion.div
                  key="expanded-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-1">
                    <div className="h-px w-full bg-[#FF6D0014]" />
                    <p
                      className="text-[13px] text-[#D9B4A599]"
                      style={{ fontWeight: 300 }}
                    >
                      {detailText}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {(shouldShowExpand || item.ctaLabel) && (
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                {shouldShowExpand ? (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-[clamp(10px,0.7vw,12px)] text-[#FF6D00CC]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="underline underline-offset-4">
                      {expanded ? "Close" : "Show full response"}
                    </span>
                    <span
                      className={`transition-transform duration-300 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </span>
                  </button>
                ) : (
                  <span />
                )}

                {item.ctaLabel && item.ctaHref && (
                  <a
                    href={item.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[clamp(10px,0.7vw,12px)] text-[#FF6D00CC]"
                    style={{ fontWeight: 400 }}
                  >
                    {item.ctaLabel}
                    <span>↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CircuitBreakerCard({ item }: { item: FeedItem }) {
  return (
    <div className="px-7">
      <div
        className="w-full rounded-[10px] p-3"
        style={{
          background: "#C5181B0A",
          border: "1px solid #C5181B33",
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className=" flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[clamp(10px,0.7vw,12px)] uppercase text-[#C5181B]"
                style={{ fontWeight: 500 }}
              >
                {item.title}
              </span>
              <span className="text-[#C5181B33]">•</span>
              {item.time && (
                <span
                  className="text-[clamp(10px,0.7vw,12px)] text-[#C5181B66]"
                  style={{ fontWeight: 400 }}
                >
                  {item.time}
                </span>
              )}
            </div>

            {item.level && (
              <div
                className=" text-[clamp(10px,0.7vw,12px)] text-[#C5181B]"
                style={{ fontWeight: 500 }}
              >
                {item.level}
              </div>
            )}
          </div>

          <div
            className="text-right flex flex-col gap-1.5"
            style={{ fontWeight: 400 }}
          >
            {item.pnl && (
              <div className="text-[clamp(10px,0.7vw,12px)] text-[#C5181B]">
                Daily P&amp;L: {item.pnl}
              </div>
            )}
            {item.note && (
              <div className=" text-[clamp(10px,0.7vw,12px)] text-[#C5181B66]">
                {item.note}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DailyJournalCard({ item }: { item: FeedItem }) {
  return (
    <div className="px-7">
      <div
        className="w-full rounded-[16px] p-[1px]"
        style={{
          background:
            "linear-gradient(90.71deg, rgba(218, 89, 111, 0.2) 0%, rgba(226, 139, 139, 0.2) 100%)",
          boxShadow: "0px 0px 8px 0px rgba(218, 89, 111, 0.25)",
        }}
      >
        <div
          className="w-full rounded-[15px] p-3"
          style={{
            background:
              "linear-gradient(90.45deg, rgba(218, 89, 111, 0.2) 0%, rgba(226, 139, 139, 0.2) 100%)",
          }}
        >
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span
              className="text-[clamp(10px,0.7vw,12px)] uppercase text-[#DA596F]"
              style={{ fontWeight: 500 }}
            >
              {item.title}
            </span>

            {item.journalDate && (
              <>
                <span className="text-[#E28B8B33]">•</span>
                <span
                  className="text-[clamp(10px,0.7vw,12px)] text-[#E28B8B66]"
                  style={{ fontWeight: 400 }}
                >
                  {item.journalDate}
                </span>
              </>
            )}
          </div>

          <div className="grid grid-cols-[minmax(0,1.08fr)_1px_minmax(320px,0.92fr)] items-start gap-6">
            <p
              className="text-[clamp(10px,0.7vw,12px)] text-[#E28B8B]"
              style={{ fontWeight: 400 }}
            >
              {item.text}
            </p>

            <div className="h-full min-h-[100px] w-px bg-[#E28B8B1F]" />

            {!!item.journalBullets?.length && (
              <ul className="space-y-3  mt-2 text-[clamp(10px,0.7vw,12px)] text-[#E28B8B99]">
                {item.journalBullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 leading-[1.45]"
                  >
                    <span className="mt-[4px] w-2 h-2 rounded-full bg-[#E28B8B99] shadow-[0_0_10px_#E28B8B66]" />
                    <span
                      className="text-[#E28B8B99] text-[clamp(10px,0.7vw,12px)] "
                      style={{ fontWeight: 200 }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PositionUpdateCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex justify-center">
      <div
        className="max-w-[min(60%,620px)] rounded-[16px] px-4 py-3"
        style={{
          background: "rgba(35, 5, 14, 0.7)",
          border: "1px solid rgba(201, 71, 104, 0.2)",
        }}
      >
        <div
          className="text-[12px] uppercase text-[#D96A81]"
          style={{ fontWeight: 600 }}
        >
          {item.title}
        </div>
        <div className="mt-2 text-[14px] text-[#E1B099]">{item.text}</div>
      </div>
    </div>
  );
}

function TradePlanCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex justify-end px-7">
      <div
        className="w-[360px] rounded-[20px] px-4 py-4"
        style={{
          background: "rgba(73, 12, 21, 0.30)",
          border: "1px solid rgba(201, 71, 104, 0.18)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className="text-[12px] uppercase text-[#D96A81]"
            style={{ fontWeight: 600 }}
          >
            {item.title}
          </div>
          <div className="text-[12px] text-[#8C5560]">{item.time}</div>
        </div>

        <div
          className="mt-3 text-[18px] text-[#F6C1CC]"
          style={{ fontWeight: 600 }}
        >
          {item.symbol}
        </div>
        <div className="mt-1 text-[14px] text-[#C89592]">{item.quantity}</div>

        <div className="mt-5 space-y-3 text-[14px] text-[#E1B099]">
          <TradeRow label="Entry" value={item.entry} extra="Market" />
          <TradeRow label="Stop" value={item.stop} extra="Below swing low" />
          <TradeRow label="Target" value={item.target} />
          <TradeRow
            label="R:R"
            value={item.rr}
            extra={`Risk ${item.risk || ""}`}
          />
        </div>

        {item.reason && (
          <p className="mt-5 border-t border-[#FFFFFF12] pt-4 text-[13px] leading-[1.45] text-[#8C5560]">
            “{item.reason}”
          </p>
        )}
      </div>
    </div>
  );
}

function TradeExecutedCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex justify-end px-7">
      <div
        className="max-w-[min(62%,700px)] rounded-[12px] p-3"
        style={{
          background: "#25DB170A",
          border: "1px solid #25DB1733",
        }}
      >
        <div
          className="flex flex-wrap items-center gap-2 text-[clamp(10px,0.7vw,12px)] uppercase text-[#25DB1799]"
          style={{ fontWeight: 500 }}
        >
          <span>{item.title}</span>
          <span className="text-[#25DB1733]">•</span>
          {item.time && (
            <span className="text-[#25DB1766]" style={{ fontWeight: 400 }}>
              {" "}
              {item.time}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[clamp(10px,0.7vw,12px)] text-[#F2AEA1]">
          <span style={{ fontWeight: 500 }}>{item.symbol}</span>
          <span className="text-[#25DB1733]">•</span>
          {item.side && <span className="text-[#F2AEA1]"> {item.side}</span>}
          <span className="text-[#25DB1733]">•</span>
          {item.quantity && (
            <span className="text-[#F2AEA199]"> {item.quantity}</span>
          )}
        </div>

        <div
          className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#F2AEA166]"
          style={{ fontWeight: 400 }}
        >
          {item.entry && (
            <span>
              Entry <b className="text-[#F2AEA1]">{item.entry}</b>
            </span>
          )}
          {item.stop && (
            <span>
              SL <b className="text-[#F2AEA1]">{item.stop}</b>
            </span>
          )}
          {item.risk && (
            <span>
              Risk <b className="text-[#F2AEA1]">{item.risk}</b>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function TradeClosedCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex justify-end px-7">
      <div
        className="w-[360px] rounded-[16px] p-4"
        style={{
          background: "#C5181B0A",
          border: "1px solid #C5181B33",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className="text-[clamp(10px,0.7vw,12px)] uppercase text-[#C5181B99]"
            style={{ fontWeight: 500 }}
          >
            {item.title}
          </div>
          <div
            className="text-[clamp(10px,0.7vw,12px)] text-[#C5181B66]"
            style={{ fontWeight: 400 }}
          >
            {item.time}
          </div>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <div
              className="text-[16px] text-[#F2AEA1]"
              style={{ fontWeight: 500 }}
            >
              {item.symbol}
            </div>
            <div
              className="mt-1 text-[clamp(10px,0.7vw,12px)] text-[#F2AEA199]"
              style={{ fontWeight: 500 }}
            >
              {item.quantity}
            </div>
          </div>

          {item.pnl && (
            <div
              className="text-[16px] text-[#C5181B]"
              style={{ fontWeight: 500 }}
            >
              {item.pnl}
            </div>
          )}
        </div>

        <div className="mt-5 space-y-3 text-[clamp(10px,0.7vw,12px)] text-[#F2AEA166]">
          <TradeRow label="Entry" value={item.entry} />
          <TradeRow label="Exit" value={item.exit} extra="(stopped out)" />
          <TradeRow label="Hold" value={item.holdTime} />
        </div>

        {item.reason && (
          <p
            className="mt-5 border-t border-[#C5181B1F] pt-4 text-[clamp(10px,0.7vw,12px)] text-[#C5181B66] "
            style={{ fontWeight: 400 }}
          >
            {item.reason}
          </p>
        )}
      </div>
    </div>
  );
}

function TradeSkippedCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex justify-end px-7">
      <div
        className="max-w-[min(76%,960px)] rounded-[16px] p-3"
        style={{
          // background: "rgba(35, 5, 14, 0.55)",
          border: "1px solid #DA596F33",
        }}
      >
        <div
          className="flex flex-wrap items-center gap-2 text-[clamp(10px,0.7vw,12px)] uppercase text-[#DA596F99]"
          style={{ fontWeight: 500 }}
        >
          <span>{item.title}</span>
          {item.symbol && <span className="text-[#F2AEA1]">{item.symbol}</span>}
          <span className="text-[#DA596F33]">•</span>

          {item.side && <span className="text-[#F2AEA199]"> {item.side}</span>}
        </div>

        {item.text && (
          <p
            className="mt-4 text-[13px]  text-[#F2AEA1]"
            style={{ fontWeight: 400 }}
          >
            {item.text}
          </p>
        )}

        {item.reason && (
          <p className=" mt-2 border-t border-[#DA596F1F] pt-2 text-[12px] text-[#DA596F66]">
            {item.reason}
          </p>
        )}
      </div>
    </div>
  );
}

function InstrumentOverviewCard({ item }: { item: FeedItem }) {
  return (
    <div className="px-7">
      <div
        className="w-full rounded-[16px] p-[1px]"
        style={{
          // background:
          //   "linear-gradient(90.71deg, rgba(218, 89, 111, 0.2) 0%, rgba(226, 139, 139, 0.2) 100%)",
          boxShadow: "0px 0px 8px 0px rgba(218, 89, 111, 0.25)",
        }}
      >
        <div className="w-full">
          <div
            className="rounded-[20px] px-4 py-4"
            style={{
              background: "#6E0B280F",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-[clamp(10px,0.7vw,12px)]">
                <span className=" text-[#DA596F]" style={{ fontWeight: 500 }}>
                  {item.title}
                </span>
                {/* #DA596F33 */}
                <span className="text-[#DA596F33]">•</span>
                {item.subtitle && (
                  <span className=" text-[#DA596F66]"> {item.subtitle}</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[clamp(10px,0.7vw,12px)]">
                {item.score && (
                  <span className="text-[#DA596F66]">
                    Score{" "}
                    <b
                      className=""
                      style={{
                        fontWeight: 500,
                        color:
                          item.grade == "MODERATE"
                            ? "#DEAE10"
                            : item.grade == "HIGH"
                              ? "#25DB17"
                              : "#C5181B",
                      }}
                    >
                      {item.score}
                    </b>
                  </span>
                )}
                <span className="text-[#DA596F33]">•</span>
                {item.grade && (
                  <span
                    className="text-[#25DB17]"
                    style={{
                      fontWeight: 500,
                      color:
                        item.grade == "MODERATE"
                          ? "#DEAE10"
                          : item.grade == "HIGH"
                            ? "#25DB17"
                            : "#C5181B",
                    }}
                  >
                    {item.grade}
                  </span>
                )}
                <span className="text-[#DA596F33]">•</span>
                {item.actionLabel && (
                  <span
                    className="rounded-[4px] px-2 py-1 text-[12px]"
                    style={{
                      background:
                        item.actionLabel == "ENTER" ? "#25DB1729" : "#C5181B29",
                      color:
                        item.actionLabel == "ENTER" ? "#25DB17" : "#C5181B",
                      fontWeight: 500,
                    }}
                  >
                    {item.actionLabel}
                  </span>
                )}
              </div>
            </div>

            {!!item.metrics?.length && (
              <div className="mt-4 grid gap-3 md:grid-cols-5">
                {item.metrics.map((metric, index) => (
                  <MetricCard key={index} metric={metric} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CycleCard({ item }: { item: FeedItem }) {
  const [expanded, setExpanded] = useState(false);

  const visibleUpdates = expanded
    ? item.cycleUpdates || []
    : item.cycleUpdates?.slice(0, 1) || [];

  return (
    <div className="px-7">
      <div
        className="w-full rounded-[8px] p-3"
        style={{
          border: "1px solid #E28B8B33",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div
              className="text-[clamp(10px,0.7vw,12px)] text-[#E28B8B]"
              style={{ fontWeight: 500 }}
            >
              {item.cycleWindow}
            </div>
            <div
              className="mt-2 text-[clamp(10px,0.7vw,12px)] text-[#E28B8B]"
              style={{ fontWeight: 200 }}
            >
              6 quiet cycles
            </div>
          </div>

          <div className="max-w-[70%] text-right text-[clamp(10px,0.7vw,12px)] text-[#E28B8B]">
            {item.cycleSummary}
            {!!item.cycleUpdates?.length && item.cycleUpdates.length > 1 && (
              <div
                className="mt-2 cursor-pointer text-right text-[clamp(10px,0.7vw,12px)] text-[#DA596FCC] underline underline-offset-4"
                style={{ fontWeight: 400 }}
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "See less" : "See all cycles"}
              </div>
            )}
          </div>
        </div>

        {!!visibleUpdates.length && (
          <div className="mt-5 space-y-3">
            {visibleUpdates.map((update, index) => {
              const parts = update.split("—");
              const time = parts[0]?.trim();
              const text = parts.slice(1).join("—").trim();

              return (
                <div
                  key={index}
                  className="grid grid-cols-[90px_1fr] gap-4 pb-2 text-[clamp(10px,0.7vw,12px)]"
                >
                  <div className="text-[#E28B8B99]" style={{ fontWeight: 500 }}>
                    {time}
                  </div>
                  <div
                    className="text-right text-[#E28B8B99]"
                    style={{ fontWeight: 200 }}
                  >
                    {text}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TradeRow({
  label,
  value,
  extra,
}: {
  label: string;
  value?: string;
  extra?: string;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 border-b last:border-none border-[#C5181B0A] pb-2"
      style={{ fontWeight: 400 }}
    >
      <span className="text-[#F2AEA166]">{label}</span>
      <div className="text-right">
        {value && <span className="text-[#F2AEA1]">{value}</span>}
        {extra && <span className="ml-2 text-[#F2AEA166]">{extra}</span>}
      </div>
    </div>
  );
}

function MetricCard({
  metric,
}: {
  metric: { label: string; value: string; tone: "green" | "yellow" | "red" };
}) {
  const toneMap = {
    green: {
      card: "#25DB171F",
      text: "#25DB17CC",
      bar: "#25DB1799",
      barbackbg: "#25DB1729",
    },
    yellow: {
      card: "#DEAE101F",
      text: "#DEAE10CC",
      bar: "#DEAE1099",
      barbackbg: "#DEAE1029",
    },
    red: {
      card: "#C5181B1F",
      text: "#C5181BCC",
      bar: "#C5181B99",
      barbackbg: "#C5181B29",
    },
  };

  const tone = toneMap[metric.tone];

  return (
    <div
      className="rounded-[8px] p-3"
      style={{
        background: tone.card,
      }}
    >
      <div
        className="text-[11px] uppercase"
        style={{ color: tone.text, fontWeight: 600 }}
      >
        {metric.label}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div
          className="h-[8px] flex-1 overflow-hidden rounded-full"
          style={{ background: tone.barbackbg }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "58%",
              background: tone.bar,
            }}
          />
        </div>

        <div
          className="shrink-0 text-[14px]"
          style={{ color: tone.text, fontWeight: 600 }}
        >
          {metric.value}
        </div>
      </div>
    </div>
  );
}
