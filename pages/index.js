import { useState, useEffect } from "react";
import Head from "next/head";
import { FaTicketAlt, FaPlay } from "react-icons/fa";
import MuseumHeader from "./components/MuseumHeader";
import BuyTicketButton from "./components/BuyTicketButton";

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Deteksi perangkat mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    
    // Timeout fallback untuk desktop
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowFallback(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Video ID Museum Lampung
  const youtubeVideoId = "gR8kj6ti-s4";
  
  // Format URL yang benar dengan parameter penting
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`;

  const handlePlayVideo = () => {
    setVideoLoaded(true);
    setShowFallback(false);
  };

  return (
    <>
      <Head>
        <title>Museum Lampung - Ruwai Jurai</title>
        {/* Tambahkan CSP meta tag */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="frame-src https://www.youtube-nocookie.com" 
        />
      </Head>

      <div className="relative bg-white text-gray-800">
        {/*Header*/}
        <MuseumHeader />

        <main className="pt-20 relative">
          {/* Video Container */}
          <div className="w-full h-[600px] overflow-hidden relative bg-black">
            
            {/* Fallback Image (Mobile & Sebelum Video Load) */}
            {showFallback && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                  alt="Pratinjau Museum Lampung"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
                />
                <button 
                  onClick={handlePlayVideo}
                  className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition transform hover:scale-110"
                  aria-label="Putar Video"
                >
                  <FaPlay className="text-white text-2xl ml-1" />
                </button>
              </div>
            )}

            {/* YouTube Video */}
            {(!showFallback || !isMobile) && (
              <div className={`absolute inset-0 w-full h-full ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <iframe
                  src={videoLoaded ? `${embedUrl}&autoplay=1&mute=1` : embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  loading="eager"
                  onLoad={() => setVideoLoaded(true)}
                />
              </div>
            )}

            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

            {/* Konten Teks */}
            <div className="absolute inset-0 flex flex-col justify-center max-w-[1200px] mx-auto px-6 md:px-12 z-10">
              <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight max-w-4xl drop-shadow-lg">
                Museum Lampung - Sang Bumi Ruwai Jurai
              </h1>
              <button
                className="mt-6 w-max bg-white text-[#7C4A00] text-sm font-semibold rounded-full px-5 py-2 hover:bg-gray-100 transition shadow-lg"
                onClick={() => (window.location.href = "/tours")}
              >
                Jelajahi Sekarang
              </button>
            </div>
          </div>
        </main>

        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
            Tentang Museum Lampung
          </h2>
          <p className="max-w-4xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
            Museum Lampung adalah pusat kebudayaan dan sejarah yang menampilkan
            kekayaan warisan budaya Lampung dan Sumatera Selatan. Museum ini
            menyimpan koleksi artefak, seni tradisional, dan sejarah yang
            menggambarkan kehidupan masyarakat Lampung dari masa lalu hingga
            sekarang.
          </p>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
              Koleksi Unggulan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  alt="Traditional Lampung woven fabric displayed in museum"
                  className="w-full h-48 object-cover"
                  height="400"
                  src="https://storage.googleapis.com/a1aa/image/ebe59a5f-d698-4c6c-4265-156eb1cf22cf.jpg"
                  width="600"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Tenun Lampung
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Koleksi kain tenun tradisional Lampung yang kaya motif dan
                    warna, melambangkan identitas budaya masyarakat Lampung.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  alt="Ancient artifacts displayed in Museum Lampung"
                  className="w-full h-48 object-cover"
                  height="400"
                  src="https://storage.googleapis.com/a1aa/image/e22f4a53-e499-4b1d-6663-0e6affe4315f.jpg"
                  width="600"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Artefak Sejarah
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Berbagai artefak kuno yang menceritakan sejarah dan
                    kehidupan masyarakat Lampung dari masa lampau.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  alt="Traditional Lampung musical instruments displayed in museum"
                  className="w-full h-48 object-cover"
                  height="400"
                  src="https://storage.googleapis.com/a1aa/image/12f7d456-0096-4f51-d2ff-7f96fe98720b.jpg"
                  width="600"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Alat Musik Tradisional
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Koleksi alat musik tradisional Lampung yang masih digunakan
                    dalam upacara adat dan pertunjukan seni.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
            Kunjungi Museum Lampung
          </h2>
          <div className="max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
            <p className="mb-6">
              Museum Lampung buka setiap hari Selasa sampai Minggu, pukul 08.00
              - 16.00 WIB. Nikmati tur edukatif dan berbagai pameran menarik
              yang membawa Anda mengenal lebih dalam budaya Lampung.
            </p>
            <a
              className="inline-block bg-[#7C4A00] hover:bg-[#5a3600] text-white font-semibold rounded-full px-8 py-3 transition"
              href="#"
            >
              Pesan Tiket Sekarang
            </a>
          </div>
        </section>

        <section id="contact" className="bg-gray-50 py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
              Hubungi Kami
            </h2>
            <form
              className="max-w-3xl mx-auto space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="name"
                >
                  Nama
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C4A00]"
                  id="name"
                  name="name"
                  placeholder="Masukkan nama Anda"
                  required
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C4A00]"
                  id="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  required
                  type="email"
                />
              </div>
              <div>
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="message"
                >
                  Pesan
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C4A00]"
                  id="message"
                  name="message"
                  placeholder="Tulis pesan Anda"
                  required
                  rows="4"
                ></textarea>
              </div>
              <button
                className="bg-[#7C4A00] hover:bg-[#5a3600] text-white font -semibold rounded-full px-8 py-3 transition"
                type="submit"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </section>

        {/*batom buy*/}
        <BuyTicketButton/>

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

          <nav className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-600 space-x-4">
            {[
              "Beranda",
              "Destination Info",
              "Experiences",
              "Venues",
              "Agenda",
              "News",
              "Brosur",
            ].map((item) => (
              <a key={item} href="#" className="hover:text-gray-900">
                {item}
              </a>
            ))}
          </nav>

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
      </div>
    </>
  );
}
