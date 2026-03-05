// pages/Shipping/Shipping.js
"use client";
import React from "react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-[#f6f6f8] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-2xl  font-bold text-black mb-6">
          Shipping Information
        </h2>

        <div className="lg:flex lg:gap-8">
          {/* Left - Shipping Form */}
          <div className="lg:w-2/3 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">
                Contact information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your e-mail"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">
                Shipping address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your street address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-md focus:outline-none focus:ring-1 focus:ring-black"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-md focus:outline-none focus:ring-1 focus:ring-black"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your region
                    </option>
                    <option>California</option>
                    <option>Tamil Nadu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your postal code"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">
                Shipping method
              </h3>
              <div className="space-y-3">
                {["Free shipping", "Regular shipping", "Express shipping"].map(
                  (method, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          className="w-4 h-4 text-black"
                        />
                        <span className="font-medium text-md">{method}</span>
                      </div>
                      <span className="text-xs md:text-sm text-gray-500">
                        Estimated arrival: 7-30 Oct '24
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button className="text-gray-600 hover:text-black font-medium">
                ← Back to shopping cart
              </button>
              <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition">
                Continue
              </button>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold text-black mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">4 items</span>
                  <span className="text-gray-900 font-medium">$85.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">$3.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping fee</span>
                  <span className="text-gray-900 font-medium">$10.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total cost</span>
                    <span className="text-black">$98.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
