import Link from "next/link";
import React from "react";
import {
  MdOutlineDiamond,
  MdOutlineDashboard,
  MdOutlineShoppingBag,
  MdOutlineSettings,
} from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import { FaBoxArchive } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`h-screen w-64 fixed flex-shrink-0 bg-white flex flex-col justify-between
    transform transition-transform duration-300 z-50
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0`}
      >
        <div className="p-4">
          {/* TITLE */}
          <div className="flex items-center gap-2 mb-10">
            <div className=" p-2 rounded-lg">
              <MdOutlineDiamond className="text-2xl text-[#155dfc]" />
            </div>
            <h1 className="text-xl font-serif font-bold text-black  tracking-wide">
              ELEGANT
            </h1>
          </div>
          {/* NAV CONTENT */}
          <nav>
            <ul className="s">
              <li className="rounded-lg  bg-blue-600  hover:bg-blue-50 mb-2">
                <Link
                  href=""
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:text-blue-600"
                >
                  <MdOutlineDashboard className="text-xl" />
                  Dashboard
                </Link>
              </li>

              <li className="rounded-lg hover:bg-blue-50 mb-2 active:bg-blue-600">
                <Link
                  href="/admin/orderlist"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600  active:text-white"
                >
                  <MdOutlineShoppingBag className="text-xl" />
                  Order
                </Link>
              </li>

              <li className=" rounded-lg   hover:bg-blue-50 mb-2 active:bg-blue-600 ">
                <Link
                  href=""
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium  text-gray-700 hover:text-blue-600  active:text-white"
                >
                  <FaBoxArchive className="text-xl" />
                  Products
                </Link>
              </li>

              <li className="rounded-lg   hover:bg-blue-50 mb-2 active:bg-blue-600 ">
                <Link
                  href=""
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 active:text-white"
                >
                  <FiUsers className="text-xl" />
                  Customer
                </Link>
              </li>

              <li className="rounded-lg  hover:bg-blue-50 mb-2 active:bg-blue-600 ">
                <Link
                  href=""
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600  active:text-white"
                >
                  <RiBarChartFill className="text-xl" />
                  Analytics
                </Link>
              </li>

              <li className="rounded-lg  hover:bg-blue-50 mb-2 active:bg-blue-600 ">
                <Link
                  href=""
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600  active:text-white"
                >
                  <MdOutlineSettings className="text-xl" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* USER PRIFILE */}
        <div className="flex items-center px-4 gap-3 border-t border-[#e0e0e0] py-4">
          <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-black font-semibold">
            A
          </div>
          <div>
            <h4 className="text-sm font-semibold">Alexander West</h4>
            <p className="text-xs text-gray-400">Store Manager</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
