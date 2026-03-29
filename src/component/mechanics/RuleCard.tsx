import React from "react";

const CARD_THEME = {
  entry: {
    bg: "rgba(37, 219, 23, 0.04)",
    border: "rgba(37, 219, 23, 0.12)",
    chipBg: "#25DB171F",
    title: "#25DB17",
    text: "#25DB17CC",
    muted: "#25DB17CC",
    divider: "#25DB1714",
    dot: "#61DE0D",
    shadow: "0 0 40px rgba(37, 219, 23, 0.05)",
  },
  skip: {
    bg: "rgba(197, 24, 27, 0.04)",
    border: "rgba(197, 24, 27, 0.12)",
    chipBg: "#C5181B1F",
    title: "#C5181B",
    text: "#C5181BCC",
    muted: "#C5181BCC",
    divider: "rgba(197, 24, 27, 0.12)",
    shadow: "0 0 40px rgba(197, 24, 27, 0.05)",
  },
  position: {
    bg: "rgba(242, 174, 161, 0.04)",
    border: "rgba(242, 174, 161, 0.12)",
    chipBg: "#F2AEA11F",
    title: "#F2AEA1",
    text: "#D89A8F",
    muted: "rgba(242, 174, 161, 0.72)",
    divider: "rgba(242, 174, 161, 0.12)",
    shadow: "0 0 40px rgba(242, 174, 161, 0.04)",
  },
} as const;

type RulePoint = {
  text: string;
  applied: string;
  helpful: string;
  rate: string;
  since: string;
};

type RuleCardData = {
  type: "entry" | "skip" | "position";
  title: string;
  points?: RulePoint[];
  desc?: string;
  applied?: string;
  helpful?: string;
  rate?: string;
  since?: string;
};

const RuleCard = ({ data }: { data: RuleCardData }) => {
  const theme = CARD_THEME[data.type];
  const isEntry = data.type === "entry";

  return (
    <div
      className="rounded-[16px] border p-3"
      style={{
        background: theme.bg,
        borderColor: theme.border,
        // boxShadow: theme.shadow,
      }}
    >
      <div
        className="inline-flex items-center rounded-[8px] px-3 py-2"
        style={{ background: theme.chipBg }}
      >
        <span
          className="text-[clamp(11px,0.85vw,12px)] uppercase leading-none"
          style={{
            color: theme.title,
            fontWeight: 500,
          }}
        >
          {data.title}
        </span>
      </div>

      {isEntry ? (
        <div className="mt-5 space-y-5">
          {data.points?.map((point, index) => {
            const isLast = index === data.points.length - 1;

            return (
              <div key={index}>
                <div className="flex items-start gap-4">
                  <span
                    className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      background: theme.dot,
                      boxShadow: `0 0 10px ${theme.dot}`,
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[clamp(11px,0.85vw,12px)]"
                      style={{
                        color: theme.text,
                        fontWeight: 400,
                      }}
                    >
                      {point.text}
                    </p>

                    <div
                      className="mt-1 flex flex-wrap items-center gap-2 text-[clamp(11px,0.85vw,12px)]"
                      style={{
                        color: theme.muted,
                        fontWeight: 200,
                      }}
                    >
                      <span>Applied {point.applied}</span>
                      <span className="opacity-60">•</span>
                      <span>Helpful {point.helpful}</span>
                      <span className="opacity-60">•</span>
                      <span>Rate: {point.rate}</span>
                      <span className="opacity-60">•</span>
                      <span>Since {point.since}</span>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div
                    className="mt-3 h-px w-full"
                    style={{ background: theme.divider }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          <p
            className="max-w-[95%] text-[clamp(11px,0.85vw,12px)]"
            style={{
              color: theme.text,
              fontWeight: 400,
            }}
          >
            {data.desc}
          </p>

          <div
            className="mt-8 grid grid-cols-2 gap-2 text-[clamp(11px,0.85vw,12px)]"
            style={{
              color: theme.muted,
              fontWeight: 400,
            }}
          >
            <span>{`Applied ${data.applied}`}</span>
            <span className="text-right">{`Helpful ${data.helpful}`}</span>
            <span>{`Rate: ${data.rate}`}</span>
            <span className="text-right">{`Since ${data.since}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleCard;