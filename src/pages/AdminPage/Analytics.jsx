"use client";

import React, { useState } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";
import { PiFilesBold } from "react-icons/pi";
import { TiUser } from "react-icons/ti";
import Image from "next/image";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const analyticsData = [
    {
      id: 1,
      title: "Total Sales",
      amount: 452863,
      percentage: 5.4,
      description: "Increase total sales by 5.4% from last month",
      icons: <IoMdTrendingUp />,
    },
    {
      id: 2,
      title: "Total Profits",
      amount: 257912,
      percentage: 3.7,
      description: "Increase total profits by 3.7% from last month",
      icons: <FaMoneyCheckDollar />,
    },
    {
      id: 3,
      title: "Total Orders",
      amount: 5382,
      percentage: -6.3,
      description: "Decrease total orders by 6.3% from last month",
      icons: <FaClipboardList />,
    },
  ];
  const salesData = [
    { month: "Jan", sales: 15000 },
    { month: "Feb", sales: 30000 },
    { month: "Mar", sales: 20000 },
    { month: "Apr", sales: 28000 },
    { month: "May", sales: 42000 },
    { month: "Jun", sales: 35000 },
    { month: "Jul", sales: 25000 },
    { month: "Aug", sales: 30000 },
    { month: "Sep", sales: 40000 },
  ];
  const orders = [
    {
      id: 1,
      orderNo: "#824jsn",
      item: "Sony 360 Cam",
      customer: "James Brown",
      price: 2600,
      status: "Delivered",
    },
    {
      id: 2,
      orderNo: "#937kde",
      item: "Samsung Watch",
      customer: "Richard Clark",
      price: 739,
      status: "Pending",
    },
    {
      id: 3,
      orderNo: "#385tms",
      item: "Xiaomi Tablet",
      customer: "David Taylor",
      price: 850,
      status: "Processing",
    },
  ];

  const itemsPerPage = 10;
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const statusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Processing":
        return "bg-blue-100 text-blue-600";
      case "Shipped":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="">
      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyticsData.map((card, index) => {
          const isPositive = card.percentage >= 0;

          const iconStyles = [
            "bg-purple-100 text-purple-600",
            "bg-orange-100 text-orange-500",
            "bg-green-100 text-green-600",
          ];

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Title + Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${iconStyles[index]}`}
                >
                  <span className="text-lg">{card.icons}</span>
                </div>

                <h3 className="text-black font-bold">{card.title}</h3>
              </div>

              {/* Amount + Percentage */}
              <div className="flex items-center gap-3 mb-3">
                <p className="text-xl md:text-2xl font-semibold text-black">
                  ${card.amount.toLocaleString()}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    isPositive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {card.percentage}%
                </span>
              </div>

              <p className="text-sm text-gray-500">{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Performance */}
          <div className=" bg-white rounded-2xl p-6 shadow-sm">
            <h1 className="text-black font-bold mb-1">Sales Performance</h1>
            <p className="text-sm text-gray-500">
              You can see monthly sales volume form here
            </p>
            <div className="w-full h-[300px]  mt-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e0e0e0] overflow-hidden mt-6">
            <div className="p-6 border-b border-[#e0e0e0]">
              <h2 className="text-md font-semibold text-black">
                Recent Orders
              </h2>
              <p className="text-gray-400 text-sm">
                Latest transaction sales in real time.
              </p>
            </div>

            <div className="overflow-x-auto px-6">
              <table className="min-w-[700px] w-full text-left">
                <thead className="border-b border-[#e0e0e0] bg-[#f8fafc]">
                  <tr>
                    <th className="py-3 text-sm font-bold text-[#64748b] w-[140px] whitespace-nowrap">
                      Order No.
                    </th>
                    <th className="py-3 text-sm font-bold text-[#64748b] w-[180px] whitespace-nowrap">
                      Item
                    </th>
                    <th className="py-3 text-sm font-bold text-[#64748b] w-[180px] whitespace-nowrap">
                      Customer
                    </th>
                    <th className="py-3 text-sm font-bold text-[#64748b] w-[120px] whitespace-nowrap">
                      Price
                    </th>
                    <th className="py-3 text-sm font-bold text-[#64748b] w-[140px] whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#e0e0e0] hover:bg-[#f8fafc]"
                    >
                      <td className="py-4 text-sm font-medium text-black whitespace-nowrap">
                        {order.orderNo}
                      </td>
                      <td className="py-4 text-sm text-black whitespace-nowrap">
                        {order.item}
                      </td>
                      <td className="py-4 text-sm text-black whitespace-nowrap">
                        {order.customer}
                      </td>
                      <td className="py-4 text-sm text-black whitespace-nowrap">
                        ${order.price.toLocaleString()}
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <span
                          className={`px-4 py-1 text-xs font-medium rounded-full ${statusStyle(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="100%">
                      <div className="flex items-center justify-between px-6 py-4 border-t border-[#e0e0e0] bg-white">
                        <p className="text-xs text-gray-500">
                          Showing
                          <span className="font-medium text-gray-900">
                            {" "}
                            {totalItems === 0 ? 0 : startIndex + 1}{" "}
                          </span>
                          to
                          <span className="font-medium text-gray-900">
                            {" "}
                            {Math.min(endIndex, totalItems)}{" "}
                          </span>
                          of
                          <span className="font-medium text-gray-900">
                            {" "}
                            {totalItems}{" "}
                          </span>
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
        </div>

        <div className="space-y-6">
          {/* View Insights */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h1 className="text-black font-bold mb-1">View Insights</h1>
            <p className="text-sm text-gray-500"> There are more to view</p>
            <div className="mt-5 space-y-4">
              {/* Order Complete Ratio */}
              <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm">
                    <BsBarChartFill className="text-black text-sm" />
                  </div>
                  <span className="text-black text-md font-medium">
                    Order complete ratio
                  </span>
                </div>

                <IoChevronForward className="text-black" />
              </button>

              {/* Invoice Analysis */}
              <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm">
                    <PiFilesBold className="text-black text-sm" />
                  </div>
                  <span className="text-black text-md  font-medium">
                    Invoice analysis
                  </span>
                </div>

                <IoChevronForward className="text-black" />
              </button>
            </div>

            <p className="mt-4 text-black flex gap-3">
              Insight craeted by
              <span className="w-7 h-7 flex items-center justify-center bg-green-300 rounded-full">
                <TiUser className="text-black" />
              </span>
            </p>
          </div>
          {/* explore more */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/analytics.png"
                alt="Explore"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h1 className="text-black font-bold mb-2">Explore More</h1>
              <p className="text-sm text-gray-500 mb-2">
                It transform data into a strategic asset, allowing you to stay
                ahead in revenue generation, team optimization, and project
                delivery
              </p>
              <button className="bg-black hover:bg-gray-800 text-white w-1/2 md:w-full py-1.5 rounded-sm mt-5">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
