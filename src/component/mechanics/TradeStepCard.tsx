const TradeStepCard = ({ data }: any) => {
  return (
    <div
      className="rounded-[16px] p-[1px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(218, 89, 111, 0.4) 0%, rgba(242, 174, 161, 0.08) 100%)",
      }}
    >
      <div className="rounded-[15px] bg-[#21060D] p-3 space-y-2">
        <h3
          className="text-[#DA596F] text-[clamp(11px,0.85vw,12px)]"
          style={{ fontWeight: 500 }}
        >
          {data.title}
        </h3>

        <p
          className="text-[#DA596F99] text-[clamp(11px,0.85vw,12px)]"
          style={{ fontWeight: 400 }}
        >
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default TradeStepCard;