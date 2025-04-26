export default function StatCard({ icon, title, value, change, description }) {
    return (
      <div className="bg-white rounded-lg border border-[#d9e2e7] p-4 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-[#2a2a2a] rounded-md p-3 text-white text-[18px] flex items-center justify-center w-[40px] h-[40px]">
            <i className={`fas fa-${icon}`} />
          </div>
          <div className="text-[#4b5563] text-[12px] font-normal">
            {title}
          </div>
        </div>
        <div className="font-semibold text-[18px] text-[#2a2a2a] mb-2">
          {value}
        </div>
        <div className={`text-[12px] font-semibold ${change.startsWith('+') ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
          {change}
        </div>
        <div className="text-[12px] text-[#6b7280]">
          {description}
        </div>
      </div>
    );
  }