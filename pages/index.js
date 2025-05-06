//page/index.js

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTicketAlt, FaArrowRight, FaTimes } from "react-icons/fa";
import MuseumHeader from "./components/common/MuseumHeader";
import BuyTicketButton from "./components/common/BuyTicketButton";

// Data dummy untuk koleksi
const dummyCollections = [
  {
    id: 1,
    title: "Tenun Tapis",
    year: "Abad 18",
    shortDescription: "Kain tradisional Lampung dengan motif emas yang indah",
    image: "https://storage.googleapis.com/a1aa/image/ebe59a5f-d698-4c6c-4265-156eb1cf22cf.jpg"
  },
  {
    id: 2,
    title: "Keris Kuno",
    year: "Abad 15",
    shortDescription: "Senjata tradisional dengan ukiran khas Lampung",
    image: "https://storage.googleapis.com/a1aa/image/e22f4a53-e499-4b1d-6663-0e6affe4315f.jpg"
  },
  {
    id: 3,
    title: "Gong Gantung",
    year: "Abad 17",
    shortDescription: "Alat musik tradisional dari perunggu",
    image: "https://storage.googleapis.com/a1aa/image/12f7d456-0096-4f51-d2ff-7f96fe98720b.jpg"
  },
  {
    id: 4,
    title: "Guci Keramik",
    year: "Abad 16",
    shortDescription: "Tempat penyimpanan dari tanah liat dengan motif kuno",
    image: "https://storage.googleapis.com/a1aa/image/1337f648-de50-4122-aba4-99a4f8af343a.jpg"
  }
];

