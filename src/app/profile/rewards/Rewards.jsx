"use client";
import React from "react";
import {
  FaStar,
  FaMedal,
  FaGift,
  FaChartLine,
  FaShippingFast,
  FaHeadset,
} from "react-icons/fa";

const Rewards = () => {
  // TOP CARDS DATA
  const topCards = [
    {
      title: "LIVE BALANCE",
      value: "12,450",
      subtitle: "TOTAL REWARD POINTS",
      bg: "bg-blue-600 text-white",
      icon: <FaStar />,
    },
    {
      title: "TIER LEVEL",
      value: "Platinum",
      subtitle: "ELITE MEMBERSHIP",
      bg: "bg-white",
      icon: <FaMedal />,
    },
    {
      title: "ACTIVE PERKS",
      value: "04",
      subtitle: "AVAILABLE COUPONS",
      bg: "bg-white",
      icon: <FaGift />,
    },
    {
      title: "ACCOUNT VALUE",
      value: "45,000",
      subtitle: "LIFETIME POINTS",
      bg: "bg-white",
      icon: <FaChartLine />,
    },
  ];

  //  PRIVILEGES DATA
  const privileges = [
    {
      title: "Early Access",
      desc: "Shop seasonal collections and limited edition collaborations 24 hours before public release.",
      icon: <FaStar />,
    },
    {
      title: "Free Shipping",
      desc: "Complimentary express shipping on all domestic and international orders, no minimum required.",
      icon: <FaShippingFast />,
    },
    {
      title: "VIP Support",
      desc: "Dedicated concierge available via secure line for styling advice and order management.",
      icon: <FaHeadset />,
    },
  ];

  return (
    <div className="bg-gray-100">
      <section className="max-w-7xl min-h-screen mx-auto pt-26 pb-10 px-6">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Welcome back, Julianne Moore
          </h1>
          <p className="text-gray-500 mt-2">
            Track and enjoy your exclusive rewards and benefits from our curated
            atelier.
          </p>
        </div>

        {/*  TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {topCards.map((card, i) => (
            <div
              key={i}
              className={`${card.bg} rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300`}
            >
              <div className="flex justify-between items-center mb-3">
                <p
                  className={`text-xs tracking-widest ${card.bg.includes("blue") ? "text-blue-100" : "text-gray-400"}`}
                >
                  {card.title}
                </p>
                <span
                  className={`text-lg ${card.bg.includes("blue") ? "text-white" : "text-gray-400"}`}
                >
                  {card.icon}
                </span>
              </div>

              <h2
                className={`text-3xl font-bold ${card.bg.includes("blue") ? "text-white" : "text-gray-800"}`}
              >
                {card.value}
              </h2>

              <p
                className={`text-xs mt-2 ${card.bg.includes("blue") ? "text-blue-100" : "text-gray-500"}`}
              >
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* PROGRESS */}
          <div className="bg-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800">
              Next Tier Progress
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Elevate to Diamond tier for worldwide concierge
            </p>

            <div className="mt-6">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-600 h-2 rounded-full w-[75%]"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>750 POINTS EARNED</span>
                <span>1,000 NEXT MILESTONE</span>
              </div>
            </div>

            <p className="text-blue-600 font-semibold text-right mt-3">75%</p>
          </div>

          {/* HISTORY */}
          <div className=" rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Rewards History
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Silk Evening Gown Purchase
                  </p>
                  <p className="text-xs text-gray-500">October 24, 2023</p>
                </div>
                <p className="text-blue-600 font-semibold text-sm">
                  +1,200 pts
                </p>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Birthday Bonus Gift
                  </p>
                  <p className="text-xs text-gray-500">October 12, 2023</p>
                </div>
                <p className="text-blue-600 font-semibold text-sm">+500 pts</p>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Referral: Sarah Jenkins
                  </p>
                  <p className="text-xs text-gray-500">September 28, 2023</p>
                </div>
                <p className="text-blue-600 font-semibold text-sm">
                  +2,000 pts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  PRIVILEGES */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Your Platinum Privileges
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privileges.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                {/* ICON BOX */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-blue-600 text-lg mb-4">
                  {item.icon}
                </div>

                {/* TITLE */}
                <h4 className="font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>

                {/* DESC */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-12">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
            REDEEM REWARDS
          </button>
          <button className="border border-black px-6 py-3 rounded-md font-medium hover:bg-black hover:text-white transition">
            EXPLORE OFFERS
          </button>
        </div>
      </section>
    </div>
  );
};

export default Rewards;
