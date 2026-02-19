"use client";

import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCloudUploadOutline, IoCreateOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { TbDots } from "react-icons/tb";
const OrderList = () => {
  const orders = [
    {
      id: 1,
      orderId: "#ORD-001",
      product: "Apple iPhone 13",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAffqwN00XAl1h8G56Fp3FL4FVgQq6265FlcgMp1XR4imu6kGs-sElH9ahoLEcgSwnBR3piVDMKMMtznRpocdlTmWhF0T9sZaCGZXR_mpWj7CBSmHem_96MI3-FJeqslO0lsqcHvxfxyzN2ypDXOO3v8IpQtYWB1A0tM06goZl8l1uj9RYt_hEO91TDXjqLp147XDhZA_gLlc0HfNzqnEagJcesiR8jRmDnqNCk8hxyiCgHLHGUikP5hdkdXPkCB5GHbNgtgpNRxv4",
      date: "12 Jan 2026",
      customer: "John Carter",
      payment: "Credit Card",
      paymentStatus: "Paid",
      quantity: 2,
      total: 2398,
      status: "Delivered",
    },
    {
      id: 2,
      orderId: "#ORD-002",
      product: "Apple iPad Gen 10",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUtjfQ10jwehXkcpLnxXaE6TvnZFHvmgbhTqvN_SXmmdeSruS15OomGGFDe5led_XYN24rucRb1oWId0He6LcrfVvYzxIUrcOAJ3NqshUL4XHp82kgcMVVHvAld2rYu56qTFlUWPq0mHaj0Ify9TbNs4qOXhvSs4mMC9cYMnJzBkMUQ6e3GUZ58E2v0qfWFby2NFh1jX1MRFC8lbYnobMQBjhfP1NUnsXu7hLxfgwJunGkv4ItF-saIQpDZsY0t2xSRJvUL3UgP_E",
      date: "10 Jan 2026",
      customer: "Sarah Lee",
      payment: "UPI",
      paymentStatus: "Pending",
      quantity: 1,
      total: 449,
      status: "Processing",
    },
  ];

  // PAGINATION LOGIC
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentOrders = orders.slice(startIndex, endIndex);

  const [selected, setSelected] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(currentOrders.map((item) => item.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const cardData = [
    {
      title: "Total Sales",
      description: "Total earnings from sales.",
      value: 189374,
      percentage: 9,
    },
    {
      title: "Total Transaction",
      description: "Total from store transactions.",
      value: 4138,
      percentage: -2,
    },
    {
      title: "Order Disputes",
      description: "Total disputes ordered product.",
      value: 76,
      percentage: 5,
    },
    {
      title: "Order Refund",
      description: "Total refunds ordered product.",
      value: 2495,
      percentage: -11,
    },
  ];

  return (
    <section className=" py-2">
      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cardData.map((card, index) => {
          const isPositive = card.percentage >= 0;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-md font-semibold text-black">
                    {card.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {card.description}
                  </p>
                </div>
                <button className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                  <HiOutlineDotsHorizontal className="text-black" />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <p className="text-xl sm:text-2xl text-black font-bold">
                  {card.title.includes("Sales") || card.title.includes("Refund")
                    ? `$${card.value.toLocaleString()}`
                    : card.value.toLocaleString()}
                </p>

                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
                    isPositive
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(card.percentage)}%
                </span>
              </div>

              <div className="mt-6 flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl">
                <p className="text-xs text-gray-500">From last month</p>
                <button className="text-xs font-medium text-black flex items-center gap-1 hover:text-black">
                  See detail <FaArrowRight className="text-[10px] text-black" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLE */}
      <div className="bg-white mt-5 rounded-xl border border-[#e0e0e0] overflow-hidden">
        {/* TABLE TITLES */}

        <div className=" md:flex justify-between p-6">
          <div>
            <h2 className="text-md font-semibold text-black">
              Product Transaction
            </h2>
            <p className="text-gray-400 text-sm">
              Latest Transaction sales in real time.
            </p>
          </div>
          <div className=" mt-2 md:mt-0">
            <div className="flex justify-start gap-3">
              <button className="flex items-center gap-3 border my-1 border-[#e0e0e0] px-4 py-1.5 rounded-md text-sm text-black hover:bg-black hover:text-white">
                <HiOutlineAdjustmentsHorizontal className="text-lg" /> Filter
              </button>
              <button className="flex items-center gap-3 border  my-1 border-[#e0e0e0] px-4 py-1.5 rounded-md text-sm text-black hover:bg-black hover:text-white">
                <IoCreateOutline className="text-lg" /> Customize
              </button>
              <button className="flex items-center gap-3 border  my-1 border-[#e0e0e0] px-4 py-1.5 rounded-md text-sm text-black hover:bg-black hover:text-white">
                <IoCloudUploadOutline className="text-lg" /> Export
              </button>
            </div>
          </div>
        </div>
        {/* MAIN TABLE */}
        <div className="overflow-x-auto  px-6">
          <table className="w-[1150] text-left mx-auto ">
            {/* TABLE HEADER */}
            <thead className=" border-y border-[#e0e0e0]">
              <tr className="bg-[#f8fafc]">
                <th className="w-[40px] py-3 px-2">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      currentOrders.length > 0 &&
                      selected.length === currentOrders.length
                    }
                  />
                </th>

                <th className="w-[100px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Order ID
                </th>

                <th className="w-[250px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Product Name
                </th>

                <th className="w-[120px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Order Date
                </th>

                <th className="w-[140px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Customer Name
                </th>

                <th className="w-[100px] py-3 px-2 text-center text-sm font-bold text-[#64748b]">
                  Payment
                </th>

                <th className="w-[130px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Payment Status
                </th>

                <th className="w-[100px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Total Price
                </th>

                <th className="w-[80px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Quantity
                </th>

                <th className="w-[130px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Order Status
                </th>

                <th className="w-[80px] py-3 px-2 text-sm font-bold text-[#64748b]">
                  Action
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {currentOrders.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#e0e0e0] hover:bg-[#f8fafc]"
                >
                  <td className="py-4 px-2 mx-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                  </td>

                  <td className="py-4 px-2 mx-2 text-black text-sm font-medium ">
                    {item.orderId}
                  </td>

                  <td className="py-4 px-2 mx-2 ">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || "https://via.placeholder.com/40"}
                        alt={item.product}
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <span className="text-sm text-black">{item.product}</span>
                    </div>
                  </td>

                  <td className="py-4 px-2 mx-2  text-sm text-black">
                    {item.date}
                  </td>

                  <td className="py-4 px-2 mx-2  text-sm text-black">
                    {item.customer}
                  </td>

                  <td className="py-4 px-2 mx-2  text-sm text-center text-black">
                    {item.payment}
                  </td>

                  <td className="py-4  px-2 mx-2 ">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg min-w-[110px] justify-center
  ${item.paymentStatus === "Paid" && "bg-green-100 text-green-600"}
  ${item.paymentStatus === "Pending" && "bg-yellow-100 text-yellow-600"}
  ${item.paymentStatus === "Unpaid" && "bg-red-100 text-red-600"}
`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {item.paymentStatus}
                    </span>
                  </td>

                  <td className="py-4 px-2 mx-2 text-black  text-sm text-center font-medium">
                    ${item.total}
                  </td>

                  <td className="py-4 px-2 mx-2  text-black text-sm text-center font-medium">
                    {item.quantity}
                  </td>

                  <td className="py-4 px-2 mx-2 ">
                    <span
                      className={`inline-flex items-center text-white gap-2 px-4 py-2 text-sm font-medium rounded-lg min-w-[120px] justify-center
  ${item.status === "Delivered" && "bg-[#403fe8]"}
  ${item.status === "Processing" && "bg-[#42afcf]"}
  ${item.status === "Shipped" && "bg-[#ad94f6]"}
`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 px-2 mx-2  flex  justify-center items-center   gap-2 text-black cursor-pointer text-sm">
                    <LuMapPin /> <TbDots />
                  </td>
                </tr>
              ))}
            </tbody>

            {/* TABLE FOOTER  */}
            <tfoot>
              <tr>
                <td
                  colSpan="11"
                  className=" py-4 border-t border-[#e0e0e0] bg-white"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {totalItems > 0 ? startIndex + 1 : 0}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-gray-900">
                        {Math.min(endIndex, totalItems)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-900">
                        {totalItems}
                      </span>{" "}
                      Products
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        className={`px-3 py-1.5 text-xs border rounded-sm transition
                        ${
                          currentPage === 1
                            ? "text-gray-300 border-gray-200 cursor-not-allowed"
                            : "text-black border-[#e0e0e0] hover:bg-gray-50"
                        }`}
                      >
                        Previous
                      </button>

                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 text-xs border rounded-sm transition
                            ${
                              currentPage === page
                                ? "bg-gray-900 text-white border-gray-900"
                                : "border-[#e0e0e0] text-black hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        className={`px-3 py-1.5 text-xs border rounded-sm transition
                        ${
                          currentPage === totalPages
                            ? "text-gray-300 border-gray-200 cursor-not-allowed"
                            : "text-black border-[#e0e0e0] hover:bg-gray-50"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
