"use client";

import React, { useState, useEffect } from "react";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaUsers, FaShieldAlt, FaUserPlus } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";

const CUSTOMERS = [
  {
    id: 1,
    name: "Elena Rodriguez",
    email: "elena.rod@creative.io",
    phone: "+1 (555) 234-8901",
    orders: 42,
    spend: 12450.0,
    status: "ACTIVE",
    initials: "ER",
    bg: "#fef3c7",
    fg: "#92400e",
  },
  {
    id: 2,
    name: "Marcus Thorne",
    email: "m.thorne@luxury.com",
    phone: "+44 20 7946 0123",
    orders: 18,
    spend: 8210.5,
    status: "ACTIVE",
    initials: "MT",
    bg: "#374151",
    fg: "#ffffff",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    email: "sarahj@outlook.com",
    phone: "+1 (555) 982-1144",
    orders: 3,
    spend: 450.0,
    status: "BLOCKED",
    initials: "SJ",
    bg: "#fce7f3",
    fg: "#9d174d",
  },
  {
    id: 4,
    name: "David Chen",
    email: "d.chen@globaltech.io",
    phone: "+86 10 555 0192",
    orders: 126,
    spend: 34890.0,
    status: "ACTIVE",
    initials: "DC",
    bg: "#dbeafe",
    fg: "#1e40af",
  },
  {
    id: 5,
    name: "Olivia Lang",
    email: "olivia.lang@mail.com",
    phone: "+1 (555) 671-3300",
    orders: 29,
    spend: 6100.0,
    status: "ACTIVE",
    initials: "OL",
    bg: "#d1fae5",
    fg: "#065f46",
  },
  {
    id: 6,
    name: "Brian Kim",
    email: "briankim@studio.co",
    phone: "+82 2 555 9988",
    orders: 11,
    spend: 5900.0,
    status: "ACTIVE",
    initials: "BK",
    bg: "#ede9fe",
    fg: "#5b21b6",
  },
  {
    id: 7,
    name: "Priya Nair",
    email: "priya.nair@inbox.in",
    phone: "+91 98765 43210",
    orders: 7,
    spend: 1240.0,
    status: "INACTIVE",
    initials: "PN",
    bg: "#fee2e2",
    fg: "#991b1b",
  },
  {
    id: 8,
    name: "Tom Hartley",
    email: "tomh@corp.net",
    phone: "+1 (555) 400-9900",
    orders: 54,
    spend: 18700.0,
    status: "ACTIVE",
    initials: "TH",
    bg: "#e0f2fe",
    fg: "#0369a1",
  },
  {
    id: 9,
    name: "Lena Fischer",
    email: "lena.f@berlin.de",
    phone: "+49 30 555 7722",
    orders: 33,
    spend: 9850.0,
    status: "ACTIVE",
    initials: "LF",
    bg: "#fef9c3",
    fg: "#78350f",
  },
  {
    id: 10,
    name: "Carlos Ruiz",
    email: "carlos.r@mx.com",
    phone: "+52 55 1234 5678",
    orders: 9,
    spend: 3200.0,
    status: "INACTIVE",
    initials: "CR",
    bg: "#ecfdf5",
    fg: "#065f46",
  },
  {
    id: 11,
    name: "Aisha Patel",
    email: "aisha.p@tech.co",
    phone: "+91 99887 66554",
    orders: 22,
    spend: 5200.0,
    status: "ACTIVE",
    initials: "AP",
    bg: "#e0e7ff",
    fg: "#4338ca",
  },
  {
    id: 12,
    name: "James Wilson",
    email: "jwilson@mail.com",
    phone: "+1 (555) 789-0123",
    orders: 61,
    spend: 22500.0,
    status: "ACTIVE",
    initials: "JW",
    bg: "#cffafe",
    fg: "#0e7490",
  },
  {
    id: 13,
    name: "Maya Sharma",
    email: "maya.s@digital.in",
    phone: "+91 87654 32109",
    orders: 4,
    spend: 890.0,
    status: "INACTIVE",
    initials: "MS",
    bg: "#fef9c3",
    fg: "#a16207",
  },
  {
    id: 14,
    name: "Lucas Moreau",
    email: "lmoreau@france.fr",
    phone: "+33 1 2345 6789",
    orders: 37,
    spend: 14400.0,
    status: "ACTIVE",
    initials: "LM",
    bg: "#e9f5e9",
    fg: "#2b7a3b",
  },
];

const TOP_SPENDERS = [
  {
    initials: "DC",
    bg: "#dbeafe",
    fg: "#1e40af",
    name: "David Chen",
    tier: "PLATINUM TIER",
    amount: "$34.8k",
  },
  {
    initials: "ER",
    bg: "#fef3c7",
    fg: "#92400e",
    name: "Elena Rodriguez",
    tier: "GOLD TIER",
    amount: "$12.4k",
  },
  {
    initials: "MT",
    bg: "#374151",
    fg: "#ffffff",
    name: "Marcus Thorne",
    tier: "GOLD TIER",
    amount: "$8.2k",
  },
  {
    initials: "OL",
    bg: "#d1fae5",
    fg: "#065f46",
    name: "Olivia Lang",
    tier: "SILVER TIER",
    amount: "$6.1k",
  },
  {
    initials: "BK",
    bg: "#ede9fe",
    fg: "#5b21b6",
    name: "Brian Kim",
    tier: "SILVER TIER",
    amount: "$5.9k",
  },
];

const STAT_CARDS = [
  {
    label: "Total Customers",
    value: "14",
    pct: "+12.5%",
    up: true,
    iconBg: "#ede9fe",
    iconFg: "#7c3aed",
    Icon: FaUsers,
  },
  {
    label: "Active Customers",
    value: "15",
    pct: "+4.2%",
    up: true,
    iconBg: "#d1fae5",
    iconFg: "#059669",
    Icon: FaShieldAlt,
  },
  {
    label: "New Customers (This Month)",
    value: "842",
    pct: "-2.1%",
    up: false,
    iconBg: "#dbeafe",
    iconFg: "#2563eb",
    Icon: FaUserPlus,
  },
];

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-600",
  BLOCKED: "bg-red-100 text-red-600",
  INACTIVE: "bg-gray-100 text-gray-600",
};

const Customers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const PER_PAGE = 10;

  const filtered = CUSTOMERS.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "All Status" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const end = Math.min(start + PER_PAGE, totalItems);
  const currentCustomers = filtered.slice(start, end);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  return (
    <div className=" min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and view all registered customers
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Filter by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-900 bg-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-900 bg-white cursor-pointer"
          >
            <option>All Status</option>
            <option>ACTIVE</option>
            <option>BLOCKED</option>
            <option>INACTIVE</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {STAT_CARDS.map(({ label, value, pct, up, iconBg, iconFg, Icon }) => {
          const isPositive = up;
          const description = isPositive
            ? `Increase ${pct} from last month`
            : `Decrease ${pct} from last month`;

          return (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: iconBg, color: iconFg }}
                >
                  <Icon className="text-lg" />
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    isPositive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {pct} {isPositive ? <IoMdTrendingUp /> : <IoMdTrendingDown />}
                </span>
              </div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">
                {value}
              </p>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xs text-gray-400 mt-2">{description}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Customer Name
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Orders
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Total Spend
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Act.
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: c.bg, color: c.fg }}
                        >
                          {c.initials}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {c.name}
                          </div>
                          <div className="text-xs text-gray-400">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">
                      {c.phone}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap">
                      {String(c.orders).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                      $
                      {c.spend.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          statusStyles[c.status] || statusStyles.INACTIVE
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
                {currentCustomers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {totalItems === 0 ? 0 : start + 1}
              </span>{" "}
              to <span className="font-medium text-gray-900">{end}</span> of{" "}
              <span className="font-medium text-gray-900">{totalItems}</span>{" "}
              Customers
            </p>
            <div className="flex items-center gap-1">
              {/* Previous */}
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={`w-7 h-7 flex items-center justify-center border rounded-md transition ${
                  page === 1
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <IoChevronBack className="text-xs" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 flex items-center justify-center text-xs font-medium rounded-md border transition ${
                    page === p
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}

              {/* Next */}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={`w-7 h-7 flex items-center justify-center border rounded-md transition ${
                  page === totalPages
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <IoChevronForward className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-md font-bold text-gray-900">Top Spenders</h2>
            <BsBarChartFill className="text-amber-500 text-sm" />
          </div>
          <div className="space-y-4">
            {TOP_SPENDERS.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: s.bg, color: s.fg }}
                  >
                    {s.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {s.name}
                    </div>
                    <div className="text-[10px] font-semibold text-gray-400 tracking-wide">
                      {s.tier}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {s.amount}
                </span>
              </div>
            ))}
          </div>
          <button
            className="mt-6 w-full border border-gray-200 rounded-xl py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition cursor-pointer"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            View Analytics Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
