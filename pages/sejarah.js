import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";

export default function Sejarah() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <title>Sejarah Museum Lampung - Jejak Budaya dan Warisan</title>
        <meta name="description" content="Pelajari sejarah panjang Museum Lampung sebagai penyimpan warisan budaya Sumatera Selatan" />
      </Head>

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
                    className={`hover:text-[#7C4A00] ${
                      isScrolled ? "text-white" : "text-black"
                    }`}
                    href="/"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    className={`relative inline-block pb-1 font-semibold ${
                      isScrolled
                        ? "text-white hover:text-[#7C4A00]"
                        : "text-black hover:text-[#7C4A00]"
                    }`}
                    href="#"
                  >
                    Sejarah
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7C4A00] rounded"></span>
                  </a>
                </li>
                {["Destinasi Info", "Venue", "Galery", "Contact"].map(
                  (text) => (
                    <li key={text}>
                      <a
                        className={`hover:text-[#7C4A00] ${
                          isScrolled ? "text-white" : "text-black"
                        }`}
                        href={`/${text.toLowerCase().replace(' ', '-')}`}
                      >
                        {text}
                      </a>
                    </li>
                  )
                )}
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
                className={`${
                  isScrolled ? "text-white" : "text-black"
                } focus:outline-none`}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="relative h-[400px]">
          <Image
            src="https://storage.googleapis.com/a1aa/image/751e5f1e-e16b-4ec2-ff12-da02dedd1bfd.jpg"
            alt="Gedung Museum Lampung"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              Sejarah Museum Lampung
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <section className="mb-16">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
                  Asal Usul Museum Lampung
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Museum Lampung didirikan pada tahun 1985 sebagai bentuk pelestarian warisan budaya dan sejarah masyarakat Lampung. Gagasan pendirian museum ini muncul dari kebutuhan untuk mendokumentasikan dan memamerkan kekayaan budaya Lampung yang mulai tergerus zaman.
                  </p>
                  <p>
                    Pembangunan museum ini merupakan hasil kerjasama antara pemerintah daerah Lampung dengan Kementerian Pendidikan dan Kebudayaan. Arsitektur bangunan museum sendiri terinspirasi dari rumah adat Lampung, menggabungkan unsur tradisional dengan fungsi modern.
                  </p>
                  <p>
                    Pada awalnya, museum hanya memiliki sekitar 200 koleksi. Namun seiring waktu, melalui berbagai ekspedisi budaya dan sumbangan masyarakat, koleksi museum terus bertambah hingga mencapai lebih dari 5.000 artefak budaya dan benda bersejarah saat ini.
                  </p>
                </div>
              </div>
              <div className="md:w-1/3">
                <Image
                  src="https://storage.googleapis.com/a1aa/image/4b1fc25a-1a78-4500-3fa4-422c2cc9f4a9.jpg"
                  alt="Gedung Museum Lampung tahun 1980an"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Gedung Museum Lampung pada masa awal berdiri (1985)
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
              Perkembangan Museum
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  year: "1985-1990",
                  title: "Masa Pembentukan",
                  desc: "Pengumpulan koleksi awal dan penyusunan sistem pengelolaan museum"
                },
                {
                  year: "1991-2000",
                  title: "Ekspansi Koleksi",
                  desc: "Penambahan berbagai artefak budaya dari ekspedisi ke seluruh wilayah Lampung"
                },
                {
                  year: "2001-Sekarang",
                  title: "Modernisasi",
                  desc: "Penerapan teknologi dalam pengelolaan koleksi dan penyajian informasi"
                }
              ].map((item, index) => (
                <div key={index} className="bg-[#f9f9f9] p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#7C4A00]">{item.year}</h3>
                  <h4 className="text-md font-medium mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
              Koleksi Penting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Naskah Kuno Lampung",
                  desc: "Koleksi naskah kuno yang ditulis dalam aksara Lampung (Kaganga) yang berisi tentang hukum adat, sastra, dan ilmu pengetahuan tradisional.",
                  img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Museum_Lampung_Artifacts.jpg"
                },
                {
                  title: "Tenun Tradisional",
                  desc: "Koleksi kain tenun Lampung asli dari berbagai daerah dengan motif dan teknik tenun yang berbeda-beda.",
                  img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Tenun_Lampung.jpg"
                }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}