// pages/galery.js
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaTicketAlt } from "react-icons/fa";
import BuyTicketButton from "./components/common/BuyTicketButton";
import MuseumHeader from "./components/common/MuseumHeader";

export default function Gallery() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("semua");

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data gallery
  const galleryItems = [
    {
      id: 1,
      title: "Bangunan Museum",
      category: "arsitektur",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Museum_Lampung_2019.jpg",
      desc: "Gedung utama Museum Lampung dengan arsitektur tradisional",
    },
    {
      id: 2,
      title: "Koleksi Tenun",
      category: "koleksi",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Tenun_Lampung.jpg",
      desc: "Kain tenun tradisional Lampung dengan motif khas",
    },
    {
      id: 3,
      title: "Artefak Kuno",
      category: "koleksi",
      img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Museum_Lampung_Artifacts.jpg",
      desc: "Berbagai artefak peninggalan sejarah Lampung",
    },
    {
      id: 4,
      title: "Alat Musik Tradisional",
      category: "koleksi",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Alat_musik_tradisional_Lampung.jpg",
      desc: "Alat musik khas Lampung yang masih dilestarikan",
    },
    {
      id: 5,
      title: "Area Pamer",
      category: "arsitektur",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Museum_Lampung_Visitors.jpg",
      desc: "Pengunjung sedang melihat koleksi museum",
    },
    {
      id: 6,
      title: "Taman Museum",
      category: "fasilitas",
      img: "https://storage.googleapis.com/a1aa/image/4b1fc25a-1a78-4500-3fa4-422c2cc9f4a9.jpg",
      desc: "Area taman dengan nuansa alam khas Lampung",
    },
    {
      id: 7,
      title: "Pameran Temporer",
      category: "kegiatan",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Museum_Lampung_Cultural_Artifacts.jpg",
      desc: "Suasana pameran temporer di ruang khusus",
    },
    {
      id: 8,
      title: "Workshop Budaya",
      category: "kegiatan",
      img: "https://storage.googleapis.com/a1aa/image/751e5f1e-e16b-4ec2-ff12-da02dedd1bfd.jpg",
      desc: "Peserta workshop belajar membuat kerajinan tradisional",
    },
  ];

  const categories = [
    { id: "semua", name: "Semua Kategori" },
    { id: "arsitektur", name: "Arsitektur" },
    { id: "koleksi", name: "Koleksi" },
    { id: "fasilitas", name: "Fasilitas" },
    { id: "kegiatan", name: "Kegiatan" },
  ];

  const filteredItems =
    activeCategory === "semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <Head>
        <title>Gallery Museum Lampung - Koleksi Visual Budaya Lampung</title>
        <meta
          name="description"
          content="Jelajahi koleksi visual Museum Lampung melalui galeri foto kami"/>
      </Head>

      <div className="relative bg-white text-gray-800">
        {/* Header */}
        <MuseumHeader/>

        {/* Hero Section */}
        <main className="pt-20">
          <div className="relative h-[400px]">
            <Image
              src="https://lampungpro.co/laravel-filemanager/photos/33/Suara.com/4125094026.jpg"
              alt="Gedung Museum Lampung"
              layout="fill"
              objectFit="cover"
              className="brightness-75"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                GALERI
              </h1>
            </div>
          </div>
        </main>

        {/* Main Content */}
        <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          {/* Filter Kategori */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === category.id
                    ? "bg-[#7C4A00] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-[#7C4A00] text-white text-xs px-2 py-1 rounded">
                  {categories.find((cat) => cat.id === item.category)?.name}
                </div>
              </div>
            ))}
          </div>

          {/* Virtual Tour Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00] text-center">
              Virtual Tour Museum
            </h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-[500px]"
                src="https://youtu.be/gR8kj6ti-s4?si=EBwzo2a5Bm0hgoVK"
                title="Virtual Tour Museum Lampung"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center mt-4 text-gray-600">
              Jelajahi Museum Lampung secara virtual dari kenyamanan rumah Anda
            </p>
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
