"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addAddress, updateAddress } from "@/redux/addressSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.product.products);
  const editAddress = useSelector((state) => state.address.editAddress);

  useEffect(() => {
    if (editAddress) {
      setFormData(editAddress);
    }
  }, [editAddress]);

  const tax = 3.5;
  const shippingFee = 10;
  const couponDiscount = 0;

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

    router.push("/cart");
  };
  const calculateSellingPrice = (item) => {
    const discount = item.discount ?? 0;
    const originalPrice = item.originalPrice ?? item.price ?? 0;
    return Math.round((originalPrice * (100 - discount)) / 100);
  };

  const totalOriginalPrice = cart.reduce((sum, item) => {
    const price = item.originalPrice ?? item.price ?? 0;
    return sum + price * item.qty;
  }, 0);

  const totalSellingPrice = cart.reduce((sum, item) => {
    return sum + calculateSellingPrice(item) * item.qty;
  }, 0);

  const totalDiscount = totalOriginalPrice - totalSellingPrice;

  const totalCustomerPrice = totalSellingPrice - couponDiscount;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const finalTotal = totalCustomerPrice + tax + shippingFee;

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
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2"
                />

                <select
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-3"
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
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-3"
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
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2"
                />

                <input
                  type="text"
                  name="postal"
                  required
                  value={formData.postal}
                  onChange={handleChange}
                  placeholder="Enter your postal code"
                  className="w-full border text-black border-gray-300 rounded-lg px-4 py-2"
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
                        <span className="font-medium text-black text-md">
                          {method}
                        </span>
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
                href="/cart"
                className="text-gray-600 text-sm sm:text-lg hover:text-black font-medium"
              >
                ← Back to shopping cart
              </Link>

              <button
                type="submit"
                className="bg-black text-sm sm:text-lg text-white font-medium py-2 px-8 rounded-lg"
              >
                Add Address
              </button>
            </div>
          </form>

          {/* RIGHT SUMMARY */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-md sm:text-lg font-semibold text-black mb-4">
                Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{totalItems} items</span>
                  <span className="text-gray-900 font-medium">
                    ${totalSellingPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 font-medium">
                    -${totalDiscount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Coupon</span>
                  <span className="text-green-600 font-medium">
                    -${couponDiscount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping fee</span>
                  <span className="text-gray-900 font-medium">
                    ${shippingFee.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-md sm:text-lg">
                    <span className="text-black">Total cost</span>
                    <span className="text-black">
                      ${finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-green-600 text-sm">
                  You will save $
                  {(totalDiscount + couponDiscount).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
