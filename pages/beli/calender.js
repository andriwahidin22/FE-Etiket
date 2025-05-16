"use client";

import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaCircle,
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import MuseumHeader from "../components/common/MuseumHeader";
import MuseumFooter from "../components/common/MuseumFooter";
import Head from "next/head";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

const MuseumBooking = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Ambil token dari cookie dan decode user
  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    if (tokenFromCookie) {
      try {
        const decoded = jwt.decode(tokenFromCookie);
        if (decoded && decoded.role === "BUYER") {
          setUser(decoded);
          setToken(tokenFromCookie);
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
        setToken(null);
      }
    } else {
      setUser(null);
      setToken(null);
    }
  }, []);

  const [currentDate] = useState(new Date());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tickets, setTickets] = useState({});
  const [language, setLanguage] = useState("id");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);

  // Fetch ticket types from backend
  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/ticket");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch ticket types");
        }
        const data = await response.json();
        setTicketTypes(data);

        // Initialize tickets state with ticket types
        const initialTickets = {};
        data.forEach((ticket) => {
          initialTickets[ticket.id] = 0;
        });
        setTickets(initialTickets);
      } catch (err) {
        console.error("Error fetching ticket types:", err);
        setError(err.message);
      }
    };

    fetchTicketTypes();
  }, []);

  // Localization
  const locales = {
    id: {
      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      daysShort: ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"],
      selectDate: "Pilih Tanggal Kunjungan",
      nextButton: "Lanjutkan",
      backButton: "Kembali",
      termsTitle: "Syarat dan Ketentuan",
      terms: [
        "Tiket Berlaku sesuai tanggal Kunjungan yang dipilih",
        "Tiket tidak dapat dikembalikan (non-refundable)",
      ],
      seeMore: "lihat lebih",
      subtotal: "Subtotal",
      continuePayment: "Lanjutkan Pembayaran",
      selectTickets: "Pilih Tiket",
      selectLanguage: "Pilih Bahasa",
      poweredBy: "Powered by",
      errorNoTickets: "Silakan pilih minimal satu tiket.",
      errorNoDate: "Silakan pilih tanggal kunjungan.",
      errorNotLoggedIn: "Silahkan login dulu.",
    },
    en: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      selectDate: "Select Visit Date",
      nextButton: "Continue",
      backButton: "Back",
      termsTitle: "Terms and Conditions",
      terms: [
        "Ticket is valid for the selected visit date",
        "Ticket is non-refundable",
      ],
      seeMore: "see more",
      subtotal: "Subtotal",
      continuePayment: "Continue to Payment",
      selectTickets: "Select Tickets",
      selectLanguage: "Select Language",
      poweredBy: "Powered by",
      errorNoTickets: "Please select at least one ticket.",
      errorNoDate: "Please select a visit date.",
      errorNotLoggedIn: "Please log in first.",
    },
  };

  // Render calendar with proper date styles
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

    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < 42; i++) {
      let dayNumber,
        isDisabled = false,
        isToday = false,
        isSelected = false;
      let dateStr = null;

      if (i < prevMonthDays) {
        dayNumber = daysInPrevMonth - prevMonthDays + i + 1;
        isDisabled = true;
      } else if (i < prevMonthDays + daysInMonth) {
        dayNumber = i - prevMonthDays + 1;

        dateStr = `${displayedYear}-${(displayedMonth + 1)
          .toString()
          .padStart(2, "0")}-${dayNumber.toString().padStart(2, "0")}`;
        isSelected = selectedDate === dateStr;

        const thisDate = new Date(displayedYear, displayedMonth, dayNumber);
        if (thisDate < todayDate) {
          isDisabled = true;
        }

        if (
          dayNumber === today.getDate() &&
          displayedMonth === today.getMonth() &&
          displayedYear === today.getFullYear()
        ) {
          isToday = true;
        }
      } else {
        dayNumber = i - (prevMonthDays + daysInMonth) + 1;
        isDisabled = true;
      }

      // Jika user belum login, semua tanggal disable
      if (!token) {
        isDisabled = true;
      }

      if (i % 7 === 0 && i !== 0) {
        rows.push(<tr key={`row-${i / 7}`}>{cells}</tr>);
        cells = [];
      }

      cells.push(
        <td
          key={`day-${i}`}
          className={`
            w-10 h-10 text-sm text-center align-middle rounded-full
            ${
              isDisabled
                ? "text-gray-300 cursor-default"
                : "cursor-pointer hover:bg-blue-100 text-black"
            }
            ${isToday && !isSelected ? "font-bold text-blue-600 border border-blue-600" : ""}
            ${isSelected ? "bg-blue-600 text-white font-semibold" : ""}
          `}
          onClick={() => {
            if (!isDisabled && dateStr) {
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
    setDisplayedMonth((prev) => {
      if (prev === 0) {
        setDisplayedYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setDisplayedMonth((prev) => {
      if (prev === 11) {
        setDisplayedYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Ticket handlers
  const handleTicketChange = (ticketId, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0) {
      setTickets((prev) => ({
        ...prev,
        [ticketId]: numValue,
      }));
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(
      language === "id" ? "id-ID" : "en-US",
      options
    );
  };

  // Calculate total price based on ticket quantity and price
  const calculateTotal = () => {
    return ticketTypes.reduce((total, ticket) => {
      return total + (tickets[ticket.id] || 0) * ticket.price;
    }, 0);
  };

  const totalTickets = Object.values(tickets).reduce(
    (sum, qty) => sum + qty,
    0
  );

  // Initiate payment by sending data to backend and redirecting to Midtrans
  const initiatePayment = async () => {
    if (!token) {
      setError(locales[language].errorNotLoggedIn);
      return;
    }
    if (!selectedDate) {
      setError(locales[language].errorNoDate);
      return;
    }
    if (totalTickets === 0) {
      setError(locales[language].errorNoTickets);
      return;
    }
    if (!user?.id) {
      setError(locales[language].errorNotLoggedIn);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare ticket list from selected tickets
      const ticketList = ticketTypes
        .filter((ticket) => tickets[ticket.id] > 0)
        .map((ticket) => ({
          ticketId: ticket.id,
          quantity: tickets[ticket.id],
        }));

      const response = await fetch("http://localhost:5001/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          userId: user.id,
          ticketList,
          visitDate: selectedDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memulai pembayaran");
      }

      // Redirect ke halaman pembayaran Midtrans
      if (data.data?.redirectUrl) {
        window.location.href = data.data.redirectUrl;
      } else {
        throw new Error("URL redirect pembayaran tidak ditemukan");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Render ticket type component
  const renderTicketType = (ticket) => {
    return (
      <div
        key={ticket.id}
        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
      >
        <h3 className="font-semibold text-sm mb-2 text-gray-800">
          {language === "id" ? ticket.type : ticket.type}
        </h3>
        <div className="flex items-center mb-2 text-xs text-gray-600">
          <FaCircle className="text-[8px] mr-2 text-gray-400" />
          <span>08.00-16.00 WIB</span>
        </div>
        <p className="text-black mb-2">{locales[language].termsTitle}</p>
        <ol className="list-decimal list-inside text-xs text-gray-600 mb-2 leading-tight space-y-1">
          {locales[language].terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
        <a className="text-xs text-green-500 hover:underline cursor-pointer">
          {locales[language].seeMore}
        </a>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-black">
            IDR {ticket.price.toLocaleString("id-ID")}
          </span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() =>
                handleTicketChange(ticket.id, tickets[ticket.id] - 1)
              }
              className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
              disabled={!tickets[ticket.id] || tickets[ticket.id] <= 0}
            >
              <FaMinus size={10} />
            </button>
            <input
              type="number"
              min="0"
              value={tickets[ticket.id] || 0}
              onChange={(e) => handleTicketChange(ticket.id, e.target.value)}
              className="w-12 text-center border border-gray-300 rounded-md py-1 text-black"
            />
            <button
              type="button"
              onClick={() =>
                handleTicketChange(ticket.id, tickets[ticket.id] + 1)
              }
              className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
            >
              <FaPlus size={10} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render steps for date selection and ticket selection/payment
  const renderStep = () => {
    if (!token) {
      // Jika belum login, tampilkan pesan dan nonaktifkan pemilihan
      return (
        <div className="text-center text-red-600 font-semibold py-10">
          {locales[language].errorNotLoggedIn}
        </div>
      );
    }

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
                  {locales[language].daysShort.map((day) => (
                    <th key={day} className="py-2 font-normal">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderCalendar()}</tbody>
            </table>
          </div>

          <button
            onClick={() => {
              if (!selectedDate) {
                setError(locales[language].errorNoDate);
                return;
              }
              setError(null);
              setStep(2);
            }}
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
              onClick={() => {
                setError(null);
                setStep(1);
              }}
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

          {/* Ticket Selection Components */}
          {ticketTypes.map((ticket) => renderTicketType(ticket))}

          {/* Subtotal */}
          <div className="border-t border-b border-gray-200 py-3 my-4">
            <div className="flex justify-between items-center text-black font-semibold mb-1">
              <span>
                {locales[language].subtotal} ({totalTickets}{" "}
                {language === "id" ? "tiket" : "tickets"})
              </span>
              <span>IDR {calculateTotal().toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Continue Button */}
          <button
            className={`w-full py-3 rounded-md text-sm font-medium ${
              totalTickets > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={totalTickets === 0 || isLoading}
            onClick={initiatePayment}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>
                {totalTickets > 0
                  ? locales[language].continuePayment
                  : locales[language].selectTickets}
              </span>
            )}
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
        <MuseumHeader />

        <div className="flex-grow pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-2xl text-blue-600" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">
                      {language === "id" ? "Museum Lampung" : "Lampung Museum"}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {language === "id"
                        ? "Pemesanan Tiket Kunjungan"
                        : "Visit Ticket Booking"}
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

              <div className="p-6">{renderStep()}</div>

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
