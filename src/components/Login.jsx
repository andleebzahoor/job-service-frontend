import React, { useState, useEffect } from "react";

const Login = ({ show, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      setTimeout(() => setIsOpen(true), 10);
    } else {
      setIsOpen(false);
      setTimeout(() => {
        setUsername("");
        setPassword("");
        setError("");
      }, 300);
    }
  }, [show]);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("https://job-service-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    // Save login info
    localStorage.setItem("auth_account", JSON.stringify(data.user));
    // store existing role if any (may be null)
    if (data.user.role) localStorage.setItem("user_role", data.user.role);
    else localStorage.removeItem("user_role");

    // Fetch provider profile if exists
    const providerRes = await fetch(`https://job-service-backend.onrender.com/get_provider/${data.user.id}`);
    if (providerRes.ok) {
      const providerData = await providerRes.json();
      if (providerData.provider) {
        localStorage.setItem(`serviceProvider_${data.user.id}`, JSON.stringify(providerData.provider));
      } else {
        localStorage.removeItem(`serviceProvider_${data.user.id}`);
      }
    }

    alert("✅ Login Successful!");
    onClose();
    // After successful login:
if (data.user.role === "admin") {
  window.location.replace("/admin");
  return;
}


  if (data.user.role === null || data.user.role === "user") {
  localStorage.setItem("first_login", "true");
  window.location.replace("/work");
  return;
}



    // otherwise go home
    window.location.replace("/");
  } catch (err) {
    setError("⚠️ Server not responding");
  }
};




  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-96 p-8 transform transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-green-800 italic">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-green-50 rounded-lg focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-green-50 rounded-lg focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!username || !password}
            className={`w-full py-2 rounded-lg text-white font-semibold ${username && password
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-400 cursor-not-allowed"
              }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


