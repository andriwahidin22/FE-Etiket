import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Museum Lampung - Keajaiban Budaya di Sumatera Selatan</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="relative bg-white text-gray-800">
        <header
          className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
            isScrolled ? "bg-black bg-opacity-90" : "bg-transparent"
          }`}
        >
          <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-8 py-4 text-[16px] font-normal">
            <div className="flex items-center space-x-10">
              <div className="flex flex-col leading-none">
                <span
                  className={`text-[18px] font-light tracking-wide select-none ${
                    isScrolled ? "text-white" : "text-black"
                  }`}
                >
                  lampungheritage
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-widest select-none ${
                    isScrolled ? "text-white" : "text-black"
                  }`}
                >
                  CULTURE & HISTORY EXPERIENCE
                </span>
              </div>
              <ul className="hidden md:flex space-x-10 font-normal">
                <li>
                  <a
                    className={`relative inline-block pb-1 font-semibold ${
                      isScrolled
                        ? "text-white hover:text-[#7C4A00]"
                        : "text-black hover:text-[#7C4A00]"
                    }`}
                    href="#"
                  >
                    Beranda
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7C4A00] rounded"></span>
                  </a>
                </li>
                {[
                  "Destinasi Info",
                  "Sejarah",
                  "Venue",
                  "Galery",
                  "Contact",
                ].map((text) => (
                  <li key={text}>
                    <a
                      className={`hover:text-[#7C4A00] ${
                        isScrolled ? "text-white" : "text-black"
                      }`}
                      href={`#${text.toLowerCase()}`}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button
                className={`border rounded-full px-6 py-2 text-sm font-semibold transition ${
                  isScrolled
                    ? "text-white border-white hover:bg-white hover:text-[#7C4A00]"
                    : "text-black border-black hover:bg-black hover:text-white"
                }`}
              >
                Masuk
              </button>
              <button
                className={`rounded-full px-6 py-2 text-sm font-semibold transition
    ${
      isScrolled
        ? "text-[#7C4A00] bg-white border border-[#7C4A00] hover:bg-[#f2e5d5] active:bg-[#7C4A00] active:text-white"
        : "text-[#7C4A00] bg-white border border-[#7C4A00] hover:bg-[#f2e5d5] active:bg-[#7C4A00] active:text-white"
    }`}
              >
                Daftar
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className={`${
                  isScrolled ? "text-white" : "text-black"
                } focus:outline-none`}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </nav>
        </header>

        <main className="pt-20">
          <img
            alt="Front view of Museum Lampung building with traditional architecture and surrounding greenery under a clear sky"
            className="w-full h-[600px] object-cover brightness-[0.55]"
            src="https://storage.googleapis.com/a1aa/image/751e5f1e-e16b-4ec2-ff12-da02dedd1bfd.jpg"
          />
          <div
            className="absolute top-0 left-0 w-full h-[600px] flex flex-col justify-center max-w-[1200px] mx-auto px-6 md:px-12"
            style={{ pointerEvents: "none" }}
          >
            <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight max-w-4xl">
              Museum Lampung - Keajaiban Budaya di Sumatera Selatan
            </h1>
            <button className="mt-6 w-max bg-white text-[#7C4A00] text-sm font-semibold rounded-full px-5 py-2 cursor-pointer pointer-events-auto hover:bg-gray-100 transition">
              Jelajahi Sekarang
            </button>
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
        <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2024 Museum Lampung. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a aria-label="Facebook" className="hover:text-white" href="#">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a aria-label="Twitter" className="hover:text-white" href="#">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a aria-label="Instagram" className="hover:text-white" href="#">
                <i className="fab fa-instagram text-lg"></i>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </>
  );
}
