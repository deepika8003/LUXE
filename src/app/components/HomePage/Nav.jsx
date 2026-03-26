"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SignupModal from "../auth/SignupModal";
import SigninModal from "../auth/SigninModal";
import AdminLoginModal from "../auth/AdminLoginModal";
import Toast from "../Toast";
import { loadUsers, logout, loadAdmin } from "@/redux/authSlice";

// React Icons
import { MdOutlineShoppingBag, MdOutlineDiamond } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { IoIosMan, IoIosWoman, IoMdSearch } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { PiSignIn } from "react-icons/pi";
import { GoSignIn } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dropdownRef = useRef(null);
  const prevUserRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const hasShownInitialToast = useRef(false);

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadAdmin());
  }, [dispatch]);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("loginToastShown");

    if (!currentUser && !hasShown) {
      setToast({ message: "Please login to continue", type: "info" });
      sessionStorage.setItem("loginToastShown", "true");
    }
  }, [currentUser]);

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

  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const lastToastMessage = useRef(null);

  // Welcome toast
  useEffect(() => {
    if (currentUser && prevUserRef.current === null) {
      const message = `Welcome ${currentUser.name || currentUser.email}`;
      if (lastToastMessage.current !== message) {
        setToast({ message, type: "success" });
        lastToastMessage.current = message;
      }
    }
    prevUserRef.current = currentUser;
  }, [currentUser]);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("hasShownInitialToast");
    if (!currentUser && !hasShown) {
      setToast({ message: "Please login to continue", type: "info" });
      sessionStorage.setItem("hasShownInitialToast", "true");
    }
  }, []);
  const handleOpenSignupFromPage = (email) => {
    setPrefillEmail(email);
    setSignupOpen(true);
  };
  return (
    <>
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
          <div className="absolute left-1/2 -translate-x-[70%] flex items-center gap-2 text-2xl  sm:text-3xl font-serif font-bold tracking-wider">
            <MdOutlineDiamond className="text-blue-600 text-3xl" />
            <h1 className="text-black">LUXE</h1>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex gap-0 items-center">
            <div className="lg:hidden w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
              <IoMdSearch className="text-xl text-black" />
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <ul className="flex gap-6 text-black text-[12px] font-semibold">
                <li className="cursor-pointer hover:text-[#1152d4]">
                  <Link href="/profile/wishlist">
                    <FaRegHeart className="text-black text-lg" />
                  </Link>
                </li>
                <li
                  onClick={() => {
                    if (currentUser?.role === "admin") {
                      window.location.href = "/admin";
                    } else {
                      setAdminOpen(true);
                    }
                  }}
                  className="cursor-pointer hover:text-[#1152d4]"
                >
                  Admin
                </li>
              </ul>
              <div className="w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
                <IoMdSearch className="text-xl text-black" />
              </div>
              <div className="relative w-9 h-11 flex items-center justify-center rounded-full hover:bg-white cursor-pointer">
                <Link href="/profile/cart">
                  <MdOutlineShoppingBag className="text-xl text-black" />
                </Link>
                {totalQty > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                    {totalQty}
                  </span>
                )}
              </div>
            </div>

            <div className="relative ml-2 lg:ml-6" ref={dropdownRef}>
              <div
                onClick={() => {
                  if (currentUser) {
                    window.location.href = "/profile";
                  } else {
                    setUserMenuOpen(!userMenuOpen);
                  }
                }}
                className="w-9 h-11 flex items-center justify-center rounded-full hover:bg-white hover:text-black cursor-pointer"
              >
                <FaRegUser className="text-md text-black" />
              </div>
              {/* Drop down */}
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-40 bg-[#155dfc] backdrop-blur-md shadow-xl rounded-sm border border-gray-200 text-sm z-50 overflow-hidden">
                  {!currentUser && (
                    <>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setSigninOpen(true);
                        }}
                        className="flex items-center gap-3 w-full text-left border-b text-white border-gray-300 px-4 py-2 transition active:bg-black active:text-white"
                      >
                        <PiSignIn className="text-white text-xl" />
                        Sign In
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setSignupOpen(true);
                        }}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-white transition active:bg-black active:text-white"
                      >
                        <GoSignIn className="text-white text-xl" />
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              )}
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
        className={`fixed top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
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
              className="text-2xl cursor-pointer text-black"
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
            <li
              onClick={() => {
                if (currentUser?.role === "admin") {
                  window.location.href = "/admin";
                } else {
                  setAdminOpen(true);
                }
              }}
              className="rounded-lg hover:bg-blue-50 cursor-pointer"
            >
              <div className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600">
                <FaRegUser className="text-lg" />
                Admin
              </div>
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
                href="/profile/wishlist"
                className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <FaRegHeart className="text-lg" />
                Wishlist
              </Link>
            </li>

            <li className="rounded-lg hover:bg-blue-50">
              <Link
                href="/profile/cart"
                className="flex items-center gap-4 px-4 py-3 text-black hover:text-blue-600"
              >
                <FaShoppingCart className="text-lg" />
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* MODALS */}
      {signupOpen && (
        <SignupModal
          switchToSignin={openSignin}
          closeModal={closeAll}
          showToast={setToast}
        />
      )}
      {signinOpen && (
        <SigninModal
          switchToSignup={openSignup}
          openSignupModal={handleOpenSignupFromPage}
          closeModal={closeAll}
          showToast={setToast}
        />
      )}
      {adminOpen && (
        <AdminLoginModal
          closeModal={() => setAdminOpen(false)}
          showToast={setToast}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
};

export default Nav;
