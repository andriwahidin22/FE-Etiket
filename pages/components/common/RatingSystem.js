'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Cookies from 'js-cookie';

export default function RatingSystem() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);

  // Parse JWT to extract user ID
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  // Ambil token dan userId dari cookie
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decoded = parseJwt(token);
      setUserId(decoded?.userId);
    }
  }, []);

  // Hitung rata-rata rating
  const calculateAverage = (reviews) => {
    if (!reviews?.length) return 0;
    const validReviews = reviews.filter(r => r?.score);
    if (!validReviews.length) return 0;
    const total = validReviews.reduce((sum, r) => sum + r.score, 0);
    return total / validReviews.length;
  };

  // Ambil data ulasan dari API
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Gagal mengambil data ulasan');
      }

      setReviews(result.data.reviews || []);
      setAverageRating(result.data.averageRating || 0);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingReviewId(null);
      setRating(0);
      setComment('');
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) return alert('Silakan login terlebih dahulu');

    if (!rating) {
      setError('Harap beri rating terlebih dahulu');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const endpoint = editingReviewId
        ? `/api/reviews/update/${editingReviewId}`
        : '/api/reviews/create';

      const method = editingReviewId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ score: rating, comment })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal menyimpan ulasan');
      }

      await fetchReviews();
      setEditingReviewId(null);
      setRating(0);
      setComment('');
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan ulasan');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReview = async (id) => {
    const token = Cookies.get('token');
    if (!token) return alert('Silakan login terlebih dahulu');

    if (!window.confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus ulasan');
      }

      await fetchReviews();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (review) => {
    setEditingReviewId(review.id);
    setRating(review.score);
    setComment(review.comment || '');
  };

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Ulasan Pengunjung</h2>

        {/* Rata-rata rating */}
        <div className="flex items-center mb-8">
          <div className="text-4xl font-bold mr-4">{averageRating.toFixed(1)}</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-2xl">
                {star <= averageRating ? (
                  <FaStar className="text-yellow-400" />
                ) : star - 0.5 <= averageRating ? (
                  <FaStarHalfAlt className="text-yellow-400" />
                ) : (
                  <FaRegStar className="text-yellow-400" />
                )}
              </span>
            ))}
          </div>
          <span className="ml-2 text-gray-600">({reviews.length} ulasan)</span>
        </div>

        {/* Tombol tampilkan form */}
        {userId && (
          <div className="mb-8">
            <button
              onClick={toggleForm}
              className={`bg-[#7C4A00] text-white font-semibold py-2 px-6 rounded-md transition ${showForm ? 'bg-gray-500' : ''}`}
            >
              {showForm ? 'Tutup Form' : 'Tambah Ulasan'}
            </button>
          </div>
        )}

        {/* Form ulasan */}
        {showForm && (
          <form onSubmit={submitReview} className="mb-8 bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Beri Rating:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-3xl focus:outline-none ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2 font-medium">
                Ulasan Anda:
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Bagaimana pengalaman Anda?"
                required
              />
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#7C4A00] hover:bg-[#5a3600] text-white font-semibold py-2 px-6 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : editingReviewId ? "Perbarui Ulasan" : "Kirim Ulasan"}
              </button>
              <button
                type="button"
                onClick={toggleForm}
                className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-md"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {/* Daftar ulasan */}
        <div className="space-y-6">
          {isLoading && !reviews.length ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7C4A00]" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Belum ada ulasan</p>
              {userId ? (
                <button
                  onClick={toggleForm}
                  className="bg-[#7C4A00] text-white font-semibold py-2 px-6 rounded-md"
                >
                  Jadilah yang pertama memberikan ulasan
                </button>
              ) : (
                <p className="text-gray-500">Login untuk memberikan ulasan</p>
              )}
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 group">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{review.user?.fullName || "Anonim"}</div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">
                          {star <= review.score ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                  </div>
                  {userId === review.userId && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          startEditing(review);
                          setShowForm(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
                {review.comment && <p className="text-gray-700 mt-2">{review.comment}</p>}
                <div className="text-sm text-gray-500 mt-2">
                  {new Date(review.updatedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
