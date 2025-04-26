// components/BuyTicketButton.jsx
import { FaTicketAlt } from "react-icons/fa";

const BuyTicketButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => (window.location.href = "../beli/calender")}
        aria-label="Buy Ticket"
        className="bg-[#f8f4e1] text-black text-sm rounded-full py-3 px-6 flex items-center gap-2 
                   border border-black hover:bg-black hover:text-white transition shadow-lg"
      >
        Buy Ticket
        <FaTicketAlt className="text-black group-hover:text-white" />
      </button>
    </div>
  );
};

export default BuyTicketButton;
