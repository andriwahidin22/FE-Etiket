// components/MuseumFooter.js
'use client';

import Link from 'next/link';
import Image from 'next/image';

const MuseumFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Museum Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Museum Lampung Ruwai Jurai</h3>
            <p className="text-sm text-gray-600">
              Museum kebanggaan Provinsi Lampung yang menyimpan warisan budaya dan sejarah masyarakat Lampung.
            </p>
            <div className="flex space-x-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Lampung_coa.png"
                alt="Pemerintah Provinsi Lampung"
                width={100}
                height={60}
                className="h-12 w-auto"
              />
              <Image
                src="/logo par.png"
                alt="Museum Lampung"
                width={100}
                height={60}
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              {[
                { name: "Beranda", link: "/" },
                { name: "Koleksi Museum", link: "/koleksi" },
                { name: "Sejarah Lampung", link: "/sejarah" },
                { name: "Tiket & Kunjungan", link: "/tiket" },
                { name: "Galeri Foto", link: "/galeri" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Kontak Kami</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-medium">Alamat:</span><br />
                Jl. ZA. Pagar Alam No. 64<br />
                Rajabasa, Bandar Lampung 35141
              </p>
              <p>
                <span className="font-medium">Telepon:</span> (0721) 703417
              </p>
              <p>
                <span className="font-medium">Email:</span> info@museumlampung.go.id
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Jam Buka</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p className="font-medium">Selasa - Minggu:</p>
              <p>08.00 - 16.00 WIB</p>
              <p className="font-medium mt-2">Senin:</p>
              <p>Tutup</p>
              <p className="font-medium mt-2">Hari Libur Nasional:</p>
              <p>Tutup</p>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {[
                { icon: "instagram", link: "https://instagram.com/museumlampung" },
                { icon: "facebook", link: "https://facebook.com/museumlampung" },
                { icon: "youtube", link: "https://youtube.com/c/museumlampung" },
                { icon: "twitter", link: "https://twitter.com/museumlampung" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label={social.icon}
                >
                  <i className={`fab fa-${social.icon} text-lg`} />
                </a>
              ))}
            </div>

            <div className="text-xs text-gray-500 text-center md:text-right">
              <p>© {new Date().getFullYear()} Museum Lampung Ruwai Jurai. Seluruh hak cipta dilindungi.</p>
              <div className="mt-1 flex justify-center md:justify-end space-x-4">
                <Link href="/kebijakan-privasi" className="hover:text-blue-600 transition-colors">
                  Kebijakan Privasi
                </Link>
                <Link href="/syarat-ketentuan" className="hover:text-blue-600 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MuseumFooter;