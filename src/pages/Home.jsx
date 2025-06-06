import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const [trips, setTrips] = useState([]);
  const [editingTripId, setEditingTripId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    destination: "",
    date: "",
    budget: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const tripsPerPage = 5;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/trips`);
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/trips/${id}`);
      setTrips(trips.filter((trip) => trip._id !== id));
      toast.success("Trip deleted!");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete.");
    }
  };

  const startEdit = (trip) => {
    setEditingTripId(trip._id);
    setEditFormData({
      destination: trip.destination,
      date: trip.date,
      budget: trip.budget
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/api/trips/${editingTripId}`, editFormData);
      setTrips(trips.map(t => t._id === editingTripId ? res.data : t));
      setEditingTripId(null);
      toast.success("Trip updated!");
    } catch (err) {
      toast.error("Error editing trip");
    }
  };

  // Pagination logic
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const filteredTrips = trips.filter(trip => {
    const matchesDestination = trip.destination
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  
    let matchesBudget = true;
    const budget = parseFloat(trip.budget);
  
    if (budgetFilter === "<500") {
      matchesBudget = budget < 500;
    } else if (budgetFilter === "500-1000") {
      matchesBudget = budget >= 500 && budget <= 1000;
    } else if (budgetFilter === ">1000") {
      matchesBudget = budget > 1000;
    }
  
    return matchesDestination && matchesBudget;
  });
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);  


  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">🗺️ Your Trips</h2>
        {trips.length === 0 ? (
  <p className="text-gray-500 text-center dark:text-gray-300">No trips added yet.</p>
) : (
  <div>
  <div className="mb-6">
  <input
    type="text"
    placeholder="Search by destination..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
  />
  </div>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
  <input
    type="text"
    placeholder="Search by destination..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full sm:w-1/2 border p-2 rounded dark:bg-gray-800 dark:text-white"
  />

  <select
    value={budgetFilter}
    onChange={(e) => setBudgetFilter(e.target.value)}
    className="w-full sm:w-1/3 border p-2 rounded dark:bg-gray-800 dark:text-white"
  >
    <option value="">All Budgets</option>
    <option value="<500">Below $500</option>
    <option value="500-1000">$500 – $1000</option>
    <option value=">1000">Above $1000</option>
  </select>
  </div>
    <ul className="space-y-4">
      {currentTrips.map((trip) => (
        <li
      key={trip._id}
      className="bg-white dark:bg-gray-800 transition-colors duration-500 border rounded-lg shadow p-5"
    >
      {editingTripId === trip._id ? (
        <div className="space-y-3">
          <input
            type="text"
            name="destination"
            value={editFormData.destination}
            onChange={handleEditChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={editFormData.date}
            onChange={handleEditChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="budget"
            value={editFormData.budget}
            onChange={handleEditChange}
            className="w-full border p-2 rounded cursor-pointer"
          />
          <div className="flex gap-2">
            <button
              onClick={submitEdit}
              className="cursor-pointer bg-green-600 hover:bg-green-900 hover:font-medium transition duration-150 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              className="cursor-pointer bg-gray-300 hover:bg-gray-600 hover:font-medium transition duration-150 dark:bg-gray-200 dark:text-black px-4 py-1 rounded"
              onClick={() => setEditingTripId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{trip.destination}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">📅 {trip.date}</p>
          <p className="text-sm text-green-600 font-medium">💰 ${trip.budget}</p>
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => startEdit(trip)}
              className="cursor-pointer bg-blue-600 text-white hover:font-medium transition duration-150 dark:text-blue-300 px-4 py-1 rounded"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(trip._id)}
              className="cursor-pointer bg-red-600 text-white hover:font-medium transition duration-150 dark:text-red-300 px-4 py-1 rounded"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </li>
      ))}
    </ul>

    {/* Pagination Controls */}
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      <button
        onClick={() =>
          setCurrentPage((prev) =>
            prev < Math.ceil(trips.length / tripsPerPage) ? prev + 1 : prev
          )
        }
        disabled={currentPage === Math.ceil(trips.length / tripsPerPage)}
        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <p className="text-center text-sm text-gray-500 mt-2">
    Page {currentPage} of {totalPages}
    </p>
  </div>
)}




        
      </div>
    </main>
  );
}

export default Home;
