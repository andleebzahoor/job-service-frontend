import { useState, useEffect } from "react";

export default function ComplaintBox({ userId }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch providers list
  useEffect(() => {
    fetch("https://job-service-backend.onrender.com/admin/providers")
      .then((res) => res.json())
      .then((data) => {
        // show only approved providers if needed
        const approved = data.providers.filter(p => p.status === "approved");
        setProviders(approved);
      })
      .catch((err) => console.log("Error fetching providers:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProvider) {
      setMessage("Please select a provider first.");
      return;
    }
    const loggedUser = JSON.parse(localStorage.getItem("auth_account"));
    console.log("Logged user before sending complaint:", loggedUser);
    fetch("https://job-service-backend.onrender.com/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: loggedUser?.id, 
        provider_id: selectedProvider,
        complaint: complaint,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("Complaint submitted successfully!");
        setComplaint("");
        setSelectedProvider("");
      })
      .catch(() => setMessage("Error submitting complaint"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Submit Complaint</h2>

        {/* ✅ Provider dropdown */}
        <select
          className="border w-full p-2 rounded-md mb-3"
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
        >
          <option value="">Select Provider</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.service}
            </option>
          ))}
        </select>

        {/* ✅ Complaint text */}
        <textarea
          className="border w-full p-2 rounded-md mb-3"
          placeholder="Write your complaint here..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        ></textarea>

        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
        >
          Submit
        </button>

        {message && <p className="mt-3 text-sm text-green-600 text-center">{message}</p>}
      </div>
    </div>
  );
}
