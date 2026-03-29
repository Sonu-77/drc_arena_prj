"use client";

import React, { useEffect, useRef, useState } from "react";

const headers = [
  "S.NO",
  "SYMBOL",
  "STATUS",
  "DATE",
  "ENTRY PRICE",
  "EXIT PRICE",
  "NET P&L",
  "NET ROI",
  "OPEN TIME",
  "CLOSE TIME",
  "DURATION",
  "POINTS",
];

type TradeRow = {
  id: number | string;
  symbol: string;
  status: string;
  date: string;
  entryPrice: string;
  exitPrice: string;
  netPnl: string;
  netRoi: string;
  openTime: string;
  closeTime: string;
  duration: string;
  points: string;
};

type JournalTradeLogSectionProps = {
  rows: TradeRow[];
};

const JournalTradeLogSection = ({ rows }: JournalTradeLogSectionProps) => {
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
  }, [rows]);

  return (
    <section
      className="w-full min-h-0 pt-3"
      style={{
        height: "min(calc(100dvh - 300px), 620px)",
        maxHeight: "calc(100dvh - 220px)",
      }}
    >
      <div className="flex h-full min-h-0 w-full flex-col">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mb-8 h-px w-[80%] bg-[#44374299]" />
        </div>

        <h2 className="mb-8 beast-heading text-[24px] leading-none text-[#F2F3D9]">
          Trade Log
        </h2>

        <div className="relative min-h-0 flex-1 overflow-hidden ">
          <div
            ref={tableScrollRef}
            className="h-full min-h-0 overflow-auto px-1 pb-[max(24px,env(safe-area-inset-bottom))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <table className="w-full min-w-[1450px] border-separate border-spacing-0">
              <thead>
                <tr>
                  {headers.map((header, index) => {
                    const isCenter = header === "S.NO" || header === "STATUS";
                    const isLeft = header === "SYMBOL" || header === "DATE";
                    const alignmentClass = isCenter
                      ? "text-center"
                      : isLeft
                        ? "text-left"
                        : "text-right";

                    return (
                      <th
                        key={header}
                        className={`relative border-b border-[#44374233] px-[clamp(10px,1vw,16px)] py-[clamp(12px,1.2vw,20px)] text-[10px] uppercase tracking-[0.04em] text-[#F2F3D9CC] ${alignmentClass}`}
                        style={{ fontWeight: 400 }}
                      >
                        {index !== 0 && (
                          <span className="absolute bottom-[18px] left-0 top-[18px] w-px bg-[#44374233]" />
                        )}
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIndex) => {
                  const isWin = row.status?.toLowerCase() === "win";
                  const pnlPositive = !String(row.netPnl)
                    .trim()
                    .startsWith("-");
                  const roiPositive = !String(row.netRoi)
                    .trim()
                    .startsWith("-");
                  const isLastRow = rowIndex === rows.length - 1;

                  const rowBorderClass = isLastRow
                    ? "border-b border-transparent"
                    : "border-b border-[#44374233]";

                  return (
                    <tr key={row.id} style={{ fontWeight: 400 }}>
                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <div className="flex justify-center">{row.id}</div>
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.symbol}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] ${isWin ? "text-[#25DB17]" : "text-[#FF3B3B]"} ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        <div className="flex justify-center">{row.status}</div>
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.date}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.entryPrice}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.exitPrice}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right ${pnlPositive ? "text-[#25DB17]" : "text-[#FF3B3B]"} ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.netPnl}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right ${roiPositive ? "text-[#25DB17]" : "text-[#FF3B3B]"} ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.netRoi}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.openTime}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.closeTime}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.duration}
                      </td>

                      <td
                        className={`relative px-[clamp(10px,1vw,16px)] py-[clamp(14px,1.4vw,24px)] text-[14px] text-right text-[#F2F3D9] ${rowBorderClass}`}
                      >
                        <span className="absolute bottom-[20px] left-0 top-[20px] w-px bg-[#44374233]" />
                        {row.points}
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

          {/* <div
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
          /> */}
        </div>
      </div>
    </section>
  );
};

export default JournalTradeLogSection;
