import React from "react";

type CapitalSizingItem = {
  label: string;
  value: string;
};

type CircuitBreakerItem = {
  level: string;
  value: string;
  desc: string;
};

type RiskManagementData = {
  capitalAndSizing: CapitalSizingItem[];
  circuitBreakers: CircuitBreakerItem[];
  hardRules: string[];
};

const RiskManagementSection = ({ data }: { data: RiskManagementData }) => {
  return (
    <section>
      <h2 className="beast-heading text-[24px] leading-none text-[#F2F3D9]">
        Risk Management
      </h2>

      <div className="mt-8 border-b border-[#44374266] pb-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_1.45fr_1fr]">
          {/* COLUMN 1 */}
          <div className="xl:pr-8">
            <h3
              className="text-[clamp(13px,0.95vw,14px)] uppercase text-[#F2F3D9]"
              style={{ fontWeight: 400 }}
            >
              CAPITAL & POSITION SIZING
            </h3>

            <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8">
              {data.capitalAndSizing.map((item) => (
                <div key={item.label}>
                  <p
                    className="text-[10px] text-[#F2F3D999]"
                    style={{ fontWeight: 400 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="mt-2 text-[clamp(11px,0.85vw,12px)] text-[#F2F3D9CC]"
                    style={{ fontWeight: 400 }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="border-t border-[#44374233] pt-8 xl:border-l xl:border-t-0 xl:border-r xl:border-[#44374233] xl:px-8 xl:pt-0">
            <h3
              className="text-[clamp(13px,0.95vw,14px)] uppercase text-[#F2F3D9]"
              style={{ fontWeight: 400 }}
            >
              PROGRESSIVE CIRCUIT BREAKERS
            </h3>

            <div className="mt-8 space-y-5">
              {data.circuitBreakers.map((item) => (
                <div
                  key={item.level}
                  className="flex flex-wrap items-center gap-2"
                >
                  <span
                    className="rounded-[4px] bg-[#44374266] px-2 py-1 text-[10px] uppercase leading-none text-[#F2F3D9]"
                    style={{ fontWeight: 200 }}
                  >
                    {item.level}
                  </span>

                  <span className="text-[#F2F3D91F]">•</span>

                  <span
                    className="text-[clamp(11px,0.85vw,12px)] text-[#C5181BCC]"
                    style={{ fontWeight: 200 }}
                  >
                    {item.value}
                  </span>

                  <span className="text-[#F2F3D91F]">•</span>

                  <span
                    className="text-[clamp(11px,0.85vw,12px)] text-[#F2F3D9CC]"
                    style={{ fontWeight: 400 }}
                  >
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="border-t border-[#44374233] pt-8 xl:pl-8 xl:pt-0 xl:border-t-0">
            <h3
              className="text-[clamp(13px,0.95vw,14px)] uppercase text-[#F2F3D9]"
              style={{ fontWeight: 400 }}
            >
              HARD RULES
            </h3>

            <ul className="mt-8 space-y-5">
              {data.hardRules.map((rule, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2F3D999] shadow-[0_0_10px_#F2F3D966]" />
                  <span
                    className="text-[clamp(11px,0.85vw,12px)] text-[#F2F3D9CC]"
                    style={{ fontWeight: 400 }}
                  >
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskManagementSection;
