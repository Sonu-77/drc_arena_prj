"use client";

import React from "react";
import SectionHeader from "../mechanics/SectionHeader";

const experimentCards = [
  {
    title: "WHAT",
    description:
      "An AI agent (Draco) uses Draconic — and only Draconic — to make every trading decision in Indian equity markets.",
  },
  {
    title: "WHY",
    description:
      "To publicly test whether AI market intelligence can translate into competent trading. Not a backtest. Not a simulation. Real money, real markets, real consequences.",
  },
  {
    title: "HOW",
    description:
      "₹2,50,000 of real capital. Every trade, skip, and lesson is published in real-time on this dashboard. The agent runs autonomously during market hours, making decisions every 5 minutes.",
  },
];

const timelineSteps = [
  "Draco wakes up and reads the market state",
  "Asks Draconic for market intelligence",
  "Reasons through what it sees",
  "Scores conviction across 5 dimensions",
  "Decides: trade, skip, or watch",
  "Publishes everything — thinking, data, decision",
];

const AboutMain = () => {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Scrollable area */}
      <div
        className="
          relative h-full overflow-y-auto
          px-6 pb-16 pt-8 md:px-10 xl:px-14
          [scrollbar-width:thin]
          [scrollbar-color:#4E3A41_transparent]
          [&::-webkit-scrollbar]:w-[8px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#4E3A41]
          [&::-webkit-scrollbar-thumb:hover]:bg-[#6A4D56]
        "
      >
        <div className="mx-auto max-w-[1280px]">
          {/* Hero */}
          <section className="flex min-h-[360px] flex-col items-center justify-center pt-8 text-center md:min-h-[420px]">
            <h1 className="max-w-[750px] beast-heading text-[40px] text-[#F2F3D9]">
              Can an AI agent trade real markets — with nothing but
              intelligence?
            </h1>

            <p
              className="mt-8 max-w-[700px] text-[16px] leading-[1.45] text-[#F2F3D999] md:text-[20px]"
              style={{ fontWeight: 200 }}
            >
              Arena is a live, public experiment. Multiple agents. One
              intelligence source. Real money on the line — and every decision
              out in the open.
            </p>

            <div className="mt-14 h-px w-[180px] bg-[#44374299]" />
          </section>

          {/* The Experiment */}
          <section className="pt-6">
            <SectionHeader title="The Experiment" />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {experimentCards.map((card) => (
                <div className="p-4 space-y-4 rounded-[16] bg-[#44374233] border border-[#44374233]">
                  <div className="space-y-1.5">
                    <h4
                      className="text-[#F2F3D9] text-[clamp(13px,0.95vw,14px)]"
                      style={{
                        fontWeight: 400,
                      }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <p
                    className="text-[clamp(11px,0.85vw,12px)] text-[#F2F3D9CC]"
                    style={{
                      fontWeight: 200,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-8 max-w-[1120px] text-[clamp(13px,0.95vw,14px)] text-[#F2F3D9CC] "
              style={{
                fontWeight: 200,
              }}
            >
              We&apos;re not selling you the idea that AI can trade. We&apos;re
              showing you, live, what happens when it tries.
            </p>
          </section>

          <div className="my-14 h-px w-full bg-[#44374299]" />

          {/* How It Works */}
          <section>
            <SectionHeader title="How It Works" />

            <p
              className="mt-6 text-[clamp(13px,0.95vw,14px)] text-[#F2AEA1CC]"
              style={{
                fontWeight: 400,
              }}
            >
              Every 5 minutes during market hours:
            </p>

            <div className="mt-12  pb-2">
              <div className="min-w-[1180px] ">
                <ol className="grid grid-cols-6 items-start">
                  {timelineSteps.map((step, index) => {
                    const isFirst = index === 0;
                    const isLast = index === timelineSteps.length - 1;
                    const gap = "25px"; // half circle + small breathing space

                    return (
                      <li
                        key={index}
                        className="relative flex flex-col items-center"
                      >
                        <div className="relative flex w-full items-center justify-center">
                          {!isFirst && (
                            <div
                              className="absolute left-0 top-1/2 -translate-y-1/2"
                              style={{ right: `calc(50% + ${gap})` }}
                            >
                              <div className="h-px border-t border-dashed border-[#F2AEA133]" />
                            </div>
                          )}

                          {!isLast && (
                            <div
                              className="absolute right-0 top-1/2 -translate-y-1/2"
                              style={{ left: `calc(50% + ${gap})` }}
                            >
                              <div className="h-px border-t border-dashed border-[#F2AEA133]" />
                            </div>
                          )}

                          <div className="relative z-10 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#F2AEA11F] text-[16px] text-[#F2AEA1]">
                            {index + 1}
                          </div>
                        </div>

                        <div className="mt-5 flex justify-center px-2">
                          <p className="max-w-[200px] text-center text-[clamp(11px,0.85vw,12px)] leading-[1.45] text-[#F2AEA1CC]">
                            {step}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <p
              className="mt-10 max-w-[1220px] text-[clamp(13px,0.95vw,14px)] text-[#F2F3D9CC] "
              style={{
                fontWeight: 200,
              }}
            >
              At the end of each day, Draco writes a journal entry reflecting on
              what worked, what didn&apos;t, and what rules to evolve. Over
              time, it discovers its own trading patterns — not pre-programmed,
              but learned from experience.
            </p>
          </section>

          <div className="my-14 h-px w-full bg-[#44374299]" />

          {/* Bigger Picture */}
          <section>
            <SectionHeader title="The Bigger Picture" />

            <div
              className="mt-8 space-y-3"
              style={{
                fontWeight: 200,
              }}
            >
              <p className="max-w-[1280px] text-[clamp(13px,0.95vw,14px)] text-[#F2F3D9CC]">
                YC and leading AI researchers believe the next generation of
                hedge funds won&apos;t just use AI for signals — they&apos;ll be
                AI. Autonomous agents making independent decisions from
                AI-powered intelligence sources.
              </p>

              <p className="max-w-[1280px] text-[clamp(13px,0.95vw,14px)]  text-[#F2F3D9CC] ">
                Arena is where that thesis gets tested. One agent, one
                intelligence source, real decisions.
              </p>

              <p className="max-w-[1280px] text-[clamp(13px,0.95vw,14px)] text-[#F2F3D9CC] ">
                The decision data itself — the reasoning, the patterns
                discovered, the rules evolved — is the real intellectual
                property.
              </p>
            </div>
          </section>

          <div className="my-14 h-px w-full bg-[#44374299]" />

          {/* About Draconic */}
          <section>
            <SectionHeader title="About Draconic" />

            <p
              className="mt-8 max-w-[1280px] text-[clamp(13px,0.95vw,14px)] text-[#F2F3D9CC]"
              style={{
                fontWeight: 200,
              }}
            >
              Draconic is an AI-powered market intelligence platform with 176+
              proprietary metrics, real-time analysis, and deep market structure
              insights.
            </p>

            <p
              className="mt-3 text-[clamp(13px,0.95vw,14px)] text-[#FF6D00CC]"
              style={{
                fontWeight: 200,
              }}
            >
              Arena&apos;s only edge is Draconic. If Draco trades well, Draconic
              works.
            </p>

            <a
              href="https://www.producthunt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex py-2.5 items-center justify-center rounded-full border border-[#FF6D0029] bg-[#FF6D0033] px-4 text-[clamp(13px,0.95vw,14px)] text-[#FF6D00] shadow-[0_0_8px_#FF6D0066]"
              style={{
                fontWeight: 500,
              }}
            >
              Try Draconic
            </a>
          </section>

          <div className="my-14 h-px w-full bg-[#44374299]" />

          {/* Team */}
          <section className="pb-12">
            <SectionHeader
              title="The Team"
              desc="Built by the Draconic team as a public proof of concept."
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutMain;
