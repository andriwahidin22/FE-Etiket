import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import MuseumHeader from './components/MuseumHeader';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.decode(token);
      setUser(decoded);
    } catch (err) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MuseumHeader />
      
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-[#7C4A00] mb-6">Profile Saya</h1>
        
        {user && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Informasi Pribadi</h2>
              <div className="mt-2">
                <p><span className="font-medium">Nama:</span> {user.fullName}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
              </div>
            </div>
            
            {/* Tambahkan informasi lain yang diperlukan */}
          </div>
        )}
      </main>
    </div>
  );
}