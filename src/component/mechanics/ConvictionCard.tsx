const ConvictionCard = ({ data }: any) => {
  return (
    <div className="p-4 space-y-4 rounded-[16] bg-[#44374233] border border-[#44374233]">
      <div className="space-y-1.5">
        <h4
          className="text-[#F2F3D9] text-[clamp(13px,0.95vw,14px)]"
          style={{
            fontWeight: 400,
          }}
        >
          {data.title}
        </h4>
        <p
          className="text-[clamp(11px,0.85vw,12px)] text-[#F2F3D9CC]"
          style={{
            fontWeight: 400,
          }}
        >
          Max {data.max}
        </p>
      </div>
      <p
        className="text-[clamp(11px,0.85vw,12px)] text-[#F2F3D9CC]"
        style={{
          fontWeight: 200,
        }}
      >
        {data.desc}
      </p>
    </div>
  );
};

export default ConvictionCard;
