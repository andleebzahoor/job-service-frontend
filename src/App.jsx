
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from "./components/Header";
import Logout from "./components/Logout";
import About from "./components/About";
import Profile from "./components/Profile";
import Support from "./components/Support";
import Services from "./components/Service";
import AdminDashboard from "./components/AdminDashboard";
import AdminProviders from "./components/AdminProviders";
import AdminComplaints from "./components/AdminComplaints";
import AdminReviews from "./components/AdminReviews";
import Work from "./components/Work";   // ✅ Import Work page
import Home from "./components/Home"


// ✅ Admin Route Component
function AdminRoute({ children }) {
  const role = localStorage.getItem("user_role");
  if (role !== "admin") return <Navigate to="/" />;
  return children;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("auth_account"));
  const firstLogin = localStorage.getItem("first_login");

  if (
    firstLogin === "true" &&
    (!user?.role || user.role === "")) 
   {
    window.location.replace("/work");
    localStorage.setItem("first_login", "false");
  }
}, []);





  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-50">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        <p className="text-green-700 text-lg mt-6 font-semibold">Loading...</p>
      </div>
    );
  }

  // ✅ First-login redirect logic (after loading)
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/service" element={<Services />} />
        <Route path="/work" element={<Work />} /> {/* ✅ Role select page */}

        {/* ✅ Admin protected pages */}
        <Route path="/admin" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
        <Route path="/admin/providers" element={
          <AdminRoute><AdminProviders /></AdminRoute>
        } />
        <Route
            path="/admin/complaints"
             element={
    <AdminRoute>
      <AdminComplaints />
    </AdminRoute>
  }
/>
<Route path="/admin/reviews" element={<AdminRoute> <AdminReviews /></AdminRoute>} />

      </Routes>
    </Router>
  );
}

export default App;

