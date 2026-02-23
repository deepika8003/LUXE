import React from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";
import { PiFilesBold } from "react-icons/pi";
import { TiUser } from "react-icons/ti";




const Analytics = () => {
    const analyticsData = [
        {
            id: 1,
            title: "Total Sales",
            amount: 452863,
            percentage: 5.4,
            description: "Increase total sales by 5.4% from last month",
            icons: <IoMdTrendingUp />,
        },
        {
            id: 2,
            title: "Total Profits",
            amount: 257912,
            percentage: 3.7,
            description: "Increase total profits by 3.7% from last month",
            icons: <FaMoneyCheckDollar />,
        },
        {
            id: 3,
            title: "Total Orders",
            amount: 5382,
            percentage: -6.3,
            description: "Decrease total orders by 6.3% from last month",
            icons: <FaClipboardList />,
        },
    ];


    return (
        <div className="">
            {/* cards */}
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {analyticsData.map((card, index) => {
                    const isPositive = card.percentage >= 0;

                    // Icon Color Logic based on index
                    const iconStyles = [
                        "bg-purple-100 text-purple-600",
                        "bg-orange-100 text-orange-500",
                        "bg-green-100 text-green-600",
                    ];

                    return (
                        <div
                            key={card.id}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            {/* Title + Icon */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${iconStyles[index]}`}
                                >
                                    <span className="text-lg">
                                        {card.icons}
                                    </span>
                                </div>

                                <h3 className="text-black font-bold">
                                    {card.title}
                                </h3>
                            </div>

                            {/* Amount + Percentage */}
                            <div className="flex items-center gap-3 mb-3">
                                <p className="text-2xl font-semibold text-black">
                                    ${card.amount.toLocaleString()}
                                </p>

                                <span
                                    className={`text-xs px-2 py-1 rounded-full font-medium ${isPositive
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-500"
                                        }`}
                                >
                                    {isPositive ? "+" : ""}
                                    {card.percentage}%
                                </span>
                            </div>

                            <p className="text-sm text-gray-500">
                                {card.description}
                            </p>
                        </div>
                    );
                })}

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">

                {/* Sales Performance */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                    <h1 className="text-black font-bold mb-1">Sales Performance</h1>
                    <p className="text-sm text-gray-500">You can see monthly sales volume form here</p>
                    <div>

                    </div>
                </div>

                {/* View Insights */}
                <div className="space-y-6">

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h1 className="text-black font-bold mb-1">View Insights</h1>
                        <p className="text-sm text-gray-500"> There are more to view</p>
                        <div className="mt-5 space-y-4">

                            {/* Order Complete Ratio */}
                            <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3">

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm">
                                        <BsBarChartFill className="text-black text-sm" />
                                    </div>
                                    <span className="text-black font-medium">
                                        Order complete ratio
                                    </span>
                                </div>

                                <IoChevronForward className="text-black" />
                            </button>

                            {/* Invoice Analysis */}
                            <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3">

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm">
                                        <PiFilesBold className="text-black text-sm" />
                                    </div>
                                    <span className="text-black font-medium">
                                        Invoice analysis
                                    </span>
                                </div>

                                <IoChevronForward className="text-black" />
                            </button>

                        </div>

                        <p className="mt-4 flex gap-3">Insight craeted by <span className="w-7 h-7 flex items-center justify-center bg-green-300 rounded-full">  <TiUser className="text-black" /></span></p>

                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="text-center">
                            <h1 className="text-black font-bold mb-2">Explore More</h1>
                            <p className="text-sm text-gray-500 mb-2"> It transform data into a strategic asset, allowing you to stay ahead in revenue generation, team optimization, and project delivery</p>
                            <button className="bg-black hover:bg-gray-800 text-white w-1/2 md:w-full py-1.5 rounded-sm mt-5">Upgrade</button>
                        </div>
                    </div>

                </div>
            </div>




        </div>
    );
};

export default Analytics;