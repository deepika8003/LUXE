import React from "react";
import { FiSearch, FiPlus } from "react-icons/fi";

const TopBar = () => {
  return (
    <div className=" border-b border-gray-200 bg-white/30 backdrop-blur-md  sticky top-0 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-serif font-semibold text-gray-900">
            Product Management
          </h1>
          <p className="text-sm text-gray-500 ">
            Manage your store&apos;s inventory and catalog
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="search"
              placeholder="Search catalog..."
              className="px-8 py-2 bg-white  shadow-xs border border-gray-200 rounded-lg text-sm
                       outline-none focus:ring-1 focus:ring-[#155dfc]"
            />
          </div>

          {/* Button */}
          <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
            <FiPlus className="text-md" />
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
