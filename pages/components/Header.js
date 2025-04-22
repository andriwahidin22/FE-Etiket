import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-8 py-4 text-[16px] font-normal">
        <div className="flex items-center space-x-10">
          <div className="flex flex-col leading-none">
            <span className={`text-[18px] font-light tracking-wide select-none ${
              isScrolled ? "text-white" : "text-black"
            }`}>
              lampungheritage
            </span>
            <span className={`text-[10px] font-semibold tracking-widest select-none ${
              isScrolled ? "text-white" : "text-black"
            }`}>
              CULTURE & HISTORY EXPERIENCE
            </span>
          </div>
          <ul className="hidden md:flex space-x-10 font-normal">
            {["Beranda", "Destinasi Info", "Sejarah", "Venue", "Galery", "Contact"].map((text) => (
              <li key={text}>
                <a
                  className={`hover:text-[#7C4A00] ${
                    isScrolled ? "text-white" : "text-black"
                  }`}
                  href={`/${text.toLowerCase().replace(' ', '-')}`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button
            className={`border rounded-full px-6 py-2 text-sm font-semibold transition ${
              isScrolled
                ? "text-white border-white hover:bg-white hover:text-[#7C4A00]"
                : "text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            Masuk
          </button>
          <button
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              isScrolled
                ? "text-[#7C4A00] bg-white border border-[#7C4A00] hover:bg-[#f2e5d5]"
                : "text-[#7C4A00] bg-white border border-[#7C4A00] hover:bg-[#f2e5d5]"
            }`}
          >
            Daftar
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className={`${
              isScrolled ? "text-white" : "text-black"
            } focus:outline-none`}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </header>
  );
}