import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Users, Wrench, LayoutDashboard, Settings, Bell } from "lucide-react";

const AdminDashboard = () => {
  const username = JSON.parse(localStorage.getItem("auth_account"))?.username;

  const [users, setUsers] = useState([]);
  const [providerStats, setProviderStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });

  // ✅ Fetch users
  useEffect(() => {
    fetch("https://job-service-backend.onrender.com/admin/get_users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch(() => console.log("Error fetching users"));
  }, []);

  // ✅ Fetch provider stats
  useEffect(() => {
    fetch("https://job-service-backend.onrender.com/admin/get_provider_stats")
      .then((res) => res.json())
      .then((data) => setProviderStats(data))
      .catch(() => console.log("Error fetching provider stats"));
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* ✅ Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-4">
          <Link className="block hover:bg-green-600 p-2 rounded flex items-center gap-2" to="/admin">
            <LayoutDashboard size={18}/> Dashboard
          </Link>
          <Link className="block hover:bg-green-600 p-2 rounded flex items-center gap-2" to="/admin/users">
            <Users size={18}/> Users
          </Link>
          <Link className="block hover:bg-green-600 p-2 rounded flex items-center gap-2" to="/admin/providers">
            <Wrench size={18}/> Providers
          </Link>
          <Link className="block hover:bg-green-600 p-2 rounded flex items-center gap-2" to="#">
            <Settings size={18}/> System
          </Link>
        </nav>

        <div className="mt-auto">
          <Link to="/logout" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded">
            <LogOut size={18}/> Logout
          </Link>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-8">

        {/* ✅ Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" size={22}/>
            <span className="font-semibold text-gray-700">👋 Welcome, {username}</span>
          </div>
        </div>

        {/* ✅ Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
            <span className="text-gray-500 text-sm">Total Users</span>
            <span className="text-2xl font-bold text-green-700">{users.length}</span>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
            <span className="text-gray-500 text-sm">Service Providers</span>
            <span className="text-2xl font-bold text-green-700">{providerStats.total}</span>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
            <span className="text-gray-500 text-sm">Pending Approval</span>
            <span className="text-2xl font-bold text-red-600">{providerStats.pending}</span>
          </div>
        </div>

        {/* ✅ Users Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Registered Users</h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.username}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 text-green-600 font-semibold">
                    {u.role === "admin" ? "👑 Admin" : "{u.role}"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
