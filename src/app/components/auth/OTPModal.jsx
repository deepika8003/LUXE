"use client";
// redux
import { useDispatch } from "react-redux";
import { verifyOTP } from "@/redux/authSlice";
// react state
import React, { useState, useRef, useEffect } from "react";

// react icons
import { RxCross1 } from "react-icons/rx";
import { RiShieldCheckFill } from "react-icons/ri";
import { IoMdMail, IoMdPhonePortrait } from "react-icons/io";

const OTPModal = ({
  onClose,
  onBackToSignin,
  method = "email",
  identifier = "shin***@gmail.com",
}) => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(28);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    if (canResend) {
      setTimer(28);
      setCanResend(false);
    }
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // take last character
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const digits = pasteData.split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      // Focus the next empty or last input
      const lastIndex = Math.min(digits.length, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleVerify = () => {
    dispatch(verifyOTP(otp.join("")));
    onClose();
  };
  return (
    <div className=" flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <RxCross1 className="text-black" />
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          LUXE
        </h1>
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Verify Your Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          {method === "email" ? <IoMdMail /> : <IoMdPhonePortrait />}
          <span>
            Enter the 6‑digit OTP sent to
            <span className="font-medium text-gray-700">{identifier}</span>
          </span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>

        {/* Resend & Timer */}
        <div className="flex items-center justify-between text-sm mb-6">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-black font-medium underline hover:no-underline"
            >
              Resend Code
            </button>
          ) : (
            <span className="text-gray-400">Resend OTP in {timer}s</span>
          )}
          {/* Change Email / Mobile */}
          <button
            onClick={onBackToSignin}
            className="text-black underline hover:no-underline"
          >
            Change Email / Mobile
          </button>
        </div>

        {/* Verify Button */}
        <button
          disabled={otp.join("").length !== 6}
          onClick={handleVerify}
          className={`w-full py-3 rounded-md font-medium transition cursor-pointer ${
            otp.join("").length === 6
              ? "bg-black text-white hover:bg-gray-900"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Verify OTP
        </button>

        {/* Secure encryption footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
          <RiShieldCheckFill />
          <span>SECURE 256-BIT ENCRYPTION</span>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
