import React from "react";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { LuClipboardCheck } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";

const AdminProduct = () => {
  return (
    <section className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* TOTAL INVENTORY */}
        <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide">
              Total Inventory
            </h2>
            <p className="text-2xl font-semibold mt-1">12,450</p>
            <p className="text-green-600 text-xs mt-1"> 2% from last month</p>
          </div>
          <div className="bg-[#e7ecf5] px-3 py-4  rounded-lg">
            <LuClipboardCheck className="text-2xl text-[#1241a0]" />
          </div>
        </div>

        {/* NEW ARRIVALS */}
        <div className="bg-white rounded-xl border border-[#e0e0e0]  p-6 flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide">
              New Arrivals
            </h2>
            <p className="text-2xl font-semibold mt-1">328</p>
            <p className="text-green-600 text-xs mt-1">+15% this month</p>
          </div>
          <div className="bg-[#d1fae5] px-3 py-4  rounded-lg ">
            <RiVerifiedBadgeLine className="text-2xl text-[#059669]" />
          </div>
        </div>

        {/* ACTIVE LISTINGS */}
        <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide">
              Active Listings
            </h2>
            <p className="text-2xl font-semibold mt-1">1,084</p>
            <p className="text-gray-400 text-xs mt-1">Current status</p>
          </div>
          <div className="bg-[#dbeafe] px-3 py-4  rounded-lg">
            <MdOutlineVisibility className="text-2xl text-[#2563eb]" />
          </div>
        </div>

        {/* OUT OF STOCK */}
        <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide">
              Out of Stock
            </h2>
            <p className="text-2xl font-semibold mt-1">14</p>
            <p className="text-red-500 text-xs mt-1">Needs attention</p>
          </div>
          <div className="bg-[#ffe4e6] px-3 py-4  rounded-lg">
            <AiOutlineExclamationCircle className="text-2xl text-[#e11d48]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProduct;
