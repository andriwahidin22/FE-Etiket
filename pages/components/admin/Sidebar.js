import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    router.push("/login");
  };

  const isActive = (route) => {
    return router.pathname === route;
  };

  return (
    <aside className="bg-white rounded-lg border border-[#d9e2e7] w-full md:w-[260px] flex flex-col p-6 select-none">
      <h1 className="font-semibold text-[14px] text-[#2a2a2a] mb-6">
        Museum Lampung Admin
      </h1>

      <nav className="flex flex-row md:flex-col gap-2 mb-8 overflow-x-auto md:overflow-visible">
        <Link 
          href="/admin" 
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm whitespace-nowrap transition-colors ${
            isActive('/admin') 
              ? 'bg-[#2a2a2a] text-white font-semibold' 
              : 'text-[#5f7a85] hover:bg-gray-100 font-normal'
          }`}
        >
          <i className="fas fa-home text-[16px] w-5 text-center" />
          Dashboard
        </Link>

        <Link 
          href="/admin/data-tiket" 
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm whitespace-nowrap transition-colors ${
            isActive('/admin/data-tiket') 
              ? 'bg-[#2a2a2a] text-white font-semibold' 
              : 'text-[#5f7a85] hover:bg-gray-100 font-normal'
          }`}
        >
          <i className="fas fa-ticket-alt text-[16px] w-5 text-center" />
          Data Tiket
        </Link>

        <Link 
          href="/admin/data-koleksi" 
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm whitespace-nowrap transition-colors ${
            isActive('/admin/data-koleksi') 
              ? 'bg-[#2a2a2a] text-white font-semibold' 
              : 'text-[#5f7a85] hover:bg-gray-100 font-normal'
          }`}
        >
          <i className="fas fa-archive text-[16px] w-5 text-center" />
          Data Koleksi
        </Link>

        <Link 
          href="/admin/data-pemesanan" 
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm whitespace-nowrap transition-colors ${
            isActive('/admin/data-pemesanan') 
              ? 'bg-[#2a2a2a] text-white font-semibold' 
              : 'text-[#5f7a85] hover:bg-gray-100 font-normal'
          }`}
        >
          <i className="fas fa-calendar-check text-[16px] w-5 text-center" />
          Data Pemesanan
        </Link>

        <Link 
          href="#" 
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#5f7a85] hover:bg-gray-100 font-normal whitespace-nowrap transition-colors"
        >
          <i className="fas fa-chart-bar text-[16px] w-5 text-center" />
          Laporan
        </Link>
      </nav>

      <div className="mt-auto">
        <Link 
          href="#" 
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#5f7a85] hover:bg-gray-100 font-normal whitespace-nowrap transition-colors mb-2"
        >
          <i className="fas fa-user-circle text-[16px] w-5 text-center" />
          Profile
        </Link>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#5f7a85] hover:bg-gray-100 font-normal whitespace-nowrap transition-colors w-full text-left"
        >
          <i className="fas fa-sign-out-alt text-[16px] w-5 text-center" />
          Logout
        </button>
      </div>
    </aside>
  );
}
