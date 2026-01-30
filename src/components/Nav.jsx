import React from "react";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingBag, MdOutlineDiamond } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

const Nav = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md fixed top-0 z-50 border-b border-black/5 ">
      <nav className="mx-auto flex  max-w-7xl items-center justify-between px-4 py-4.5 uppercase text-sm tracking-widest">
        {/* LEFT MENU */}
        <ul className="hidden lg:flex gap-10 text-black text-[12px] font-sans font-semibold ">
          <li className="cursor-pointer hover:text-[#1152d4]">New Arrivals</li>
          <li className="cursor-pointer hover:text-[#1152d4]">Collections</li>
        </ul>

        {/* LOGO */}
        <div className="flex items-center gap-2 text-3xl font-serif font-bold tracking-wider">
          <MdOutlineDiamond className="text-blue-600 text-3xl" />
          <span className="text-black">LUXE</span>
        </div>

        {/* RIGHT MENU */}
        <div className="flex items-center gap-12">
          <ul className=" text-black font-semibold hidden lg:flex gap-12  text-[12px] ">
            <li className="cursor-pointer hover:text-[#1152d4]">Men</li>
            <li className="cursor-pointer hover:text-[#1152d4]">Women</li>
          </ul>

          {/* ICONS */}
          <div className="flex items-center gap-9 ">
            <div className=" w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
              <IoMdSearch className="text-xl text-black" />
            </div>

            <div className="relative w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
              <MdOutlineShoppingBag className="text-xl text-black" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                2
              </span>
            </div>

            <div className="w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
              <FaRegUser className="text-md text-black" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
