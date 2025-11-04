import React, { useState, useEffect } from "react";
import Login from "./Login";
import SignUp from "./Signup";
import About from "./About.jsx"
import Support from "./Support.jsx";
import Services from "./Service.jsx";
import { useNavigate ,Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_account");

    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      localStorage.removeItem("auth_account");
    }
  }, []);

  const handleLogout = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth_account"));

    if (storedUser?.id) {
      localStorage.removeItem(`serviceProvider_${storedUser.id}`);
    }

    localStorage.removeItem("auth_account");

    setUser(null);
    setShowMenu(false);

    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const user = JSON.parse(localStorage.getItem("auth_account"));
    if (!user) return;

    const confirmDelete = window.confirm("⚠️ Are you sure? This cannot be undone!");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://job-service-backend.onrender.com/delete_account/${user.id}`, { method: "DELETE" });

      const data = await res.json();
      alert(data.message);

      localStorage.removeItem("auth_account");
      localStorage.removeItem(`serviceProvider_${user.id}`);

      window.location.reload();
    } catch {
      alert("Server error while deleting account");
    }
  };

  const providerData = user ? JSON.parse(localStorage.getItem(`serviceProvider_${user.id}`)) : null;

  const providerPhoto = providerData?.photo
    ? (providerData.photo.startsWith("http")
      ? providerData.photo
      : `https://job-service-backend.onrender.com/uploads/${providerData.photo}`)
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div>
      <nav className="w-full p-5 flex items-center justify-between bg-white shadow overflow-x-hidden">
        <div>
          <img src="/assets/logo.svg" className="w-36" alt="logo" />
        </div>

        <ul className="hidden md:flex items-center gap-10 text-black font-semibold">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/service">Service</Link></li>
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <button onClick={() => setShowLogin(true)} className="font-semibold hover:text-green-600">
                Login
              </button>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <img
                src={providerPhoto}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer border border-green-600 object-cover"
                onClick={() => navigate("/profile")}
                onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              />

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Logout
              </button>

              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
              >
                Delete Account
              </button>
            </>
          )}
        </div>

        <div className="md:hidden text-3xl text-black cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
          <i className={`fa-solid ${showMenu ? "fa-xmark" : "fa-bars"}`}></i>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-50 p-6 transform ${showMenu ? "translate-x-0" : "-translate-x-full"} transition`}>
        <div className="flex justify-end">
          <i className="fa-solid fa-xmark text-3xl cursor-pointer" onClick={() => setShowMenu(false)} />
        </div>

        <ul className="mt-8 space-y-6 text-black">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/service">Service</Link></li>

          {!user ? (
            <>
              <li><button onClick={() => { setShowMenu(false); setShowLogin(true); }}>Login</button></li>
              <li><button onClick={() => { setShowMenu(false); setShowSignUp(true); }}>Sign Up</button></li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/profile")}>
                <img
                  src={providerPhoto}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover border border-green-600"
                  onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png")}
                />

                {user?.username}
              </li>
              <li><button onClick={handleLogout} className="text-red-600">Logout</button></li>
              <li><button onClick={handleDeleteAccount} className="text-gray-600">Delete Account</button></li>
            </>
          )}
        </ul>
      </div>

      {showLogin && (
        <Login
          show={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={(loggedUser) => {
            localStorage.setItem("auth_account", JSON.stringify(loggedUser));
            setUser(loggedUser);
            setShowLogin(false);
          }}
        />
      )}

      {showSignUp && (
        <SignUp
          shows={showSignUp}
          onClose={() => setShowSignUp(false)}
          onSignUp={() => {
            setShowSignUp(false);
            setTimeout(() => {
              setShowLogin(true);
            }, 200);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;