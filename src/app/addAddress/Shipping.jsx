"use client";

import React, { useEffect, useState } from "react";
import { calculateCartSummary } from "@/utils/priceUtils";

const Shipping = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const selectedCart =
    selectedItems.length === 0
      ? cart
      : cart.filter((item) => selectedItems.includes(item.id));
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    country: "India",
    state: "",
    city: "",
    postal: "",
  });

  useEffect(() => {
    const storedItems = localStorage.getItem("checkoutItems");

    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);

      const cleanedItems = parsedItems.map((item) => ({
        ...item,
        qty: item.qty ?? 1,
        originalPrice: item.originalPrice ?? item.price ?? 0,
        discount: item.discount ?? 0,
      }));

      setCheckoutItems(cleanedItems);
    }
  }, []);
  const couponDiscount = 0;
  const tax = 3.5;
  const shippingFee = 10;

  const {
    totalOriginalPrice,
    totalSellingPrice,
    totalDiscount,
    totalCustomerPrice,
    totalItems,
  } = calculateCartSummary(selectedCart, checkoutItems, couponDiscount);

  const finalTotal = totalCustomerPrice + tax + shippingFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-full bg-[#f6f6f8] pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* LEFT SIDE */}
        <div className="w-[65%] space-y-6">
          {/* CONTACT INFO */}
          <div className="bg-white rounded p-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Contact Information
            </h2>

            <div className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              />
            </div>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="bg-white rounded p-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Shipping Address
            </h2>

            <div className="space-y-3">
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              />

              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              >
                <option>India</option>
              </select>

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              />

              <input
                name="postal"
                value={form.postal}
                onChange={handleChange}
                placeholder="Postal code"
                className="w-full border border-gray-300 px-3 py-2 rounded text-black"
              />
            </div>
          </div>
        </div>
        {/* RIGHT SIDE SUMMARY */}

        <div className="w-[35%]">
          <div className="bg-white rounded p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-black mb-4">Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <p className="text-gray-600">Price ({totalItems} items)</p>
                <p className="text-black font-medium">
                  ${totalSellingPrice.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Discount</p>
                <p className="text-green-600 font-medium">
                  -${totalDiscount.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Coupon</p>
                <p className="text-green-600 font-medium">-${couponDiscount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Tax</p>
                <p className="text-black">${tax}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="text-black">${shippingFee}</p>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-black">
                <p>Total cost</p> <p>${finalTotal.toLocaleString()}</p>
              </div>
              <p className="text-green-600 text-sm">
                You will save ${totalDiscount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
