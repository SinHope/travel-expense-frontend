import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Run this once when page loads
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trips");
        setTrips(response.data); // store trips in state
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trips/${id}`);
      setTrips(trips.filter((trip) => trip.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete.");
    }
  };

  const [editingTripId, setEditingTripId] = useState(null);
const [editFormData, setEditFormData] = useState({
  destination: "",
  date: "",
  budget: ""
});

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
    const res = await axios.put(`http://localhost:5000/api/trips/${editingTripId}`, editFormData);
    setTrips(trips.map(t => t._id === editingTripId ? res.data : t));
    setEditingTripId(null);
  } catch (err) {
    alert("Error editing trip");
  }
};



  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Trips</h2>
      {trips.length === 0 ? (
        <p className="text-gray-500">No trips added yet.</p>
      ) : (
        <ul className="space-y-2">
          {trips.map((trip) => (
            <li
              key={trip.id}
              className="border rounded p-4 shadow hover:bg-gray-50 transition"
            >
              {editingTripId === trip._id ? (
  <div className="space-y-2">
    <input
      type="text"
      name="destination"
      value={editFormData.destination}
      onChange={handleEditChange}
      className="border p-2 rounded w-full"
    />
    <input
      type="date"
      name="date"
      value={editFormData.date}
      onChange={handleEditChange}
      className="border p-2 rounded w-full"
    />
    <input
      type="number"
      name="budget"
      value={editFormData.budget}
      onChange={handleEditChange}
      className="border p-2 rounded w-full"
    />
    <div className="flex gap-2">
      <button
        onClick={submitEdit}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Save
      </button>
      <button
        onClick={() => setEditingTripId(null)}
        className="bg-gray-300 text-black px-4 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <div>
    <p className="text-lg font-semibold">{trip.destination}</p>
    <p>{trip.date}</p>
    <p className="text-green-600 font-medium">${trip.budget}</p>
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => startEdit(trip)}
        className="text-blue-600 hover:underline"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(trip._id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  </div>
)}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
