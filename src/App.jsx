import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import AddTrip from "./pages/AddTrip";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Load from localStorage on first load
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode); // Save toggle to localStorage
  }, [darkMode]);

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-trip" element={<AddTrip />} />
          </Routes>
          <ToastContainer
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>

        </div>
      </div>
    </Router>
    
  );
}

export default App;
