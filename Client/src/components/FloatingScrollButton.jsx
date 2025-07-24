export default function FloatingScrollButton({ autoScroll, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`fixed ${className} bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition z-50`}
    >
      {autoScroll ? "Stop Scroll 🛑" : "Start Scroll 🌀"}
    </button>
  );
}

