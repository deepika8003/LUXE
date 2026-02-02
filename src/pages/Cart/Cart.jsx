"use client";
import React, { useState } from "react";

const cartData = [
  {
    id: 1,
    name: "product name",
    description: "about product",
    price: 134,
    originalPrice: 999,
    offerCount: 4,
    discount: 86,
    delivery: "Sat Feb 7",
    qty: 1,
  },
];

const Cart = () => {
  const [cart, setCart] = useState(cartData);

  return (
    <section className="max-w-7xl mx-auto p-6 md:flex gap-6 bg-[#f6f6f8]">
      {/* LEFT */}
      <div className="w-full md:w-[60%]">
        {/* ADDRESS DIV */}
        <div className="flex justify-between items-cente bg-white p-4 mb-5">
          <h3 className="text-black">From Saved Addresses</h3>
          <button className="text-[#155dfc] font-medium">
            Enter Delivery Pincode
          </button>
        </div>

        {cart.map((item) => (
          <div key={item.id} className="bg-white p-4 ">
            <h2 className="text-xl text-black ">{item.name}</h2>
            <p className="text-sm text-gray-500 mb-10">{item.description}</p>

            <p className="text-green-600 font-medium my-2">
              {item.discount}% off
              <del className="text-gray-400">₹{item.originalPrice}</del> ₹
              {item.price}
            </p>

            <p className="text-sm text-green-600 my-3">
              {item.offerCount} offers available
            </p>

            <p className="text-sm">Delivery by {item.delivery}</p>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="border p-4 h-fit space-y-4"></div>
    </section>
  );
};

export default Cart;
