import React from "react";

const Hero = () => {
  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="space-y-6">
          <p>
            {" "}
            Order Restaurant food, takeaway and groceries.
          </p>
          <h1>
            Feast Your Senses, <span>Fast and Fresh </span>
          </h1>

          <div>
            <p>
              Enter a postcode to see what we deliver
            </p>
            <div className="flex items-center gap-3 border rounded-full shadow-sm px-4 py-2 w-full max-w-md">
              <input
                type="text"
                placeholder="e.g. EC4R 3TE"
                className="flex-1 outline-none text-sm"
              />
              <button className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div></div>
      </div>
    </section>
  );
};

export default Hero;
