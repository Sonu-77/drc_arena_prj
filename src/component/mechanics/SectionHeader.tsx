const SectionHeader = ({ title, desc }: any) => {
  return (
    <div>
      <h2 className="beast-heading text-[24px] leading-none text-[#F2F3D9]">
        {title}
      </h2>
      {desc && (
        <p
          className="text-[#F2F3D999] text-[16px] mt-2"
          style={{
            fontWeight: 200,
          }}
        >
          {desc}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
