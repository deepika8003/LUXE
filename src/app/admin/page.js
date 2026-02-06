"use client";

import React, { useState } from "react";
import AdminProduct from "@/pages/AdminPage/AdminProduct";
import SideBar from "@/pages/AdminPage/SideBar";
import TopBar from "@/pages/AdminPage/TopBar";

const Page = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/*SIDE BAR*/}
            <div
                className={`fixed z-50 inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <SideBar />
            </div>


            <div className="flex-1 flex flex-col lg:ml-64 h-screen overflow-hidden">
                {/* TOP BAR */}
                <div className="sticky top-0 z-30">
                    <TopBar onMenuClick={() => setSidebarOpen(true)} />
                </div>

                {/* CONTENT AREA */}
                <main className="flex-1 overflow-y-auto p-6">
                    <AdminProduct />
                </main>
            </div>
        </div>
    );
};

export default Page;