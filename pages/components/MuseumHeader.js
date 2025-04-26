// components/MuseumHeader.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTicketAlt } from 'react-icons/fa';

const MuseumHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk menentukan apakah menu aktif
  const isActive = (path) => {
    // Handle route beranda khusus
    if (path === '/' && pathname === '/') return true;
    
    // Handle route lainnya
    return path !== '/' && pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/', label: 'Beranda' },
    { path: '/destination-info', label: 'Destination Info' },
    { path: '/sejarah', label: 'Sejarah' },
    { path: '/venue', label: 'Venue' },
    { path: '/galery', label: 'Galery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-90' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-8 py-4 text-[16px] font-normal">
        <div className="flex items-center space-x-10">
          <div className="flex flex-col leading-none">
            <span
              className={`text-[18px] font-light tracking-wide select-none ${
                isScrolled ? 'text-white' : 'text-black'
              }`}
            >
              lampungheritage
            </span>
            <span
              className={`text-[10px] font-semibold tracking-widest select-none ${
                isScrolled ? 'text-white' : 'text-black'
              }`}
            >
              CULTURE & HISTORY EXPERIENCE
            </span>
          </div>
          <ul className="hidden md:flex space-x-10 font-normal">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  className={`relative inline-block pb-1 ${
                    isActive(item.path) ? 'font-semibold' : 'font-normal'
                  } ${
                    isScrolled ? 'text-white hover:text-[#7C4A00]' : 'text-black hover:text-[#7C4A00]'
                  }`}
                  href={item.path}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7C4A00] rounded"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => (window.location.href = '/login')}
            className={`border rounded-full px-6 py-2 text-sm font-semibold transition ${
              isScrolled
                ? 'text-white border-white hover:bg-white hover:text-[#7C4A00]'
                : 'text-black border-black hover:bg-black hover:text-white'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => (window.location.href = '/register')}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              isScrolled
                ? 'text-[#7C4A00] bg-white border border-[#7C4A00] hover:bg-[#f2e5d5] active:bg-[#7C4A00] active:text-white'
                : 'text-[#7C4A00] bg-white border border-[#7C4A00] hover:bg-[#f2e5d5] active:bg-[#7C4A00] active:text-white'
            }`}
          >
            Daftar
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className={`${
              isScrolled ? 'text-white' : 'text-black'
            } focus:outline-none`}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default MuseumHeader;