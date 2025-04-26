import Layout from '../components/admin/Layout';
import Header from '../components/admin/Header';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';

export default function DataKoleksi() {
  const collections = [
    { id: 1, nama: 'Arca Ganesha', kategori: 'Arkeologi', tahun: 'Abad 9', lokasi: 'Ruang Hindu' },
    { id: 2, nama: 'Keramik Kuno', kategori: 'Keramik', tahun: 'Dinasti Ming', lokasi: 'Ruang Tiongkok' },
    { id: 3, nama: 'Pedang Keraton', kategori: 'Senjata', tahun: '1800-an', lokasi: 'Ruang Keraton' },
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
              placeholder="Cari koleksi..."
              className="pl-10 pr-4 py-2 w-full border border-[#d9e2e7] rounded-lg focus:ring-2 focus:ring-[#2a2a2a] focus:border-[#2a2a2a]"
            />
          </div>
          <button className="bg-[#2a2a2a] hover:bg-[#3c3c3c] text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FiPlus /> Tambah Koleksi
          </button>
        </div>

        <div className="bg-white rounded-lg border border-[#d9e2e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#d9e2e7]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Nama Koleksi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Tahun</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Lokasi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#d9e2e7]">
                {collections.map((collection) => (
                  <tr key={collection.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{collection.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2a2a2a]">{collection.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{collection.kategori}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{collection.tahun}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{collection.lokasi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a] flex gap-2">
                      <button className="text-[#2a2a2a] hover:text-[#3c3c3c]">
                        <FiImage />
                      </button>
                      <button className="text-[#2a2a2a] hover:text-[#3c3c3c]">
                        <FiEdit2 />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-[#5f7a85]">
            Menampilkan 1 sampai {collections.length} dari {collections.length} entri
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