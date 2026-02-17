"use client";
import React from "react";
import { IoMdSearch, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPrintOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuCreditCard } from "react-icons/lu";
import { SiHackthebox } from "react-icons/si";
import { BsTruck } from "react-icons/bs";

import { useState } from "react";

const TrackOrder = () => {
  const timelineSteps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been received",
      date: "2024-01-15, 10:30 AM",
    },
    {
      id: 2,
      title: "Order Confirmed",
      description: "We've confirmed your order",
      date: "2024-01-15, 11:45 AM",
    },
    {
      id: 3,
      title: "Order Processed",
      description: "Your items are being prepared for shipment",
      date: "2024-01-16, 09:15 AM",
    },
    {
      id: 4,
      title: "Shipped",
      description: "Your order is on the way",
      date: "2024-01-17, 02:30 PM",
    },
    {
      id: 5,
      title: "Delivered",
      description: "Expected delivery",
      date: "2024-01-20",
    },
  ];
  const [currentStep, setCurrentStep] = useState(3);

  const orderItems = [
    {
      id: 1,
      title: "Tan Leather Structured Handbag",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCd-a8CTigA31Y7IXeIOsjLxTEQemi0DLysgX3O1VbppzoddGlcUoxBv9xppfgFWsZhbcoR6kg159PMhox7bOpZ03M5Iti5CAc9IauMza5nikPXFKUL9PG2BMPFrIdpRNrvqdaet-YArEeN_WmNLXMlhVQY2wc74BPkxyB5r9ldN4SZuMtFGo6ROrt9y3pBZgGr9jm0n3WRkiS4InS2EMPM7ULK8rg0VAvlrOm9Wx-kYYZq4ekPVPeDSBKDvCZyOJw7x-9LQgonDac",
      color: "Natural Titanium",
      storage: "null",
      qty: 1,
      price: 1199.0,
    },
    {
      id: 2,
      title: "White Cotton Button-Down Shirt",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUtjfQ10jwehXkcpLnxXaE6TvnZFHvmgbhTqvN_SXmmdeSruS15OomGGFDe5led_XYN24rucRb1oWId0He6LcrfVvYzxIUrcOAJ3NqshUL4XHp82kgcMVVHvAld2rYu56qTFlUWPq0mHaj0Ify9TbNs4qOXhvSs4mMC9cYMnJzBkMUQ6e3GUZ58E2v0qfWFby2NFh1jX1MRFC8lbYnobMQBjhfP1NUnsXu7hLxfgwJunGkv4ItF-saIQpDZsY0t2xSRJvUL3UgP_E",
      color: "White",
      storage: null,
      qty: 2,
      price: 249.0,
    },
  ];
  const totalItems = orderItems.reduce((acc, item) => acc + item.qty, 0);

  const grandTotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <section className="w-full bg-gray-50 min-h-screen py-26">
      <div className=" max-w-7xl mx-auto px-6 ">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-black mb-1">
            Track Your Order
          </h1>
          <p className="text-sm md:text-xl text-gray-500">
            Enter your order details and check the current status
          </p>
        </div>
        {/* FIND ORDER & SUMMARY */}
        <div className="lg:flex justify-between gap-5 w-full my-10">
          {/* FIND ORDER */}
          <div className="p-5 lg:w-[50%] bg-white border border-gray-200 rounded-xl shadow-sm">
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
                  className="bg-gray-100 px-4 py-3 mt-2 w-full text-black rounded-md outline-none text-sm"
                />
              </div>

              <div className="sm:w-[50%] mt-4 sm:mt-0">
                <label className="text-black font-bold">Email Address</label>
                <input
                  type="email"
                  placeholder="mystery@gmail.com"
                  className="bg-gray-100 px-4 py-3 mt-2 text-black w-full rounded-md outline-none text-sm"
                />
              </div>
            </div>

            <button className="w-full bg-black text-white py-2.5 mt-5 rounded-md flex items-center justify-center gap-2">
              <IoMdSearch />
              Track Order
            </button>
          </div>

          {/* Order Summary */}
          <div className="mt-5 lg:mt-0 sm:flex justify-between items-center lg:w-[50%] p-5 bg-white border shadow-sm border-gray-200 rounded-xl">
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
              <button className="flex text-black items-center gap-2 py-1 border border-gray-200 px-4 rounded-md  active:bg-black active:text-white">
                <MdOutlineFileDownload className="" />
                Invoice
              </button>

              <button className="flex items-center text-black gap-2 py-1 border border-gray-200 px-4 rounded-md active:bg-black active:text-white">
                <IoPrintOutline className="" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* DELIVERY PROGRESS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 -mt-5 mb-6  shadow-sm">
          <h3 className="font-bold text-black mb-1">Delivery Progress</h3>
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
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex rounded-full items-center justify-center  bg-green-400">
                      <IoMdCheckmarkCircleOutline className="text-white text-md sm:text-xl " />
                    </div>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex rounded-full items-center justify-center  bg-gray-300">
                      <SiHackthebox className="text-black text-xl text-md sm:text-xl " />
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-black mt-3">
                    {step.name}
                  </p>

                  <p className="text-xs  text-gray-500">{step.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ORDER TIMELINE */}
        <div className="bg-white border border-gray-200 rounded-xl p-6  mb-6  shadow-sm ">
          {timelineSteps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep - 1;

            return (
              <div key={step.id} className="relative pl-12 pb-10">
                {index !== timelineSteps.length - 1 && (
                  <div
                    className={`absolute left-4 top-6 h-full w-[2px] ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}

                <div
                  className={`absolute left-0 top-0 w-8 h-8 flex items-center justify-center rounded-full ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <IoMdCheckmarkCircleOutline className="text-lg" />
                  ) : (
                    <SiHackthebox className="text-lg" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-semibold ${
                      isCompleted ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h4>

                  {isCurrent && (
                    <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mt-1">{step.description}</p>

                <span className="text-xs text-gray-400 mt-1 block">
                  {step.date}
                </span>
              </div>
            );
          })}
        </div>

        {/* TRACKINGN INFORMATION */}

        <div className="my-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-md md:text-lg font-bold text-black mb-6">
            Tracking Information
          </h2>

          <div className=" w-full flex flex-col sm:flex-row justify-start gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-6 w-[50%]">
              <div className="flex  gap-3 items-center">
                <div>
                  <BsTruck className="text-black text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black">FedEx</h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Tracking #: 7890867544678
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-black">Status</h4>
                <span className="inline-block mt-2 text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  In transit
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-black">
                  Estimated Delivery
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  February 20, 2026
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6 w-[50%]">
              <div>
                <h4 className="text-sm font-semibold text-black">
                  Last Update
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  Package departed from facility in NEW YORK, NY
                </p>
                <span className="text-xs text-gray-400 block mt-1">
                  1/17/2026, 2:30:00 PM
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-black">
                  Last Location
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  NEW YORK, NY
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-md md:text-lg font-semibold text-black mb-6">
            Order Items
          </h2>

          {orderItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex justify-between items-start ${
                index !== orderItems.length - 1
                  ? "pb-6 border-b border-gray-200"
                  : "py-6"
              }`}
            >
              {/* LEFT SIDE */}
              <div className="flex gap-4">
                <div className="w-10 h-10 ms:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h4 className=" text-xs md:text-sm font-semibold text-black">
                    {item.title}
                  </h4>

                  <p className="text-xs md:text-sm  text-gray-500 mt-1">
                    Color: {item.color}
                    {item.storage && `  Storage: ${item.storage}`}
                    Qty: {item.qty}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <p className="text-xs md:text-sm  font-semibold text-black">
                  ${item.price.toFixed(2)}
                </p>
                <span className="text-xs md:text-sm  text-gray-500">
                  ${(item.price * item.qty).toFixed(2)} total
                </span>
              </div>
            </div>
          ))}

          {/* FOOTER */}
          <div className="flex justify-between items-center pt-6 border-t border-[#e0e0e0]">
            <p className="text-xs md:text-sm  text-gray-500">
              {totalItems} items
            </p>

            <p className="text-xs md:text-sm  font-semibold text-gray-500">
              Total: ${grandTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* SHIPPING & PAYMENT */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-3 text-md md:text-lg text-black">
              <IoLocationOutline className="font-bold text-black" />
              Shipping Address
            </h3>
            <p className="text-xs md:text-sm tex-black  leading-6">
              <span className="font-bold text-black"> Shin chan</span> <br />
              kasukabe city
              <br />
              Saitama Prefecture <br />
              Japan <br />
              <span className="text-gray-500 "> +81 48 4567 8789</span>
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 text-black text-md md:text-lg  flex items-center gap-3">
              <LuCreditCard className="font-bold" />
              Payment Method
            </h3>
            <p className="text-sm text-black font-bold">Credit Card</p>
            <p className="text-gray-500 text-xs md:text-sm leading-6">
              Ending in ****4242 <br />
              Total $8080.00
            </p>
          </div>
        </div>

        {/* HELP SECTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <h3 className="font-bold text-md md:text-lg mb-2 text-black">
            Need Help with Your Order?
          </h3>
          <p className="text-gray-500 text-xs md:text-sm mb-6">
            Our support team is here to help you
          </p>

          <div className="flex flex-col sm:flex-row  sm:flex justify-center gap-4">
            <button className="border text-black text-sm sm:text-md border-gray-300 px-5 py-2 rounded-md active:bg-black active:text-white">
              Contact Support
            </button>
            <button className="border text-black text-sm sm:text-md border-gray-300 px-5 py-2 rounded-md  active:bg-black active:text-white">
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
