"use client";
import { useDispatch, useSelector } from "react-redux";
import { signin, resetAuthStatus, generateOTP } from "@/redux/authSlice";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdMail, IoMdLock } from "react-icons/io";
import { FaMobileAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import OTPModal from "./OTPModal";

const SigninModal = ({ switchToSignup, closeModal, showToast }) => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [otpOpen, setOtpOpen] = useState(false);

  // Handle signin form submission
  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signin({ identifier: email, password, loginMethod }));
  };

  // Handle OTP button click
  const handleOTPClick = () => {
    if (!email) {
      showToast({ message: `Please enter your ${loginMethod}`, type: "error" });
      return;
    }
    dispatch(generateOTP({ identifier: email, loginMethod }));
  };

  useEffect(() => {
    if (authStatus === "SUCCESS") {
      showToast({ message: "Login success", type: "success" });
      closeModal();
      dispatch(resetAuthStatus());
    } else if (authStatus === "NO_USER") {
      showToast({ message: "No account found, please sign up", type: "error" });
    } else if (authStatus === "WRONG_PASSWORD") {
      showToast({ message: "Incorrect password", type: "error" });
    } else if (authStatus === "OTP_SENT") {
      setOtpOpen(true);
    } else if (authStatus === "OTP_SUCCESS") {
      showToast({ message: "Login success", type: "success" });
      closeModal();
    } else if (authStatus === "OTP_FAILED") {
      showToast({ message: "Invalid OTP", type: "error" });
    }
  }, [authStatus, closeModal, showToast]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      {!otpOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black cursor-pointer"
          >
            <RxCross1 className="text-black" />
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign in to continue your luxury shopping experience.
          </p>

          {/* Email / Mobile Toggle */}
          <div className="flex border border-black rounded-md p-1 mb-4">
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 text-sm font-medium rounded transition ${
                loginMethod === "email"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("mobile")}
              className={`flex-1 py-2 text-sm font-medium rounded transition ${
                loginMethod === "mobile"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Mobile
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSignin}>
            {/* Email or Mobile */}
            <div>
              <label className="text-sm text-gray-600">
                {loginMethod === "email" ? "Email Address" : "Mobile Number"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                {loginMethod === "email" ? (
                  <IoMdMail className="absolute left-3 top-3 text-gray-400" />
                ) : (
                  <FaMobileAlt className="absolute left-3 top-3 text-gray-400" />
                )}
                <input
                  type={loginMethod === "email" ? "email" : "tel"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={
                    loginMethod === "email"
                      ? "shinchan@gmail.com"
                      : "+91 9876543210"
                  }
                  className="w-full border border-gray-300 text-black rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 text-black rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
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
            </div>

            {/* Forgot Password & OTP Login Links */}
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                className="text-black underline hover:no-underline"
              >
                Forgot password?
              </button>
              <button
                type="button"
                onClick={handleOTPClick}
                className="text-black underline hover:no-underline"
              >
                Login with OTP
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-black active:bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-800 transition cursor-pointer mt-4"
            >
              Sign In
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
            <span className="text-sm font-medium text-black">
              Continue with Google
            </span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={switchToSignup}
              className="text-black font-semibold underline cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>
      ) : (
        <OTPModal
          onClose={closeModal}
          onBackToSignin={() => setOtpOpen(false)}
        />
      )}
    </div>
  );
};

export default SigninModal;
