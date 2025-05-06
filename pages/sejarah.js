import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaTicketAlt } from "react-icons/fa";
import BuyTicketButton from "./components/common/BuyTicketButton";
import MuseumHeader from "./components/common/MuseumHeader";

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
        <meta
          name="description"
          content="Pelajari sejarah panjang Museum Lampung sebagai penyimpan warisan budaya Sumatera Selatan"
        />
      </Head>

      <div className="relative bg-white text-gray-800">
        {/* Header */}
        <MuseumHeader/>

        {/* Hero Section */}
        <main className="pt-20">
          <div className="relative h-[400px]">
            <Image
              src="https://lampungmediaonline.com/wp-content/uploads/2020/12/IMG-20201212-WA0000.jpg"
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
        <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <section className="mb-16">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
                  Asal Usul Museum Lampung
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Museum Lampung didirikan pada tahun 1985 sebagai bentuk
                    pelestarian warisan budaya dan sejarah masyarakat Lampung.
                    Gagasan pendirian museum ini muncul dari kebutuhan untuk
                    mendokumentasikan dan memamerkan kekayaan budaya Lampung
                    yang mulai tergerus zaman.
                  </p>
                  <p>
                    Pembangunan museum ini merupakan hasil kerjasama antara
                    pemerintah daerah Lampung dengan Kementerian Pendidikan dan
                    Kebudayaan. Arsitektur bangunan museum sendiri terinspirasi
                    dari rumah adat Lampung, menggabungkan unsur tradisional
                    dengan fungsi modern.
                  </p>
                  <p>
                    Pada awalnya, museum hanya memiliki sekitar 200 koleksi.
                    Namun seiring waktu, melalui berbagai ekspedisi budaya dan
                    sumbangan masyarakat, koleksi museum terus bertambah hingga
                    mencapai lebih dari 5.000 artefak budaya dan benda
                    bersejarah saat ini.
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
                  desc: "Pengumpulan koleksi awal dan penyusunan sistem pengelolaan museum",
                },
                {
                  year: "1991-2000",
                  title: "Ekspansi Koleksi",
                  desc: "Penambahan berbagai artefak budaya dari ekspedisi ke seluruh wilayah Lampung",
                },
                {
                  year: "2001-Sekarang",
                  title: "Modernisasi",
                  desc: "Penerapan teknologi dalam pengelolaan koleksi dan penyajian informasi",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f9f9f9] p-6 rounded-lg border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-[#7C4A00]">
                    {item.year}
                  </h3>
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
                  img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Museum_Lampung_Artifacts.jpg",
                },
                {
                  title: "Tenun Tradisional",
                  desc: "Koleksi kain tenun Lampung asli dari berbagai daerah dengan motif dan teknik tenun yang berbeda-beda.",
                  img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Tenun_Lampung.jpg",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
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
      <BuyTicketButton />
    </>
  );
}
