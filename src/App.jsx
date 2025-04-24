import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import AddTrip from "./pages/AddTrip";
import Navbar from "./components/Navbar";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-trip" element={<AddTrip />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
