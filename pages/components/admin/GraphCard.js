import Image from 'next/image';

export default function GraphCard({ imageSrc, title, description, timeText }) {
  return (
    <div className="bg-white rounded-lg border border-[#d9e2e7] p-4 flex flex-col gap-3">
      <Image 
        src={imageSrc}
        alt={title}
        width={300}
        height={150}
        className="w-full"
      />
      <div className="font-semibold text-[14px] text-[#2a2a2a]">
        {title}
      </div>
      <div className="text-[12px] text-[#6b7280] font-normal">
        {description}
      </div>
      <div className="flex items-center gap-2 text-[12px] text-[#6b7280] mt-2">
        <i className="fas fa-clock text-[14px]" />
        {timeText}
      </div>
    </div>
  );
}