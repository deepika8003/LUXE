"use client";

import TopBar from "@/components/AdminPage/TopBar";
import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoCloudUploadOutline, IoFilter } from "react-icons/io5";

const OrderList = () => {
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
    <section className="px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, index) => {
          const isPositive = card.percentage >= 0;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-sm"
            >
              {/* TOP */}
              <div className="flex justify-between ">
                <div>
                  <h2 className="text-md font-semibold text-black">
                    {card.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {card.description}
                  </p>
                </div>

                <button className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-black hover:bg-gray-100">
                  <HiOutlineDotsHorizontal />
                </button>
              </div>

              {/* VALUE */}
              <div className="mt-6 flex items-center gap-3">
                <p className="text-3xl font-bold text-black">
                  {card.title.includes("Sales") || card.title.includes("Refund")
                    ? `$${card.value.toLocaleString()}`
                    : card.value.toLocaleString()}
                </p>

                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
                    isPositive
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-red-50 text-red-600  border-red-200"
                  }`}
                >
                  {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(card.percentage)}%
                </span>
              </div>

              {/* BOTTOM */}
              <div className="mt-6 flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl">
                <p className="text-xs text-gray-500">From last month</p>
                <button className="text-xs font-medium flex items-center gap-1 text-gray-700 hover:text-black">
                  See detail <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLE */}
      <div className="my-5 p-4 bg-white rounded-xl shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Product Transaction
            </h2>
            <p className="text-sm text-gray-400">
              Latest transactions sales in real time.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg">
              <IoFilter />
              Filter
            </button>

            <button className="px-4 py-2 text-sm border rounded-lg">
              Customize
            </button>

            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg">
              <IoCloudUploadOutline />
              Export
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            {/* Table Head */}
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-3 px-3">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Product Name</th>
                <th className="py-3 px-3">Order Date</th>
                <th className="py-3 px-3">Customer Name</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Payment Status</th>
                <th className="py-3 px-3">Total Price</th>
                <th className="py-3 px-3">Quantity</th>
                <th className="py-3 px-3">Order Status</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-3">
                  <input type="checkbox" />
                </td>

                <td className="py-4 px-3 font-medium text-gray-700">
                  #SLR132131-9N
                </td>

                <td className="py-4 px-3 flex items-center gap-3">
                  <img
                    src="/product1.png"
                    alt="product"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  Apple iPad (Gen 10)
                </td>

                <td className="py-4 px-3">13 February, 2025</td>

                <td className="py-4 px-3">Anika Dokidis</td>

                <td className="py-4 px-3">COD</td>

                <td className="py-4 px-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-md bg-red-100 text-red-600">
                    Unpaid
                  </span>
                </td>

                <td className="py-4 px-3 font-medium">$449</td>

                <td className="py-4 px-3">1 Pcs</td>

                <td className="py-4 px-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-600">
                    Processing
                  </span>
                </td>

                <td className="py-4 px-3 text-center">...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
