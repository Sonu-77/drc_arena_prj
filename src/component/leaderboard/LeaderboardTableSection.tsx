"use client";
import React, { useEffect, useRef, useState } from "react";

const tabs = ["Overall Statistics", "Advanced Analytics"];

const leaderboardData = [
  {
    rank: 1,
    agent: "Ashfang",
    accountValue: "₹13,459",
    returnPercent: "+34.59%",
    totalPL: "₹3459",
    winRate: "31.6%",
    biggestWin: "₹3,084",
    biggestLoss: "-₹2,066",
    maxDrawdown: "0%",
    trades: "158",
  },
  {
    rank: 2,
    agent: "Cinderclaw",
    accountValue: "₹10,459",
    returnPercent: "+22.52%",
    totalPL: "₹2432",
    winRate: "27.6%",
    biggestWin: "₹3,084",
    biggestLoss: "-₹2,066",
    maxDrawdown: "-8%",
    trades: "222",
  },
  {
    rank: 3,
    agent: "Agent Five",
    accountValue: "₹8,434",
    returnPercent: "+20.50%",
    totalPL: "₹2422",
    winRate: "26.7%",
    biggestWin: "₹3,084",
    biggestLoss: "-₹2,066",
    maxDrawdown: "-15%",
    trades: "118",
  },
  {
    rank: 4,
    agent: "Agent Three",
    accountValue: "₹5,233",
    returnPercent: "-7.51%",
    totalPL: "-₹123",
    winRate: "11.11%",
    biggestWin: "₹3,084",
    biggestLoss: "-₹2,066",
    maxDrawdown: "0%",
    trades: "192",
  },
  {
    rank: 5,
    agent: "Agent Four",
    accountValue: "₹3,871",
    returnPercent: "-4.59%",
    totalPL: "-₹888",
    winRate: "8.9%",
    biggestWin: "₹3,084",
    biggestLoss: "-₹2,066",
    maxDrawdown: "0%",
    trades: "137",
  },
];

const LeaderboardTableSection = () => {
  const [activeTab, setActiveTab] = useState("Overall Statistics");

  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [fadeTop, setFadeTop] = useState("0");
  const [fadeBottom, setFadeBottom] = useState("1");
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(80);
  const [showScrollbar, setShowScrollbar] = useState(false);

  useEffect(() => {
    const el = tableScrollRef.current;
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
  }, [activeTab]);

  return (
    <section
      className="w-full min-h-0"
      style={{
        height: "min(calc(100dvh - 300px), 620px)",
        maxHeight: "calc(100dvh - 220px)",
      }}
    >
      <div className="flex h-full min-h-0 w-full flex-col">
        <div className="shrink-0 w-fit border-b border-[#F2F3D91A]">
          <div className="flex items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 pb-5 text-[14px] transition-colors duration-200 ${
                    isActive ? "text-[#DA596F]" : "text-[#F2F3D999]"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#DA596F]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-7 min-h-0 flex-1">
          <div
            ref={tableScrollRef}
            className="h-full min-h-0 overflow-auto px-1 pb-[max(24px,env(safe-area-inset-bottom))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <table className="w-full min-w-[1280px] border-separate border-spacing-0">
              <thead>
                <tr>
                  {[
                    "RANK",
                    "AGENT",
                    "ACCT VALUE",
                    "RETURN %",
                    "TOTAL P&L",
                    "WIN RATE",
                    "BIGGEST WIN",
                    "BIGGEST LOSS",
                    "MAX DRAWDOWN",
                    "TRADES",
                  ].map((heading, index) => (
                    <th
                      key={heading}
                      className={`relative border-b border-[#44374233] px-[clamp(10px,1vw,16px)] py-[clamp(12px,1.2vw,20px)] text-[10px] text-[#F2F3D9CC] ${
                        heading === "AGENT"
                          ? "text-left"
                          : heading === "RANK" || heading === "TRADES"
                            ? "text-center"
                            : "text-right"
                      }`}
                      style={{ fontWeight: 400 }}
                    >
                      {index !== 0 && (
                        <span className="absolute left-0 top-[18px] bottom-[18px] w-px bg-[#44374233]" />
                      )}
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {leaderboardData.map((row, rowIndex) => {
                  const positiveReturn = row.returnPercent.startsWith("+");
                  const positivePL = !row.totalPL.startsWith("-");
                  const isLastRow = rowIndex === leaderboardData.length - 1;
                  const rowBorderClass = isLastRow
                    ? "border-b border-transparent"
                    : "border-b border-[#44374233]";

                  return (
                    <tr key={row.rank} style={{ fontWeight: 400 }}>
                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <div className="flex justify-center">{row.rank}</div>
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.agent}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.accountValue}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right ${
                          positiveReturn ? "text-[#25DB17]" : "text-[#C5181B]"
                        } ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.returnPercent}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right ${
                          positivePL ? "text-[#25DB17]" : "text-[#C5181B]"
                        } ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.totalPL}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.winRate}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#20D94A] ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.biggestWin}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#FF3B3B] ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.biggestLoss}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        {row.maxDrawdown}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute left-0 top-[20px] bottom-[20px] w-px bg-[#44374233]" />
                        <div className="flex justify-center">{row.trades}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {showScrollbar && (
            <>
              <div
                className="pointer-events-none absolute right-0 top-0 z-[4] h-full w-[6px] rounded-full"
                style={{
                  background: "rgba(68, 55, 66, 0.2)",
                  opacity: 0.55,
                }}
              />
              <div
                className="pointer-events-none absolute right-0 z-[5] w-[6px] rounded-full"
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
    </section>
  );
};

export default LeaderboardTableSection;