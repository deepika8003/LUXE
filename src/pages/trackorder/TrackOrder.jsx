import React from "react";
import { IoMdSearch } from "react-icons/io";
import { IoPrintOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LuCreditCard } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiHackthebox } from "react-icons/si";
const TrackOrder = () => {
  return (
    <section className="px-10  py-26 w-full bg-gray-50 min-h-screen">
      <div className=" max-w-7xl mx-auto ">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-1">
            Track Your Order
          </h1>
          <p className="text-gray-500">
            Enter your order details and check the current status
          </p>
        </div>
        {/* FIND ORDER & SUMMARY */}
        <div className="md:flex justify-between gap-5 w-full my-10">
          {/* FIND ORDER */}
          <div className="p-5 md:w-[50%] bg-white border border-gray-200 rounded-xl">
            <div className="my-2">
              <h2 className="text-black font-bold text-lg mb-1">
                Find Your Order
              </h2>
              <p className="text-gray-500 text-sm">
                Enter your order ID and email address to track your order
              </p>
            </div>

            <div className="sm:flex justify-between gap-5 mt-4 mb-2 w-full">
              <div className="sm:w-[50%]">
                <label className="text-black font-bold">Order ID</label>
                <input
                  type="text"
                  placeholder="AG-2026-7808"
                  className="bg-gray-100 px-4 py-3 mt-2 w-full rounded-md outline-none text-sm"
                />
              </div>

              <div className="sm:w-[50%] mt-4 sm:mt-0">
                <label className="text-black font-bold">Email Address</label>
                <input
                  type="email"
                  placeholder="mystery@gmail.com"
                  className="bg-gray-100 px-4 py-3 mt-2 w-full rounded-md outline-none text-sm"
                />
              </div>
            </div>

            <button className="w-full bg-black text-white py-2.5 mt-5 rounded-md flex items-center justify-center gap-2">
              <IoMdSearch />
              Track Order
            </button>
          </div>

          {/* Order Summary */}
          <div className="mt-5 md:mt-0 sm:flex justify-between items-center md:w-[50%] p-5 bg-white border border-gray-200 rounded-xl">
            <div>
              <div className="flex gap-4 items-center mb-1">
                <h2 className="text-black font-bold">Order AG-2026-7808</h2>
                <span className="text-xs bg-orange-400 text-white px-2 py-1 rounded-md">
                  Shipped
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Placed on January 30, 2026
              </p>
            </div>

            <div className="flex gap-2 mt-5  sm:mt-0">
              <button className="flex items-center gap-2 py-1 border border-gray-200 px-4 rounded-md">
                <MdOutlineFileDownload />
                Invoice
              </button>

              <button className="flex items-center gap-2 py-1 border border-gray-200 px-4 rounded-md">
                <IoPrintOutline />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* DELIVERY PROGRESS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-black mb-1">Delivery Progress</h3>
          <p className="text-sm text-gray-500 mb-10">
            Estimated delivery: 2024-01-20
          </p>

          <div className="relative">
            {/* Progress bar */}
            <div className="w-full h-[7px] bg-gray-200 mb-6 relative rounded-2xl">
              <div
                className="h-full
                bg-black rounded-2xl"
                style={{ width: "75%" }}
              ></div>
            </div>

            {/* Steps */}
            <div className="flex justify-between">
              {[
                { name: "Ordered", date: "Jan 15", completed: true },
                { name: "Confirmed", date: "Jan 15", completed: true },
                { name: "Shipped", date: "Jan 17", completed: true },
                { name: "Delivered", date: "Jan 20", completed: false },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center w-1/4">
                  {step.completed ? (
                    <div className="w-10 h-10 flex rounded-full items-center justify-center  bg-green-400">
                      <IoMdCheckmarkCircleOutline className="text-white text-xl " />
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex rounded-full items-center justify-center  bg-gray-300">
                      <SiHackthebox className="text-black text-xl " />
                    </div>
                  )}

                  <p className="text-sm text-black mt-3">{step.name}</p>

                  <p className="text-xs text-gray-500">{step.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SHIPPING & PAYMENT */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-3">
              <IoLocationOutline className="font-bold" />
              Shipping Address
            </h3>
            <p className="text-sm tex-black leading-6">
              <span className="font-bold"> Shin chan</span> <br />
              kasukabe city
              <br />
              Saitama Prefecture <br />
              Japan <br />
              <span className="text-gray-500"> +81 48 4567 8789</span>
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold mb-4  flex items-center gap-3">
              <LuCreditCard className="font-bold" />
              Payment Method
            </h3>
            <p className="text-sm text-black font-bold">Credit Card</p>
            <p className="text-gray-500 text-sm leading-6">
              Ending in ****4242 <br />
              Total $8080.00
            </p>
          </div>
        </div>

        {/* HELP SECTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <h3 className="font-bold text-lg mb-2">Need Help with Your Order?</h3>
          <p className="text-gray-500 text-sm mb-6">
            Our support team is here to help you
          </p>

          <div className="flex justify-center gap-4">
            <button className="border border-gray-300 px-5 py-2 rounded-md active:bg-black active:text-white">
              Contact Support
            </button>
            <button className="border border-gray-300 px-5 py-2 rounded-md  active:bg-black active:text-white">
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
