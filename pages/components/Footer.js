export default function Footer() {
    return (
      <footer className="bg-[#f9f9f9] border-t border-gray-300 mt-20 pt-10 pb-4 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-10">
            <img
              src="/images/bumn-logo.jpg"
              alt="BUMN logo"
              className="h-10 w-auto"
              loading="lazy"
            />
            <div className="border-l border-gray-300 h-10"></div>
            <img
              src="/images/injourney-logo.jpg"
              alt="InJourney logo"
              className="h-10 w-auto"
              loading="lazy"
            />
          </div>
  
          <div className="flex space-x-4 text-[#a3b04a] text-lg">
            {['instagram', 'facebook-f', 'twitter', 'linkedin-in', 'youtube', 'tiktok'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="hover:text-[#8a9a3a]"
                aria-label={icon}
              >
                <i className={`fab fa-${icon}`} />
              </a>
            ))}
          </div>
        </div>
  
        <nav className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-600 space-x-4">
          {['Beranda', 'Destination Info', 'Experiences', 'Venues', 'Agenda', 'News', 'Brosur'].map((item) => (
            <a key={item} href="#" className="hover:text-gray-900">
              {item}
            </a>
          ))}
        </nav>
  
        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-700">
          <div>
            <p className="font-semibold mb-1">Contact Us</p>
            <p>info@museumlampung.id</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Head Office Address</p>
            <p>Jl. Pangeran Antasari No. 8, Bandar Lampung, Lampung 35131</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Representative Office Address</p>
            <p>Kantor Gedung Pengelola TMII Lt. 3 Jl. Raya Taman Mini, Jakarta Timur 13560</p>
          </div>
        </div>
  
        <div className="bg-[#a3b04a] text-white text-xs text-center py-2 mt-10">
          Museum Lampung © {new Date().getFullYear()}. All Rights Reserved
        </div>
      </footer>
    );
  }