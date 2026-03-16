"use client";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { MdOutlineShoppingBag, MdOutlineDiamond } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaHome, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoIosMan, IoIosWoman, IoMdSearch } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import Link from "next/link";
import SignupModal from "../auth/SignupModal";
import SigninModal from "../auth/SigninModal";

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const openSignup = () => {
    setSigninOpen(false);
    setSignupOpen(true);
  };

  const openSignin = () => {
    setSignupOpen(false);
    setSigninOpen(true);
  };

  const closeAll = () => {
    setSignupOpen(false);
    setSigninOpen(false);
  };

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* HEADER */}
      <header className="w-full bg-white/80 backdrop-blur-md fixed top-0 z-50 border-b border-black/5">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4.5 uppercase text-sm tracking-widest">
          {/* LEFT SECTION */}
          <div className="flex items-center">
            <div className="lg:hidden">
              <FiMenu
                className="text-2xl text-black cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              />
            </div>

            <ul className="hidden lg:flex gap-10 text-black text-[12px] font-sans font-semibold">
              <li className="cursor-pointer hover:text-[#1152d4]">
                <Link href="/">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-[#1152d4]">
                <Link href="/collections">Collections</Link>
              </li>
            </ul>
          </div>

          {/* LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-3xl font-serif font-bold tracking-wider">
            <MdOutlineDiamond className="text-blue-600 text-3xl" />
            <h1 className="text-black">LUXE</h1>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center">
            <div className="lg:hidden w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
              <IoMdSearch className="text-xl text-black" />
            </div>

            <div className="hidden lg:flex items-center gap-12">
              <ul className="text-black font-semibold flex gap-12 text-[12px]">
                <li className="cursor-pointer hover:text-[#1152d4]">
                  <Link href="#">Men</Link>
                </li>
                <li className="cursor-pointer hover:text-[#1152d4]">
                  <Link href="#">Women</Link>
                </li>
              </ul>

              <div className="flex items-center gap-9">
                <div className="w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
                  <IoMdSearch className="text-xl text-black" />
                </div>

                <div className="relative w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
                  <Link href="/cart">
                    <MdOutlineShoppingBag className="text-xl text-black" />
                  </Link>
                  {totalQty > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                      {totalQty}
                    </span>
                  )}
                </div>

                <div
                  onClick={() => setSignupOpen(true)}
                  className="w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer"
                >
                  <FaRegUser className="text-md text-black" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between
        transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:hidden`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <MdOutlineDiamond className="text-2xl text-[#155dfc]" />
              <h1 className="text-xl font-serif font-bold text-black tracking-wide">
                LUXE
              </h1>
            </div>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <ul className="space-y-2 text-sm font-medium">
            <li className="rounded-lg hover:bg-blue-50">
              <Link
                href="/"
                className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <FaHome className="text-lg" />
                Home
              </Link>
            </li>
            <li className="rounded-lg hover:bg-blue-50">
              <Link
                href="/collections"
                className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <AiOutlineProduct className="text-lg" />
                Collections
              </Link>
            </li>
            <li className="rounded-lg hover:bg-blue-50">
              <Link
                href="#"
                className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <IoIosMan className="text-lg" />
                Men
              </Link>
            </li>
            <li className="rounded-lg hover:bg-blue-50">
              <Link
                href="#"
                className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <IoIosWoman className="text-lg" />
                Women
              </Link>
            </li>
            <li className="rounded-lg hover:bg-blue-50">
              <Link
                href="/cart"
                className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <FaShoppingCart className="text-lg" />
                Cart
              </Link>
            </li>
            <li className="rounded-lg hover:bg-blue-50">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  setSignupOpen(true);
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <FaRegUserCircle className="text-lg" />
                SignUp
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* MODALS */}
      {signupOpen && (
        <SignupModal switchToSignin={openSignin} closeModal={closeAll} />
      )}
      {signinOpen && (
        <SigninModal switchToSignup={openSignup} closeModal={closeAll} />
      )}
    </>
  );
};

export default Nav;
