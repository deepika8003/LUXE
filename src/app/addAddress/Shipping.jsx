"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  addAddress,
  updateAddress,
  loadUserAddresses,
} from "@/redux/addressSlice";
import { FaLock } from "react-icons/fa";

const EMPTY_ARRAY = [];

const Shipping = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector((state) => state?.auth?.currentUser || null);
  const editAddress = useSelector(
    (state) => state?.address?.editAddress || null,
  );

  // ✅ SAFE addresses
  const addresses = useSelector((state) => {
    const userId = state?.auth?.currentUser?.id;
    if (!userId) return EMPTY_ARRAY;
    return state?.address?.userAddresses?.[userId] || EMPTY_ARRAY;
  });

  // ✅ SAFE orders
  const orders = useSelector((state) => {
    const userId = state?.auth?.currentUser?.id;
    if (!userId) return EMPTY_ARRAY;

    const userOrders = state?.orders?.userOrders;
    if (!userOrders || typeof userOrders !== "object") return EMPTY_ARRAY;

    return userOrders[userId] || EMPTY_ARRAY;
  });

  // Load addresses
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(loadUserAddresses({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  // ✅ SAFE filtering
  const safeOrders = Array.isArray(orders) ? orders : [];

  const activeOrders = safeOrders.filter(
    (order) => order?.status !== "Cancelled",
  );

  // ✅ SAFE flatMap
  const orderItems = activeOrders.flatMap((order) =>
    Array.isArray(order?.items)
      ? order.items.map((item) => ({
          ...item,
          status: order?.status,
        }))
      : [],
  );

  const subtotal = orderItems.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const qty = Number(item?.qty) || 1;
    return sum + price * qty;
  }, 0);

  const discount = 0;
  const coupon = 0;
  const estimatedTax = 10;
  const finalTotal = subtotal - discount - coupon + estimatedTax;

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

  useEffect(() => {
    if (editAddress) {
      setFormData(editAddress);
    }
  }, [editAddress]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser?.id) {
      alert("Please sign in to continue");
      return;
    }

    if (editAddress) {
      dispatch(updateAddress({ userId: currentUser.id, address: formData }));
    } else {
      dispatch(addAddress({ userId: currentUser.id, address: formData }));
    }

    router.push("/profile/cart");
  };

  // Auth Guard
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Please sign in to manage your addresses</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8 py-16">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
            Shipping Information
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Secure checkout with quick and reliable delivery.
          </p>
        </div>

        <div className="lg:flex lg:gap-8">
          {/* LEFT FORM */}
          <form onSubmit={handleSubmit} className="lg:w-2/3 space-y-6">
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
                  className="w-full text-black border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div className="sm:flex justify-between items-center gap-2 pt-4">
              <Link
                href="/profile/cart"
                className="text-gray-600 hover:text-black font-medium"
              >
                ← Back to shopping cart
              </Link>
              <button
                type="submit"
                className="bg-black text-white font-medium py-2 mt-2 sm:mt-0 px-8 rounded-lg"
              >
                Add Address
              </button>
            </div>
          </form>

          {/* RIGHT SUMMARY */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-[#f1f1f3] rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              {orderItems.length === 0 ? (
                <p className="text-sm text-gray-500">No items in cart</p>
              ) : (
                orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-800">
                        {item?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item?.qty || 1}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      ${Number(item?.price) || 0}
                    </p>
                  </div>
                ))
              )}

              <div className="border-t border-gray-300 my-6"></div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">TOTAL</span>
                <span className="text-lg font-bold text-gray-900">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

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
