import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaTicketAlt } from "react-icons/fa";
import BuyTicketButton from "../pages/components/BuyTicketButton";
import MuseumHeader from "./components/MuseumHeader";

export default function Venue() {
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
        <title>Venue Museum Lampung - Fasilitas dan Ruang Pamer</title>
        <meta
          name="description"
          content="Temukan berbagai ruang pamer dan fasilitas yang tersedia di Museum Lampung"
        />
      </Head>

      <div className="relative bg-white text-gray-800">
        {/* Header */}
        <MuseumHeader/>

        {/* Hero Section */}
        <main className="pt-20">
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
                Venue Museum Lampung
              </h1>
            </div>
          </div>
        </main>

        {/* Main Content */}
        <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
              Ruang Pamer
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Ruang Budaya Lampung",
                  desc: "Menyajikan berbagai artefak budaya masyarakat Lampung dari masa ke masa.",
                  img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Museum_Lampung_Visitors.jpg",
                },
                {
                  title: "Ruang Arkeologi",
                  desc: "Menampilkan temuan arkeologi dari berbagai situs di wilayah Lampung.",
                  img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Museum_Lampung_Artifacts.jpg",
                },
                {
                  title: "Ruang Khusus Temporer",
                  desc: "Digunakan untuk pameran temporer dengan tema tertentu yang berganti secara berkala.",
                  img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Museum_Lampung_Cultural_Artifacts.jpg",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
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

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
              Fasilitas Pendukung
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Auditorium",
                  desc: "Ruang serbaguna dengan kapasitas 200 orang, dilengkapi dengan peralatan multimedia untuk seminar, workshop, dan pertunjukan budaya.",
                  capacity: "Kapasitas: 200 orang",
                  img: "https://storage.googleapis.com/a1aa/image/4b1fc25a-1a78-4500-3fa4-422c2cc9f4a9.jpg",
                },
                {
                  title: "Perpustakaan",
                  desc: "Koleksi buku dan dokumen tentang sejarah dan budaya Lampung yang dapat diakses oleh pengunjung.",
                  capacity: "Koleksi: 5.000+ buku",
                  img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Museum_Lampung_2019.jpg",
                },
                {
                  title: "Ruang Serbaguna",
                  desc: "Tersedia untuk penyelenggaraan acara seperti pameran temporer, bazaar, atau kegiatan komunitas.",
                  capacity: "Luas: 500 m²",
                  img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Alat_musik_tradisional_Lampung.jpg",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 border-b border-gray-200 pb-8"
                >
                  <div className="md:w-1/3">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={400}
                      height={250}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-3">{item.desc}</p>
                    <p className="text-sm text-gray-500">{item.capacity}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">
              Peta Lokasi Venue
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg">
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
          </section>
        </main>
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
