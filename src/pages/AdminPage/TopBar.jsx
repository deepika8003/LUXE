import React from "react";
import { FiSearch, FiPlus, FiMenu } from "react-icons/fi";
import { useState } from "react";

const TopBar = ({ onMenuClick }) => {
  return (
    <div className="border-b border-gray-200 bg-gray-100/80 backdrop-blur-2xs sticky top-0 px-6 py-4 z-30">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* MENU ICON */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-xl text-gray-700"
          >
            <FiMenu />
          </button>

          <div>
            <h1 className="text-2xl font-serif font-semibold text-gray-900">
              Product Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage your store&apos;s inventory and catalog
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="search"
              placeholder="Search catalog..."
              className="px-8 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none"
            />
          </div>

          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">
            <FiPlus />
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
