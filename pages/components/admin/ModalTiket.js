import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function ModalTiket({
  isOpen,
  onClose,
  onSubmit,
  ticket,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    price: "",
    terms: ""
  });

  // Set form data saat mode edit
  useEffect(() => {
    if (ticket) {
      setFormData({
        code: ticket.code || "",
        type: ticket.type || "",
        price: ticket.price?.toString() || "",
        terms: ticket.terms || ""
      });
    } else {
      setFormData({
        code: "",
        type: "",
        price: "",
        terms: ""
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800"> {/* Perubahan warna teks */}
            {ticket ? "Edit Tiket" : "Tambah Tiket Baru"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1"> {/* Warna lebih terang */}
                Kode Tiket *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Jenis Tiket *
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Harga (Rp) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Terms & Conditions
              </label>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Masukkan syarat dan ketentuan tiket..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2a2a2a] text-white rounded-md hover:bg-[#3c3c3c] disabled:opacity-50 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}