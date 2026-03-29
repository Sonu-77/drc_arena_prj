"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import JournalDateFilterPopover from "./JournalDateFilterPopover";

type DateRange = {
  from: Date;
  to: Date;
};

type JournalEntry = {
  id: string;
  displayDate: string;
  trades: number;
  wins: number;
  losses: number;
  pnl: number;
  mood: string;
  summary: string;
  lessons: string[];
  curiosity?: string;
};

type JournalOverviewSectionProps = {
  entries: JournalEntry[];
  selectedEntry: JournalEntry | null;
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
  selectedEntryId: string | null;
  setSelectedEntryId: Dispatch<SetStateAction<string | null>>;
  dateRange: DateRange;
  setDateRange: Dispatch<SetStateAction<DateRange>>;
};

type RightCard =
  | {
      id: string;
      title: string;
      size: "large";
      content: string[];
    }
  | {
      id: string;
      title: string;
      size: "small";
      content: string;
    };

const filterOptions = [
  { id: "all", label: "All days" },
  { id: "winning", label: "Winning days" },
  { id: "losing", label: "Losing days" },
];

const PANEL_HEIGHT = "clamp(360px, 41vw, 400px)";

const JournalOverviewSection = ({
  entries,
  selectedEntry,
  activeFilter,
  setActiveFilter,
  selectedEntryId,
  setSelectedEntryId,
  dateRange,
  setDateRange,
}: JournalOverviewSectionProps) => {
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const popoverWrapperRef = useRef<HTMLDivElement | null>(null);
  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const rightScrollRef = useRef<HTMLDivElement | null>(null);

  const [leftFadeTop, setLeftFadeTop] = useState("0");
  const [leftFadeBottom, setLeftFadeBottom] = useState("1");
  const [leftThumbTop, setLeftThumbTop] = useState(0);
  const [leftThumbHeight, setLeftThumbHeight] = useState(80);
  const [showLeftScrollbar, setShowLeftScrollbar] = useState(false);

  const [rightFadeTop, setRightFadeTop] = useState("0");
  const [rightFadeBottom, setRightFadeBottom] = useState("1");
  const [rightThumbTop, setRightThumbTop] = useState(0);
  const [rightThumbHeight, setRightThumbHeight] = useState(80);
  const [showRightScrollbar, setShowRightScrollbar] = useState(false);

  const rightCards = useMemo<RightCard[]>(() => {
    if (!selectedEntry) return [];

    return [
      {
        id: "lessons",
        title: "LESSONS",
        size: "large",
        content: selectedEntry.lessons,
      },
      ...(selectedEntry.curiosity
        ? [
            {
              id: "curiosity",
              title: "CURIOSITY FINDING",
              size: "small" as const,
              content: selectedEntry.curiosity,
            },
          ]
        : []),
    ];
  }, [selectedEntry]);

  useEffect(() => {
    const el = leftScrollRef.current;
    if (!el) return;

    const updateScrollUI = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const atTop = scrollTop <= 2;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
      const hasOverflow = scrollHeight > clientHeight + 2;

      if (!hasOverflow) {
        setLeftFadeTop("0");
        setLeftFadeBottom("0");
        setShowLeftScrollbar(false);
        return;
      }

      setLeftFadeTop(atTop ? "0" : "1");
      setLeftFadeBottom(atBottom ? "0" : "1");
      setShowLeftScrollbar(true);

      const visibleRatio = clientHeight / scrollHeight;
      const nextThumbHeight = Math.max(56, clientHeight * visibleRatio);
      const maxThumbTop = clientHeight - nextThumbHeight;
      const scrollableDistance = scrollHeight - clientHeight;
      const nextThumbTop =
        scrollableDistance > 0
          ? (scrollTop / scrollableDistance) * maxThumbTop
          : 0;

      setLeftThumbHeight(nextThumbHeight);
      setLeftThumbTop(nextThumbTop);
    };

    updateScrollUI();

    el.addEventListener("scroll", updateScrollUI);
    window.addEventListener("resize", updateScrollUI);

    return () => {
      el.removeEventListener("scroll", updateScrollUI);
      window.removeEventListener("resize", updateScrollUI);
    };
  }, [entries, activeFilter, selectedEntryId]);

  useEffect(() => {
    const el = rightScrollRef.current;
    if (!el) return;

    const updateScrollUI = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const atTop = scrollTop <= 2;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
      const hasOverflow = scrollHeight > clientHeight + 2;

      if (!hasOverflow) {
        setRightFadeTop("0");
        setRightFadeBottom("0");
        setShowRightScrollbar(false);
        return;
      }

      setRightFadeTop(atTop ? "0" : "1");
      setRightFadeBottom(atBottom ? "0" : "1");
      setShowRightScrollbar(true);

      const visibleRatio = clientHeight / scrollHeight;
      const nextThumbHeight = Math.max(56, clientHeight * visibleRatio);
      const maxThumbTop = clientHeight - nextThumbHeight;
      const scrollableDistance = scrollHeight - clientHeight;
      const nextThumbTop =
        scrollableDistance > 0
          ? (scrollTop / scrollableDistance) * maxThumbTop
          : 0;

      setRightThumbHeight(nextThumbHeight);
      setRightThumbTop(nextThumbTop);
    };

    updateScrollUI();

    el.addEventListener("scroll", updateScrollUI);
    window.addEventListener("resize", updateScrollUI);

    return () => {
      el.removeEventListener("scroll", updateScrollUI);
      window.removeEventListener("resize", updateScrollUI);
    };
  }, [selectedEntry, rightCards]);

  useEffect(() => {
    if (!isDatePopoverOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (
        popoverWrapperRef.current &&
        !popoverWrapperRef.current.contains(target)
      ) {
        setIsDatePopoverOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDatePopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDatePopoverOpen]);

  return (
    <section
      className="relative w-full overflow-visible rounded-[28px] border border-[rgba(68,55,66,0.12)]"
      style={{
        minHeight: PANEL_HEIGHT,
        padding: "20px 8px 20px 20px",
        background: "#44374233",
        // backdropFilter: "blur(16px)",
        // WebkitBackdropFilter: "blur(16px)",
        // boxShadow:
        // "0 0 0 1px rgba(255,255,255,0.02) inset, 0 12px 40px rgba(0,0,0,0.28)",
      }}
    >
      <div className="grid min-h-0 gap-0 xl:grid-cols-[minmax(420px,386px)_minmax(0,1fr)]">
        <div className="min-w-0 pr-[clamp(14px,1.6vw,20px)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex flex-wrap gap-[clamp(10px,1vw,16px)]">
              {filterOptions.map((option) => {
                const isActive = activeFilter === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveFilter(option.id)}
                    className={[
                      "inline-flex items-center justify-center rounded-[20px] border text-[clamp(11px,0.85vw,12px)] transition-all duration-200",
                      isActive
                        ? "border-[#F2AEA11F] bg-[#F2AEA114] text-[#F2AEA1]"
                        : "border-[#F2AEA11F] bg-[#F2AEA10A] text-[#F2AEA199]",
                    ].join(" ")}
                    style={{
                      fontWeight: 400,
                      padding: "6px 12px",
                      minHeight: "27px",
                      // boxShadow: isActive
                      //   ? "0 0 12px rgba(242,174,161,0.08)"
                      //   : "none",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div ref={popoverWrapperRef} className="relative ml-auto shrink-0">
              <button
                type="button"
                onClick={() => setIsDatePopoverOpen((prev) => !prev)}
                className="flex  items-center justify-center "
              >
                <img
                  src={
                    isDatePopoverOpen
                      ? "/arenaIcons/FilterIconSelected.svg"
                      : "/arenaIcons/FilterIcon.svg"
                  }
                  alt="Filter"
                  className="h-[24px] w-[24px] object-contain"
                />
              </button>

              {isDatePopoverOpen && (
                <JournalDateFilterPopover
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  onClose={() => setIsDatePopoverOpen(false)}
                />
              )}
            </div>
          </div>

          <div className="relative min-h-0" style={{ height: PANEL_HEIGHT }}>
            <div
              ref={leftScrollRef}
              className="h-full w-full overflow-y-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex min-h-full flex-col">
                {entries.length ? (
                  entries.map((item, index) => {
                    const isSelected = selectedEntryId === item.id;
                    const pnlColor =
                      item.pnl > 0
                        ? "text-[#25DB17]"
                        : item.pnl < 0
                          ? "text-[#C5181B]"
                          : "text-[#25DB17]";

                    return (
                      <React.Fragment key={item.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedEntryId(item.id)}
                          className={[
                            "w-full text-left transition-all duration-200",
                            isSelected
                              ? "rounded-[12px] border border-[#F2AEA11F] bg-[#F2AEA11F]"
                              : "rounded-[12px] border border-transparent bg-transparent hover:border-[rgba(242,174,161,0.08)] hover:bg-[rgba(242,174,161,0.04)]",
                          ].join(" ")}
                          style={{
                            padding: "12px",
                            boxShadow: isSelected
                              ? "0 0 8px rgba(68,55,66,0.40)"
                              : "none",
                          }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div
                                className="text-[clamp(11px,0.85vw,12px)] uppercase text-[#F2AEA199]"
                                style={{
                                  fontWeight: 400,
                                }}
                              >
                                {item.displayDate}
                              </div>

                              <div className="mt-2 flex flex-wrap items-center gap-2 text-[#F2AEA1]">
                                <span className="text-[clamp(12px,0.95vw,14px)]">
                                  {item.trades} Trades
                                </span>
                                <span className="text-[#F2AEA11F]">•</span>
                                <span
                                  className="text-[clamp(11px,0.85vw,12px)] text-[#F2AEA199]"
                                  style={{
                                    fontWeight: 200,
                                  }}
                                >
                                  {item.wins} W / {item.losses} L
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div
                                  className={`text-[clamp(12px,0.95vw,14px)] ${pnlColor}`}
                                  style={{ fontWeight: 400 }}
                                >
                                  {formatPnl(item.pnl)}
                                </div>
                                <div
                                  className="mt-2 text-[clamp(11px,0.85vw,12px)] text-[#F2AEA199]"
                                  style={{
                                    fontWeight: 200,
                                  }}
                                >
                                  {item.mood}
                                </div>
                              </div>

                              <span className="text-[24px]  text-[#F2AEA166]">
                                ›
                              </span>
                            </div>
                          </div>
                        </button>

                        {index !== entries.length - 1 && (
                          <div className="mx-0 my-4 h-px bg-[#F2AEA114]" />
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div className="rounded-[20px] border border-[rgba(242,174,161,0.12)] bg-[rgba(68,55,66,0.20)] p-4 text-[14px] text-[#B68C89]">
                    No entries found for the selected filters.
                  </div>
                )}
              </div>
            </div>

            {showLeftScrollbar && (
              <>
                <div className="pointer-events-none absolute right-0 top-0 z-[4] h-full w-[4px] rounded-full" />
                <div
                  className="pointer-events-none absolute right-0 z-[5] w-[4px] rounded-full"
                  style={{
                    top: `${leftThumbTop}px`,
                    height: `${leftThumbHeight}px`,
                    background: "rgba(68, 55, 66, 0.2)",
                  }}
                />
              </>
            )}

            {/* Left panel fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-4 z-[3] rounded-[12px] overflow-hidden ">
              <div
                className="absolute left-0 right-0 top-0 h-[40px]"
                style={{
                  // background: linear-gradient(180deg, rgba(24, 17, 19, 0) 0%, #181012 100%);

                  background: "44374266",
                  opacity: leftFadeTop === "1" ? 0.7 : 0,
                  transition: "opacity 180ms ease",
                }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 h-[40px] rounded-[12px] "
                style={{
                  background: "44374266",
                  opacity: leftFadeBottom === "1" ? 0.7 : 0,
                  transition: "opacity 180ms ease",
                }}
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 border-l border-[#44374266] pl-[clamp(18px,1.8vw,28px)] pr-4">
          {selectedEntry ? (
            <div
              className="flex min-h-0 flex-col"
              style={{ height: PANEL_HEIGHT }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-[clamp(13px,0.95vw,14px)] text-[#F2AEA1]">
                  <span className="uppercase" style={{ fontWeight: 200 }}>
                    {selectedEntry.displayDate}
                  </span>
                  <span className="text-[#F2AEA11F]">•</span>
                  <span className=" text-[#F2AEA1]" style={{ fontWeight: 400 }}>
                    {selectedEntry.trades} Trades
                  </span>
                  <span className="text-[#F2AEA11F]">•</span>
                  <span
                    className="text-[#F2AEA199] "
                    style={{ fontWeight: 200 }}
                  >
                    {selectedEntry.wins} W / {selectedEntry.losses} L
                  </span>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span
                    className="text-[clamp(13px,0.95vw,14px)] text-[#F2AEA199]"
                    style={{ fontWeight: 200 }}
                  >
                    {selectedEntry.mood}
                  </span>
                  <span className="text-[#F2AEA11F]">•</span>
                  <span
                    style={{ fontWeight: 400 }}
                    className={`text-[clamp(13px,0.95vw,14px)] ${
                      selectedEntry.pnl > 0
                        ? "text-[#25DB17]"
                        : selectedEntry.pnl < 0
                          ? "text-[#C5181B]"
                          : "text-[#25DB17]"
                    }`}
                  >
                    {formatPnl(selectedEntry.pnl)}
                  </span>
                </div>
              </div>

              <div
                className="mt-5 text-[clamp(11px,0.85vw,12px)] text-[#F2F3D9CC]"
                style={{
                  fontWeight: 200,
                }}
              >
                {selectedEntry.summary}
              </div>

              <div className="relative mt-5 min-h-0 flex-1">
                <div
                  ref={rightScrollRef}
                  className="h-full w-full overflow-y-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div className="grid items-start gap-5 pr-[2px] xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)]">
                    {rightCards.map((card) =>
                      card.size === "large" ? (
                        <div
                          key={card.id}
                          className="rounded-[12px] border p-3"
                          style={{
                            borderColor: "#4437421F",
                            background: "#44374233",
                            // boxShadow: "0 0 8px rgba(68,55,66,0.40)",
                          }}
                        >
                          <h3 className="mb-4 text-[10px] text-[#F2F3D999]">
                            {card.title}
                          </h3>

                          <ul className="list-none space-y-2 m-0 p-0">
                            {card.content.map((point, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-[10px] text-[#F2F3D9CC]"
                              >
                                <span className="mt-[4px] h-2 w-2 shrink-0 rounded-full bg-[#F2F3D999] shadow-[0_0_10px_#F2F3D966]" />
                                <span
                                  style={{
                                    fontWeight: 200,
                                  }}
                                >
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div
                          key={card.id}
                          className="rounded-[12px] border p-3"
                          style={{
                            borderColor: "#4437421F",
                            background: "#44374233",
                          }}
                        >
                          <h3
                            className="mb-3 text-[10px] text-[#F2F3D999]"
                            style={{
                              fontWeight: 400,
                            }}
                          >
                            {card.title}
                          </h3>

                          <p
                            className="text-[10px] text-[#F2F3D9CC]"
                            style={{
                              fontWeight: 200,
                            }}
                          >
                            {card.content}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {showRightScrollbar && (
                  <>
                    <div
                      className="pointer-events-none absolute right-0 top-0 z-[4] h-full w-[4px] rounded-full"
                      style={{ background: "rgba(86, 62, 68, 0.32)" }}
                    />
                    <div
                      className="pointer-events-none absolute right-0 z-[5] w-[4px] rounded-full"
                      style={{
                        top: `${rightThumbTop}px`,
                        height: `${rightThumbHeight}px`,
                        background: "rgba(111, 84, 90, 0.92)",
                      }}
                    />
                  </>
                )}

                <div
                  className="pointer-events-none absolute left-0 right-0 top-0 z-[3] h-[60px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,7,12,0.96) 0%, rgba(20,7,12,0) 100%)",
                    opacity: rightFadeTop === "1" ? 1 : 0,
                    transition: "opacity 180ms ease",
                  }}
                />

                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-[60px]"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(20,7,12,0.96) 0%, rgba(20,7,12,0) 100%)",
                    opacity: rightFadeBottom === "1" ? 1 : 0,
                    transition: "opacity 180ms ease",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-[24px] border border-[rgba(242,174,161,0.12)] bg-[rgba(68,55,66,0.20)] p-4 text-[14px] text-[#B68C89]">
              No details available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function formatPnl(value: number): string {
  if (value > 0) return `+₹${value.toLocaleString("en-IN")}`;
  if (value < 0) return `-₹${Math.abs(value).toLocaleString("en-IN")}`;
  return "+₹0";
}

export default JournalOverviewSection;
