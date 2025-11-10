import { useEffect, useState } from "react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://job-service-backend.onrender.com/admin/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews))
      .catch(() => console.log("Error fetching reviews"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Reviews</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Review</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No reviews yet.
              </td>
            </tr>
          ) : (
            reviews.map((r) => (
              <tr key={r.id}>
                <td className="border p-2">{r.user_name || "Anonymous"}</td>
                <td className="border p-2">
                  {"⭐".repeat(r.rating)} ({r.rating})
                </td>
                <td className="border p-2">{r.review}</td>
                <td className="border p-2">
                  {new Date(r.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
