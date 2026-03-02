import React from "react";
import { FiSearch, FiPlus, FiMenu } from "react-icons/fi";

const TopBar = ({ onMenuClick, onAddProductClick }) => {
  return (
    <div className="border-b border-gray-200 bg-gray-100/95 backdrop-blur-sm sticky top-0 px-6 lg:px-8 py-4 z-30 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden cursor-pointer text-xl text-gray-900 shrink-0"
          >
            <FiMenu />
          </button>

          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 leading-tight">
              Product Management
            </h1>

            <p className="text-xs md:text-sm text-gray-500 truncate lg:whitespace-normal">
              Manage your store's inventory and catalog
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* SEARCH */}
          <div className="relative w-full sm:w-60 md:w-64 lg:w-72 xl:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="search"
              placeholder="Search catalog..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-black outline-none  focus:border-black transition"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={onAddProductClick}
            className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            <FiPlus />
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
