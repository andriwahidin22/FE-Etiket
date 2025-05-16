//pages/admin/data-tiket.js

import { useState, useEffect } from "react";
import Layout from "../components/admin/Layout";
import Header from "../components/admin/Header";
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import ModalTiket from "../components/admin/ModalTiket";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/ticket";

export default function DataTiket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTickets = async () => {
    const token = Cookies.get("token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authorization Required",
        text: "Please login again",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        Cookies.remove("token");
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch tickets");
      }

      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    const token = Cookies.get("token");
  
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authorization Required",
        text: "Please login again",
      });
      return;
    }
  
    try {
      setIsSubmitting(true);
      const url = currentTicket 
        ? `${API_BASE_URL}/${currentTicket.id}`
        : API_BASE_URL;
      
      const method = currentTicket ? "PUT" : "POST";

      // Prepare data according to backend expectations
      const requestData = {
        code: formData.code,
        type: formData.type,
        price: Number(formData.price),
        terms: formData.terms || "" // Add empty string as default if terms not provided
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.status === 401) {
        Cookies.remove("token");
        throw new Error("Session expired. Please login again.");
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.msg || "Failed to save ticket");
      }
  
      const result = await response.json();
      
      Swal.fire({
        icon: "success",
        title: currentTicket ? "Ticket updated!" : "Ticket added!",
        text: currentTicket ? result.message || "Ticket updated successfully" 
                           : result.msg || "Ticket created successfully",
      });
  
      handleCloseModal();
      await fetchTickets();
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
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("token");

    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirmation.isConfirmed) return;

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        Cookies.remove("token");
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete ticket");
      }

      const result = await response.json();
      Swal.fire("Deleted!", result.message || "Ticket deleted successfully", "success");
      await fetchTickets();
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

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

  const filteredTickets = tickets.filter(ticket => 
    `${ticket.code} ${ticket.type}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <Header />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
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
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiPlus /> Tambah Tiket
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Tiket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Tiket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Syarat dan Ketentuan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp {ticket.price.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.terms || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleOpenModal(ticket)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No tickets found
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
        fields={[
          { name: 'code', label: 'Ticket Code', type: 'text', required: true },
          { name: 'type', label: 'Ticket Type', type: 'text', required: true },
          { name: 'price', label: 'Price', type: 'number', required: true },
          { name: 'terms', label: 'Terms & Conditions', type: 'textarea' }
        ]}
      />
    </Layout>
  );
}