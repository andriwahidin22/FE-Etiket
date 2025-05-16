import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();
  const { email: queryEmail } = router.query;

  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Isi email dari query parameter jika ada
  useEffect(() => {
    if (queryEmail) {
      setFormData((prev) => ({ ...prev, email: queryEmail }));
    }
  }, [queryEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Password baru dan konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: formData.code,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Reset password gagal");
      }

      setSuccess(data.msg);

      // Redirect ke login setelah 3 detik
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password - Museum Lampung</title>
        <meta name="description" content="Reset password akun Museum Lampung" />
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
            <Link href="/login" className="text-sm text-gray-600 hover:text-[#7C4A00] transition-colors">
              Kembali ke Login
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-28 min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center font-semibold text-xl mb-2 text-[#7C4A00]">
              Reset Password
            </h2>
            <p className="text-center text-sm mb-6 text-gray-600">
              Masukkan email, kode reset, dan password baru Anda
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
                {success} <br />
                Anda akan diarahkan ke halaman login...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Masukkan Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium mb-1 text-gray-700">
                  Kode Reset Password
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Masukkan Kode Reset"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1 text-gray-700">
                  Password Baru
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Masukkan Password Baru"
                  value={formData.newPassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium mb-1 text-gray-700">
                  Konfirmasi Password Baru
                </label>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Masukkan Ulang Password Baru"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00] placeholder-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7C4A00] text-white py-2 rounded-md text-sm font-medium hover:bg-[#5a3700] transition flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
