import React from "react";
import { FiSearch, FiPlus, FiMenu } from "react-icons/fi";

const TopBar = ({ onMenuClick }) => {
  return (
    <div className="border-b border-gray-200 bg-gray-100/80 backdrop-blur-2xs sticky top-0 px-8 py-4 z-30">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* LEFT */}
        <div className="flex w-full md:w-auto items-center gap-4">
          {/* MENU ICON */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-xl text-gray-700"
          >
            <FiMenu />
          </button>

          <div className="text-center ">
            <h1 className="text-xl md:text-2xl  font-serif font-semibold text-gray-900">
              Product Management
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Manage your store's inventory and catalog
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex w-full sm:w-auto flex-col sm:flex-row items-start md:items-center gap-3 md:gap-4">
          <div className="relative w-full sm:w-50">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="search"
              placeholder="Search catalog..."
              className="w-full px-8 py-2 bg-white border text-black border-gray-200 rounded-lg text-sm outline-none"
            />
          </div>

          {/* ADD BUTTON */}
          <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto justify-center">
            <FiPlus />
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
