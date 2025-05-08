import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  FaTicketAlt,
  FaArrowRight,
  FaArrowCircleLeft,
  FaArrowCircleRight,
} from "react-icons/fa";
import BuyTicketButton from "./components/common/BuyTicketButton";
import MuseumHeader from "./components/common/MuseumHeader";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/venue";

export default function Venue() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const venuesPerPage = 4;

  // Fetch venues from API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(venues.length / venuesPerPage);
  const currentVenues = venues.slice(
    (currentPage - 1) * venuesPerPage,
    currentPage * venuesPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C4A00]"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Venue Museum Lampung - Koleksi dan Fasilitas</title>
        <meta
          name="description"
          content="Jelajahi koleksi dan fasilitas Museum Lampung"
        />
      </Head>

      <div className="relative bg-white text-gray-800">
        <MuseumHeader />

        <main className="pt-20">
          <div className="relative h-[400px]">
            <Image
              src="https://indonesiakaya.com/wp-content/uploads/2020/10/Diorama_aneka_satwa_langka_yang_hidup_di_Lampung_yang_dipajang_disalah_satu_sudut_museum_2.jpg"
              alt="Gedung Museum Lampung"
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                VENUE MUSEUM
              </h1>
            </div>
          </div>
        </main>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Venues Section */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#7C4A00]">
                Daftar Venue
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full disabled:opacity-50"
                >
                  <FaArrowCircleLeft className="text-2xl text-[#7C4A00]" />
                </button>
                <span className="mx-2">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full disabled:opacity-50"
                >
                  <FaArrowCircleRight className="text-2xl text-[#7C4A00]" />
                </button>
              </div>
            </div>

            {/* Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedVenue(venue)}
                >
                  <div className="relative h-48">
                    {venue.photo ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${venue.photo}`}
                        alt={venue.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{venue.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {venue.description || "Tidak ada deskripsi"}
                    </p>
                    {venue.year && (
                      <p className="text-gray-500 text-sm mt-2">
                        Tahun: {venue.year}
                      </p>
                    )}
                    <div className="mt-3 flex items-center text-[#7C4A00] text-sm">
                      <span>Lihat Detail</span>
                      <FaArrowRight className="ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {venues.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded disabled:opacity-50"
                  >
                    &laquo;
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-1 rounded ${
                          currentPage === pageNum
                            ? "bg-[#7C4A00] text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded disabled:opacity-50"
                  >
                    &raquo;
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Facilities Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-[#7C4A00] text-center">
                Fasilitas Museum Lampung Ruwai Jurai
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Ruang Pamer Tetap",
                    description: "Menampilkan koleksi permanen museum yang terdiri dari benda-benda bersejarah dan budaya Lampung.",
                    details: [
                      { label: "Lokasi", value: "Lantai 1" },
                      { label: "Koleksi", value: "500+ artefak" },
                      { label: "Tema", value: "Sejarah & Budaya Lampung" }
                    ],
                    img: "/images/facilities/ruang-pamer.jpg"
                  },
                  {
                    title: "Perpustakaan",
                    description: "Menyediakan literatur tentang sejarah, budaya, dan kesenian Lampung untuk penelitian dan studi.",
                    details: [
                      { label: "Koleksi", value: "3.000+ buku" },
                      { label: "Fasilitas", value: "Ruang baca, WiFi" },
                      { label: "Akses", value: "Terbuka untuk umum" }
                    ],
                    img: "/images/facilities/perpus.jpg"
                  },
                  {
                    title: "Auditorium",
                    description: "Tempat penyelenggaraan seminar, workshop budaya, dan pertunjukan seni tradisional Lampung.",
                    details: [
                      { label: "Kapasitas", value: "150 orang" },
                      { label: "Fasilitas", value: "Proyektor, Sound System" },
                      { label: "Lantai", value: "Lantai 2" }
                    ],
                    img: "/images/facilities/auditorium.jpg"
                  }
                ].map((facility, index) => (
                  <div 
                    key={index}
                    className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="md:w-2/5">
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={facility.img}
                          alt={facility.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    
                    <div className="md:w-3/5 p-6">
                      <h3 className="text-xl font-bold text-[#7C4A00] mb-3">
                        {facility.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {facility.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {facility.details.map((detail, i) => (
                          <div key={i}>
                            <p className="text-sm text-gray-500">{detail.label}</p>
                            <p className="font-medium text-gray-800">{detail.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Location Map */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
              Peta Lokasi
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1234567890123!2d105.2617!3d-5.4294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40d3f1a1a1a1a1%3A0x123456789abcdef!2sMuseum%20Lampung!5e0!3m2!1sen!2sid!4v1696000000000!5m2!1sen!2sid"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </section>
        </main>

        {/* Venue Detail Modal */}
        {selectedVenue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 md:h-96">
                {selectedVenue.photo ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${selectedVenue.photo}`}
                    alt={selectedVenue.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500 text-lg">No Image Available</span>
                  </div>
                )}
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedVenue.name}
                </h2>
                {selectedVenue.year && (
                  <p className="text-gray-600 mb-2">Tahun: {selectedVenue.year}</p>
                )}
                <p className="text-gray-700 mb-6">
                  {selectedVenue.description || "Tidak ada deskripsi tersedia"}
                </p>

                <button
                  onClick={() => setSelectedVenue(null)}
                  className="bg-[#7C4A00] text-white px-6 py-2 rounded-full hover:bg-[#5a3800] transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-[#f9f9f9] border-t border-gray-300 mt-20 pt-10 pb-4 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-10">
              <img
                src="/images/logo-bumn.png"
                alt="BUMN logo"
                className="h-10 w-auto"
                loading="lazy"
              />
              <div className="border-l border-gray-300 h-10"></div>
              <img
                src="/images/logo-injourney.png"
                alt="InJourney logo"
                className="h-10 w-auto"
                loading="lazy"
              />
            </div>

            <div className="flex space-x-4 text-[#a3b04a] text-lg">
              {[
                "instagram",
                "facebook-f",
                "twitter",
                "linkedin-in",
                "youtube",
                "tiktok",
              ].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="hover:text-[#8a9a3a]"
                  aria-label={icon}
                >
                  <i className={`fab fa-${icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-700">
            <div>
              <p className="font-semibold mb-1">Contact Us</p>
              <p>info@museumlampung.id</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Head Office Address</p>
              <p>Jl. Pangeran Antasari No. 8, Bandar Lampung, Lampung 35131</p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                Representative Office Address
              </p>
              <p>
                Kantor Gedung Pengelola TMII Lt. 3 Jl. Raya Taman Mini, Jakarta
                Timur 13560
              </p>
            </div>
          </div>

          <div className="bg-[#a3b04a] text-white text-xs text-center py-2 mt-10">
            Museum Lampung © 2025. All Rights Reserved
          </div>
        </footer>
        <BuyTicketButton />
      </div>
    </>
  );
}