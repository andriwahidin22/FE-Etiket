// components/MuseumBooking.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaCircle, FaPlus, FaMinus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MuseumHeader from '../components/MuseumHeader';
import MuseumFooter from '../components/MuseumFooter';
import Head from 'next/head';

const MuseumBooking = () => {
  const router = useRouter();
  const [currentDate] = useState(new Date());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tickets, setTickets] = useState({
    dewasa: 0,
    pelajar: 0,
    anak: 0
  });
  const [availableDates, setAvailableDates] = useState(new Set());
  const [language, setLanguage] = useState('id');
  const [step, setStep] = useState(1);

  // Mock available dates
  useEffect(() => {
    const mockAvailableDates = [
      `${displayedYear}-${(displayedMonth + 1).toString().padStart(2, '0')}-15`,
      `${displayedYear}-${(displayedMonth + 1).toString().padStart(2, '0')}-16`,
      `${displayedYear}-${(displayedMonth + 1).toString().padStart(2, '0')}-20`,
      `${displayedYear}-${(displayedMonth + 2).toString().padStart(2, '0')}-01`
    ];
    setAvailableDates(new Set(mockAvailableDates));
  }, [displayedYear, displayedMonth]);

  // Localization
  const locales = {
    id: {
      months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      daysShort: ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"],
      selectDate: "Pilih Tanggal Kunjungan",
      nextButton: "Lanjutkan",
      backButton: "Kembali",
      ticketTypes: {
        dewasa: "Dewasa",
        pelajar: "Pelajar",
        anak: "Anak"
      },
      prices: {
        dewasa: "IDR 30.000",
        pelajar: "IDR 20.000",
        anak: "IDR 15.000"
      },
      termsTitle: "Syarat dan Ketentuan",
      terms: [
        "Tiket Berlaku sesuai tanggal Kunjungan yang dipilih",
        "Tiket tidak dapat dikembalikan (non-refundable)"
      ],
      seeMore: "lihat lebih",
      subtotal: "Subtotal",
      continuePayment: "Lanjutkan Pembayaran",
      selectTickets: "Pilih Tiket",
      selectLanguage: "Pilih Bahasa",
      poweredBy: "Powered by"
    },
    en: {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      selectDate: "Select Visit Date",
      nextButton: "Continue",
      backButton: "Back",
      ticketTypes: {
        dewasa: "Adult",
        pelajar: "Student",
        anak: "Child"
      },
      prices: {
        dewasa: "IDR 30.000",
        pelajar: "IDR 20.000",
        anak: "IDR 15.000"
      },
      termsTitle: "Terms and Conditions",
      terms: [
        "Ticket is valid for the selected visit date",
        "Ticket is non-refundable"
      ],
      seeMore: "see more",
      subtotal: "Subtotal",
      continuePayment: "Continue to Payment",
      selectTickets: "Select Tickets",
      selectLanguage: "Select Language",
      poweredBy: "Powered by"
    }
  };

  // Calendar rendering
  const renderCalendar = () => {
    const firstDay = new Date(displayedYear, displayedMonth, 1).getDay();
    const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
    const prevMonthDays = firstDay;
    
    let prevMonth = displayedMonth - 1;
    let prevYear = displayedYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    const rows = [];
    let cells = [];

    for (let i = 0; i < 42; i++) {
      let dayNumber, isCurrentMonth, isDisabled, isToday, isSelected, isAvailable;
      
      if (i < prevMonthDays) {
        dayNumber = daysInPrevMonth - prevMonthDays + i + 1;
        isDisabled = true;
      } else if (i < prevMonthDays + daysInMonth) {
        dayNumber = i - prevMonthDays + 1;
        isCurrentMonth = true;
        
        const dateStr = `${displayedYear}-${(displayedMonth + 1).toString().padStart(2, '0')}-${dayNumber.toString().padStart(2, '0')}`;
        isSelected = selectedDate === dateStr;
        isAvailable = availableDates.has(dateStr);
        
        if (dayNumber === currentDate.getDate() && 
            displayedMonth === currentDate.getMonth() && 
            displayedYear === currentDate.getFullYear()) {
          isToday = true;
        }
      } else {
        dayNumber = i - (prevMonthDays + daysInMonth) + 1;
        isDisabled = true;
      }

      if (i % 7 === 0 && i !== 0) {
        rows.push(<tr key={`row-${i/7}`}>{cells}</tr>);
        cells = [];
      }

      cells.push(
        <td
          key={`day-${i}`}
          className={`
            w-10 h-10 text-sm text-center align-middle rounded-full
            ${isDisabled ? 'text-gray-200 cursor-default' : ''}
            ${isToday ? 'font-bold text-blue-600 border border-blue-600' : ''}
            ${isSelected ? 'bg-blue-600 text-white font-semibold' : ''}
            ${!isDisabled && !isSelected && isAvailable ? 'hover:bg-gray-100 cursor-pointer text-gray-700' : ''}
            ${!isDisabled && !isAvailable ? 'text-gray-300 line-through' : ''}
          `}
          onClick={() => {
            if (!isDisabled && isAvailable) {
              const dateStr = `${displayedYear}-${(displayedMonth + 1).toString().padStart(2, '0')}-${dayNumber.toString().padStart(2, '0')}`;
              setSelectedDate(dateStr);
            }
          }}
        >
          {dayNumber}
        </td>
      );
    }

    rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
    return rows;
  };

  // Navigation handlers
  const prevMonth = () => {
    setDisplayedMonth(prev => {
      if (prev === 0) {
        setDisplayedYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setDisplayedMonth(prev => {
      if (prev === 11) {
        setDisplayedYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Ticket handlers
  const handleTicketChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0) {
      setTickets(prev => ({
        ...prev,
        [type]: numValue
      }));
    }
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', options);
  };

  // Calculate total
  const calculateTotal = () => {
    return (tickets.dewasa * 30000) + (tickets.pelajar * 20000) + (tickets.anak * 15000);
  };

  const totalTickets = tickets.dewasa + tickets.pelajar + tickets.anak;

  // Handle payment navigation
  const handlePayment = () => {
    if (!selectedDate || totalTickets === 0) return;
    
    const bookingData = {
      date: selectedDate,
      tickets,
      total: calculateTotal()
    };
    
    // Convert to base64 for URL-safe encoding
    const encodedData = btoa(JSON.stringify(bookingData));
    router.push(`/beli/form?data=${encodedData}`);
  };

  // Render steps
  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {locales[language].selectDate}
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                {locales[language].months[displayedMonth]} {displayedYear}
              </h3>
              <div className="flex space-x-2">
                <button 
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-gray-600 text-sm">
                  {locales[language].daysShort.map(day => (
                    <th key={day} className="py-2 font-normal">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {renderCalendar()}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!selectedDate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:bg-gray-300 transition-colors"
          >
            {locales[language].nextButton}
          </button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <FaChevronLeft className="mr-1" />
              {locales[language].backButton}
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {formatDate(selectedDate)}
            </h2>
            <div className="w-6"></div> {/* Spacer for alignment */}
          </div>

          {/* Adult Tickets */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-sm mb-2 text-gray-800">
              {locales[language].ticketTypes.dewasa}
            </h3>
            <div className="flex items-center mb-2 text-xs text-gray-600">
              <FaCircle className="text-[8px] mr-2 text-gray-400" />
              <span>08.00-16.00 WIB</span>
            </div>
            <p className="text-xs mb-2">{locales[language].termsTitle}</p>
            <ol className="list-decimal list-inside text-xs text-gray-600 mb-2 leading-tight space-y-1">
              {locales[language].terms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ol>
            <a className="text-xs text-green-500 hover:underline cursor-pointer">
              {locales[language].seeMore}
            </a>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-sm">{locales[language].prices.dewasa}</span>
              <div className="flex items-center space-x-2">
                <button 
                  type="button"
                  onClick={() => handleTicketChange('dewasa', tickets.dewasa - 1)}
                  className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                  <FaMinus size={10} />
                </button>
                <input
                  type="number"
                  min="0"
                  value={tickets.dewasa}
                  onChange={(e) => handleTicketChange('dewasa', e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded-md py-1 text-sm"
                />
                <button 
                  type="button"
                  onClick={() => handleTicketChange('dewasa', tickets.dewasa + 1)}
                  className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                  <FaPlus size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Student Tickets */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-sm mb-2 text-gray-800">
              {locales[language].ticketTypes.pelajar}
            </h3>
            <div className="flex items-center mb-2 text-xs text-gray-600">
              <FaCircle className="text-[8px] mr-2 text-gray-400" />
              <span>08.00-16.00 WIB</span>
            </div>
            <p className="text-xs mb-2">{locales[language].termsTitle}</p>
            <ol className="list-decimal list-inside text-xs text-gray-600 mb-2 leading-tight space-y-1">
              {locales[language].terms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ol>
            <a className="text-xs text-green-500 hover:underline cursor-pointer">
              {locales[language].seeMore}
            </a>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-sm">{locales[language].prices.pelajar}</span>
              <div className="flex items-center space-x-2">
                <button 
                  type="button"
                  onClick={() => handleTicketChange('pelajar', tickets.pelajar - 1)}
                  className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                  <FaMinus size={10} />
                </button>
                <input
                  type="number"
                  min="0"
                  value={tickets.pelajar}
                  onChange={(e) => handleTicketChange('pelajar', e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded-md py-1 text-sm"
                />
                <button 
                  type="button"
                  onClick={() => handleTicketChange('pelajar', tickets.pelajar + 1)}
                  className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                  <FaPlus size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Child Tickets */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-sm mb-2 text-gray-800">
              {locales[language].ticketTypes.anak}
            </h3>
            <div className="flex items-center mb-2 text-xs text-gray-600">
              <FaCircle className="text-[8px] mr-2 text-gray-400" />
              <span>08.00-16.00 WIB</span>
            </div>
            <p className="text-xs mb-2">{locales[language].termsTitle}</p>
            <ol className="list-decimal list-inside text-xs text-gray-600 mb-2 leading-tight space-y-1">
              {locales[language].terms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ol>
            <a className="text-xs text-green-500 hover:underline cursor-pointer">
              {locales[language].seeMore}
            </a>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-sm">{locales[language].prices.anak}</span>
              <div className="flex items-center space-x-2">
                <button 
                  type="button"
                  onClick={() => handleTicketChange('anak', tickets.anak - 1)}
                  className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                  <FaMinus size={10} />
                </button>
                <input
                  type="number"
                  min="0"
                  value={tickets.anak}
                  onChange={(e) => handleTicketChange('anak', e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded-md py-1 text-sm"
                />
                <button 
                  type="button"
                  onClick={() => handleTicketChange('anak', tickets.anak + 1)}
                  className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                  <FaPlus size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Subtotal */}
          <div className="border-t border-b border-gray-200 py-3 my-4">
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
              <span>{locales[language].subtotal} ({totalTickets} {language === 'id' ? 'tiket' : 'tickets'})</span>
              <span>IDR {calculateTotal().toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Continue Button */}
          <button 
            className={`w-full py-3 rounded-md text-sm font-medium ${totalTickets > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={totalTickets === 0}
            onClick={handlePayment}
          >
            {totalTickets > 0 ? locales[language].continuePayment : locales[language].selectTickets}
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Pemesanan Tiket Museum Lampung</title>
        <meta
          name="description"
          content="Pesan tiket kunjungan Museum Lampung secara online"
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-[url('https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1721106686-dscf4626-jpg-medium.jpg')] bg-cover bg-center">
        {/* Header Component */}
        <MuseumHeader />
        
        {/* Main Content with padding for fixed header */}
        <div className="flex-grow pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Booking Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-2xl text-blue-600" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">
                      {language === 'id' ? 'Museum Lampung' : 'Lampung Museum'}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {language === 'id' ? 'Pemesanan Tiket Kunjungan' : 'Visit Ticket Booking'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-700 text-sm rounded px-3 py-1"
                  >
                    <option value="id">ID</option>
                    <option value="en">EN</option>
                  </select>
                </div>
              </div>
              
              {/* Main Booking Content */}
              <div className="p-6">
                {renderStep()}
              </div>
              
              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 text-center text-xs text-gray-600 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <label className="select-none" htmlFor="language-footer">
                      {locales[language].selectLanguage}
                    </label>
                    <select 
                      className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white"
                      id="language-footer" 
                      name="language-footer"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="id">Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-1 select-none">
                    <span>{locales[language].poweredBy}</span>
                    <img 
                      alt="Goers logo" 
                      className="h-4 w-auto" 
                      src="https://storage.googleapis.com/a1aa/image/04df0113-8e4a-4caa-ed25-4e71839937fb.jpg" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MuseumFooter />
      </div>
    </>
  );
};

export default MuseumBooking;