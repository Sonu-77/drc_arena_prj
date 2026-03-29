import React from "react";
import LeaderboardHeroSection from "./LeaderboardHeroSection";
import LeaderboardTableSection from "./LeaderboardTableSection";


const LeaderBoardMain = () => {
  return (
   <section
  className="
    w-full
    overflow-hidden
    px-[clamp(20px,2.2vw,32px)]
    pt-[clamp(20px,2.2vw,32px)]
    pb-[max(clamp(24px,3vw,40px),env(safe-area-inset-bottom))]
  "
  style={{ minHeight: "100dvh" }}
>
  <div
    className="
      mx-auto
      flex
      min-h-0
      w-full
      max-w-[1360px]
      flex-col
      gap-[clamp(28px,2.4vw,40px)]
    "
    style={{
      minHeight: "calc(100dvh - clamp(32px, 3.6vw, 48px))",
    }}
  >
    <LeaderboardHeroSection />
    <LeaderboardTableSection />
  </div>
</section>
  );
};

export default LeaderBoardMain;