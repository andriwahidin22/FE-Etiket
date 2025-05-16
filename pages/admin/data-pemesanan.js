import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Layout from '../components/admin/Layout';
import Header from '../components/admin/Header';
import { FiSearch, FiCalendar } from 'react-icons/fi';

// Enum AttendanceStatus (biasanya di backend)
const AttendanceStatus = {
  NOT_ARRIVED: "NOT_ARRIVED",
  ARRIVED: "ARRIVED",
  EXPIRED: "EXPIRED",
};

export default function DataPemesanan() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // Fungsi fetch data order dari backend
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token tidak ditemukan, silakan login ulang.");
      }
      const res = await fetch("http://localhost:5001/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        throw new Error("Token tidak valid atau sudah kadaluarsa. Silakan login ulang.");
      }
      if (!res.ok) throw new Error("Gagal mengambil data pemesanan");
      const data = await res.json();
      const now = new Date();
      const processed = data.data.map(order => {
        const visitDate = new Date(order.visitDate);
        let status = order.attendanceStatus;
        if (visitDate < now && status === AttendanceStatus.NOT_ARRIVED) {
          status = AttendanceStatus.EXPIRED;
        }
        return {
          ...order,
          visitDate,
          attendanceStatus: status,
        };
      });
      setOrders(processed);
      setFilteredOrders(processed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter berdasarkan search dan status
  useEffect(() => {
    let filtered = orders;
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(o =>
        o.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.visitorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "Semua Status") {
      filtered = filtered.filter(o => {
        if (statusFilter === "Expired") return o.attendanceStatus === AttendanceStatus.EXPIRED;
        if (statusFilter === "Belom Berkunjung") return o.attendanceStatus === AttendanceStatus.NOT_ARRIVED;
        if (statusFilter === "Dikonfirmasi") return o.attendanceStatus === AttendanceStatus.ARRIVED;
        if (statusFilter === "Dibatalkan") return o.attendanceStatus === "CANCELLED";
        return true;
      });
    }
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  // Mapping status ke label dan warna
  const statusLabel = (status) => {
    switch (status) {
      case AttendanceStatus.NOT_ARRIVED:
        return { text: "Belum Berkunjung", color: "bg-yellow-100 text-yellow-800" };
      case AttendanceStatus.ARRIVED:
        return { text: "Sudah Berkunjung", color: "bg-green-100 text-green-800" };
      case AttendanceStatus.EXPIRED:
        return { text: "Expired", color: "bg-gray-300 text-gray-700" };
      case "CANCELLED":
        return { text: "Dibatalkan", color: "bg-red-100 text-red-800" };
      default:
        return { text: status, color: "bg-gray-100 text-gray-700" };
    }
  };

  // Fungsi update status ke backend
  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Token tidak ditemukan, silakan login ulang.");

      const res = await fetch(`http://localhost:5001/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ attendanceStatus: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal mengupdate status");
      }

      await fetchOrders();
      alert("Status berhasil diperbarui");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Modal detail order dengan tombol aksi update status
  const DetailModal = ({ order, onClose }) => {
    if (!order) return null;
    const totalPrice = order.orderItems.reduce((sum, item) => sum + item.quantity * item.ticketPrice, 0);
    const canUpdate = ![AttendanceStatus.EXPIRED, "CANCELLED"].includes(order.attendanceStatus);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto text-gray-900">
          <h2 className="text-xl font-semibold mb-4">Detail Pemesanan - {order.orderCode}</h2>
          <p><strong>Nama Pengunjung:</strong> {order.visitorName}</p>
          <p><strong>Tanggal Kunjungan:</strong> {order.visitDate.toLocaleDateString("id-ID")}</p>
          <p><strong>Status Berkunjung:</strong> {statusLabel(order.attendanceStatus).text}</p>
          <hr className="my-4" />
          <h3 className="font-semibold mb-2">Detail Tiket:</h3>
          <table className="w-full text-sm border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-1 text-left">Kode</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Jenis</th>
                <th className="border border-gray-300 px-2 py-1 text-right">Jumlah</th>
                <th className="border border-gray-300 px-2 py-1 text-right">Harga</th>
                <th className="border border-gray-300 px-2 py-1 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, idx) => {
                const subtotal = item.quantity * item.ticketPrice;
                return (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-2 py-1">{item.ticket?.code || "UNKN"}</td>
                    <td className="border border-gray-300 px-2 py-1">{item.ticket?.type || "Unknown"}</td>
                    <td className="border border-gray-300 px-2 py-1 text-right">{item.quantity}</td>
                    <td className="border border-gray-300 px-2 py-1 text-right">Rp {item.ticketPrice.toLocaleString("id-ID")}</td>
                    <td className="border border-gray-300 px-2 py-1 text-right">Rp {subtotal.toLocaleString("id-ID")}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={4} className="border border-gray-300 px-2 py-1 font-semibold text-right">Total</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold text-right">Rp {totalPrice.toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
          </table>

          {canUpdate && (
            <div className="mt-4 flex justify-between gap-3">
              <button
                onClick={() => updateStatus(order.id, AttendanceStatus.ARRIVED)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Konfirmasi Berkunjung
              </button>
              <button
                onClick={() => updateStatus(order.id, "CANCELLED")}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Batalkan
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <a
              href={`http://localhost:5001/api/orders/${order.id}/download-ticket`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download Ticket PDF
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-[#5f7a85]" />
            <select
              className="border border-black rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-[#2a2a2a]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Belom Berkunjung</option>
              <option>Dikonfirmasi</option>
              <option>Dibatalkan</option>
              <option>Expired</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#d9e2e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#d9e2e7]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">ID Pemesanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Nama Pengunjung</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Tanggal Kunjungan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Status Berkunjung</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#d9e2e7]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">Loading data...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-red-500">{error}</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">Tidak ada data pemesanan</td>
                  </tr>
                ) : (
                  filteredOrders.map(order => {
                    const status = statusLabel(order.attendanceStatus);
                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2a2a2a]">{order.orderCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{order.visitorName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2a2a]">{order.visitDate.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowDetail(true);
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showDetail && (
          <DetailModal
            order={selectedOrder}
            onClose={() => {
              setShowDetail(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}
