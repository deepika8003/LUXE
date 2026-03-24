"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addAddress, updateAddress } from "@/redux/addressSlice";
import { FaLock } from "react-icons/fa";

const Shipping = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const editAddress = useSelector((state) => state.address.editAddress);
  const orders = useSelector((state) => state.orders.orders);

  // active orders
  const activeOrders = orders.filter((order) => order.status !== "Cancelled");

  const orderItems = activeOrders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      status: order.status,
    })),
  );

  const subtotal = orderItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  const discount = 0;
  const coupon = 0;
  const estimatedTax = 10;

  const finalTotal = subtotal - discount - coupon + estimatedTax;

  useEffect(() => {
    if (editAddress) {
      setFormData(editAddress);
    }
  }, [editAddress]);

  const [formData, setFormData] = useState(
    editAddress || {
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
      street: "",
      country: "",
      region: "",
      city: "",
      postal: "",
    },
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editAddress) {
      dispatch(updateAddress(formData));
    } else {
      dispatch(addAddress({ ...formData, id: Date.now() }));
    }

    router.push("/profile/cart");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8 py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
          Shipping Information
        </h2>

        <div className="lg:flex lg:gap-8">
          {/* LEFT FORM */}
          <form onSubmit={handleSubmit} className="lg:w-2/3 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-md sm:text-lg font-semibold text-black mb-4">
                Contact information
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2"
                />

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your e-mail"
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  pattern="[6-9]{1}[0-9]{9}"
                  placeholder="Enter your phone number"
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-md sm:text-lg font-semibold text-black mb-4">
                Shipping address
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />

                <select
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select your country</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>India</option>
                </select>

                <select
                  name="region"
                  required
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select your region</option>
                  <option>Kerala</option>
                  <option>Tamil Nadu</option>
                </select>

                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />

                <input
                  type="text"
                  name="postal"
                  required
                  value={formData.postal}
                  onChange={handleChange}
                  placeholder="Enter your postal code"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
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
              <Link
                href="profile/cart"
                className="text-gray-600 hover:text-black font-medium"
              >
                ← Back to shopping cart
              </Link>

              <button
                type="submit"
                className="bg-black text-white font-medium py-2 px-8 rounded-lg"
              >
                Add Address
              </button>
            </div>
          </form>

          {/* RIGHT SUMMARY */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-[#f1f1f3] rounded-2xl p-6 sticky top-24">
              {/* TITLE */}
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* ITEMS */}
              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.qty || 1}
                      </p>
                    </div>

                    <p className="text-sm font-medium text-gray-800">
                      ${Number(item.price) || 0}
                    </p>
                  </div>
                ))}
              </div>

              {/* DIVIDER */}
              <div className="border-t border-gray-300 my-6"></div>

              {/* PRICE DETAILS */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({orderItems.length} items)</span>
                  <span>${subtotal}</span>
                </div>

                <div className="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>-${discount}</span>
                </div>

                <div className="flex justify-between text-red-500">
                  <span>Coupon</span>
                  <span>-${coupon}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${estimatedTax}</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-300 my-6"></div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">TOTAL</span>
                <span className="text-xl font-bold text-gray-900">
                  ${finalTotal}
                </span>
              </div>

              {/* FOOTER */}
              <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <FaLock className="w-3 h-3" />
                <span>Secure encrypted checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
