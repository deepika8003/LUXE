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

const SideBar = () => {
  return (
    <aside className="h-screen w-64 fixed flex-shrink-0 bg-white flex flex-col justify-between ">
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
            <li className="rounded-lg hover:bg-blue-50 mb-2">
              <Link
                href=""
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium  text-gray-700 hover:text-blue-600"
              >
                <MdOutlineDashboard className="text-xl" />
                Dashboard
              </Link>
            </li>

            <li className="rounded-lg hover:bg-blue-50 mb-2">
              <Link
                href=""
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <MdOutlineShoppingBag className="text-xl" />
                Order
              </Link>
            </li>

            <li className=" bg-blue-600 text-white rounded-lg mb-2">
              <Link
                href=""
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium "
              >
                <FaBoxArchive className="text-xl" />
                Products
              </Link>
            </li>

            <li className="rounded-lg hover:bg-blue-50 mb-2">
              <Link
                href=""
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <FiUsers className="text-xl" />
                Customer
              </Link>
            </li>

            <li className="rounded-lg hover:bg-blue-50 mb-2">
              <Link
                href=""
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <RiBarChartFill className="text-xl" />
                Analytics
              </Link>
            </li>

            <li className="rounded-lg hover:bg-blue-50 mb-2">
              <Link
                href=""
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
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
  );
};

export default SideBar;
