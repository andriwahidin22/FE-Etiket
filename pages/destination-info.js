// pages/index.js

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle, FaTicketAlt } from "react-icons/fa";

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
      <div className="relative bg-white text-gray-800">
        {/* Header */}
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
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
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
            className="w-full h-[300px] object-cover brightness-[0.55]"
            src="https://storage.googleapis.com/a1aa/image/751e5f1e-e16b-4ec2-ff12-da02dedd1bfd.jpg"
          />
          <div
            className="absolute top-0 left-0 w-full h-[400px] flex flex-col justify-center max-w-[1200px] mx-auto px-6 md:px-12"
            style={{ pointerEvents: "none" }}
          >
            <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight max-w-4xl">
              Destination Info
            </h1>
          </div>
        </main>

        {/* Konten baru yang Anda minta */}
        <main className="pt-[72px] max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <h1 className="text-4xl font-semibold text-gray-900 mb-8 text-center">
            Destinasi Info Museum Lampung
          </h1>
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-[#7C4A00]">
              Sejarah Museum Lampung
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
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-[#7C4A00]">
              Galeri Museum Lampung
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  alt="Exterior view of Museum Lampung building with traditional architecture and blue sky"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  height={320}
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Museum_Lampung_2019.jpg"
                  width={480}
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  alt="Traditional Lampung woven fabric displayed inside Museum Lampung"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  height={320}
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Tenun_Lampung.jpg"
                  width={480}
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  alt="Ancient artifacts displayed in Museum Lampung"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  height={320}
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Museum_Lampung_Artifacts.jpg"
                  width={480}
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  alt="Traditional Lampung musical instruments displayed in museum"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  height={320}
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Alat_musik_tradisional_Lampung.jpg"
                  width={480}
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  alt="Visitors exploring exhibits inside Museum Lampung"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  height={320}
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Museum_Lampung_Visitors.jpg"
                  width={480}
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  alt="Traditional Lampung cultural artifacts displayed in museum"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  height={320}
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Museum_Lampung_Cultural_Artifacts.jpg"
                  width={480}
                />
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-[#7C4A00]">
              Lokasi dan Akses
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify mb-6">
              Museum Lampung terletak di pusat kota Bandar Lampung, mudah
              diakses dengan kendaraan umum maupun pribadi. Alamat lengkapnya
              adalah Jl. Pangeran Antasari No. 10, Bandar Lampung. Tersedia area
              parkir yang luas dan fasilitas pendukung untuk kenyamanan
              pengunjung.
            </p>
            <iframe
              className="w-full h-64 rounded-md shadow-md"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1234567890123!2d105.2617!3d-5.4294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40d3f1a1a1a1a1%3A0x123456789abcdef!2sMuseum%20Lampung!5e0!3m2!1sen!2sid!4v1696000000000!5m2!1sen!2sid"
              style={{ border: 0 }}
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Museum Lampung"
            ></iframe>
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

        {/* Bagian Jam Operasional dan lainnya */}
        <div>
          {/* Navigation */}
          <nav className="flex justify-center space-x-10 border-b border-gray-300 text-sm py-3 max-w-7xl mx-auto px-4">
            <a
              className="text-[#a3b04a] font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#a3b04a] after:rounded-sm"
              href="#"
            >
              Jam Operasional
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Tata Tertib
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Jenis Tiket
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Informasi Harga Tiket
            </a>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {/* Section: Jam Operasional */}
            <section className="flex flex-col md:flex-row md:space-x-10">
              <div className="md:w-1/2">
                <h2 className="font-bold text-xl mb-6 text-gray-900">
                  Jam Operasional
                </h2>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#a3b04a] flex items-center justify-center text-white text-xs">
                      <FaArrowRight />
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-gray-600 leading-relaxed">
                    Open Everyday: 08.00 - 16.00 WIB.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#a3b04a] flex items-center justify-center text-white text-xs">
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
                  alt="Museum Lampung building exterior with traditional architecture and clear blue sky"
                  src="https://storage.googleapis.com/a1aa/image/4b1fc25a-1a78-4500-3fa4-422c2cc9f4a9.jpg"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </section>

            {/* Divider */}
            <hr className="border-t border-gray-700 mt-14 mb-8" />

            {/* Section: Informasi Harga Tiket */}
            <section className="text-center max-w-4xl mx-auto px-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Informasi Harga Tiket
              </h3>
              <p className="text-xs text-gray-500 mb-10 leading-tight">
                Kami menawarkan berbagai pilihan tiket dengan harga yang
                kompetitif dan terjangkau. Berikut adalah informasi lengkap
                tentang jenis tiket dan paket tiket yang tersedia di Museum
                Lampung:
              </p>
            </section>

            {/* Pricing Cards */}
            <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {/* Jenis Tiket */}
              <Card
                title="Jenis Tiket"
                description="Tarif pengunjung berdasarkan kategori usia dan status pelajar:"
                items={[
                  { label: "Dewasa (12 tahun ke atas)", price: "Rp. 20.000" },
                  { label: "Anak-anak (3 s/d 11 tahun)", price: "Rp. 10.000" },
                  {
                    label: "Pelajar dan Mahasiswa dengan kartu pelajar",
                    price: "Rp. 15.000",
                  },
                ]}
                buttonText="Pesan Sekarang"
              />

              {/* Paket Tiket */}
              <Card
                title="Paket Tiket"
                description="Paket khusus untuk mahasiswa, pelajar, dan instansi dengan minimal peserta:"
                items={[
                  { label: "Paket Mahasiswa", price: "Rp. 12.000 / orang" },
                  { label: "Paket Pelajar", price: "Rp. 10.000 / orang" },
                  {
                    label: "Paket Instansi (minimal 20 orang)",
                    price: "Rp. 18.000 / orang",
                  },
                ]}
                buttonText="Pesan Sekarang"
              />

              {/* Tata Tertib */}
              <article className="bg-[#e4ebc6] rounded-lg p-6 text-left text-sm text-gray-700">
                <h4 className="font-semibold mb-2 text-gray-900">
                  Tata Tertib
                </h4>
                <p className="mb-4 text-xs">
                  Peraturan yang harus dipatuhi selama kunjungan di Museum
                  Lampung:
                </p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-2 mb-6">
                  <li>Dilarang merokok di area museum.</li>
                  <li>
                    Dilarang membawa makanan dan minuman ke dalam ruang pamer.
                  </li>
                  <li>Dilarang menyentuh koleksi museum secara langsung.</li>
                  <li>
                    Harap menjaga ketertiban dan kebersihan selama kunjungan.
                  </li>
                  <li>
                    Pengunjung diwajibkan mengikuti petunjuk dari petugas
                    museum.
                  </li>
                </ul>
                <Button text="Baca Selengkapnya" />
              </article>
            </section>

            {/* Buy Ticket Button bottom right */}
            <div className="fixed bottom-6 right-6">
              <button
                aria-label="Buy Ticket"
                className="bg-[#a3b04a] text-white text-xs rounded-full py-2 px-4 flex items-center gap-2 hover:bg-[#8a9a3a] transition"
              >
                Buy Ticket
                <FaTicketAlt />
              </button>
            </div>
          </main>
        </div>
      </div>
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
            <p className="font-semibold mb-1">Representative Office Address</p>
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
            <p className="ml-2 text-xs text-gray-600">
              {item.label}
              <br />
              <span className="font-bold text-gray-900">{item.price}</span>
            </p>
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
