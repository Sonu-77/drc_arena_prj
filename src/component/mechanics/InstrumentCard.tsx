const InstrumentCard = ({ data }: any) => {
  return (
    <div className="p-4 rounded-[16px] space-y-3 bg-[#44374233] border border-[#44374233]">
      <h4
        className="text-[#F2F3D9] text-[16px]"
        style={{
          fontWeight: 400,
        }}
      >
        {data.title}
      </h4>
      <p
        className="text-[#F2F3D9CC] text-[14px]"
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
