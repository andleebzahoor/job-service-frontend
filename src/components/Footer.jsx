import React from "react";
import About from "./About.jsx"
import Support from "./Support.jsx"
import Services from "./Service";
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className=" text-gray-300 py-12 mt-20 overflow-x-hidden" style={{backgroundColor:"var(--color-green)"}}>
      <div className="max-w-5xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-12 justify-center">
        {/* Logo and About */}
        <div>
          <img src="/assets/logo-white2.png" alt="JobFinder Logo" className="h-10 mb-4" />
          <p className="text-sm leading-relaxed">
            Find skilled professionals or get hired fast!  
            <span className="text-green-400 font-semibold"> JobFinder </span> connects clients and service providers seamlessly.
          </p>
        </div>

        
        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-400 transition"><Link to="/">Home</Link></li>
            <li className="hover:text-green-400 transition"><Link to="/about">About Us</Link></li>
            <li className="hover:text-green-400 transition"><Link to="/service">Services</Link></li>
            <li  className="hover:text-green-400 transition"><Link to="/support">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3"><Link to="/support">Support</Link></h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-400 transition"><Link to="/support">FAQs</Link></li>
            <li className="hover:text-green-400 transition"><Link to="/support" >Terms & Conditions</Link></li>
            <li className="hover:text-green-400 transition"><Link to="/support" >Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">support@jobfinder.com</li>
            <li className="flex items-center gap-2">+91 98765 43210</li>
            <li className="flex items-center gap-2"> Srinagar, Kashmir</li>
          </ul>
        </div>
         
      </div>   
      {/* Bottom Line */}
      <div className="border-t border-gray-300 mt-10 pt-5 text-center text-sm">
        © {new Date().getFullYear()} <span className="text-green-400 font-semibold">JobFinder</span>. All Rights Reserved.
      </div>
      
    </footer>
  );
};

export default Footer;
