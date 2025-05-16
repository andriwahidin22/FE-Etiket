import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle, FaTicketAlt, FaExclamationTriangle } from "react-icons/fa";
import BuyTicketButton from "./components/common/BuyTicketButton";
import MuseumHeader from "./components/common/MuseumHeader";

export default function DestinationInfo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("jam-operasional");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ticket`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch tickets');
      }
      
      const data = await response.json();
      setTickets(data);
    } catch (err) {
      setError(err.message || 'Failed to load ticket data');
      console.error('Ticket API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Group tickets by type for display
  const ticketGroups = tickets.reduce((groups, ticket) => {
    if (!groups[ticket.type]) {
      groups[ticket.type] = [];
    }
    groups[ticket.type].push(ticket);
    return groups;
  }, {});

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="relative bg-white text-gray-800">
        {/* Header */}
        <MuseumHeader />

        <main className="pt-20">
          <div className="relative h-[400px]">
            <Image
              src="https://radartv.disway.id/upload/89b78b819107a07dbba09f2b227a9032.jpeg"
              alt="Gedung Museum Lampung"
              layout="fill"
              objectFit="cover"
              className="brightness-75"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                DESTINASI INFO
              </h1>
            </div>
          </div>
        </main>

        {/* Main Content */}
        <main className="pt-[72px] max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <h1 className="text-4xl font-semibold text-gray-900 mb-8 text-center">
            Destinasi Info Museum Lampung
          </h1>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-[#7C4A00]">
              Museum Lampung Ruwai Jurai
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              Museum Lampung didirikan untuk melestarikan dan memamerkan
              kekayaan budaya serta sejarah masyarakat Lampung dan sekitarnya.
              Museum ini menjadi pusat edukasi dan wisata budaya yang penting di
              Sumatera Selatan, menampilkan berbagai koleksi artefak, seni
              tradisional, dan benda bersejarah yang menggambarkan perjalanan
              budaya Lampung dari masa ke masa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#7C4A00]">
              Fasilitas dan Layanan
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Tur edukatif dengan pemandu berpengalaman</li>
              <li>Pameran seni dan budaya Lampung secara berkala</li>
              <li>Toko suvenir dengan produk khas Lampung</li>
              <li>Area parkir luas dan fasilitas ramah disabilitas</li>
              <li>Kafe dan area istirahat untuk pengunjung</li>
            </ul>
          </section>
        </main>

        {/* Tab Navigation Section */}
        <div>
          <nav className="flex justify-center space-x-10 border-b border-gray-300 text-sm py-3 max-w-7xl mx-auto px-4">
            <button
              onClick={() => setActiveSection("jam-operasional")}
              className={`font-semibold relative pb-2 ${
                activeSection === "jam-operasional"
                  ? "text-[#7C4A00] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#7C4A00] after:rounded-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Jam Operasional
            </button>
            <button
              onClick={() => setActiveSection("tata-tertib")}
              className={`font-semibold relative pb-2 ${
                activeSection === "tata-tertib"
                  ? "text-[#7C4A00] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#7C4A00] after:rounded-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tata Tertib
            </button>
            <button
              onClick={() => setActiveSection("jenis-tiket")}
              className={`font-semibold relative pb-2 ${
                activeSection === "jenis-tiket"
                  ? "text-[#7C4A00] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#7C4A00] after:rounded-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Jenis Tiket
            </button>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {/* Jam Operasional Section */}
            {activeSection === "jam-operasional" && (
              <section className="flex flex-col md:flex-row md:space-x-10">
                <div className="md:w-1/2">
                  <h2 className="font-bold text-xl mb-6 text-gray-900">
                    Jam Operasional
                  </h2>
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-[#7C4A00] flex items-center justify-center text-white text-xs">
                        <FaArrowRight />
                      </div>
                    </div>
                    <p className="ml-3 text-sm text-gray-600 leading-relaxed">
                      Open Everyday: 08.00 - 16.00 WIB.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-[#7C4A00] flex items-center justify-center text-white text-xs">
                        <FaArrowRight />
                      </div>
                    </div>
                    <p className="ml-3 text-sm text-gray-600 leading-relaxed">
                      Hari Senin tutup untuk perawatan dan administrasi.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 rounded-lg overflow-hidden">
                  <Image
                    alt="Museum Lampung building exterior"
                    src="https://www.asdp.id/storage//uploads/siaranpers/d905b966b12f4610fce258007a737f4d.jpeg"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </section>
            )}

            {/* Tata Tertib Section */}
            {activeSection === "tata-tertib" && (
              <section className="bg-white rounded-lg p-6">
                <h2 className="font-bold text-xl mb-6 text-gray-900">
                  Tata Tertib Museum
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-3">
                  <li>Dilarang merokok di area museum.</li>
                  <li>Dilarang membawa makanan dan minuman ke dalam ruang pamer.</li>
                  <li>Dilarang menyentuh koleksi museum secara langsung.</li>
                  <li>Harap menjaga ketertiban dan kebersihan selama kunjungan.</li>
                  <li>Pengunjung diwajibkan mengikuti petunjuk dari petugas museum.</li>
                </ul>
              </section>
            )}

            {/* Jenis Tiket Section */}
            {activeSection === "jenis-tiket" && (
              <>
                <section className="text-center max-w-4xl mx-auto px-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Informasi Harga Tiket
                  </h3>
                  <p className="text-xs text-gray-500 mb-10 leading-tight">
                    Kami menawarkan berbagai pilihan tiket dengan harga yang
                    kompetitif dan terjangkau.
                  </p>
                </section>

                {error ? (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0 text-red-500">
                        <FaExclamationTriangle className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          Gagal memuat data tiket: {error}
                        </p>
                        <button
                          onClick={fetchTickets}
                          className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
                        >
                          Coba Lagi
                        </button>
                      </div>
                    </div>
                  </div>
                ) : loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C4A00]"></div>
                  </div>
                ) : (
                  <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {Object.entries(ticketGroups).map(([type, typeTickets]) => (
                      <Card
                        key={type}
                        title={type}
                        description={`Paket tiket ${type.toLowerCase()}`}
                        items={typeTickets.map(ticket => ({
                          label: ticket.code,
                          price: `Rp ${ticket.price.toLocaleString('id-ID')}`,
                          terms: ticket.terms
                        }))}
                        buttonText="Pesan Sekarang"
                      />
                    ))}
                  </section>
                )}
              </>
            )}
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-[#f9f9f9] border-t border-gray-300 mt-20 pt-10 pb-4 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-10">
              <img
                src="https://storage.googleapis.com/a1aa/image/353a668a-bcd1-4a0e-e1cd-6b11314b6da3.jpg"
                alt="BUMN logo"
                className="h-10 w-auto"
                loading="lazy"
              />
              <div className="border-l border-gray-300 h-10"></div>
              <img
                src="https://storage.googleapis.com/a1aa/image/1337f648-de50-4122-aba4-99a4f8af343a.jpg"
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

function Card({ title, description, items, buttonText }) {
  return (
    <article className="bg-[#e4ebc6] rounded-lg p-6 text-left text-sm text-gray-700">
      <h4 className="font-semibold mb-2 text-gray-900">{title}</h4>
      <p className="mb-4 text-xs">{description}</p>
      <ul className="space-y-3 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <FaCheckCircle className="text-[#a3b04a]" />
            </div>
            <div className="ml-2">
              <p className="text-xs text-gray-600">{item.label}</p>
              <p className="font-bold text-gray-900">{item.price}</p>
              {item.terms && (
                <p className="text-xs text-gray-500 mt-1">{item.terms}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Button text={buttonText} />
    </article>
  );
}

function Button({ text }) {
  return (
    <button className="bg-[#a3b04a] text-white text-xs rounded-full py-2 px-6 hover:bg-[#8a9a3a] transition flex items-center justify-center gap-1">
      {text}
      <FaArrowRight />
    </button>
  );
}