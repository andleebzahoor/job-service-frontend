import React, { useState, useEffect } from "react";
import Navbar from "./Nav.jsx"

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("auth_account"));
  const user_id = storedUser?.id;
  const role = storedUser?.role;  // ✅ check user role

  const [providerForm, setProviderForm] = useState({
    name: "",
    service: "",
    contact: "",
    location: "",
    availability: "",
    experience: "",
    rate: "",
    photo: null,
    photoFilename: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user_id) return;

    const savedProvider = localStorage.getItem(`serviceProvider_${user_id}`);

    if (savedProvider) {
      const data = JSON.parse(savedProvider);

      setProviderForm((prev) => ({
        ...prev,
        ...data,
        photo: null,
        photoFilename: data.photo || prev.photoFilename || ""
      }));
    }
  }, [user_id]);

  const handleProviderChange = (e) => {
    const { name, value, files } = e.target;
    setProviderForm({
      ...providerForm,
      [name]: files ? files[0] : value,
    });
  };

  const handleProviderSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user_id", user_id);

    Object.keys(providerForm).forEach((key) => {
      if (key === "photo") {
        if (providerForm.photo) {
          formData.append("photo", providerForm.photo);
        }
      } else if (key !== "photoFilename") {
        formData.append(key, providerForm[key]);
      }
    });

    formData.append("old_photo", providerForm.photoFilename);

    try {
      const response = await fetch("https://job-service-backend.onrender.com/update_provider", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const updatedProvider = {
          ...data.provider,
          photo: data.filename || providerForm.photoFilename,
        };

        localStorage.setItem(
          `serviceProvider_${user_id}`,
          JSON.stringify(updatedProvider)
        );

        setProviderForm((prev) => ({
          ...prev,
          ...updatedProvider,
          photo: null,
          photoFilename: updatedProvider.photo
        }));

        setMessage("✅ Profile updated successfully!");
      } else {
        setMessage(data.message || "❌ Failed to update provider");
      }
    } catch {
      setMessage("❌ Error updating provider");
    }
  };

  const imgUrl = providerForm.photoFilename
    ? (providerForm.photoFilename.startsWith("http")
      ? providerForm.photoFilename
      : `https://job-service-backend.onrender.com/uploads/${providerForm.photoFilename}`
    )
    : "/default-user.png";

  // ✅ If user is CLIENT, show simple profile screen
  if (role === "client") {
    return (
    <>
    <Navbar/>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Welcome, {storedUser.username} 👋
        </h2>

        <p className="text-gray-600 mb-4">
          You are logged in as a <b>Client</b>.
        </p>

        <p className="text-gray-700 mb-6">
          Search for services from the Home page!
        </p>

        <button
          onClick={() => window.location.href = "/"}
          className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
        >
          Go to Search 🔍
        </button>
      </div>
     </> 
    );
  }

  // ✅ If PROVIDER — show full provider form
  return (
   <>
   <Navbar/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg overflow-x-hidden">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Your Profile</h2>

      <div className="flex justify-center mb-4">
        <img
          src={imgUrl}
          alt="Profile"
          onError={(e) =>
            (e.target.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png")
          }
          className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md"
        />

      </div>

      {message && <p className="mb-4 font-semibold">{message}</p>}

      <form onSubmit={handleProviderSubmit}>
        {[
          "name",
          "service",
          "contact",
          "location",
          "availability",
          "experience",
          "rate",
        ].map((field) => (
          <input
            key={field}
            type={field === "rate" || field === "experience" ? "number" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={providerForm[field]}
            onChange={handleProviderChange}
            className="w-full border p-2 mb-2"
            required
          />
        ))}

        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleProviderChange}
          className="w-full border p-2 mb-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  </>
  );
};

export default Profile;


