import React from "react";
import Navbar from "./Nav.jsx"
import Footer from "./Footer.jsx";
export default function About() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 px-6 py-12 flex flex-col items-center overflow-x-hidden">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        About Our Local Service Platform
      </h1>

      <p className="text-gray-700 max-w-3xl text-center leading-relaxed mb-8 text-base">
        Our platform is created specially for local skilled workers like carpenters, masons, plumbers,
        electricians, painters, and other hardworking professionals in our community. Many talented workers
        struggle to find regular work because clients can't easily reach them. Our goal is to connect
        skilled workers with people who need home repairs, construction help, or daily services.
      </p>

      <p className="text-gray-700 max-w-3xl text-center leading-relaxed mb-8 text-base">
        We make it simple for workers to create a profile, list their skills, and get discovered by
        customers in their area. For clients, our platform offers a quick and reliable way to find trusted
        local workers without asking around or waiting for recommendations.
      </p>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl w-full mb-10">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">What We Offer</h2>
        <ul className="text-gray-600 space-y-2 text-sm">
          <li>✔️ Easy sign‑up for workers</li>
          <li>✔️ Search for carpenters, masons, plumbers, electricians, and more</li>
          <li>✔️ Local service providers near your home</li>
          <li>✔️ Real people, real services — no middleman</li>
          <li>✔️ Build trust with simple reviews and ratings</li>
        </ul>
      </div>

      <div className="bg-blue-600 text-white rounded-xl p-6 max-w-3xl text-center shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-white/90 text-sm">
          To support local skilled workers by giving them more job opportunities and making it easy for
          customers to find trusted helpers in their own community.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl w-full mb-10">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Why This Platform Matters</h2>
        <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">
          In many areas, local workers depend on word-of-mouth to get work. Sometimes they wait days or
          even weeks for the next job. We understand their hard work and want to support them by giving
          them a simple digital space where they can find customers easily. At the same time, customers
          can find reliable workers without wasting time searching.
        </p>
        <ul className="text-gray-600 space-y-2 text-sm">
          <li>✔️ Helps daily wage workers get continuous work</li>
          <li>✔️ Saves time for customers in finding trusted helpers</li>
          <li>✔️ Encourages local employment and supports families</li>
          <li>✔️ Promotes skilled workers in the community</li>
        </ul>
      </div>

      <div className="bg-blue-600 text-white rounded-xl p-6 max-w-3xl text-center shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-white/90 text-sm">
          To support local skilled workers by giving them more job opportunities and making it easy for
          customers to find trusted helpers in their own community.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}
