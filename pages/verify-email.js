//my-landing-page/pages/verify-email.js

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyEmail() {
  const router = useRouter();
  const { userId, email } = router.query;

  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!code) {
      setError("Kode verifikasi harus diisi");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: parseInt(userId, 10), code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Verifikasi gagal");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage(null);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Gagal mengirim ulang kode verifikasi");
      }

      setResendMessage(data.msg);
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  if (!userId || !email) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <p className="text-red-600">Data pengguna tidak ditemukan. Harap registrasi ulang.</p>
        <Link href="/register" className="text-[#7C4A00] underline mt-4">Kembali ke Registrasi</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Verifikasi Email - Museum Lampung</title>
        <meta name="description" content="Halaman verifikasi email Museum Lampung" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4 text-[#7C4A00]">Verifikasi Email Anda</h1>
          <p className="mb-6 text-gray-700">
            Masukkan kode verifikasi yang telah dikirim ke email <strong>{email}</strong>.
          </p>

          {success ? (
            <div className="text-green-600 font-medium mb-4">
              Verifikasi berhasil! Anda dapat <Link href="/login" className="underline text-[#7C4A00]">masuk di sini</Link>.
            </div>
          ) : (
            <>
              {error && <div className="mb-4 text-red-600">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Kode Verifikasi"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7C4A00] focus:border-[#7C4A00]"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7C4A00] text-white py-2 rounded hover:bg-[#5a3700] transition"
                >
                  {loading ? "Memverifikasi..." : "Verifikasi"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-sm text-[#7C4A00] hover:underline"
                >
                  {resendLoading ? "Mengirim ulang..." : "Kirim ulang kode verifikasi"}
                </button>
                {resendMessage && <p className="text-green-700 text-sm mt-2">{resendMessage}</p>}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

