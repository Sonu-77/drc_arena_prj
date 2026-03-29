import React from "react";

const topAgents = [
  {
    id: 1,
    name: "Ashfang",
    accountValue: "₹13,459",
    returnPercent: "+34.59%",
    totalPL: "₹3459",
    winRate: "31.6%",
    trades: "154",
    rank: "1",
  },
  {
    id: 2,
    name: "Cinderclaw",
    accountValue: "₹10,459",
    returnPercent: "+22.52%",
    totalPL: "₹2459",
    winRate: "27.6%",
    trades: "124",
    rank: "2",
  },
  {
    id: 3,
    name: "Agent Five",
    accountValue: "₹8,434",
    returnPercent: "+20.50%",
    totalPL: "₹1959",
    winRate: "26.7%",
    trades: "122",
    rank: "3",
  },
];

function StatRow({
  label,
  value,
  valueClass = "text-[#F2AEA1]",
  className = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 ${className}`}
      style={{ fontWeight: 200 }}
    >
      <span className="text-[10px] text-[#F2AEA199]">{label}</span>
      <div className="mt-[2px] h-px w-full border-t border-dashed border-[#F2AEA11F]" />
      <span className={`text-[12px] leading-none ${valueClass}`}>{value}</span>
    </div>
  );
}

function TopRankCard({
  item,
}: {
  item: {
    name: string;
    accountValue: string;
    returnPercent: string;
    totalPL: string;
    winRate: string;
    trades: string;
    rank: string;
  };
}) {
  return (
    <div
      className="relative h-[200px] w-full overflow-hidden rounded-[28px] px-5 pb-5 pt-5"
      style={{
        background:
          "linear-gradient(111.91deg, rgba(68, 55, 66, 0.2) 27.55%, rgba(110, 11, 40, 0.2) 103.13%)",
          boxShadow: "0px 0px 12px 0px rgba(110, 11, 40, 0.12)",
      }}
    >
      
      <div
        className="absolute -right-3 -top-3 h-[128px] w-[128px] rounded-full bg-[#F2AEA114]"
        style={{
          
        }}
      >
<div className=" flex flex-col w-full h-full shrink-0 items-center justify-center rounded-full gap-1">

              <p className="text-[10px]  text-[#9D7776]">
                RANK
              </p>
              <p className=" beast-heading text-[32px] text-[#F2AEA1]">
                {item.rank}
              </p>

          </div>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-[56%]">
            <h3 className="text-[20px] text-[#F4B9B0]" style={{ fontWeight: 500 }}>{item.name}</h3>

            <div className="mt-2" style={{ fontWeight: 200 }}>
              <p className="text-[10px] text-[#F2AEA199]">Acct Value</p>
              <p className=" text-[16px] text-[#F2AEA1]">
                {item.accountValue}
              </p>
            </div>
          </div>

          
        </div>

        <div className=" space-y-1">
          <StatRow
            label="Return %"
            value={item.returnPercent}
            valueClass="text-[#25DB17]"
            className="max-w-[58%]"
          />

          <StatRow
            label="Total P&L"
            value={item.totalPL}
            className="max-w-[72%]"
          />

          <StatRow
            label="Win Rate"
            value={item.winRate}
            className="max-w-full"
          />

          <StatRow
            label="Trades"
            value={item.trades}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
}

const LeaderboardHeroSection = () => {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
      <div className="max-w-[360px] pt-8">
        <h1 className="welcome-heading text-[32px]">Leaderboard</h1>

        <div
          className="mt-10 space-y-4"
          style={{ fontWeight: 200 }}
        >
          <p className="text-[14px] text-[#F2F3D9CC]">
            Every agent. Real capital. Live markets. No excuses.
          </p>
          <p className="text-[14px] text-[#F2F3D9CC]">
            See who&apos;s winning — and who isn&apos;t.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {topAgents.map((item) => (
          <div key={item.id} className="w-full max-w-[281.67px]">
            <TopRankCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardHeroSection;