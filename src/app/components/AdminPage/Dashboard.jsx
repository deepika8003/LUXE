"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IoMdTrendingUp } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaClipboardList, FaBoxOpen } from "react-icons/fa";
import {
  IoArrowUpOutline,
  IoArrowDownOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoSearchOutline,
  IoChevronForward,
} from "react-icons/io5";
import { MdOutlinePeopleAlt, MdOutlineStorefront } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsCheckCircle, BsClockHistory, BsXCircle } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { RiUserStarLine } from "react-icons/ri";
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

const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-black">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  // Redux data
  const orders = useSelector((state) => state.orders.orders);
  const users = useSelector((state) => state.auth.users);
  const products = useSelector((state) => state.product.products);

  const { totalRevenue, totalOrders, totalUsers, totalProducts } =
    useMemo(() => {
      let revenue = 0;
      let orderCount = orders.length;
      orders.forEach((order) => {
        revenue += order.total || 0;
      });
      return {
        totalRevenue: revenue,
        totalOrders: orderCount,
        totalUsers: users.length,
        totalProducts: products.length,
      };
    }, [orders, users, products]);

  const statsData = [
    {
      id: 1,
      title: "Total Revenue",
      amount: `$${totalRevenue.toLocaleString()}`,
      percentage: 8.2,
      extra: "vs last month",
      icon: <FaMoneyCheckDollar />,
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      id: 2,
      title: "Total Orders",
      amount: totalOrders.toLocaleString(),
      percentage: -2.4,
      extra: "vs last month",
      icon: <FaClipboardList />,
      iconStyle: "bg-orange-50 text-orange-500",
    },
    {
      id: 3,
      title: "Active Users",
      amount: totalUsers.toLocaleString(),
      percentage: 14.1,
      extra: "vs last month",
      icon: <MdOutlinePeopleAlt />,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      id: 4,
      title: "Products Sold",
      amount: totalProducts.toLocaleString(),
      percentage: 5.7,
      extra: "vs last month",
      icon: <FaBoxOpen />,
      iconStyle: "bg-sky-50 text-sky-600",
    },
  ];

  const revenueData = useMemo(() => {
    const monthlyMap = new Map();
    orders.forEach((order) => {
      const date = new Date(order.date);
      const month = date.toLocaleString("default", { month: "short" });
      const revenue = order.total || 0;
      monthlyMap.set(month, (monthlyMap.get(month) || 0) + revenue);
    });

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthOrder
      .filter((m) => monthlyMap.has(m))
      .map((m) => ({ month: m, revenue: monthlyMap.get(m) }));
  }, [orders]);

  const weeklyOrders = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayMap = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    orders.forEach((order) => {
      const day = days[new Date(order.date).getDay()];
      dayMap[day]++;
    });
    return days.map((day) => ({ day, orders: dayMap[day] }));
  }, [orders]);

  const barColors = weeklyOrders.map((day) =>
    day.day === "Thu" || day.day === "Fri" ? "#111827" : "#e5e7eb",
  );

  const recentActivity = useMemo(() => {
    const activities = orders.flatMap((order) =>
      order.items.map((item) => ({
        id: order.id,
        user: order.userId || "Guest",
        action: `Ordered ${item.name}`,
        time: new Date(order.date).toLocaleTimeString(),
        avatar: (order.userId || "G").substring(0, 2).toUpperCase(),
        color: "bg-indigo-100 text-indigo-700",
      })),
    );
    return activities.slice(0, 5);
  }, [orders]);

  const topCategories = [
    { name: "Electronics", sales: 1842, share: 38, color: "bg-indigo-500" },
    { name: "Clothing", sales: 1160, share: 24, color: "bg-orange-400" },
    { name: "Home & Living", sales: 871, share: 18, color: "bg-emerald-500" },
    { name: "Sports", sales: 581, share: 12, color: "bg-sky-400" },
    { name: "Books", sales: 387, share: 8, color: "bg-gray-400" },
  ];

  const recentOrders = useMemo(() => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    const flattened = sortedOrders.slice(0, 5).flatMap((order) =>
      order.items.map((item) => ({
        id: order.id,
        customer: order.userId || "Guest",
        product: item.name,
        amount: `$${item.price}`,
        status: order.status,
      })),
    );
    return flattened.slice(0, 5);
  }, [orders]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <BsCheckCircle className="text-green-500" />;
      case "Shipped":
        return <TbTruckDelivery className="text-sky-500" />;
      case "Processing":
        return <BsClockHistory className="text-blue-500" />;
      case "Pending":
        return <BsClockHistory className="text-amber-500" />;
      case "Cancelled":
        return <BsXCircle className="text-red-400" />;
      default:
        return null;
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600 border border-green-100";
      case "Shipped":
        return "bg-sky-50 text-sky-600 border border-sky-100";
      case "Pending":
        return "bg-amber-50 text-amber-600 border border-amber-100";
      case "Processing":
        return "bg-blue-50 text-blue-600 border border-blue-100";
      case "Cancelled":
        return "bg-red-50 text-red-500 border border-red-100";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const topCustomers = useMemo(() => {
    const spendMap = new Map();
    orders.forEach((order) => {
      const userId = order.userId || "Guest";
      const total = order.total || 0;
      const count = order.items.length;
      if (!spendMap.has(userId)) {
        spendMap.set(userId, { spent: total, orders: count });
      } else {
        const existing = spendMap.get(userId);
        existing.spent += total;
        existing.orders += count;
        spendMap.set(userId, existing);
      }
    });
    return Array.from(spendMap.entries())
      .map(([userId, data]) => ({
        name: userId,
        orders: data.orders,
        spent: `$${data.spent.toLocaleString()}`,
        avatar: userId.substring(0, 2).toUpperCase(),
        color: "bg-emerald-100 text-emerald-700",
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 4);
  }, [orders]);

  const avgOrderValue = totalOrders
    ? (totalRevenue / totalOrders).toFixed(0)
    : 0;
  const returnRate = 3.8;
  const conversion = 6.4;
  const satisfaction = 94;

  return (
    <div className="min-h-screen p-6">
      {/*  Top bar  */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Monday, 30 March 2026</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-52">
            <IoSearchOutline className="text-gray-400 text-base flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="text-sm text-black placeholder-gray-400 focus:outline-none w-full bg-transparent"
            />
          </div>

          {/* Notification bell */}
          <button className="relative w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition cursor-pointer">
            <IoNotificationsOutline className="text-gray-600 text-lg" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* Settings */}
          <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition cursor-pointer">
            <IoSettingsOutline className="text-gray-600 text-lg" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs font-bold">AD</span>
          </div>
        </div>
      </div>

      {/*  Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {statsData.map((card) => {
          const isPositive = card.percentage >= 0;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition group relative overflow-hidden"
            >
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-gray-50 group-hover:bg-gray-100 transition" />

              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconStyle}`}
                >
                  <span className="text-lg">{card.icon}</span>
                </div>
                <button className="text-gray-300 hover:text-gray-500 transition cursor-pointer relative z-10">
                  <HiOutlineDotsHorizontal className="text-lg" />
                </button>
              </div>

              <p className="text-sm text-gray-400 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-black mb-2">
                {card.amount}
              </p>

              <div className="flex items-center justify-between relative z-10">
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

      {/* graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* revenue overview*/}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-black font-bold">Revenue Overview</h2>
              <p className="text-sm text-gray-400">Full year performance</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full bg-black inline-block" />{" "}
                Revenue
              </span>
              <select className="text-xs text-gray-500 bg-gray-100 border-none rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>

          <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#111827" stopOpacity={0.12} />
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
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#111827"
                  fill="url(#revGradient)"
                  strokeWidth={2.5}
                  dot={{ fill: "#111827", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#111827" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-black font-bold">Weekly Orders</h2>
              <p className="text-sm text-gray-400">This week</p>
            </div>
            <button className="text-gray-300 hover:text-gray-500 transition cursor-pointer">
              <HiOutlineDotsHorizontal className="text-lg" />
            </button>
          </div>

          {/* summary pill */}
          <div className="flex items-center gap-2 mt-3 mb-4">
            <span className="text-2xl font-bold text-black">
              {weeklyOrders.reduce((sum, day) => sum + day.orders, 0)}
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
              <IoArrowUpOutline className="text-xs" /> 9.3%
            </span>
          </div>

          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyOrders}
                margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(v) => [v, "Orders"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f0f0f0",
                    fontSize: 12,
                  }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                  {weeklyOrders.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-gray-400 mt-2 text-center">
            Thu & Fri peak days
          </p>
        </div>
      </div>

      {/*   Recent Orders & Activity  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#e8eaed] overflow-hidden">
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
            <table className="min-w-[580px] w-full text-left">
              <thead className="border-b border-[#e8eaed]">
                <tr>
                  <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Order
                  </th>
                  <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Product
                  </th>
                  <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#f0f2f5] hover:bg-[#fafbfc] transition"
                  >
                    <td className="py-3.5 text-sm font-medium text-black whitespace-nowrap">
                      #{order.id}
                    </td>
                    <td className="py-3.5 text-sm text-gray-600 whitespace-nowrap">
                      {order.customer}
                    </td>
                    <td className="py-3.5 text-sm text-black whitespace-nowrap">
                      {order.product}
                    </td>
                    <td className="py-3.5 text-sm font-semibold text-black whitespace-nowrap">
                      {order.amount}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity  */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8eaed]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-md font-semibold text-black">
                Recent Activity
              </h2>
              <p className="text-gray-400 text-sm">Latest user actions</p>
            </div>
            <button className="text-gray-300 hover:text-gray-500 transition cursor-pointer">
              <HiOutlineDotsHorizontal className="text-lg" />
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                {/* avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${item.color}`}
                >
                  {item.avatar}
                </div>
                {/* text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black leading-tight">
                    {item.user}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.action}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {item.time}
                </span>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-center text-gray-400 py-4">
                No recent activity
              </p>
            )}
          </div>

          <button className="mt-5 w-full text-xs text-gray-400 hover:text-black border border-gray-200 rounded-xl py-2.5 transition cursor-pointer hover:bg-gray-50">
            View all activity →
          </button>
        </div>
      </div>

      {/* Top categories & customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-black font-bold">Top Categories</h2>
              <p className="text-sm text-gray-400">By sales volume</p>
            </div>
            <MdOutlineStorefront className="text-gray-300 text-xl" />
          </div>

          <div className="space-y-4">
            {topCategories.map((cat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-black">{cat.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-400">
                      {cat.sales.toLocaleString()} sales
                    </p>
                    <span className="text-xs font-bold text-black">
                      {cat.share}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color} transition-all`}
                    style={{ width: `${cat.share * 2.6}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-black font-bold">Top Customers</h2>
              <p className="text-sm text-gray-400">By total spend</p>
            </div>
            <RiUserStarLine className="text-gray-300 text-xl" />
          </div>

          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${customer.color}`}
                >
                  {customer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black leading-tight truncate">
                    {customer.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {customer.orders} orders
                  </p>
                </div>
                <p className="text-sm font-bold text-black flex-shrink-0">
                  {customer.spent}
                </p>
              </div>
            ))}
            {topCustomers.length === 0 && (
              <p className="text-center text-gray-400 py-4">No customers yet</p>
            )}
          </div>

          <button className="mt-5 w-full text-xs text-gray-400 hover:text-black border border-gray-200 rounded-xl py-2.5 transition cursor-pointer hover:bg-gray-50">
            View all customers →
          </button>
        </div>

        {/* Quick Stats & Upgrade */}
        <div className="space-y-5">
          {/* Quick stat tiles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Avg. Order</p>
              <p className="text-lg font-bold text-black">${avgOrderValue}</p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 mt-1">
                <IoArrowUpOutline /> 4.2%
              </span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Return Rate</p>
              <p className="text-lg font-bold text-black">{returnRate}%</p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-red-500 mt-1">
                <IoArrowDownOutline /> 1.1%
              </span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Conversion</p>
              <p className="text-lg font-bold text-black">{conversion}%</p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 mt-1">
                <IoArrowUpOutline /> 0.8%
              </span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Satisfaction</p>
              <p className="text-lg font-bold text-black">{satisfaction}%</p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 mt-1">
                <IoArrowUpOutline /> 2.3%
              </span>
            </div>
          </div>

          {/* Upgrade card */}
          <div className="bg-black rounded-2xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <IoMdTrendingUp className="text-white text-xl" />
            </div>
            <h2 className="text-white font-bold mb-2">Upgrade to Pro</h2>
            <p className="text-sm text-gray-400 mb-5">
              Unlock advanced reports, forecasting, and team tools.
            </p>
            <button className="bg-white text-black text-sm font-semibold w-full py-2 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              Get Pro Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
