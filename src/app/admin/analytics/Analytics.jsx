"use client";

import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { IoMdTrendingUp } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import {
  IoChevronForward,
  IoArrowUpOutline,
  IoArrowDownOutline,
} from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";
import { PiFilesBold } from "react-icons/pi";
import { TiUser } from "react-icons/ti";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineShoppingBag, MdOutlinePeopleAlt } from "react-icons/md";
import Image from "next/image";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Filter orders by selected date range
const filterOrdersByRange = (orders, range) => {
  if (range === "all") return orders;
  const now = new Date();
  const days = range === "last7" ? 7 : 30;
  const cutoff = new Date(now.setDate(now.getDate() - days));
  return orders.filter((order) => new Date(order.date) >= cutoff);
};

const getTotalSales = (orders) =>
  orders.reduce((sum, order) => sum + (order.total || 0), 0);

const getTotalOrders = (orders) => orders.length;

const getNewCustomers = (orders) => {
  const ids = orders.map((order) => order.userId).filter(Boolean);
  return ids.length ? new Set(ids).size : orders.length;
};

const getMonthlySales = (orders) => {
  const monthly = new Map();
  orders.forEach((order) => {
    const date = new Date(order.date);
    const monthYear = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const current = monthly.get(monthYear) || 0;
    monthly.set(monthYear, current + (order.total || 0));
  });
  return Array.from(monthly.entries())
    .map(([month, sales]) => ({ month, sales }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));
};

