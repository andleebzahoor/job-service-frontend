
import React, { useState, useEffect } from "react";
import Usingapp from "./Usingapp.jsx"

const Work = () => {
  const [role, setRole] = useState(""); // "", "choose", or "provider"
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(null);

  const [providerData, setProviderData] = useState({
    name: "",
    service: "",
    contact: "",
    location: "",
    experience: "",
    availability: "",
    rate: "",
    photo: null,
  });

  const isFormValid =
    providerData.name.trim() &&
    providerData.service.trim() &&
    providerData.contact.trim() &&
    providerData.location.trim() &&
    providerData.experience.trim() &&
    providerData.availability.trim();

 

    useEffect(() => {
  const storedUser = localStorage.getItem("auth_account");
  const isFirstLogin = localStorage.getItem("first_login");
  const storedRole = localStorage.getItem("user_role");

  if (!storedUser) return;

  const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

  // 🟢 First login → show role chooser
  if (isFirstLogin === "true" && (!storedRole || storedRole === "user")) {
    setRole("choose");
    return;
  }

  // 🟠 Client → done, remove flag
  if (storedRole === "client") {
    localStorage.removeItem("first_login");
    return;
  }

  // 🔵 Provider
  if (storedRole === "provider") {
    const providerExists = localStorage.getItem(`serviceProvider_${parsedUser.id}`);
    if (providerExists) {
      // ✅ Only redirect once if first_login still true
      if (isFirstLogin === "true") {
        localStorage.removeItem("first_login");
        window.location.replace("/");
      }
    } else {
      // Provider but hasn’t filled form → show form
      setRole("provider");
    }
  }
}, []);


  
  useEffect(() => {
    if (user && user.id) {
      const saved = localStorage.getItem(`serviceProvider_${user.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProviderData({
            name: parsed.name || "",
            service: parsed.service || "",
            contact: parsed.contact || "",
            location: parsed.location || "",
            experience: parsed.experience || "",
            availability: parsed.availability || "",
            rate: parsed.rate || "",
            photo: null,
            _photoFilename: parsed.photo || null,
          });
        } catch {}
      }
    }
  }, [user]);

  useEffect(() => {
    if (role) {
      const timeout = setTimeout(() => setShowModal(true), 200);
       return () => clearTimeout(timeout);
    } else {
      setShowModal(false);
    }
  }, [role]);

  const handleProviderChange = (e) => {
    const { name, value } = e.target;
    setProviderData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setProviderData((prev) => ({ ...prev, photo: file }));
  };

  const handleProviderSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const stored = localStorage.getItem("auth_account");
    let currentUser = null;
    if (stored) {
      try {
        currentUser = JSON.parse(stored);
      } catch {
        currentUser = null;
      }
    }

    if (!currentUser || !currentUser.id) {
      setErrorMsg("⚠️ Please log in first.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", currentUser.id);
    formData.append("name", providerData.name);
    formData.append("service", providerData.service);
    formData.append("contact", providerData.contact);
    formData.append("location", providerData.location);
    formData.append("experience", providerData.experience);
    formData.append("availability", providerData.availability);
    formData.append("rate", providerData.rate || "");
    if (providerData.photo) formData.append("photo", providerData.photo);

    try {
      const response = await fetch("https://job-service-backend.onrender.com/register_provider", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        

        const providerToSave = {
          user_id: currentUser.id,
          name: providerData.name,
          service: providerData.service,
          contact: providerData.contact,
          location: providerData.location,
          experience: providerData.experience,
          availability: providerData.availability,
          rate: providerData.rate,
          
        };
        if (providerData.photo) {
  providerToSave.photo = `user_${currentUser.id}.jpg`;
}

        localStorage.setItem(
          `serviceProvider_${currentUser.id}`,
          JSON.stringify(providerToSave)
        );

        alert("✅ Your profile has been submitted!");
        localStorage.removeItem("first_login");
        setRole("");
        window.location.href = "/";
      } else {
        setErrorMsg(data.message || "❌ Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("⚠️ Server error");
    }
  };

  // NEW: Save role in DB and locally. For "provider" we open provider modal; for "client" we redirect home.
  const saveUserRole = async (selectedRole) => {
    const user = JSON.parse(localStorage.getItem("auth_account"));
    try {
      await fetch("https://job-service-backend.onrender.com/set_role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, role: selectedRole }),
      });
    } catch (err) {
      console.error("set_role failed", err);
      // still continue to update local state; optionally show error
    }

    localStorage.setItem("user_role", selectedRole);
    const updatedUser = { ...user, role: selectedRole };
    localStorage.setItem("auth_account", JSON.stringify(updatedUser));
    // localStorage.removeItem("first_login");

    if (selectedRole === "provider") {
      // open provider modal in this page
      setRole("provider");
    } else {
      // client → go home
       window.location.href = "/"; 
    }
  };

  return (
    <div className="h-auto bg-gradient-to-b from-white to-green-50 flex flex-col items-center py-10 px-4 relative overflow-x-hidden">
      <h1 className="md:text-6xl text-3xl font-bold mb-12 text-green-700 text-center">
        Work With Us
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => window.location.href = "/"}
          className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow hover:bg-blue-700 transition"
        >7
          I am a Client
        </button>

        <button
          onClick={() => {
            const stored = localStorage.getItem("auth_account");
            const loggedUser = stored ? JSON.parse(stored) : null;
            if (!loggedUser) {
              alert("⚠️ Please log in first");
              return;
            }

            const providerExists = localStorage.getItem(`serviceProvider_${user.id}`);
            if (providerExists) {
              alert("✅ You already submitted provider form!");
              window.location.href = "/";
              return;
            }

            // Save role then open provider form modal
            saveUserRole("provider");
          }}
          className="bg-green-600 text-white px-6 py-4 rounded-lg shadow hover:bg-green-700 transition"
        >
          I am a Service Provider
        </button>
      </div>

      {/* First-time login popup */}
      {role === "choose" && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          <div className="bg-white p-8 rounded-xl shadow-xl z-10 text-center">
            <h2 className="text-2xl font-bold mb-6 text-green-700">Select Your Role</h2>

            <button
              onClick={() => saveUserRole("client")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700"
            >
              I am a Client
            </button>

            <button
              onClick={() => saveUserRole("provider")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              I am a Service Provider
            </button>
          </div>
        </div>
      )}

      {/* Provider Modal */}
      {role === "provider" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setRole("")}></div>

          <div className={`bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative z-10 transform transition-all duration-300 ${showModal ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
            <button onClick={() => setRole("")} className="absolute top-4 right-4 text-gray-700 hover:text-gray-900">✕</button>

            <h2 className="text-3xl font-bold mb-4 text-center italic">Service Provider Registration</h2>

            <form onSubmit={handleProviderSubmit} className="flex flex-col gap-4">
              {[
                ["name", "Full Name"],
                ["service", "Service / Service Offered"],
                ["contact", "Email / Phone"],
                ["location", "Location"],
                ["experience", "Experience (in years)"],
                ["availability", "Availability (Mon-Fri etc)"],
              ].map(([field, placeholder]) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={placeholder}
                  value={providerData[field]}
                  onChange={handleProviderChange}
                  className="border-none rounded-full bg-green-50 px-4 py-2 focus:outline-none"
                  required
                />
              ))}

              <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} className="border-none rounded-full bg-green-50 px-4 py-2 focus:outline-none" />

              <input type="number" name="rate" placeholder="Rate per hour / job" value={providerData.rate} onChange={handleProviderChange} className="border-none rounded-full bg-green-50 px-4 py-2 focus:outline-none" />

              {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

              <button type="submit" disabled={!isFormValid} className={`mt-2 px-6 py-3 rounded-lg shadow w-full text-white ${isFormValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <Usingapp/> 
    </div>
  );
};

export default Work;
