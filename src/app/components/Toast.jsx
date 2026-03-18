"use client";
import React from "react";

const Toast = ({ message, type }) => {
  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-4 py-3 rounded-lg shadow-lg text-white ${
          type === "success"
            ? "bg-blue-600"
            : type === "info"
              ? "bg-blue-500"
              : "bg-red-500"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
