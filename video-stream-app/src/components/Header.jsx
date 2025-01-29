// components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#2c698d] text-white py-3 px-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link className="text-white">
            <img src="/logo.png" className="max-w-[180px]" alt="" />
          </Link>
        </div>

        {/* Burger Menu Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-transparent focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center normal-trns lg:space-x-10 absolute lg:static w-full lg:w-auto top-16 lg:top-auto left-0 lg:left-auto z-10 lg:z-auto py-4 lg:py-0 bg-[#2c698d]`}
        >
          <ul className="space-y-4 lg:space-y-0 lg:space-x-10 lg:flex">
            <li>
              <Link
                to="/"
                className="block text-white hover:text-[#e3f6f5] hover:underline-offset-5 hover:underline transition px-4 lg:px-0"
                onClick={() => setIsMenuOpen(false)} // Close menu after clicking
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block text-white hover:text-[#e3f6f5] hover:underline hover:underline-offset-5 transition px-4 lg:px-0"
                onClick={() => setIsMenuOpen(false)} // Close menu after clicking
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
