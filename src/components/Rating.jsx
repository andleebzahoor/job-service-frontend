
// import React, { useState, useEffect } from "react";

// const Rating = () => {
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");
//   const [reviews, setReviews] = useState([]);

//   // ✅ Get logged-in user from localStorage
//   const user = JSON.parse(localStorage.getItem("auth_account"));

//   // ✅ Fetch all reviews
//   const fetchReviews = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/reviews");
//       const data = await res.json();
//       setReviews(data);
//     } catch (err) {
//       console.log("Error fetching reviews", err);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);
//   console.log("Sending username:", user?.username);

//   // ✅ Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!rating) {
//       alert("Please give rating");
//       return;
//     }

//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/reviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user?.user?.id,
//           username: user?.username, // ✅ send username
//           rating,
//           review,
//         }),
//       });

//       await res.json();
//       alert("Thanks for your feedback!");

//       setRating(0);
//       setReview("");

//       fetchReviews(); // refresh reviews
//     } catch (error) {
//       console.log("Error saving review", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-start gap-10 p-10 bg-gray-50">
//       {/* ===== Header Content ===== */}
//       <div className="flex flex-col lg:flex-row gap-16 w-full">
//         <div className="flex-1 flex flex-col gap-16">
//           <div>
//             <h3 className="text-2xl text-green-600 font-semibold mb-3">For Clients</h3>
//             <h2 className="text-4xl font-bold text-gray-800 mb-4">Find talent your way</h2>
//             <p className="text-gray-600 leading-relaxed text-lg">
//               Work with top professionals and grow your business.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-2xl text-green-600 font-semibold mb-3">For Service Providers</h3>
//             <h2 className="text-4xl font-bold text-gray-800 mb-4">Grow your career your way</h2>
//             <p className="text-gray-600 leading-relaxed text-lg">
//               Get hired easily and work with real clients.
//             </p>
//           </div>
//         </div>

//         {/* ===== Rating Box ===== */}
//         <div className="lg:w-[400px] w-full bg-white rounded-2xl p-6 shadow-lg">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Rate Your Experience
//           </h2>

//           {/* ⭐ Stars */}
//           <div className="flex mb-4 gap-2 justify-center lg:justify-start">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <i
//                 key={star}
//                 className={`fa-star cursor-pointer text-3xl transition-colors ${
//                   rating >= star ? "fa-solid text-yellow-400" : "fa-regular text-gray-300"
//                 }`}
//                 onClick={() => setRating(star)}
//               ></i>
//             ))}
//           </div>

//           {/* ✍️ Review */}
//           <textarea
//             placeholder="Write your feedback..."
//             className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//           />

//           {/* ✅ Submit */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
//           >
//             Submit Review
//           </button>
//         </div>
//       </div>

//       {/* ===== Show All Reviews (Slider) ===== */}
//       <div className="w-full  p-6 ">
//         <h3 className="text-xl font-semibold mb-4 text-gray-800">User Reviews</h3>

//         {reviews.length === 0 ? (
//           <p className="text-gray-500">No reviews yet.</p>
//         ) : (
//           <div className="relative w-full">
//             <div className="flex gap-4 overflow-x-auto scroll-snap-x pb-4 hide-scrollbar">
//               {reviews.map((r, i) => (
//                 <div
//                   key={i}
//                   className="min-w-[250px] bg-white shadow-lg rounded-xl p-4 scroll-snap-center border border-gray-100 flex-shrink-0"
//                 >
//                   <p className="font-semibold text-green-600 mb-1">
//                     {r.username || "Anonymous"}
//                   </p>

//                   <div className="flex items-center mb-2">
//                     {Array.from({ length: r.rating }).map((_, idx) => (
//                       <i key={idx} className="fa-solid fa-star text-yellow-400"></i>
//                     ))}
//                   </div>

//                   {r.review ? (
//                     <p className="text-gray-700 text-sm">{r.review}</p>
//                   ) : (
//                     <p className="text-gray-400 italic text-sm">No comment</p>
//                   )}

//                   <p className="text-gray-400 text-xs mt-2">
//                     {new Date(r.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-center gap-2 mt-2">
//               {reviews.map((_, i) => (
//                 <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Rating;
import React, { useState, useEffect } from "react";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // ✅ Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("auth_account"));

  // ✅ Fetch all reviews
  const fetchReviews = async () => {
    try{
      const res = await fetch("https://job-service-backend.onrender.com/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.log("Error fetching reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please give rating");
      return;
    }

    try {
      const res = await fetch("https://job-service-backend.onrender.com/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
 // ✅ send username
          rating,
          review,
        }),
      });

      await res.json();
      alert("Thanks for your feedback!");

      setRating(0);
      setReview("");

      fetchReviews(); // refresh reviews
    } catch (error) {
      console.log("Error saving review", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-10 p-10 bg-gray-50 overflow-x-hidden">
      {/* ===== Header Content ===== */}
      <div className="flex flex-col lg:flex-row gap-16 w-full">
        <div className="flex-1 flex flex-col gap-16">
          <div>
            <h3 className="text-2xl text-green-600 font-semibold mb-3">For Clients</h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find talent your way</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Work with top professionals and grow your business.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-green-600 font-semibold mb-3">For Service Providers</h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Grow your career your way</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Get hired easily and work with real clients.
            </p>
          </div>
        </div>

        {/* ===== Rating Box ===== */}
        <div className="lg:w-[400px] w-full bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rate Your Experience
          </h2>

          {/* ⭐ Stars */}
          <div className="flex mb-4 gap-2 justify-center lg:justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fa-star cursor-pointer text-3xl transition-colors ${
                  rating >= star ? "fa-solid text-yellow-400" : "fa-regular text-gray-300"
                }`}
                onClick={() => setRating(star)}
              ></i>
            ))}
          </div>

          {/* ✍️ Review */}
          <textarea
            placeholder="Write your feedback..."
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* ✅ Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* ===== Show All Reviews (Slider) ===== */}
      <div className="w-full bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">User Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="relative w-full">
            <div className="flex gap-4 overflow-x-auto scroll-snap-x pb-4 hide-scrollbar">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="min-w-[250px] bg-white shadow-lg rounded-xl p-4 scroll-snap-center border border-gray-100 flex-shrink-0"
                >
                  <p className="font-semibold text-green-600 mb-1">
                    {r.username || "Anonymous"}
                  </p>

                  <div className="flex items-center mb-2">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <i key={idx} className="fa-solid fa-star text-yellow-400"></i>
                    ))}
                  </div>

                  {r.review ? (
                    <p className="text-gray-700 text-sm">{r.review}</p>
                  ) : (
                    <p className="text-gray-400 italic text-sm">No comment</p>
                  )}

                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-2">
              {reviews.map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
