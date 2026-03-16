"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser, FaMobileAlt } from "react-icons/fa";
import { IoMdMail, IoMdLock } from "react-icons/io";
import { RiShieldCheckFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const SignupModal = ({ switchToSignin, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordMatch =
    confirmPassword === "" || password === confirmPassword;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-4 sm:p-8 relative">
        {/* close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black cursor-pointer"
        >
          <RxCross1 className="text-black" />
        </button>
        {/* title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join the world of premium fashion and exclusive collections.
        </p>
        {/* form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-600">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Shin Chan"
                className="w-full border border-gray-300 text-black rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Email &  Mobile Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <IoMdMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="shinchan@gmail.com"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <FaMobileAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <IoMdLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Use 8+ characters with a mix of letters, numbers & symbols.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <RiShieldCheckFill className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                required
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 ${
                  isPasswordMatch
                    ? "border-gray-300 focus:ring-black"
                    : "border-red-500 focus:ring-red-500"
                }`}
              />
            </div>
            {!isPasswordMatch && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start text-sm gap-2">
            <input type="checkbox" required className="mt-1 cursor-pointer" />
            <span className="text-gray-600">
              I agree to the{" "}
              <span className="font-medium underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="font-medium underline cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </div>

          {/* Signup Button */}
          <button
            type="button"
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t" />
          <span className="mx-3 text-gray-400 text-sm">or continue with</span>
          <div className="flex-1 border-t" />
        </div>

        {/* Google Login */}
        <button className="w-full border flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
          <FcGoogle size={20} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={switchToSignin}
            className="text-black font-semibold underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
