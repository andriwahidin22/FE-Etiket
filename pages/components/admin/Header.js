export default function Header() {
    return (
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[12px] text-[#9ca3af] font-normal select-none gap-1 sm:gap-0">
        <div>
          Dashboard
          <span className="text-[#6b7280]"> / </span>
          <span className="text-[#6b7280]">Overview</span>
        </div>
        <div className="font-semibold text-[14px] text-[#2a2a2a]">
          Museum Lampung Admin
        </div>
      </header>
    );
  }