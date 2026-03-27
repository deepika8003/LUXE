"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "@/redux/orderSlice";
import { IoMdSearch, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPrintOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuCreditCard } from "react-icons/lu";
import { SiHackthebox } from "react-icons/si";
import { BsTruck } from "react-icons/bs";

const TrackOrder = () => {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.orders);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const order = orders.find((o) => o.id == id);
  if (!order) return <p>Order not found</p>;

  const itemId = searchParams.get("itemId");

  const rawItems = itemId
    ? order.items.filter((item) => String(item.id) === String(itemId))
    : order.items;
  const orderItems = rawItems.map((item) => ({
    ...item,
    qty: item.qty ?? 1,
    price: item.price ?? 0,
    color: item.color ?? "N/A",
    storage: item.storage ?? "",
  }));

  const address = order.address;

  // Order date and dynamic status calculation
  const orderDate = new Date(order.date);
  const today = new Date();
  const diffDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

  let autoStatus = "Processing";
  if (diffDays >= 2 && diffDays < 7) autoStatus = "Shipped";
  if (diffDays >= 7) autoStatus = "Delivered";

  // Progress steps mapping
  const statusSteps = {
    Processing: 1,
    Shipped: 3,
    Delivered: 4,
  };
  const currentStep = statusSteps[autoStatus] || 1;
  const progressWidth = (currentStep / 4) * 100;

  // Delivery date 7 days after order
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 7);

  const stepDates = [
    orderDate, // Ordered (Day 0)
    new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000),
    new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000),
    deliveryDate,
  ];

  // Timeline steps
  const timelineSteps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been received",
      date: stepDates[0],
    },
    {
      id: 2,
      title: "Order Confirmed",
      description: "We've confirmed your order",
      date: stepDates[1],
    },
    {
      id: 3,
      title: "Order Processed",
      description: "Your items are being prepared",
      date: stepDates[2],
    },
    {
      id: 4,
      title: "Shipped",
      description: "Your order is on the way",
      date: stepDates[2],
    },
    {
      id: 5,
      title: "Delivered",
      description: "Expected delivery",
      date: stepDates[3],
    },
  ];

  // Sync order status with Redux
  useEffect(() => {
    if (order.status !== autoStatus) {
      dispatch(updateOrderStatus({ id: order.id, status: autoStatus }));
    }
  }, [autoStatus, order.id, order.status, dispatch]);

  // Calculate totals
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">
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
              <h2 className="text-black font-bold text-lg md:text-xl  mb-1">
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

            <button className="w-full cursor-pointer bg-black text-white py-2.5 mt-5 rounded-md flex items-center justify-center gap-2">
              <IoMdSearch />
              Track Order
            </button>
          </div>

          {/* Order Summary */}
          <div className="mt-5 lg:mt-0 sm:flex justify-between items-center lg:w-[50%] p-5 bg-white border shadow-sm border-gray-200 rounded-xl">
            <div>
              <div className="flex gap-4 items-center mb-1">
                <h2 className="text-black text-lg md:text-xl font-bold">
                  Order {order.id}
                </h2>
                <span className="text-xs bg-orange-400 text-white px-2 py-1 rounded-md">
                  {autoStatus}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Placed on {orderDate.toDateString()}
              </p>
            </div>

            <div className="flex gap-2 mt-5  sm:mt-0">
              <button className="flex cursor-pointer hover:bg-gray-200 text-black items-center gap-2 py-1 border border-gray-200 px-4 rounded-md  active:bg-black active:text-white">
                <MdOutlineFileDownload className="" />
                Invoice
              </button>

              <button className="flex cursor-pointer hover:bg-gray-200 items-center text-black gap-2 py-1 border border-gray-200 px-4 rounded-md active:bg-black active:text-white">
                <IoPrintOutline className="" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* DELIVERY PROGRESS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 -mt-5 mb-6  shadow-sm">
          <h3 className="font-bold text-lg md:text-xl text-black mb-1">
            Delivery Progress
          </h3>
          <p className="text-sm text-gray-500 mb-10">
            Estimated delivery: {deliveryDate.toDateString()}
          </p>

          <div className="relative">
            {/* Progress bar */}
            <div className="w-full h-[7px] bg-gray-200 mb-6 relative rounded-2xl">
              <div
                className="h-full bg-black rounded-2xl"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>

            {/* Steps */}
            <div className="flex justify-between">
              {[
                {
                  name: "Ordered",
                  date: stepDates[0],
                  completed: currentStep >= 1,
                },
                {
                  name: "Confirmed",
                  date: stepDates[1],
                  completed: currentStep >= 2,
                },
                {
                  name: "Shipped",
                  date: stepDates[2],
                  completed: currentStep >= 3,
                },
                {
                  name: "Delivered",
                  date: stepDates[3],
                  completed: currentStep >= 4,
                },
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

                  <p className="text-sm sm:text-md text-black mt-3">
                    {step.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {step.date.toDateString()}
                  </p>
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
                    className={`text-md md:text-lg font-bold ${
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
                  {step.date.toDateString()}
                </span>
              </div>
            );
          })}
        </div>

        {/* TRACKING INFORMATION */}
        <div className="my-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className=" text-lg md:text-xl font-bold text-black mb-6">
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
                  <h4 className="text-md font-semibold text-black">FedEx</h4>
                  <p className="text-sm md:text-sm text-gray-500 mt-1">
                    Tracking #: 7890867544678
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-black">Status</h4>
                <span className="inline-block mt-2 text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {autoStatus === "Delivered" ? "Delivered" : "In transit"}
                </span>
              </div>

              <div>
                <h4 className="text-md font-semibold text-black">
                  Estimated Delivery
                </h4>
                <p className="text-sm md:text-sm text-gray-600 mt-1">
                  {deliveryDate.toDateString()}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6 w-[50%]">
              <div>
                <h4 className="text-md font-semibold text-black">
                  Last Update
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Package departed from facility in NEW YORK, NY
                </p>
                <span className="text-sm text-gray-400 block mt-1">
                  {stepDates[currentStep - 1]?.toLocaleString() || "N/A"}
                </span>
              </div>

              <div>
                <h4 className="text-md font-semibold text-black">
                  Last Location
                </h4>
                <p className="text-sm text-gray-600 mt-1">NEW YORK, NY</p>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg md:text-xl font-bold text-black mb-6">
            Order Items
          </h2>

          {orderItems.length === 0 ? (
            <p className="text-gray-500">No items found for this order.</p>
          ) : (
            <>
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
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div>
                      <h4 className=" text-md md:text-lg font-semibold text-black">
                        {item.title}
                      </h4>

                      <p className="text-sm md:text-md  text-gray-500 mt-1">
                        Color: {item.color}
                        {item.storage && ` Storage: ${item.storage}`}
                        Qty: {item.qty}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right">
                    <p className="text-sm md:text-md  font-semibold text-black">
                      ${item.price.toFixed(2)}
                    </p>
                    <span className="text-sm md:text-md  text-gray-500">
                      ${(item.price * item.qty).toFixed(2)} total
                    </span>
                  </div>
                </div>
              ))}

              {/* FOOTER */}
              <div className="flex justify-between items-center pt-6 border-t border-[#e0e0e0]">
                <p className="text-sm md:text-md  text-gray-500">
                  {totalItems} items
                </p>

                <p className="text-sm md:text-md  font-semibold text-gray-500">
                  Total: ${grandTotal.toFixed(2)}
                </p>
              </div>
            </>
          )}
        </div>

        {/* SHIPPING & PAYMENT */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-3 text-lg md:text-xl text-black">
              <IoLocationOutline className="font-bold text-black" />
              Shipping Address
            </h3>
            {address ? (
              <p className="text-sm md:text-md text-black leading-6">
                <span className="font-bold">{address.name}</span> <br />
                {address.street} <br />
                {address.city}, {address.region} <br />
                {address.country} - {address.postal} <br />
                <span className="text-gray-500">{address.phone}</span>
              </p>
            ) : (
              <p className="text-red-500 text-sm">Address not found</p>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 text-black text-lg md:text-xl  flex items-center gap-3">
              <LuCreditCard className="font-bold" />
              Payment Method
            </h3>
            <p className="text-md text-black font-bold">Credit Card</p>
            <p className="text-gray-500 text-sm md:text-md leading-6">
              Ending in ****4242 <br />
              Total $8080.00
            </p>
          </div>
        </div>

        {/* HELP SECTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <h3 className="font-bold text-lg md:text-xl mb-2 text-black">
            Need Help with Your Order?
          </h3>
          <p className="text-gray-500 text-sm md:text-md mb-6">
            Our support team is here to help you
          </p>

          <div className="flex flex-col  sm:flex-row  sm:flex justify-center gap-4">
            <button className="border cursor-pointer hover:bg-gray-200 text-black text-sm sm:text-md border-gray-300 px-5 py-2 rounded-md active:bg-black active:text-white">
              Contact Support
            </button>
            <button className="border cursor-pointer hover:bg-gray-200 text-black text-sm sm:text-md border-gray-300 px-5 py-2 rounded-md  active:bg-black active:text-white">
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
