"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import Toast from "../components/Toast";

import Link from "next/link";

// react icons
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaMapMarkerAlt, FaRegHeart, FaBars } from "react-icons/fa";
import { MdWindow, MdLogout, MdOutlineDiamond } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { IoSettings, IoCartOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Profile = () => {
  const cardsData = [
    {
      title: "Orders",
      desc: "Manage your past and current deliveries.",
      status: "NO ORDERS YET",
      icon: <MdOutlineShoppingBag />,
      path: "/profile/orders",
    },
    {
      title: "Cart",
      desc: "Items waiting for your confirmation.",
      status: "YOUR CART IS EMPTY",
      icon: <IoCartOutline />,
      path: "/profile/cart",
    },
    {
      title: "Wishlist",
      desc: "Curated pieces for future acquisitions.",
      status: "YOUR WISHLIST IS EMPTY",
      icon: <FaRegHeart />,
      path: "/profile/wishlist",
    },
    {
      title: "Rewards",
      desc: "Earn points and unlock exclusive benefits.",
      status: "NO REWARDS YET",
      icon: <MdOutlineDiamond />,
      path: "/profile/#",
    },
  ];

  const dispatch = useDispatch();
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile sidebar toggle
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    setToast({ message: "Sign out successful", type: "success" });
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      dispatch({
        type: "auth/setUser",
        payload: JSON.parse(user),
      });
    }
  }, [dispatch]);

  // Close sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <section className="min-h-screen pt-20 bg-[#0c0c0d] text-white flex relative">
        {/* SIDEBAR */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 mt-20 sm:mt-0  w-64 bg-black p-6 flex flex-col  border-r border-white/10 transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:block
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Close button for mobile */}
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-gray-400 md:hidden"
          >
            <RxCross2 />
          </button>

          {/* PROFILE */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-[#1a1a1c] flex items-center justify-center text-lg">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
            <h2 className="mt-4 text-sm sm:text-lg tracking-wide">
              {currentUser?.name || "User"}
            </h2>
            <p className="text-[10px] sm:text-sm text-gray-500 tracking-widest mt-1">
              PLATINUM MEMBER
            </p>
          </div>

          {/* MENU */}
          <ul className="space-y-7 text-xs tracking-widest text-gray-400">
            <li
              className="hover:text-white cursor-pointer"
              onClick={closeSidebar}
            >
              <Link href="" className="flex items-center gap-3">
                <MdWindow className="text-lg" />
                OVERVIEW
              </Link>
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={closeSidebar}
            >
              <Link href="/profile/orders" className="flex items-center gap-3">
                <FiBox className="text-lg" />
                ORDERS
              </Link>
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={closeSidebar}
            >
              <Link
                href="/profile/wishlist"
                className="flex items-center gap-3"
              >
                <FaRegHeart className="text-lg" />
                WISHLIST
              </Link>
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={closeSidebar}
            >
              <Link href="/profile/cart" className="flex items-center gap-3">
                <IoCartOutline className="text-lg" />
                CART
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link
                href="/profile/shippingDetails"
                className="flex items-center gap-3"
              >
                <FaMapMarkerAlt className="text-lg" />
                ADDRESS BOOK
              </Link>
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={closeSidebar}
            >
              <Link
                href="/profile/settings"
                className="flex items-center gap-3"
              >
                <IoSettings className="text-lg" />
                SETTINGS
              </Link>
            </li>
          </ul>
        </div>

        {/* BACKDROP OVERLAY for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* RIGHT SIDE CONTENT */}
        <div className="flex-1 p-4 md:p-10">
          {/* TOP HEADER */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className=" w-10 h-10 flex items-center justify-center  md:hidden  bg-black p-2 rounded-lg border border-white/10"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="mb-10">
              <h1 className="text-2xl md:text-4xl font-serif">
                Hello, {currentUser?.name || "User"}
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                {currentUser?.email || "user@email.com"}
              </p>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardsData.map((card, index) => (
              <div
                key={index}
                onClick={() => router.push(card.path)}
                className="bg-gradient-to-r cursor-pointer from-[#111] to-[#1a1a1c] p-6 rounded-lg border border-white/10 hover:border-[#c6a96a]/40 transition duration-300"
              >
                <p className="text-[#155dfc] text-xl mb-4">{card.icon}</p>
                <h3 className="text-sm mb-1 text-[#c6a96a]">{card.title}</h3>
                <p className="text-xs text-gray-400">{card.desc}</p>
                <p className="text-[10px] text-gray-600 mt-4">{card.status}</p>
              </div>
            ))}
          </div>

          {/* BOTTOM BANNER */}
          <div className="mt-12 bg-gradient-to-r from-[#111] to-[#1a1a1c] p-8 border border-white/10 relative">
            <div className="absolute left-0 top-0 h-full w-[2px] bg-[#c6a96a]"></div>
            <p className="text-[10px] text-[#c6a96a] tracking-widest mb-3 pl-4">
              MEMBERSHIP BENEFITS
            </p>
            <h2 className=" text-lg sm:text-xl font-serif pl-4">
              As a Platinum Member, you have early access to the Summer '24
              Atelier Collection.
            </h2>
            <p className="text-xs text-gray-500 mt-4 pl-4 border-b border-white/10 inline-block pb-1">
              VIEW MEMBER PRIVILEGE ARCHIVE
            </p>
          </div>

          {/* DIVIDER + LOGOUT */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-t border-white/10 pt-8">
            <p className="text-[10px] text-gray-600 max-w-md">
              Securely end your session. We look forward to your next visit to
              the Atelier.
            </p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 font-bold px-6 py-2 text-xs tracking-widest bg-[#2a2a2c] hover:bg-white hover:text-black transition"
            >
              LOGOUT <MdLogout />
            </button>
          </div>
        </div>
      </section>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
};

export default Profile;
