import React from "react";
import { Tv, Smartphone, Monitor } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-white via-[#bae8e8] to-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#2c698d] font-bold mb-4">
            Stream Your Favorite Movies & Shows
          </h1>
          <p className="text-lg mb-6 text-[#2c698d]">
            Discover a world of entertainment with our premium video streaming
            platform.
          </p>
          {/* <button className="bg-white text-gray-900 px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-gray-200">
            Start Watching Now
          </button> */}
        </div>
        {/* <div className="absolute inset-0 bg-black opacity-25"></div> */}
      </section>

      {/* About Section */}
      <section className="container text-black mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#2c698d] font-bold text-center mb-8">About Us</h2>
        <p className="text-center text-lg max-w-3xl mx-auto">
          We provide an exceptional streaming experience with a wide variety of
          content to cater to every taste. Enjoy seamless playback, high-quality
          videos, and exclusive content all in one place.
        </p>
      </section>

      {/* Device Compatibility Section */}
      <section className="bg-[#272643] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8">
            Watch Anywhere
          </h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12">
            Our platform is compatible with all your favorite devices. Enjoy
            seamless streaming anytime, anywhere.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Tv className="w-16 h-16 text-[#bae8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart TVs</h3>
              <p className="text-gray-400">
                Stream on your big screen for a cinematic experience.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Smartphone className="w-16 h-16 text-[#bae8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mobile Devices</h3>
              <p className="text-gray-400">
                Watch your favorite content on the go.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Monitor className="w-16 h-16 text-[#bae8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Laptops & PCs</h3>
              <p className="text-gray-400">
                Enjoy uninterrupted streaming on your computer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container text-black mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#2c698d] font-bold mb-4">Join Our Platform Today</h2>
        <p className="text-lg mb-6">
          Unlock the ultimate video streaming experience and never miss out on
          great content.
        </p>
        {/* <button className="bg-[#2c698d] text-white uppercase bold py-4 px-8 rounded-lg mt-4 hover:bg-[#272643] disabled:opacity-50 border-none">
          Get Started
        </button> */}
      </section>
    </div>
  );
};

export default Home;
