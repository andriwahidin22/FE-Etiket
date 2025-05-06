//pages/admin/data-tiket.js

import { useState, useEffect } from "react";
import Layout from "../components/admin/Layout";
import Header from "../components/admin/Header";
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import ModalTiket from "../components/admin/ModalTiket";
import Swal from "sweetalert2";

// Definisikan base URL API
const API_BASE_URL = "http://localhost:5001/api/ticket";

export default function DataTiket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
  
      const token = localStorage.getItem("token");
      console.log("Token yang ditemukan:", token);
  
      if (!token) {
        throw new Error("Tidak ada token login. Harap login terlebih dahulu.");
      }
  
      const response = await fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(`Gagal mengambil data tiket (${response.status})`);
      }
  
      const data = await response.json();
      console.log("Data tiket diterima:", data);
      setTickets(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  async function handleSubmit(formData) {
    const token = localStorage.getItem("token");
    
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Token tidak ditemukan",
      });
      return;
    }
  
    try {
      setIsSubmitting(true);
      const url = currentTicket 
        ? `${API_BASE_URL}/${currentTicket.id}` 
        : API_BASE_URL;
      
      const method = currentTicket ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan tiket");
      }
  
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: currentTicket 
          ? "Tiket berhasil diperbarui" 
          : "Tiket berhasil ditambahkan",
      });
      
      handleCloseModal();
      fetchTickets();
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  async function handleDelete(id) {
    const token = localStorage.getItem("token");
  
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Token tidak ditemukan",
      });
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus tiket");
      }
  
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Tiket berhasil dihapus",
      });
      fetchTickets(); // Refresh data
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleOpenModal = (ticket = null) => {
    setCurrentTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentTicket(null);
    setIsModalOpen(false);
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket?.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket?.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <Header />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a2a2a]"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <Header />
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong>Error!</strong> {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <Header />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="Cari tiket (jenis/kode)..."
              className="pl-10 pr-4 py-2 w-full border border-[#d9e2e7] rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-[#2a2a2a] hover:bg-[#3c3c3c] text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiPlus /> Tambah Tiket
          </button>
        </div>

        <div className="bg-white rounded-lg border border-[#d9e2e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#d9e2e7]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase">
                    Kode Tiket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase">
                    Jenis Tiket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase">
                    Tanggal Dibuat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5f7a85] uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#d9e2e7]">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 text-black">{ticket.id}</td>
                      <td className="px-6 py-4 text-black font-medium">
                        {ticket.code}
                      </td>
                      <td className="px-6 py-4 text-black">{ticket.type}</td>
                      <td className="px-6 py-4 text-black">
                        Rp {ticket.price.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-black">
                        {new Date(ticket.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => handleOpenModal(ticket)}
                          className="text-[#2a2a2a] hover:text-[#3c3c3c]"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-6 py-4 text-sm text-black"
                    >
                      Tidak ada tiket ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalTiket
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ticket={currentTicket}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Layout>
  );
}
