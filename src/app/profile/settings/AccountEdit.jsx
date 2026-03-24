"use client";

import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const AccountEdit = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    name: "Julian Thorne",
    email: "julian.thorne@luxe-ate",
    phone: "+1 (555) 892-0431",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className=" bg-gray-100">
      <div className="mt-20 py-10 max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-10">
          Account Settings
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* LEFT SIDE  */}
          <div className="lg:col-span-3 ">
            {/* Account Info */}
            <div className="bg-white p-6 md:p-8 rounded-md">
              {/* TOP */}
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-lg font-semibold">Account Information</h2>

                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="flex items-center gap-2 text-xs tracking-widest text-blue-600 hover:text-blue-800 transition"
                >
                  <FaPencilAlt />
                  {isEdit ? "CANCEL" : "EDIT DETAILS"}
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col md:flex-row gap-10">
                {/* profile img  */}
                <div>
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                    {form.name.charAt(0)}
                  </div>
                </div>

                {/* FIELDS */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  {/* NAME */}
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-400 mb-1">
                      FULL NAME
                    </p>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={!isEdit}
                      className={`w-full border rounded-md   bg-gray-50 py-1.5 px-3 outline-none transition-all duration-200
                      ${isEdit ? "border-black" : "border-black/40 text-gray-600 cursor-not-allowed "}
                    `}
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-400 mb-1">
                      EMAIL ADDRESS
                    </p>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={!isEdit}
                      className={`w-full border rounded-md   bg-gray-50 py-1.5 px-3 outline-none transition-all duration-200
                      ${isEdit ? "border-black" : "border-black/40 text-gray-600 cursor-not-allowed "}
                    `}
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-400 mb-1">
                      PHONE NUMBER
                    </p>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={!isEdit}
                      className={`w-full border rounded-md   bg-gray-50 py-1.5 px-3 outline-none transition-all duration-200
                      ${isEdit ? "border-black" : "border-black/40 text-gray-600 cursor-not-allowed "}
                    `}
                    />
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              {isEdit && (
                <div className="mt-10">
                  <button className="px-8 py-2 bg-black text-white text-xs tracking-widest hover:bg-gray-800 active:bg-gray-700 transition">
                    SAVE CHANGES
                  </button>
                </div>
              )}
            </div>

            {/* password security */}

            <div className="bg-white p-6 md:p-8 rounded-md mt-10">
              {/* TOP */}
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-lg font-semibold">Password & Security</h2>

                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="flex items-center gap-2 text-xs tracking-widest text-blue-600 hover:text-blue-800 transition"
                >
                  <FaPencilAlt />
                  {isEdit ? "CANCEL" : "EDIT PASSWORD"}
                </button>
              </div>

              {/* FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                {/* CURRENT PASSWORD */}
                <div>
                  <p className="text-[10px] tracking-widest text-gray-400 mb-1">
                    CURRENT PASSWORD
                  </p>
                  <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword || ""}
                    onChange={handleChange}
                    disabled={!isEdit}
                    className={`w-full border rounded-md bg-gray-50 py-1.5 px-3 outline-none transition-all duration-200
        ${isEdit ? "border-black" : "border-black/40 text-gray-600 cursor-not-allowed"}
      `}
                  />
                </div>

                {/* NEW PASSWORD */}
                <div>
                  <p className="text-[10px] tracking-widest text-gray-400 mb-1">
                    NEW PASSWORD
                  </p>
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword || ""}
                    onChange={handleChange}
                    disabled={!isEdit}
                    className={`w-full border rounded-md bg-gray-50 py-1.5 px-3 outline-none transition-all duration-200
        ${isEdit ? "border-black" : "border-black/40 text-gray-600 cursor-not-allowed"}
      `}
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <p className="text-[10px] tracking-widest text-gray-400 mb-1">
                    CONFIRM PASSWORD
                  </p>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword || ""}
                    onChange={handleChange}
                    disabled={!isEdit}
                    className={`w-full border rounded-md bg-gray-50 py-1.5 px-3 outline-none transition-all duration-200
        ${isEdit ? "border-black" : "border-black/40 text-gray-600 cursor-not-allowed"}
      `}
                  />
                </div>
              </div>

              {/* SAVE BUTTON */}
              {isEdit && (
                <div className="mt-10">
                  <button className="px-8 py-2 bg-black text-white text-xs tracking-widest hover:bg-gray-800 active:bg-gray-700 transition">
                    UPDATE PASSWORD
                  </button>
                </div>
              )}
            </div>

            {/* Shipping address */}

            <div className="bg-white p-6 md:p-8 rounded-md mt-10">
              {/* TOP */}
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="flex items-center gap-2 text-xs tracking-widest text-blue-600 hover:text-blue-800 transition"
                >
                  <FaPencilAlt />
                  {isEdit ? "CANCEL" : "EDIT DETAILS"}
                </button>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="font-bold">Deepika D</p>
                <p>Mariyamman kovil street</p>
                <p>Dharmapuri , Tamilnadu</p>
                <p>India - 635112</p>
                <p>Phone:9123544450</p>

                <div className="flex gap-4 mt-2">
                  <MdEdit className="cursor-pointer text-blue-600 text-lg" />

                  <MdDelete className="cursor-pointer text-red-600 text-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">
            {/* PREFERENCES  */}
            <div className="bg-white p-6 border border-gray-200">
            <h2 className="text-sm font-semibold mb-6 tracking-widest">
              PREFERENCES
            </h2>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm">Email Notifications</span>
              <input type="checkbox" className="accent-blue-600" />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">SMS Alerts</span>
              <input type="checkbox" className="accent-blue-600" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountEdit;
