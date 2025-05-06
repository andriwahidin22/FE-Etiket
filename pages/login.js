// file: pages/login.js

import { useState } from "react";
import Head from "next/head";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.msg || "Login gagal");
      }
  
      if (!data.token) {
        throw new Error("Token tidak ditemukan di respons server.");
      }
  
      setCookie("token", data.token, {
        maxAge: 60 * 60 * 24, // 1 hari
        path: "/",
      });
  
      // Redirect berdasarkan role
      const userRole = data.role?.toUpperCase();
      if (userRole === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <Head>
        <title>Login - Museum Lampung</title>
        <meta name="description" content="Login ke akun Museum Lampung" />
      </Head>

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
            <Link href="/" className="text-sm text-gray-600 hover:text-[#7C4A00] transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-28 min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center font-semibold text-xl mb-2 text-[#7C4A00]">
              Selamat Datang Kembali
            </h2>
            <p className="text-center text-sm mb-6 text-gray-600">
              Masuk ke akun Anda untuk melanjutkan
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Field */}
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
              
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">
                  Kata Sandi
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
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#7C4A00]"
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
                    className="h-4 w-4 text-[#7C4A00] focus:ring-[#7C4A00] border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-xs text-gray-600">
                    Ingat saya
                  </label>
                </div>
                <Link href="/forgot-password" className="text-xs text-[#7C4A00] hover:underline">
                  Lupa password?
                </Link>
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
                ) : "Masuk"}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">atau</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-[#DB4437]" />
              Masuk dengan Google
            </button>
            
            <p className="text-center text-sm mt-6 text-gray-600">
              Belum punya akun?{' '}
              <Link href="/register" className="font-medium text-[#7C4A00] hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
