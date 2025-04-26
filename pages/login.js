import { useState, useEffect } from "react";
import Head from "next/head";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import MuseumHeader from "./components/MuseumHeader";

export default function Login() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
  };

  return (
    <>
      <Head>
        <title>Login - Museum Lampung</title>
        <meta name="description" content="Login ke akun Museum Lampung" />
      </Head>

      <div className="relative bg-white text-gray-800">

        {/* Header dengan */}
        <MuseumHeader/>

        {/* Main Content */}
        <main className="max-w-md mx-auto mt-32 px-4 pb-20">
          <h2 className="text-center font-semibold text-lg leading-6 mb-1 text-[#7C4A00]">
            Selamat Datang Kembali
          </h2>
          <p className="text-center text-sm mb-6 text-[#7C4A00]">
            Masuk ke akun Anda untuk melanjutkan
          </p>
          
          <form className="space-y-4 border border-[#7C4A00] rounded-md p-6 shadow-sm" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#7C4A00]" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border border-[#7C4A00] rounded px-3 py-2 text-sm placeholder-[#7C4A00]/50 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                id="email"
                name="email"
                placeholder="Masukkan Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#7C4A00]" htmlFor="password">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  className="w-full border border-[#7C4A00] rounded px-3 py-2 pr-10 text-sm placeholder-[#7C4A00]/50 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                  id="password"
                  name="password"
                  placeholder="Masukkan Kata Sandi"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7C4A00] focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#7C4A00] focus:ring-[#7C4A00] border-[#7C4A00] rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-xs text-[#7C4A00]">
                  Ingat saya
                </label>
              </div>
              <a href="/forgot-password" className="text-xs text-[#7C4A00] hover:underline">
                Lupa password?
              </a>
            </div>
            
            <button
              className="w-full bg-[#7C4A00] text-white py-2 rounded text-sm font-semibold hover:bg-[#5a3700] transition"
              type="submit"
            >
              Masuk
            </button>
          </form>
          
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-[#7C4A00]"></div>
            <span className="mx-4 text-sm text-[#7C4A00]">atau</span>
            <div className="flex-grow border-t border-[#7C4A00]"></div>
          </div>

          <button
            className="w-full border border-[#7C4A00] text-[#7C4A00] py-2 rounded text-sm font-semibold hover:bg-[#7C4A00]/10 transition flex items-center justify-center gap-2"
          >
            <FaGoogle className="text-[#7C4A00]" />
            Masuk dengan Google
          </button>
          
          <p className="text-center text-sm mt-6 text-[#7C4A00]">
            Belum punya akun?{' '}
            <a href="/register" className="font-semibold hover:underline">
              Daftar sekarang
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