//my-landing-page/pages/register.js

import { useState } from "react";
import Head from "next/head";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.passwordConfirm) {
      setError("Password dan konfirmasi password tidak sama");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Registrasi gagal");
      }

      // Setelah registrasi sukses, arahkan ke halaman verifikasi email dengan userId dan email
      router.push(`/verify-email?userId=${data.userId}&email=${encodeURIComponent(formData.email)}`);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Daftar - Museum Lampung</title>
        <meta name="description" content="Daftar akun Museum Lampung" />
      </Head>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-8 py-4">
          <Link href="/" className="flex items-center">
            <div className="flex flex-col leading-none">
              <span className="text-[18px] font-light tracking-wide text-gray-800">
                lampungheritage
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-gray-600">
                CULTURE & HISTORY EXPERIENCE
              </span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-sm text-gray-600 hover:text-[#7C4A00] transition-colors"
            >
              Sudah punya akun? Masuk
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-28 min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center font-semibold text-xl mb-2 text-[#7C4A00]">
              Daftar Akun Baru
            </h2>
            <p className="text-center text-sm mb-6 text-gray-600">
              Isi formulir berikut untuk membuat akun
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="fullName">
                  Nama Lengkap
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                  id="fullName"
                  name="fullName"
                  placeholder="Masukkan Nama Lengkap"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
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
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="phoneNumber">
                  Nomor Telepon
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Masukkan Nomor Telepon"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">
                  Kata Sandi (minimal 8 karakter)
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                    id="password"
                    name="password"
                    placeholder="Masukkan Kata Sandi"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    minLength="8"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#7C4A00]"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="passwordConfirm">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Masukkan Ulang Kata Sandi"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    minLength="8"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#7C4A00]"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={showConfirmPassword ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-[#7C4A00] text-white py-2 rounded-md text-sm font-medium hover:bg-[#5a3700] transition flex justify-center items-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : "Daftar"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
