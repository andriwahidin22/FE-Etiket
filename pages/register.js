import { useState, useEffect } from "react"; // Pastikan ini di baris paling atas
import Head from "next/head";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MuseumHeader from "./components/MuseumHeader";

export default function Register() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <Head>
        <title>Kontak Museum Lampung - Hubungi Kami</title>
        <meta
          name="description"
          content="Hubungi Museum Lampung untuk informasi lebih lanjut, kunjungan kelompok, atau pertanyaan lainnya"
        />
      </Head>

      <div className="relative bg-white text-gray-800">

        {/* Header */}
        <MuseumHeader/>

        {/* Main Content */}
        <main className="max-w-md mx-auto mt-32 px-4 pb-20">
          <h2 className="text-center font-semibold text-lg leading-6 mb-1 text-[#7C4A00]">
            Selamat Datang di Website Museum Lampung
          </h2>
          <p className="text-center text-sm mb-6 text-[#7C4A00]">
            Login untuk melanjutkan dan mendapatkan pengalaman terbaik dari
            layanan kami.
          </p>
          <h3 className="text-center font-semibold text-base mb-6 text-[#7C4A00]">
            Daftar akun Museum Lampung
          </h3>

          <form
            className="space-y-4 border border-[#7C4A00] rounded-md p-6 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                className="block text-sm font-semibold mb-1 text-[#7C4A00]"
                htmlFor="fullname"
              >
                Nama Lengkap
              </label>
              <input
                className="w-full border border-[#7C4A00] rounded px-3 py-2 text-sm placeholder-[#7C4A00]/50 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                id="fullname"
                name="fullname"
                placeholder="Masukkan Nama Lengkap"
                type="text"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-1 text-[#7C4A00]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full border border-[#7C4A00] rounded px-3 py-2 text-sm placeholder-[#7C4A00]/50 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                id="email"
                name="email"
                placeholder="Masukkan Email"
                type="email"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-1 text-[#7C4A00]"
                htmlFor="phone"
              >
                Nomor Telepon
              </label>
              <input
                className="w-full border border-[#7C4A00] rounded px-3 py-2 text-sm placeholder-[#7C4A00]/50 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                id="phone"
                name="phone"
                placeholder="Masukkan Nomor Telepon"
                type="tel"
                required
              />
            </div>

            <div className="relative">
              <label
                className="block text-sm font-semibold mb-1 text-[#7C4A00]"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  className="w-full border border-[#7C4A00] rounded px-3 py-2 pr-10 text-sm placeholder-[#7C4A00]/50 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                  id="password"
                  name="password"
                  placeholder="Masukkan Kata Sandi"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7C4A00] focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <label
                className="block text-sm font-semibold mb-1 text-[#7C4A00]"
                htmlFor="password_confirm"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  className="w-full border border-[#7C4A00] rounded px-3 py-2 pr-10 text-sm placeholder-[#7C4A00]/50 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                  id="password_confirm"
                  name="password_confirm"
                  placeholder="Masukkan Konfirmasi Kata Sandi"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Sembunyikan konfirmasi password"
                      : "Tampilkan konfirmasi password"
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7C4A00] focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              className="w-full bg-[#7C4A00] text-white py-2 rounded text-sm font-semibold hover:bg-[#5a3700] transition"
              type="submit"
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-[#7C4A00]">
            Sudah punya akun?{" "}
            <a href="/login" className="font-semibold hover:underline">
              Masuk disini
            </a>
          </p>
        </main>
        
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

      </div>
    </>
  );
}
