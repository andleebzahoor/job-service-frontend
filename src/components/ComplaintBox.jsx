import { useEffect, useState } from "react";
import ComplaintBox from "./ComplaintBox";

export default function ClientProviders() {
  const [providers, setProviders] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("auth_account"));

  useEffect(() => {
    fetch("https://job-service-backend.onrender.com/admin/providers")
      .then(res => res.json())
      .then(data => setProviders(data.providers))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-2xl font-semibold mb-6">Available Service Providers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-11/12 max-w-5xl">
        {providers.map(provider => (
          <div key={provider.id} className="p-4 border rounded-lg shadow bg-white">
            <h3 className="text-lg font-bold">{provider.name}</h3>
            <p className="text-gray-600">{provider.service}</p>
          </div>
        ))}
      </div>

      {/* ✅ Only ONE complaint box for all providers */}
      <ComplaintBox userId={loggedUser.id} />
    </div>
  );
}
