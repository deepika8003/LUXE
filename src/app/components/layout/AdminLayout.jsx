"use client";

import React, { useState } from "react";
import SideBar from "../AdminPage/SideBar";
import TopBar from "../AdminPage/TopBar";

const AdminLayout = ({ children, onAddProductClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        <div className="sticky top-0 z-30">
          <TopBar
            onMenuClick={() => setSidebarOpen(true)}
            onAddProductClick={onAddProductClick}
          />
        </div>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
