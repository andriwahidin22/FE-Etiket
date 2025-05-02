// components/RatingSystem.js
'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

export default function RatingSystem() {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Debug session
  console.log('Session data:', session);
  console.log('Is authenticated:', session ? true : false);
  console.log('User role:', session?.user?.role);

  // Calculate average rating
  const calculateAverage = (reviews) => {
    if (!reviews?.length) return 0;
    const validReviews = reviews.filter(r => r?.score);
    if (!validReviews.length) return 0;
    const total = validReviews.reduce((sum, r) => sum + r.score, 0);
    return total / validReviews.length;
  };

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching reviews...');
      const response = await fetch('/api/reviews');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      console.log('Reviews data:', data);
      
      setReviews(data.reviews || data.data?.reviews || []);
      setAverageRating(data.averageRating || calculateAverage(data.reviews || data.data?.reviews));
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Toggle form visibility
  const toggleForm = () => {
    console.log('Toggling form. Current state:', showForm);
    setShowForm(!showForm);
    if (showForm) {
      setEditingReviewId(null);
      setRating(0);
      setComment('');
    }
  };

  // Submit or update review
  const submitReview = async (e) => {
    e.preventDefault();
    
    if (!rating) {
      setError('Please select a rating');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const endpoint = editingReviewId 
        ? `/api/reviews/update/${editingReviewId}`
        : '/api/reviews/create';

      const method = editingReviewId ? 'PUT' : 'POST';

      console.log('Submitting review:', {
        endpoint,
        method,
        rating,
        comment,
        accessToken: session?.accessToken ? 'exists' : 'missing'
      });

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({ 
          score: rating, 
          comment 
        })
      });

      const data = await response.json();
      console.log('Submission response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review');
      }

      await fetchReviews();
      setEditingReviewId(null);
      setRating(0);
      setComment('');
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Error submitting review');
    } finally {
      setIsLoading(false);
    }
  };

  // ... (deleteReview dan startEditing tetap sama)

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">
          Visitor Reviews
        </h2>

        {/* Debug info - hanya untuk development */}
        <div className="bg-yellow-50 p-4 mb-6 rounded-lg">
          <h3 className="font-bold text-yellow-800">Debug Information:</h3>
          <p>Session: {session ? 'Authenticated' : 'Not authenticated'}</p>
          <p>User ID: {session?.user?.id || 'N/A'}</p>
          <p>User Role: {session?.user?.role || 'N/A'}</p>
          <p>Show Form: {showForm ? 'Yes' : 'No'}</p>
        </div>

        {/* Tombol untuk menampilkan form */}
        {session && (
          <div className="mb-8">
            <button
              onClick={toggleForm}
              className={`bg-[#7C4A00] text-white font-semibold py-2 px-6 rounded-md transition ${showForm ? 'bg-gray-500' : ''}`}
            >
              {showForm ? 'Tutup Form' : 'Tambah Ulasan'}
            </button>
          </div>
        )}

        {/* Form untuk menambahkan/mengedit ulasan */}
        {showForm && (
          <form onSubmit={submitReview} className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editingReviewId ? 'Edit Ulasan Anda' : 'Tambah Ulasan Baru'}
            </h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Rating:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-3xl focus:outline-none ${
                      (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Rating terpilih: {rating} bintang
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2 font-medium">
                Komentar:
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C4A00]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Bagaimana pengalaman Anda?"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#7C4A00] hover:bg-[#5a3600] text-white font-semibold py-2 px-6 rounded-md transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : "Simpan Ulasan"}
              </button>
              
              <button
                type="button"
                onClick={toggleForm}
                className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-md transition"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {/* Reviews list */}
        <div className="space-y-6">
          {isLoading && !reviews.length ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7C4A00]" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Belum ada ulasan</p>
              {session ? (
                <button
                  onClick={toggleForm}
                  className="bg-[#7C4A00] text-white font-semibold py-2 px-6 rounded-md transition"
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
                    <div className="font-semibold">
                      {review.user?.fullName || "Anonim"}
                    </div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">
                          {star <= review.score ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {session?.user?.id === review.userId && (
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
                
                {review.comment && (
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                )}
                
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