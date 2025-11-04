import React from "react";
import {Link} from "react-router-dom"
import Support from "./Support";
import Navbar from "./Nav";
import Footer from "./Footer";

const Services = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 px-6 py-10 overflow-x-hidden">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold text-green-700 text-center mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        We connect you with skilled and trusted workers for all household, repair, and construction needs.
      </p>

      {/* List of Services */}
      <h2 className="text-2xl font-semibold text-green-700 mb-3">Available Services</h2>
      <ul className="list-disc pl-6 text-gray-700 leading-7">
        <li>Carpenters for furniture work & repairs</li>
        <li>Electricians for wiring, fittings & repairs</li>
        <li>Plumbers for bathroom & kitchen work</li>
        <li>Mason / Myson for construction & plastering</li>
        <li>Painters for home & office painting</li>
        <li>Daily Labour for loading & construction work</li>
        <li>Tile & Marble workers</li>
        <li>Welders & Metal work</li>
        <li>House cleaning & tank cleaning helpers</li>
        <li>AC & Fridge technicians</li>
        <li>Home maids & cooking help</li>
      </ul>

      {/* Divider */}
      <div className="w-full border-b my-8"></div>

      {/* How it works */}
      <h2 className="text-2xl font-semibold text-green-700 mb-3">How It Works</h2>
      <ol className="list-decimal pl-6 text-gray-700 leading-7">
        <li>Browse and select the service you need</li>
        <li>Send request or contact support</li>
        <li>We connect you with nearby verified workers</li>
        <li>Worker visits and completes the job</li>
      </ol>

      {/* Divider */}
      <div className="w-full border-b my-8"></div>

      {/* Why Choose Us */}
      <h2 className="text-2xl font-semibold text-green-700 mb-3">Why Choose Us?</h2>
      <ul className="list-disc pl-6 text-gray-700 leading-7">
        <li>Local experienced workers</li>
        <li>Verified & trusted workforce</li>
        <li>Simple and fast booking process</li>
        <li>Affordable pricing</li>
        <li>Support available when needed</li>
      </ul>

      {/* Divider */}
      <div className="w-full border-b my-8"></div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-700 mb-4">
          Need help finding the right worker?
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
         <Link to="/support"> Contact Support</Link>
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Services;

