// import { useState, useEffect } from "react";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Header from "./components/Header";
// import Logout from "./components/Logout";
// import About from "./components/About";
// import Profile from "./components/Profile";
// import Support from "./components/Support";
// import Services from "./components/Service";
// import AdminDashboard from "./components/AdminDashboard"; // ✅ import admin dashboard
// import AdminProviders from "./components/AdminProviders";
// import { Navigate } from "react-router-dom";

// // ✅ Admin Route Component
// function AdminRoute({ children }) {
//   const role = localStorage.getItem("user_role");

//   if (role !== "admin") {
//     return <Navigate to="/" />;
//   }
//   return children;
// }

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 🧹 Clear old login data


//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-green-50">
//         <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
//         <p className="text-green-700 text-lg mt-6 font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Header />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/support" element={<Support />} />
//         <Route path="/service" element={<Services />} />

//         {/* ✅ Admin Protected Route */}
//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />
//         <Route
//           path="/admin/providers"
//           element={
//             <AdminRoute>
//               <AdminProviders />
//             </AdminRoute>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
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
import Work from "./components/Work";   // ✅ Import Work page

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
  
  // Only redirect if not already on /work
  if (
    firstLogin === "true" &&
    (!user?.role || user.role === "") &&
    window.location.pathname !== "/work"
  ) {
    window.location.replace("/work");
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
        <Route path="/" element={<Header />} />
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
      </Routes>
    </Router>
  );
}

export default App;

