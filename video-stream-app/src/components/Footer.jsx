// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#272643] text-white py-3">
      <div className="container flex flex-col lg:flex-row items-center justify-between mx-auto text-center space-y-2">
        <p className="text-center text-white text-sm sm:text-base">
          © {new Date().getFullYear()} Safeboxhub | All rights reserved.
        </p>
        <nav className="space-x-4">
          <Link to="/terms-conditions" className="hover:text-[#e3f6f5] hover:underline hover:underline-offset-5 text-white">
            Terms & Conditions
          </Link>
          <Link to="/privacy-policy" className="hover:text-[#e3f6f5] hover:underline hover:underline-offset-5 text-white">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