const getTopProducts = (orders, limit = 4) => {
  const productMap = new Map();
  orders.forEach((order) => {
    order.items?.forEach((item) => {
      const revenue = (item.price || 0) * (item.qty || 1);
      const existing = productMap.get(item.name) || { sales: 0, revenue: 0 };
      productMap.set(item.name, {
        sales: existing.sales + (item.qty || 1),
        revenue: existing.revenue + revenue,
      });
    });
  });
  return Array.from(productMap.entries())
    .map(([name, { sales, revenue }]) => ({ name, sales, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
};

const getRecentOrders = (orders, limit = 5) => {
  const sorted = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const recent = sorted.slice(0, limit);
  const flattened = recent.flatMap((order) =>
    (order.items || []).map((item) => ({
      orderNo: `#${order.id}`,
      item: item.name,
      customer: order.address?.name || "Guest",
      price: item.price,
      status: order.status,
      date: new Date(order.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    })),
  );
  return flattened.slice(0, limit);
};

const categoryData = [
  { name: "Electronics", value: 38 },
  { name: "Clothing", value: 24 },
  { name: "Home", value: 18 },
  { name: "Sports", value: 12 },
  { name: "Books", value: 8 },
];
const categoryColors = ["#111827", "#6366f1", "#22c55e", "#f59e0b", "#e5e7eb"];

const Analytics = () => {
  const orders = useSelector((state) => state.orders.orders);
  const [dateRange, setDateRange] = useState("last30");
  const [activeChartTab, setActiveChartTab] = useState("Monthly");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(
    () => filterOrdersByRange(orders, dateRange),
    [orders, dateRange],
  );

  const {
    totalSales,
    totalOrders,
    newCustomers,
    monthlySales,
    topProducts,
    recentOrders,
  } = useMemo(() => {
    const totalSales = getTotalSales(filteredOrders);
    const totalOrders = getTotalOrders(filteredOrders);
    const newCustomers = getNewCustomers(filteredOrders);
    const monthlySales = getMonthlySales(filteredOrders);
    const topProducts = getTopProducts(filteredOrders);
    const recentOrders = getRecentOrders(filteredOrders);
    return {
      totalSales,
      totalOrders,
      newCustomers,
      monthlySales,
      topProducts,
      recentOrders,
    };
  }, [filteredOrders]);

  const analyticsData = useMemo(
    () => [
      {
        id: 1,
        title: "Total Sales",
        amount: totalSales,
        percentage: 5.4,
        description: "Compared to last month",
        icons: <IoMdTrendingUp />,
        extra: `${totalOrders} transactions`,
      },
      {
        id: 2,
        title: "Total Profits",
        amount: Math.round(totalSales * 0.4),
        percentage: 3.7,
        description: "Compared to last month",
        icons: <FaMoneyCheckDollar />,
        extra: `Margin 40%`,
      },
      {
        id: 3,
        title: "Total Orders",
        amount: totalOrders,
        percentage: -6.3,
        description: "Compared to last month",
        icons: <FaClipboardList />,
        extra: `${filteredOrders.filter((o) => o.status === "Pending").length} pending`,
      },
      {
        id: 4,
        title: "New Customers",
        amount: newCustomers,
        percentage: 9.1,
        description: "Compared to last month",
        icons: <MdOutlinePeopleAlt />,
        extra: `Retention 74%`,
      },
    ],
    [totalSales, totalOrders, newCustomers, filteredOrders],
  );

  const itemsPerPage = 5;
  const totalItems = recentOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentOrders = recentOrders.slice(startIndex, endIndex);

  const statusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600 border border-green-100";
      case "Pending":
        return "bg-yellow-50 text-yellow-600 border border-yellow-100";
      case "Processing":
        return "bg-blue-50 text-blue-600 border border-blue-100";
      case "Shipped":
        return "bg-purple-50 text-purple-600 border border-purple-100";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const iconStyles = [
    "bg-indigo-50 text-indigo-600",
    "bg-orange-50 text-orange-500",
    "bg-emerald-50 text-emerald-600",
    "bg-sky-50 text-sky-600",
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Welcome back! Here's what's happening.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-sm text-black bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none cursor-pointer"
          >
            <option value="last30">Last 30 days</option>
            <option value="last7">Last 7 days</option>
            <option value="all">All time</option>
          </select>
          <button
            onClick={() => alert("Export feature coming soon")}
            className="bg-black text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer"
          >
            Export
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {analyticsData.map((card, index) => {
          const isPositive = card.percentage >= 0;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconStyles[index]}`}
                >
                  <span className="text-lg">{card.icons}</span>
                </div>
                <button className="text-gray-300 hover:text-gray-500 transition cursor-pointer">
                  <HiOutlineDotsHorizontal className="text-lg" />
                </button>
              </div>

              <p className="text-sm text-gray-400 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-black mb-2">
                {card.id === 3 || card.id === 4
                  ? card.amount.toLocaleString()
                  : `$${card.amount.toLocaleString()}`}
              </p>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">{card.extra}</p>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isPositive
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {isPositive ? (
                    <IoArrowUpOutline className="text-xs" />
                  ) : (
                    <IoArrowDownOutline className="text-xs" />
                  )}
                  {Math.abs(card.percentage)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Performance Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="text-black font-bold">Sales Performance</h2>
                <p className="text-sm text-gray-400">
                  Monthly sales volume overview
                </p>
              </div>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                {["Monthly", "Weekly"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveChartTab(tab)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                      activeChartTab === tab
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-64 mt-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlySales}
                  margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#111827"
                        stopOpacity={0.12}
                      />
                      <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2">
                            <p className="text-xs text-gray-400 mb-1">
                              {label}
                            </p>
                            <p className="text-sm font-semibold text-black">
                              ${payload[0].value.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#111827"
                    fill="url(#salesGradient)"
                    strokeWidth={2.5}
                    dot={{ fill: "#111827", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#111827" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8eaed] overflow-hidden">
            <div className="p-6 border-b border-[#e8eaed] flex items-center justify-between">
              <div>
                <h2 className="text-md font-semibold text-black">
                  Recent Orders
                </h2>
                <p className="text-gray-400 text-sm">
                  Latest transactions in real time
                </p>
              </div>
              <button className="text-xs text-gray-400 hover:text-black transition cursor-pointer font-medium">
                View all →
              </button>
            </div>

            <div className="overflow-x-auto px-6">
              <table className="min-w-[700px] w-full text-left">
                <thead className="border-b border-[#e8eaed]">
                  <tr>
                    <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-[140px]">
                      Order No.
                    </th>
                    <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-[180px]">
                      Item
                    </th>
                    <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-[160px]">
                      Customer
                    </th>
                    <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-[100px]">
                      Price
                    </th>
                    <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-[120px]">
                      Date
                    </th>
                    <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-[120px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-8 text-center text-gray-400"
                      >
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#f0f2f5] hover:bg-[#fafbfc] transition"
                      >
                        <td className="py-4 text-sm font-medium text-black whitespace-nowrap">
                          {order.orderNo}
                        </td>
                        <td className="py-4 text-sm text-black whitespace-nowrap">
                          {order.item}
                        </td>
                        <td className="py-4 text-sm text-gray-600 whitespace-nowrap">
                          {order.customer}
                        </td>
                        <td className="py-4 text-sm font-medium text-black whitespace-nowrap">
                          ${order.price.toLocaleString()}
                        </td>
                        <td className="py-4 text-sm text-gray-400 whitespace-nowrap">
                          {order.date}
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyle(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {totalItems > 0 && (
                  <tfoot>
                    <tr>
                      <td colSpan="100%">
                        <div className="flex items-center justify-between px-2 py-4 border-t border-[#e8eaed] bg-white">
                          <p className="text-xs text-gray-400">
                            Showing{" "}
                            <span className="font-medium text-gray-700">
                              {totalItems === 0 ? 0 : startIndex + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium text-gray-700">
                              {Math.min(endIndex, totalItems)}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-gray-700">
                              {totalItems}
                            </span>{" "}
                            orders
                          </p>
                          <div className="flex items-center gap-1.5">
                            <button
                              disabled={currentPage === 1}
                              onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                              }
                              className={`px-3 py-1.5 text-xs rounded-lg transition ${
                                currentPage === 1
                                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                                  : "text-black bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
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
                                  className={`px-3 py-1.5 text-xs rounded-lg transition cursor-pointer ${
                                    currentPage === page
                                      ? "bg-black text-white"
                                      : "border border-gray-200 text-black hover:bg-gray-50"
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            })}
                            <button
                              disabled={currentPage === totalPages}
                              onClick={() =>
                                setCurrentPage((p) =>
                                  Math.min(p + 1, totalPages),
                                )
                              }
                              className={`px-3 py-1.5 text-xs rounded-lg transition ${
                                currentPage === totalPages
                                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                                  : "text-black bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
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
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-black font-bold">Category Sales</h2>
                <p className="text-sm text-gray-400">By revenue share</p>
              </div>
              <button className="text-gray-300 hover:text-gray-500 transition cursor-pointer">
                <HiOutlineDotsHorizontal className="text-lg" />
              </button>
            </div>
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ left: 0, right: 10 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    width={75}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}%`, "Share"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #f0f0f0",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={categoryColors[index]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-black font-bold">Top Products</h2>
                <p className="text-sm text-gray-400">By total revenue</p>
              </div>
              <MdOutlineShoppingBag className="text-gray-300 text-lg" />
            </div>
            <div className="space-y-4">
              {topProducts.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  No products yet
                </p>
              ) : (
                topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-black leading-tight">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {product.sales} sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-black">
                        ${(product.revenue / 1000).toFixed(0)}k
                      </p>
                      <span className="text-xs font-medium text-green-500">
                        +12%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* View Insights */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-black font-bold mb-1">View Insights</h2>
            <p className="text-sm text-gray-400 mb-4">
              More analytics available
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl px-4 py-3 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm">
                    <BsBarChartFill className="text-black text-sm" />
                  </div>
                  <span className="text-black text-sm font-medium">
                    Order complete ratio
                  </span>
                </div>
                <IoChevronForward className="text-gray-400 group-hover:text-black transition text-sm" />
              </button>

              <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl px-4 py-3 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm">
                    <PiFilesBold className="text-black text-sm" />
                  </div>
                  <span className="text-black text-sm font-medium">
                    Invoice analysis
                  </span>
                </div>
                <IoChevronForward className="text-gray-400 group-hover:text-black transition text-sm" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="w-7 h-7 flex items-center justify-center bg-green-300 rounded-full">
                <TiUser className="text-black text-sm" />
              </span>
              <p className="text-sm text-gray-400">
                Insight by <span className="text-black font-medium">Admin</span>
              </p>
            </div>
          </div>

          {/* Upgrade card */}
          <div className="bg-black rounded-2xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <BsBarChartFill className="text-white text-lg" />
            </div>
            <h2 className="text-white font-bold mb-2">Unlock Pro Insights</h2>
            <p className="text-sm text-gray-400 mb-5">
              Transform data into strategy — revenue forecasting, team
              optimization & more.
            </p>
            <button className="bg-white text-black text-sm font-semibold w-full py-2 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
