import { useState } from "react";
import axios from "axios";

function AddTrip() {
  const [formData, setFormData] = useState({
    destination: "",
    date: "",
    budget: ""
  });

  // Updates form input values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // stops page reload

    const { destination, date, budget } = formData;

  // Basic validation
  if (!destination || !date || !budget) {
    alert("You cannot leave the fields empty");
    return;
  }

    try {
      await axios.post("http://localhost:5000/api/trips", formData); // POST to backend
      alert("Trip added!");
      setFormData({ destination: "", date: "", budget: "" }); // clear form
    } catch (error) {
      console.error("Error adding trip", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Add a New Trip</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border rounded p-2 w-full mb-3"
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="budget"
          placeholder="Budget ($)"
          value={formData.budget}
          onChange={handleChange}
        />
        <br />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Trip</button>
      </form>
    </div>
  );
}

export default AddTrip;
