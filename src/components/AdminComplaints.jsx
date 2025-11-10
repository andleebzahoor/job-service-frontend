import { useEffect, useState } from "react";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("https://job-service-backend.onrender.com/admin/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data.complaints))
      .catch(() => console.log("Error fetching complaints"));
  }, []);

  const resolveComplaint = async (id) => {
    await fetch(`https://job-service-backend.onrender.com/admin/complaints/${id}/resolve`, {
      method: "POST",
    });
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "resolved" } : c
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Client Complaints</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">client</th>
            <th className="border p-2">Provider</th>
            <th className="border p-2">Complaint</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.user_name}</td>
              <td className="border p-2">{c.provider_name}</td>
              <td className="border p-2">{c.complaint}</td>
              <td className="border p-2">{c.status}</td>
              <td className="border p-2">
                {c.status === "pending" && (
                  <button
                    onClick={() => resolveComplaint(c.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Mark Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
