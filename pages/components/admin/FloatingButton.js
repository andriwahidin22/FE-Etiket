export default function FloatingButton() {
    return (
      <button 
        aria-label="Settings" 
        className="fixed bottom-6 right-6 bg-white border border-[#d9e2e7] rounded-full p-3 shadow-md hover:shadow-lg transition-shadow"
      >
        <i className="fas fa-cog text-[#2a2a2a] text-[18px]" />
      </button>
    );
  }