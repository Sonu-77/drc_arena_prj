const InstrumentCard = ({ data }: any) => {
  return (
    <div className="p-4 rounded-[16px] space-y-4 bg-[#44374233] border border-[#44374233]">
      <h4
        className="text-[#F2F3D9] text-[clamp(13px,0.95vw,14px)]"
        style={{
          fontWeight: 400,
        }}
      >
        {data.title}
      </h4>
      <p
        className="text-[#F2F3D9CC] text-[clamp(11px,0.85vw,12px)]"
        style={{
          fontWeight: 200,
        }}
      >
        {data.desc}
      </p>
    </div>
  );
};

export default InstrumentCard;
