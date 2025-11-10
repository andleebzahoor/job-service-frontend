import { useEffect, useState } from "react";

export default function AdminProviders() {
  const [providers, setProviders] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  // ✅ FETCH PROVIDERS
  const fetchProviders = () => {
    fetch("https://job-service-backend.onrender.com/admin/providers")
      .then((res) => res.json())
      .then((data) => {
      // ✅ Only show approved providers
       setProviders(data.providers); 
    })
      .catch(() => console.log("Error fetching providers"));
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // ✅ CHANGE STATUS (approve / reject)
  const updateStatus = (id, action) => {
    fetch(`https://job-service-backend.onrender.com/admin/provider/${action}/${id}`, {
      method: "POST",
    })
      .then(res => res.json())
      .then(() => fetchProviders());
  };

  // ✅ EDIT PROVIDER
  const editProvider = () => {
    fetch(`https://job-service-backend.onrender.com/edit_provider/${editData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData)
    })
      .then(res => res.json())
      .then(() => {
        alert("Provider updated ✅");
        setEditModal(false);
        fetchProviders();
      });
  };

  // ✅ DELETE PROVIDER
  const deleteProvider = async (id) => {
    if (!window.confirm("Delete provider? This action cannot be undone.")) return;

    await fetch(`https://job-service-backend.onrender.com/delete_provider/${id}`, {
      method: "DELETE"
    });

    alert("Provider deleted ❌");
    fetchProviders();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Service Providers</h1>

      <table className="w-full border">
<thead className="bg-green-200">
  <tr>
    <th className="p-2 border">Name</th>
    <th className="p-2 border">Service</th>
    <th className="p-2 border">Location</th>
    <th className="p-2 border">Availability</th>
    <th className="p-2 border">Experience</th>
    <th className="p-2 border">Rate</th>
    <th className="p-2 border">Contact</th>
    
    <th className="p-2 border">Status</th>
    <th className="p-2 border">Actions</th>
  </tr>
</thead>


        <tbody className="text-center">
  {providers.map((p) => (
    <tr key={p.id}>
      <td>{p.name}</td>
<td>{p.service}</td>
<td>{p.location}</td>
<td>{p.availability}</td>
<td>{p.experience}</td>
<td>{p.rate}</td>
<td>{p.contact}</td>

      
      <td className="border p-2 font-bold">
        {p.status === "pending" && <span className="text-yellow-600">⏳ Pending</span>}
        {p.status === "approved" && <span className="text-green-600">✅ Approved</span>}
        {p.status === "rejected" && <span className="text-red-600">❌ Rejected</span>}
      </td>


              <td className="border p-2 flex gap-2">
                
                {p.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(p.id, "approve")}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(p.id, "reject")}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {p.status === "approved" && (
                  <button
                    onClick={() => updateStatus(p.id, "reject")}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                )}

                {p.status === "rejected" && (
                  <button
                    onClick={() => updateStatus(p.id, "approve")}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                )}

                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => { setEditData(p); setEditModal(true); }}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteProvider(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Edit Provider</h2>

            {["name", "service", "contact", "location", "experience", "availability", "rate"].map(field => (
              <input
                key={field}
                className="w-full border p-2 mb-2"
                value={editData[field] || ""}
                placeholder={field}
                onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
              />
            ))}

            <div className="flex justify-end gap-3">
              <button className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setEditModal(false)}>Cancel</button>

              <button className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={editProvider}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
