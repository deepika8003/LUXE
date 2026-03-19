"use client";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, resetAuthStatus } from "@/redux/authSlice";
import React, { useState, useEffect } from "react";
import { IoMdMail, IoMdLock } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const AdminLoginModal = ({ closeModal, showToast }) => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }));
  };

  useEffect(() => {
    if (authStatus === "ADMIN_SUCCESS") {
      showToast({ message: "Admin Login Success 🔐", type: "success" });
      closeModal();
      dispatch(resetAuthStatus());
    } else if (authStatus === "NO_ADMIN") {
      showToast({ message: "Unauthorized Access ", type: "error" });
    } else if (authStatus === "WRONG_PASSWORD") {
      showToast({ message: "Incorrect Password ", type: "error" });
    }
  }, [authStatus]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] text-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-[#C9A96E]/20">
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <RxCross1 />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-serif text-center text-[#C9A96E] mb-2">
          Admin Access
        </h2>
        <p className="text-center text-xs text-gray-400 mb-6">
          Restricted Access – Authorized Personnel Only
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Admin Email</label>
            <div className="relative mt-1">
              <IoMdMail className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@luxe.com"
                className="w-full bg-black border border-gray-700 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:border-[#C9A96E]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <div className="relative mt-1">
              <IoMdLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full bg-black border border-gray-700 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:border-[#C9A96E]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#C9A96E] text-black py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Sign In as Admin
          </button>
        </form>

        {/* Footer */}
        <p className="text-[10px] text-gray-500 text-center mt-6">
          Your session is protected by secure access protocols.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginModal;
