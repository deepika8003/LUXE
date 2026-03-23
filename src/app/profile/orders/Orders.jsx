"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "@/redux/orderSlice";
import { FaBoxOpen } from "react-icons/fa";

const Orders = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  const orderItems = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      orderId: order.id,
      status: order.status,
      date: order.date,
    })),
  );

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Shipped") return "bg-blue-100 text-blue-600";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <section className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
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
          <div className="flex flex-col items-center justify-center text-center py-20">
            {/* ICON */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <FaBoxOpen className="text-2xl text-gray-600" />
            </div>

            {/* HEADING */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              No Orders Yet
            </h2>

            {/* PARAGRAPH */}
            <p className="text-gray-500 text-sm mt-2 max-w-md">
              Looks like you haven’t placed any orders yet. Start exploring our
              latest collections and find something you love.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => router.push("/collection")}
              className="mt-6 px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {orderItems.map((order) => (
              <div
                key={order.id + order.orderId}
                className="flex flex-col  md:flex-row gap-4 md:items-center justify-between bg-[#f9f9f9] p-4 rounded-lg shadow-sm hover:shadow-md  transition"
              >
                {/* LEFT  */}
                <div className="flex gap-4">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div>
                    <h3 className="font-medium text-gray-900">{order.name}</h3>
                    <p className="text-sm text-gray-500">{order.description}</p>

                    <div className="text-xs text-gray-500 mt-2 flex gap-4">
                      <span>Qty: 1</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT (SAME DESIGN) */}
                <div className="flex flex-col md:items-end gap-2">
                  <p className="font-semibold text-gray-900">₹{order.price}</p>

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
                      className="text-xs px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      Track Order
                    </button>

                    {order.status === "Delivered" && (
                      <button className="text-xs px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                        Reorder
                      </button>
                    )}

                    {order.status === "Processing" && (
                      <button
                        onClick={() => dispatch(cancelOrder(order.orderId))}
                        className="text-xs px-4 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-50"
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
