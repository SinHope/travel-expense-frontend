import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const [trips, setTrips] = useState([]);
  const [editingTripId, setEditingTripId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    destination: "",
    date: "",
    budget: ""
  });

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
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete.");
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
    } catch (err) {
      alert("Error editing trip");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">🗺️ Your Trips</h2>
        {trips.length === 0 ? (
          <p className="text-gray-500 text-center dark:text-gray-300">No trips added yet.</p>
        ) : (
          <ul className="space-y-4">
            {trips.map((trip) => (
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
                      className="w-full border p-2 rounded"
                    />
                    <div className="flex gap-2">
                      <button className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
                      <button className="bg-gray-300 dark:bg-gray-200 dark:text-black px-4 py-1 rounded" onClick={() => setEditingTripId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{trip.destination}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">📅 {trip.date}</p>
                    <p className="text-sm text-green-600 font-medium">💰 ${trip.budget}</p>
                    <div className="flex gap-3 mt-3">
                      <button onClick={() => startEdit(trip)} className="text-blue-600 dark:text-blue-300 hover:underline">✏️ Edit</button>
                      <button onClick={() => handleDelete(trip._id)} className="text-red-600 dark:text-red-300 hover:underline">🗑️ Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Home;
