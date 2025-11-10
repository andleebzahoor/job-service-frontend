import React from "react";

const Display = ({ providers, loading, error, searchQuery }) => {
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="w-full py-10 px-6 lg:px-20 bg-white overflow-x-hidden">
      {loading && <p className="text-gray-600 text-lg">Searching...</p>}
      {error && <p className="text-red-600 text-lg">{error}</p>}

      {!loading && searchQuery && providers.length === 0 && (
        <p className="text-gray-500 text-lg">
          No providers found for "{searchQuery}"
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((p) => {

          // ✅ Fix URL if double saved
          const fixedPhoto = p.photo?.includes("https://job-service-backend.onrender.com/uploads/http")
            ? p.photo.replace("https://job-service-backend.onrender.com/uploads/", "")
            : p.photo;

          // ✅ Check if full URL or filename
          const previewImage = fixedPhoto
            ? (fixedPhoto.startsWith("http")
              ? fixedPhoto
              : `https://job-service-backend.onrender.com/${fixedPhoto}`)
            : defaultAvatar;

          return (
            <div key={p.id} className="bg-white p-5 rounded-xl shadow-md">
              <img
                src={previewImage}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover border mb-3"
                onError={(e) => (e.target.src = defaultAvatar)}
              />

              <h3 className="text-xl font-semibold capitalize">{p.name}</h3>
              <div  className="leading-relaxed"style={{ fontFamily: "var(--font-utopia)" }}>
              <p className="text-green-700 font-bold text-lg capitalize">{p.service}</p>
              <p className="text-gray-700 font-medium capitalize flex items-center gap-1">
                 <i className="fas fa-location-dot text-green-500"></i> <span className="text-gray-600">{p.location}</span>
              </p>

              <p className="text-gray-700 font-medium flex items-center gap-1">
                  <i className="fas fa-phone text-green-600"></i> <span className="text-gray-600">{p.contact}</span>
              </p>
              <p className="text-gray-700 font-medium">
                Availability:
                <span
                  className={`ml-1 font-semibold ${/(sunday|monday|tuesday|wednesday|thursday|friday|saturday|any|every)/i.test(p.availability)
                      ? "text-green-700"
                      : "text-red-700"
                    }`}
                >
                  {p.availability}
                </span>
              </p>

              <p className="text-gray-700 font-medium">
                Rate/hr: <span className="text-green-600 font-semibold">₹{p.rate}</span>
              </p>
              <p className="text-blue-900 mt-2 font-semibold ">{p.experience} Years Experience</p>
             </div> 
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Display;
