"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCloudUploadOutline, IoCreateOutline } from "react-icons/io5";
import { TbDots } from "react-icons/tb";

const OrderList = () => {
  const orders = useSelector((state) => state.orders.orders);

  const flattenedOrders = orders.flatMap((order) =>
    order.items.map((item) => ({
      rowId: `${order.id}-${item.id}`,
      orderId: order.id,
      productName: item.name,
      productImage: item.image,
      orderDate: order.date,
      customerName: order.address?.name || "Guest",
      payment: "Online",
      paymentStatus: order.status === "Delivered" ? "Paid" : "Pending",
      quantity: item.qty || 1,
      total: (item.price || 0) * (item.qty || 1),
      status: order.status,
    })),
  );

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = flattenedOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = flattenedOrders.slice(startIndex, endIndex);

  // Selection state
  const [selected, setSelected] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(currentOrders.map((item) => item.rowId));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Static card data
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
    <section className="py-2">
      {/* Cards */}
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
                <button className="w-8 h-8 rounded-md border cursor-pointer border-gray-200 flex items-center justify-center hover:bg-gray-100">
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
                <button className="text-xs cursor-pointer font-medium text-black flex items-center gap-1 hover:text-black">
                  See detail <FaArrowRight className="text-[10px] text-black" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white mt-5 rounded-xl border border-[#e0e0e0] overflow-hidden">
        {/* Header */}
        <div className="md:flex justify-between p-6">
          <div>
            <h2 className="text-md font-semibold text-black">
              Product Transaction
            </h2>
            <p className="text-gray-400 text-sm">
              Latest Transaction sales in real time.
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <div className="flex justify-start gap-3">
              <button className="flex items-center cursor-pointer gap-3 border my-1 border-[#e0e0e0] px-4 py-1.5 rounded-md text-sm text-black hover:bg-black hover:text-white">
                <HiOutlineAdjustmentsHorizontal className="text-lg" /> Filter
              </button>
              <button className="flex items-center cursor-pointer gap-3 border my-1 border-[#e0e0e0] px-4 py-1.5 rounded-md text-sm text-black hover:bg-black hover:text-white">
                <IoCreateOutline className="text-lg" /> Customize
              </button>
              <button className="flex items-center cursor-pointer gap-3 border my-1 border-[#e0e0e0] px-4 py-1.5 rounded-md text-sm text-black hover:bg-black hover:text-white">
                <IoCloudUploadOutline className="text-lg" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6">
          <table className="w-[1150px] text-left mx-auto">
            <thead className="border-y border-[#e0e0e0]">
              <tr className="bg-[#f8fafc]">
                <th className="w-[40px] py-3 px-2">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="w-4 h-4"
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
            <tbody>
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-8 text-center text-gray-500">
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                currentOrders.map((item) => (
                  <tr
                    key={item.rowId}
                    className="border-b border-[#e0e0e0] hover:bg-[#f8fafc]"
                  >
                    <td className="py-4 px-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selected.includes(item.rowId)}
                        onChange={() => handleSelect(item.rowId)}
                      />
                    </td>
                    <td className="py-4 px-2 text-black text-sm font-medium">
                      {item.orderId}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.productImage ||
                            "https://via.placeholder.com/40"
                          }
                          alt={item.productName}
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <span className="text-xs sm:text-sm text-black">
                          {item.productName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-xs sm:text-sm text-black">
                      {new Date(item.orderDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-2 text-xs sm:text-sm text-black">
                      {item.customerName}
                    </td>
                    <td className="py-4 px-2 text-xs sm:text-sm text-center text-black">
                      {item.payment}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg min-w-[110px] justify-center
                          ${
                            item.paymentStatus === "Paid" &&
                            "bg-green-100 text-green-600"
                          }
                          ${
                            item.paymentStatus === "Pending" &&
                            "bg-yellow-100 text-yellow-600"
                          }
                          ${
                            item.paymentStatus === "Unpaid" &&
                            "bg-red-100 text-red-600"
                          }
                        `}
                      >
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-black text-xs sm:text-sm text-center font-medium">
                      ${item.total}
                    </td>
                    <td className="py-4 px-2 text-black text-xs sm:text-sm text-center font-medium">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`inline-flex items-center text-white gap-2 px-4 py-2 text-sm font-medium rounded-lg min-w-[120px] justify-center
                          ${item.status === "Delivered" && "bg-[#403fe8]"}
                          ${item.status === "Processing" && "bg-[#42afcf]"}
                          ${item.status === "Shipped" && "bg-[#ad94f6]"}
                          ${item.status === "Cancelled" && "bg-red-500"}
                        `}
                      >
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-black cursor-pointer text-sm">
                      <TbDots />
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Pagination Footer */}
            {totalItems > 0 && (
              <tfoot>
                <tr>
                  <td
                    colSpan="11"
                    className="py-4 border-t border-[#e0e0e0] bg-white"
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
                                : "text-black border-[#e0e0e0] cursor-pointer hover:bg-gray-50"
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
                              className={`px-3 py-1.5 text-xs border cursor-pointer rounded-sm transition
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
                                : "text-black border-[#e0e0e0] cursor-pointer hover:bg-gray-50"
                            }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
