"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "@/redux/orderSlice";
import { FaBoxOpen } from "react-icons/fa";

const Orders = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openAddressId, setOpenAddressId] = useState(null);
  const orders = useSelector((state) => state.orders.orders);

  const orderItems = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      orderId: order.id,
      status: order.status,
      date: order.date,
      address: order.address,
    })),
  );

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Shipped") return "bg-blue-100 text-blue-600";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <section className="min-h-screen bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER  */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Your Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Order history and tracking
          </p>
        </div>

        {/* EMPTY */}
        {orderItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto mt-20">
            {/* ICON */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg mb-6">
              <FaBoxOpen className="text-xl text-blue-500" />
            </div>

            {/* HEADING */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Orders Yet
            </h2>

            {/* TEXT */}
            <p className="text-gray-500 text-sm mb-8">
              Looks like you haven’t placed any orders yet. Start shopping and
              track your orders here.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => router.push("/collections")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-xl"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {orderItems.map((order) => (
              <div
                key={order.id + order.orderId}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* LEFT  */}
                <div className="flex gap-4 md:col-span-3">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div>
                    <h3 className="font-medium text-gray-900">{order.name}</h3>
                    <p className="text-sm text-gray-500">{order.description}</p>

                    <div className="text-xs text-gray-500 mt-2 flex gap-4">
                      <span>Qty: {order.qty || 1}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT  */}
                <div className="flex flex-col justify-between md:items-end md:col-span-1 gap-2">
                  <p className="font-semibold text-gray-900">₹{order.price}</p>

                  {/* ADDRESS PREVIEW */}
                  <p
                    onClick={() =>
                      setOpenAddressId(
                        openAddressId === order.orderId ? null : order.orderId,
                      )
                    }
                    className="text-xs text-gray-500 cursor-pointer hover:text-black"
                  >
                    {order.address?.city}, {order.address?.region}
                  </p>

                  {/* FULL ADDRESS */}
                  {openAddressId === order.orderId && (
                    <div className="text-xs text-gray-600 bg-gray-100 p-3 rounded mt-1 text-left md:text-right">
                      <p>{order.address?.name}</p>
                      <p>{order.address?.street}</p>
                      <p>
                        {order.address?.city}, {order.address?.region}
                      </p>
                      <p>
                        {order.address?.country} - {order.address?.postal}
                      </p>
                      <p>Phone: {order.address?.phone}</p>
                    </div>
                  )}
                  <span
                    className={`text-xs px-3 py-1 rounded-full w-fit ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>

                  <p className="text-xs text-gray-500">{order.date}</p>

                  {/* BUTTONS */}
                  <div
                    className="flex flex-wrap gap-2 mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => router.push(`/trackorder`)}
                      className="text-xs px-4 py-2 border border-gray-300 rounded-md hover:bg-black hover:text-white transition"
                    >
                      Track Order
                    </button>

                    {order.status === "Delivered" && (
                      <button className="text-xs px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                        Reorder
                      </button>
                    )}

                    {order.status === "Processing" && (
                      <button
                        onClick={() => dispatch(cancelOrder(order.orderId))}
                        className="text-xs px-4 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
