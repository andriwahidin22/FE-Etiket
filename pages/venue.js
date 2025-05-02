import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  FaTicketAlt,
  FaArrowRight,
  FaArrowCircleLeft,
  FaArrowCircleRight,
} from "react-icons/fa";
import BuyTicketButton from "./components/BuyTicketButton";
import MuseumHeader from "./components/MuseumHeader";

// SafeImage component with error handling
function SafeImage({ src, alt, width, height, className }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        fill
        src={imgSrc}
        alt={alt}
        className="object-cover"
        onError={() => setImgSrc("/images/default-collection.jpg")}
      />
    </div>
  );
}

export default function Venue() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const collectionsPerPage = 4;

  // Generate mock collection data
  const generateCollection = (id) => ({
    id,
    title: `Koleksi ${id}`,
    desc: `Deskripsi lengkap koleksi ${id} yang menarik dari Museum Lampung. Koleksi ini merupakan bagian dari warisan budaya yang dilestarikan oleh museum.`,
    img: `/images/collections/collection-${(id % 10) + 1}.jpg`, // Using 10 local images
    category: ["Arkeologi", "Etnografi", "Seni"][id % 3],
    year: 1900 + (id % 100),
    origin: ["Lampung", "Sumatera", "Jawa", "Bali"][id % 4],
    material: ["Kayu", "Logam", "Keramik", "Tekstil"][id % 4],
    size: `${30 + (id % 70)}cm x ${20 + (id % 50)}cm`,
  });

  // Calculate pagination values
  const totalPages = Math.ceil(collections.length / collectionsPerPage);
  const currentCollections = collections.slice(
    (currentPage - 1) * collectionsPerPage,
    currentPage * collectionsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  useEffect(() => {
    // Load collections
    const loadCollections = async () => {
      const mockData = Array.from({ length: 700 }, (_, i) =>
        generateCollection(i + 1)
      );
      setCollections(mockData);
    };

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    loadCollections();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              src="https://radartv.disway.id/upload/c06d7365fc85afe5e3d5f1c1a351251c.jpg"
              alt="Gedung Museum Lampung"
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                Sejarah
              </h1>
            </div>
          </div>
        </main>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Collections Section */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#7C4A00]">
                Galeri Koleksi
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

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentCollections.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedCollection(item)}
                >
                  <div className="relative h-48">
                    <Image
                      src={item.img}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="mt-3 flex items-center text-[#7C4A00] text-sm">
                      <span>Lihat Detail</span>
                      <FaArrowRight className="ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
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
                  },
                  {
                    title: "Ruang Audio Visual",
                    description: "Pemutaran film dokumenter dan penyajian informasi digital tentang kebudayaan Lampung.",
                    details: [
                      { label: "Kapasitas", value: "30 orang" },
                      { label: "Fasilitas", value: "LCD Projector" },
                      { label: "Jadwal", value: "Sesi 1 jam" }
                    ],
                    img: "/images/facilities/audio-visual.jpg"
                  },
                  {
                    title: "Taman Budaya",
                    description: "Area outdoor dengan replika rumah adat Lampung dan taman yang asri untuk bersantai.",
                    details: [
                      { label: "Luas", value: "1.500 m²" },
                      { label: "Fitur", value: "Gazebo, Panggung Terbuka" },
                      { label: "Aktivitas", value: "Pertunjukan Seni" }
                    ],
                    img: "/images/facilities/taman.jpg"
                  },
                  {
                    title: "Museum Shop",
                    description: "Menjual berbagai cenderamata dan kerajinan khas Lampung sebagai oleh-oleh.",
                    details: [
                      { label: "Produk", value: "Tenun, Kerajinan Logam" },
                      { label: "Lokasi", value: "Lobi Utama" },
                      { label: "Jam Buka", value: "09.00-15.00 WIB" }
                    ],
                    img: "/images/facilities/souvenir.jpg"
                  }
                ].map((facility, index) => (
                  <div 
                    key={index}
                    className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="md:w-2/5">
                      <SafeImage
                        src={facility.img}
                        alt={facility.title}
                        width={500}
                        height={300}
                        className="w-full h-48 md:h-full object-cover"
                      />
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

        {/* Collection Detail Modal */}
        {selectedCollection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 md:h-96">
                <SafeImage
                  src={selectedCollection.img}
                  alt={selectedCollection.title}
                  width={800}
                  height={400}
                  className="rounded-t-lg"
                />
                <button
                  onClick={() => setSelectedCollection(null)}
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
                  {selectedCollection.title}
                </h2>
                <p className="text-gray-700 mb-6">{selectedCollection.desc}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Kategori</p>
                    <p className="font-medium">{selectedCollection.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tahun</p>
                    <p className="font-medium">{selectedCollection.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Asal</p>
                    <p className="font-medium">{selectedCollection.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Material</p>
                    <p className="font-medium">{selectedCollection.material}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ukuran</p>
                    <p className="font-medium">{selectedCollection.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nomor Koleksi</p>
                    <p className="font-medium">
                      ML-{selectedCollection.id.toString().padStart(4, "0")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCollection(null)}
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