// Komponen Modal untuk Koleksi
function CollectionModal({ collection, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-lg max-w-md w-full relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
          
          <img 
            src={collection.image} 
            alt={collection.title}
            className="w-full h-48 object-cover"
          />
          
          <div className="p-6">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              {collection.title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mb-4"
            >
              {collection.year}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700 mb-6"
            >
              {collection.shortDescription}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                className="inline-flex items-center bg-[#7C4A00] text-white px-4 py-2 rounded hover:bg-[#5a3600] transition"
                onClick={() => alert(`Akan mengarah ke detail koleksi ${collection.id}`)}
              >
                Baca Selengkapnya <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [heroImage, setHeroImage] = useState(
    "https://www.asdp.id/storage/uploads/siaranpers/d905b966b12f4610fce258007a737f4d.jpeg"
  );
  
  return (
    <>
      <Head>
        <title>Museum Lampung - Ruwai Jurai</title>
      </Head>

      <div className="relative bg-white text-gray-800">
        <MuseumHeader />

        <main className="pt-20 relative">
          {/* Hero Section with Multiple Fallback Strategies */}
          <div className="relative h-[700px]">
            <Image
              src="https://www.asdp.id/storage//uploads/siaranpers/d905b966b12f4610fce258007a737f4d.jpeg"
              alt="Gedung Museum Lampung"
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                MUSEUM LAMPUNG - RUWAI JURAI
              </h1>
            </div>
          </div>

          {/* Destinasi Section */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-semibold text-gray-900">
                Destinasi Wisata
              </h2>
              <button 
                className="flex items-center text-[#7C4A00] hover:text-[#5a3600] font-medium"
                onClick={() => alert("Akan mengarah ke halaman destinasi")}
              >
                Lihat Semua <FaArrowRight className="ml-2" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Galeri Seni",
                  desc: "Koleksi seni tradisional dan kontemporer Lampung",
                  img: "https://storage.googleapis.com/a1aa/image/ebe59a5f-d698-4c6c-4265-156eb1cf22cf.jpg"
                },
                {
                  title: "Ruang Sejarah",
                  desc: "Perjalanan sejarah Lampung dari masa ke masa",
                  img: "https://storage.googleapis.com/a1aa/image/e22f4a53-e499-4b1d-6663-0e6affe4315f.jpg"
                },
                {
                  title: "Taman Budaya",
                  desc: "Area outdoor dengan berbagai pertunjukan budaya",
                  img: "https://storage.googleapis.com/a1aa/image/12f7d456-0096-4f51-d2ff-7f96fe98720b.jpg"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <img
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    src={item.img}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sejarah Section */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                    Sejarah Museum Lampung
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Museum Lampung didirikan pada tahun 1975 dan diresmikan pada tahun 1988. 
                    Museum ini menyimpan lebih dari 4.800 koleksi benda bersejarah dan budaya 
                    yang menjadi saksi perkembangan peradaban masyarakat Lampung.
                  </p>
                  <button
                    className="inline-flex items-center text-[#7C4A00] hover:text-[#5a3600] font-medium"
                    onClick={() => alert("Akan mengarah ke halaman sejarah")}
                  >
                    Baca Selengkapnya <FaArrowRight className="ml-2" />
                  </button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://storage.googleapis.com/a1aa/image/353a668a-bcd1-4a0e-e1cd-6b11314b6da3.jpg" 
                    alt="Gedung Museum Lampung" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Koleksi Unggulan Section */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-semibold text-gray-900">
                Koleksi Unggulan
              </h2>
              <button 
                className="flex items-center text-[#7C4A00] hover:text-[#5a3600] font-medium"
                onClick={() => alert("Akan mengarah ke halaman koleksi")}
              >
                Lihat Semua <FaArrowRight className="ml-2" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dummyCollections.map((collection) => (
                <motion.div 
                  key={collection.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center cursor-pointer"
                  onClick={() => setSelectedCollection(collection)}
                >
                  <motion.div 
                    whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="rounded-lg overflow-hidden"
                  >
                    <img
                      alt={collection.title}
                      className="w-full h-40 object-cover"
                      src={collection.image}
                    />
                  </motion.div>
                  <h3 className="font-medium text-gray-900 mt-2">{collection.title}</h3>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Galeri Section */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-semibold text-gray-900">
                  Galeri Foto
                </h2>
                <button 
                  className="flex items-center text-[#7C4A00] hover:text-[#5a3600] font-medium"
                  onClick={() => alert("Akan mengarah ke halaman galeri")}
                >
                  Lihat Semua <FaArrowRight className="ml-2" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map((item) => (
                  <div key={item} className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={`https://storage.googleapis.com/a1aa/image/${item === 1 ? 'ebe59a5f-d698-4c6c-4265-156eb1cf22cf' : 
                            item === 2 ? 'e22f4a53-e499-4b1d-6663-0e6affe4315f' :
                            item === 3 ? '12f7d456-0096-4f51-d2ff-7f96fe98720b' :
                            item === 4 ? '1337f648-de50-4122-aba4-99a4f8af343a' :
                            '353a668a-bcd1-4a0e-e1cd-6b11314b6da3'}.jpg`}
                      alt={`Galeri ${item}`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Info Tiket */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900">
              Kunjungi Museum Lampung
            </h2>
            <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-8">
              Buka Selasa-Minggu, pukul 08.00-16.00 WIB. Dapatkan pengalaman 
              wisata budaya yang tak terlupakan di Museum Lampung.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-[#7C4A00] hover:bg-[#5a3600] text-white font-semibold rounded-full px-8 py-3 transition flex items-center"
                onClick={() => alert("Akan mengarah ke pemesanan tiket")}
              >
                <FaTicketAlt className="mr-2" /> Pesan Tiket
              </button>
              <button
                className="border border-[#7C4A00] text-[#7C4A00] hover:bg-[#f8f3ec] font-semibold rounded-full px-8 py-3 transition"
                onClick={() => alert("Akan mengarah ke halaman tur")}
              >
                Tur Museum
              </button>
            </div>
          </section>
        </main>

        {/* Modal untuk koleksi yang dipilih */}
        {selectedCollection && (
          <CollectionModal 
            collection={selectedCollection}
            onClose={() => setSelectedCollection(null)}
          />
        )}

        {/* Floating Buy Ticket Button */}
        <BuyTicketButton/>

        {/* Footer */}
        <footer className="bg-[#f9f9f9] border-t border-gray-300 pt-10 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Museum Lampung</h3>
                <p className="text-gray-600 text-sm">
                  Jl. Pangeran Antasari No. 8, Bandar Lampung, Lampung 35131
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Menu</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><button className="hover:text-[#7C4A00]" onClick={() => alert("Beranda")}>Beranda</button></li>
                  <li><button className="hover:text-[#7C4A00]" onClick={() => alert("Destinasi")}>Destinasi</button></li>
                  <li><button className="hover:text-[#7C4A00]" onClick={() => alert("Sejarah")}>Sejarah</button></li>
                  <li><button className="hover:text-[#7C4A00]" onClick={() => alert("Koleksi")}>Koleksi</button></li>
                  <li><button className="hover:text-[#7C4A00]" onClick={() => alert("Galeri")}>Galeri</button></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Kontak</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>info@museumlampung.id</li>
                  <li>+62 812 3456 7890</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Sosial Media</h3>
                <div className="flex space-x-4">
                  {['facebook', 'instagram', 'twitter', 'youtube'].map((icon) => (
                    <button 
                      key={icon} 
                      className="text-gray-600 hover:text-[#7C4A00]"
                      onClick={() => alert(`Membuka ${icon}`)}
                    >
                      <i className={`fab fa-${icon} text-lg`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Museum Lampung. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}