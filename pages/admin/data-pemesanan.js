import Layout from '../components/admin/Layout';
import Header from '../components/admin/Header';
import { FiSearch, FiCalendar } from 'react-icons/fi';

export default function DataPemesanan() {
  const bookings = [
    { id: 'BK001', nama: 'John Doe', tiket: 'Dewasa', jumlah: 2, tanggal: '15 Jan 2023', status: 'Dikonfirmasi' },
    { id: 'BK002', nama: 'Jane Smith', tiket: 'Pelajar', jumlah: 3, tanggal: '16 Jan 2023', status: 'Pending' },
    { id: 'BK003', nama: 'Robert Johnson', tiket: 'Anak-anak', jumlah: 1, tanggal: '17 Jan 2023', status: 'Dibatalkan' },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <Header />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pemesanan..."
              className="pl-10 pr-4 py-2 w-full border border-[#d9e2e7] rounded-lg focus:ring-2 focus:ring-[#2a2a2a] focus:border-[#2a2a2a]"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-[#5f7a85]" />
            <select className="border border-[#d9e2e7] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2a2a2a]">
              <option>Semua Status</option>
              <option>Pending</option>
              <option>Dikonfirmasi</option>
              <option>Dibatalkan</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#d9e2e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#d9e2e7]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">ID Pemesanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Jenis Tiket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Jumlah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#d9e2e7]">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2a2a2a]">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{booking.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{booking.tiket}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{booking.jumlah}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{booking.tanggal}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'Dikonfirmasi' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-[#5f7a85]">
            Menampilkan 1 sampai {bookings.length} dari {bookings.length} entri
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-[#d9e2e7] rounded-md bg-white text-[#2a2a2a]">Sebelumnya</button>
            <button className="px-3 py-1 border border-[#d9e2e7] rounded-md bg-[#2a2a2a] text-white">1</button>
            <button className="px-3 py-1 border border-[#d9e2e7] rounded-md bg-white text-[#2a2a2a]">Selanjutnya</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}