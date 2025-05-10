import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">🌍 Travel Tracker</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="cursor-pointer dark:bg-red hover:underline hover:font-medium hover:bg-black hover:text-white transition duration-150 px-4 py-1 rounded-xl border">All Trips</Link>
        <Link to="/add-trip" className="hover:underline hover:font-medium hover:bg-black hover:text-white transition duration-150 px-4 py-1 rounded-xl border">Add Trip</Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
