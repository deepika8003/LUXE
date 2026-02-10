"use client";

import { IoClose } from "react-icons/io5";
import React, { useState } from "react";

const AddProduct = ({ onClose }) => {
  const [status, setStatus] = useState("Live");

  // CLOSE WHEN CLICK OUTSIDE
  const outSideClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // CLOSE BUTTON
  const closeModal = () => {
    onClose();
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product Submitted");
    console.log("Status:", status);

    // later: send data to product list
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={outSideClose}
    >
      {/* MODAL */}
      <div className="bg-white w-[90%] max-w-2xl rounded-xl shadow-lg overflow-y-auto max-h-[calc(100vh-80px)]">
        {/* HEADER */}
        <div className="flex justify-between items-start px-6 py-5 border-b border-[#e0e0e0]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Add New Product
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fill in the details below to add a new product to the catalog.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-black text-xl"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* BODY */}
          <div className="px-6 py-6 space-y-5">
            {/* PRODUCT NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Long skirt"
                required
                className="w-full border outline-0 border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                placeholder="Add product description..."
                rows="3"
                className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc] resize-none"
              />
            </div>

            {/* SKU & CATEGORY */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">SKU</label>
                <input
                  type="text"
                  placeholder="WG-10882"
                  required
                  className="w-full border outline-0 border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select
                  required
                  className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                >
                  <option>Footwear</option>
                  <option>Kitchen</option>
                  <option>Furnitures</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>

            {/* PRICE & STOCK */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="999"
                  min={0}
                  required
                  className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  placeholder="20"
                  min={0}
                  required
                  className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                />
              </div>
            </div>

            {/* STATUS & IMAGE */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* STATUS */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Status
                </label>

                <div className="grid grid-cols-3 gap-3 w-full">
                  {/* LIVE */}
                  <button
                    type="button"
                    onClick={() => setStatus("Live")}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold border transition
                      ${
                        status === "Live"
                          ? "bg-[#1ed4a0] text-white"
                          : "bg-[#d1fae5] text-[#065f46] border-[#a7f3d0] hover:bg-[#a7f3d0]"
                      }
                    `}
                  >
                    Live
                  </button>

                  {/* SOLD OUT */}
                  <button
                    type="button"
                    onClick={() => setStatus("Sold Out")}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold border transition
                      ${
                        status === "Sold Out"
                          ? "bg-[#6498e0] text-white"
                          : "bg-[#f1f5f9] text-[#334155] border-[#cbd5e1] hover:bg-[#e2e8f0]"
                      }
                    `}
                  >
                    Sold Out
                  </button>

                  {/* DRAFT */}
                  <button
                    type="button"
                    onClick={() => setStatus("Draft")}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold border transition
                      ${
                        status === "Draft"
                          ? "bg-[#d26826] text-white"
                          : "bg-[#fef3c7] text-[#92400e] border-[#fde68a] hover:bg-[#fde68a]"
                      }
                    `}
                  >
                    Draft
                  </button>
                </div>
              </div>

              {/* IMAGE */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Image URL
                </label>
                <input
                  type="file"
                  required
                  className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end items-center gap-8 px-6 py-4 border-t border-[#e0e0e0]">
            <button
              type="button"
              onClick={closeModal}
              className="text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-7 py-2.5 rounded-lg text-sm font-medium"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
