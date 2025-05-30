import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function AddTrip() {
  const [formData, setFormData] = useState({
    destination: "",
    date: "",
    budget: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { destination, date, budget } = formData;
    if (!destination || !date || !budget) {
      toast.info("You cannot leave the fields empty");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/trips`, formData);
      toast.success("Trip added!");
      setFormData({ destination: "", date: "", budget: "" });
    } catch (error) {
      console.error("Error adding trip", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-500 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">✈️ Add a New Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="budget"
            placeholder="Budget ($)"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded transition"
          >
            ➕ Add Trip
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTrip;
