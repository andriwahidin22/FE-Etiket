//file data-koleksi.js

import { useState, useEffect } from "react";
import Layout from "../components/admin/Layout";
import Header from "../components/admin/Header";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import ModalVenue from "../components/admin/ModalVenue";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/venue";

export default function DataKoleksi() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchVenues = async () => {
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
        throw new Error(errorData.message || "Failed to fetch venues");
      }

      const data = await response.json();
      setVenues(data);
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

  const handleSubmit = async (formData, photoFile) => {
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
      const url = currentVenue
        ? `${API_BASE_URL}/${currentVenue.id}`
        : API_BASE_URL;

      const method = currentVenue ? "PUT" : "POST";

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("year", formData.year);
      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.status === 401) {
        Cookies.remove("token");
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.msg || "Failed to save venue"
        );
      }

      const result = await response.json();

      Swal.fire({
        icon: "success",
        title: currentVenue ? "Venue updated!" : "Venue added!",
        text: currentVenue
          ? result.message || "Venue updated successfully"
          : result.msg || "Venue created successfully",
      });

      handleCloseModal();
      await fetchVenues();
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
        throw new Error(errorData.message || "Failed to delete venue");
      }

      const result = await response.json();
      Swal.fire(
        "Deleted!",
        result.message || "Venue deleted successfully",
        "success"
      );
      await fetchVenues();
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
    fetchVenues();
  }, []);

  const handleOpenModal = (venue = null) => {
    setCurrentVenue(venue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentVenue(null);
    setIsModalOpen(false);
  };

  const filteredVenues = venues.filter((venue) =>
    `${venue.name} ${venue.description || ""} ${venue.year || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
              placeholder="Search venues..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiPlus /> Add Venue
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVenues.length > 0 ? (
                  filteredVenues.map((venue) => (
                    <tr key={venue.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {venue.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {venue.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {venue.year || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {venue.description
                          ? venue.description.length > 50
                            ? `${venue.description.substring(0, 50)}...`
                            : venue.description
                          : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          {venue.photo ? (
                            <img
                              src={`http://localhost:5001/uploads/${
                                venue.photo
                              }?t=${new Date().getTime()}`}
                              alt={venue.name}
                              className="h-full w-full object-cover"
                              crossOrigin="anonymous"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiYjMzszMztjdXJyZW50Q29sb3ImIzMzOzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNCAxNmw0LjU4Ni00LjU4NmEyIDIgMCAwMTIuODI4IDBMMTYgMTZtLTItMmwxLjU4Ni0xLjU4NmEyIDIgMCAwMTIuODI4IDBMMjAgMTRtLTYtNmguMDFNNiAyMGgxMmEyIDIgMCAwMDItMlY2YTIgMiAwIDAwLTItMkg2YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMnoiPjwvcGF0aD48L3N2Zz4=";
                              }}
                            />
                          ) : (
                            <FiImage className="text-gray-400 h-5 w-5" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleOpenModal(venue)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(venue.id)}
                          className="text-red-600 hover:text-red-900"
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
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No venues found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalVenue
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        venue={currentVenue}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Layout>
  );
}
