"use client";

import { IoClose } from "react-icons/io5";
import React, { useState, useEffect } from "react";

const AddProduct = ({ onClose, onSave, mode, productData }) => {
  const [status, setStatus] = useState("Live");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(""); // will store base64 string

  // ✅ Convert uploaded file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // this is a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Prefill data when editing
  useEffect(() => {
    if (mode === "edit" && productData) {
      setName(productData.name || "");
      setSku(productData.sku || "");
      setCategory(productData.category || "");
      setPrice(productData.price || "");
      setStock(productData.stock || "");
      setStatus(productData.status || "Live");
      setImage(productData.image || ""); // base64 string already stored
    }
    if (mode === "add") {
      setName("");
      setSku("");
      setCategory("");
      setPrice("");
      setStock("");
      setStatus("Live");
      setImage("");
    }
  }, [mode, productData]);

  // Close modal when clicking outside
  const outSideClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      sku,
      category,
      price,
      stock,
      status,
      image, // now contains base64 string
    };

    if (onSave) {
      onSave(product);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={outSideClose}
    >
      <div className="bg-white w-[90%] max-w-2xl rounded-xl shadow-lg overflow-y-auto max-h-[calc(100vh-80px)]">
        {/* HEADER */}
        <div className="flex justify-between items-start px-6 py-5 border-b border-[#e0e0e0]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              {mode === "edit" ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fill in the details below to add a new product to the catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            {/* PRODUCT NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Long skirt"
                required
                className="w-full border outline-0 border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
              />
            </div>

            {/* DESCRIPTION (optional) */}
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
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                >
                  <option value="">Select Category</option>
                  <option>Footwear</option>
                  <option>Kitchen</option>
                  <option>Furnitures</option>
                  <option>Accessories</option>
                  <option>Apparel</option>
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  min={0}
                  required
                  className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                />
              </div>
            </div>

            {/* STATUS & IMAGE */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-3 w-full">
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

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full outline-0 border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm bg-[#f8fafc]"
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end items-center gap-8 px-6 py-4 border-t border-[#e0e0e0]">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-7 py-2.5 rounded-lg text-sm font-medium"
            >
              {mode === "edit" ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
