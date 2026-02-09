import React, { useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineWarning } from "react-icons/ai";
import { LuClipboardCheck } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiTrendingUp, HiOutlineRefresh } from "react-icons/hi";

const products = [
  {
    id: 1,
    name: "Cashmere Overcoat",
    sku: "SG-10294",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjefRmKh9Ku3PvgSntBasogV94LwdiqA8R9C2_2nlNFaJikk5taowM4bTHAvX6euda-KAUqoUf8a_6vdo_J4ge4DlguYCdXAEwKFpauu5mD0JNhYGz_G53winsOMhOOiJDyUxMkXLeaDGzT1p55sqZW-kwL9UU2hKOCf4VWN1hrGDylrRnaRMU0ngc2bIWnIPRuzfAEBXHs4ejePYOC48a4l-VJ5UgHA78nQw8drISg0KK1-0slJxAdB1pCBdt6jjnLl_vU5xFIkc",
    category: "Apparel",
    stock: 45,
    price: 890,
    status: "Live",
  },
  {
    id: 2,
    name: "Silk Maxi Dress",
    sku: "WB-55210",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAffqwN00XAl1h8G56Fp3FL4FVgQq6265FlcgMp1XR4imu6kGs-sElH9ahoLEcgSwnBR3piVDMKMMtznRpocdlTmWhF0T9sZaCGZXR_mpWj7CBSmHem_96MI3-FJeqslO0lsqcHvxfxyzN2ypDXOO3v8IpQtYWB1A0tM06goZl8l1uj9RYt_hEO91TDXjqLp147XDhZA_gLlc0HfNzqnEagJcesiR8jRmDnqNCk8hxyiCgHLHGUikP5hdkdXPkCB5GHbNgtgpNRxv4",
    category: "Apparel",
    stock: 12,
    price: 450,
    status: "Live",
  },
  {
    id: 3,
    name: "Metier Tote Bag",
    sku: "FB-88392",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCd-a8CTigA31Y7IXeIOsjLxTEQemi0DLysgX3O1VbppzoddGlcUoxBv9xppfgFWsZhbcoR6kg159PMhox7bOpZ03M5Iti5CAc9IauMza5nikPXFKUL9PG2BMPFrIdpRNrvqdaet-YArEeN_WmNLXMlhVQY2wc74BPkxyB5r9ldN4SZuMtFGo6ROrt9y3pBZgGr9jm0n3WRkiS4InS2EMPM7ULK8rg0VAvlrOm9Wx-kYYZq4ekPVPeDSBKDvCZyOJw7x-9LQgonDac",
    category: "Footwear",
    stock: 0,
    price: 320,
    status: "Sold Out",
  },
  {
    id: 4,
    name: "Relaxed Linen Shirt",
    sku: "CS-22019",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUtjfQ10jwehXkcpLnxXaE6TvnZFHvmgbhTqvN_SXmmdeSruS15OomGGFDe5led_XYN24rucRb1oWId0He6LcrfVvYzxIUrcOAJ3NqshUL4XHp82kgcMVVHvAld2rYu56qTFlUWPq0mHaj0Ify9TbNs4qOXhvSs4mMC9cYMnJzBkMUQ6e3GUZ58E2v0qfWFby2NFh1jX1MRFC8lbYnobMQBjhfP1NUnsXu7hLxfgwJunGkv4ItF-saIQpDZsY0t2xSRJvUL3UgP_E",
    category: "Apparel",
    stock: 28,
    price: 275,
    status: "Draft",
  },
  {
    id: 5,
    name: "Leather Chelsea Boots",
    sku: "LB-33421",
    image: "https://picsum.photos/seed/p5/200",
    category: "Footwear",
    stock: 8,
    price: 520,
    status: "Live",
  },
  {
    id: 6,
    name: "Classic Wool Blazer",
    sku: "WB-66412",
    image: "https://picsum.photos/seed/p6/200",
    category: "Apparel",
    stock: 18,
    price: 610,
    status: "Live",
  },
  {
    id: 7,
    name: "Premium Denim Jacket",
    sku: "DJ-77890",
    image: "https://picsum.photos/seed/p7/200",
    category: "Apparel",
    stock: 22,
    price: 480,
    status: "Live",
  },
  {
    id: 8,
    name: "Minimal Leather Wallet",
    sku: "LW-11234",
    image: "https://picsum.photos/seed/p8/200",
    category: "Accessories",
    stock: 0,
    price: 95,
    status: "Sold Out",
  },
  {
    id: 9,
    name: "Tailored Cotton Trousers",
    sku: "CT-55678",
    image: "https://picsum.photos/seed/p9/200",
    category: "Apparel",
    stock: 14,
    price: 340,
    status: "Live",
  },
  {
    id: 10,
    name: "Suede Loafers",
    sku: "SL-90876",
    image: "https://picsum.photos/seed/p10/200",
    category: "Footwear",
    stock: 6,
    price: 390,
    status: "Draft",
  },
  {
    id: 11,
    name: "Merino Crewneck Sweater",
    sku: "MC-33490",
    image: "https://picsum.photos/seed/p11/200",
    category: "Apparel",
    stock: 25,
    price: 260,
    status: "Live",
  },
  {
    id: 12,
    name: "Structured Handbag",
    sku: "HB-77812",
    image: "https://picsum.photos/seed/p12/200",
    category: "Accessories",
    stock: 9,
    price: 720,
    status: "Live",
  },
  {
    id: 13,
    name: "Relaxed Fit Polo",
    sku: "RP-44129",
    image: "https://picsum.photos/seed/p13/200",
    category: "Apparel",
    stock: 30,
    price: 180,
    status: "Draft",
  },
  {
    id: 14,
    name: "Canvas Weekender Bag",
    sku: "WB-99341",
    image: "https://picsum.photos/seed/p14/200",
    category: "Accessories",
    stock: 4,
    price: 560,
    status: "Live",
  },
  {
    id: 15,
    name: "Formal Oxford Shirt",
    sku: "OS-22345",
    image: "https://picsum.photos/seed/p15/200",
    category: "Apparel",
    stock: 16,
    price: 210,
    status: "Live",
  },
  {
    id: 16,
    name: "Knitted Beanie",
    sku: "KB-55443",
    image: "https://picsum.photos/seed/p16/200",
    category: "Accessories",
    stock: 40,
    price: 75,
    status: "Live",
  },
  {
    id: 17,
    name: "Slim Fit Chinos",
    sku: "SC-88990",
    image: "https://picsum.photos/seed/p17/200",
    category: "Apparel",
    stock: 11,
    price: 310,
    status: "Draft",
  },
  {
    id: 18,
    name: "Luxury Silk Scarf",
    sku: "LS-44567",
    image: "https://picsum.photos/seed/p18/200",
    category: "Accessories",
    stock: 0,
    price: 150,
    status: "Sold Out",
  },
  {
    id: 19,
    name: "Running Sneakers",
    sku: "RS-77654",
    image: "https://picsum.photos/seed/p19/200",
    category: "Footwear",
    stock: 20,
    price: 420,
    status: "Live",
  },
  {
    id: 20,
    name: "Slim Leather Belt",
    sku: "LB-90211",
    image: "https://picsum.photos/seed/p20/200",
    category: "Accessories",
    stock: 27,
    price: 120,
    status: "Live",
  },
  {
    id: 21,
    name: "Quilted Winter Jacket",
    sku: "QJ-67123",
    image: "https://picsum.photos/seed/p21/200",
    category: "Apparel",
    stock: 7,
    price: 850,
    status: "Live",
  },
  {
    id: 22,
    name: "Everyday Canvas Backpack",
    sku: "CB-44519",
    image: "https://picsum.photos/seed/p22/200",
    category: "Accessories",
    stock: 0,
    price: 460,
    status: "Sold Out",
  },
  {
    id: 23,
    name: "Casual Slip-On Sneakers",
    sku: "SS-33874",
    image: "https://picsum.photos/seed/p23/200",
    category: "Footwear",
    stock: 19,
    price: 390,
    status: "Draft",
  },
  {
    id: 24,
    name: "Linen Summer Shorts",
    sku: "LS-55890",
    image: "https://picsum.photos/seed/p24/200",
    category: "Apparel",
    stock: 34,
    price: 190,
    status: "Live",
  },
];

const AdminProduct = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <section className="px-2">
      <section className="px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* TOTAL INVENTORY */}
          <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
            <div>
              <h2 className=" text-sm text-gray-500 uppercase tracking-wide">
                Total Inventory
              </h2>
              <p className="text-2xl font-semibold mt-1 text-black">12,450</p>
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                <HiTrendingUp /> +2% from last month
              </p>
            </div>
            <div className="bg-[#e7ecf5] px-3 py-4 rounded-lg">
              <LuClipboardCheck className="text-2xl text-[#1241a0]" />
            </div>
          </div>

          {/* NEW ARRIVALS */}
          <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wide">
                New Arrivals
              </h2>
              <p className="text-2xl font-semibold mt-1 text-black">328</p>
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                <HiTrendingUp /> +15% this month
              </p>
            </div>
            <div className="bg-[#d1fae5] px-3 py-4 rounded-lg">
              <RiVerifiedBadgeLine className="text-2xl text-[#059669]" />
            </div>
          </div>

          {/* ACTIVE LISTINGS */}
          <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wide">
                Active Listings
              </h2>
              <p className="text-2xl font-semibold mt-1 text-black">1,084</p>
              <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                <HiOutlineRefresh /> Current status
              </p>
            </div>
            <div className="bg-[#dbeafe] px-3 py-4 rounded-lg">
              <MdOutlineVisibility className="text-2xl text-[#2563eb]" />
            </div>
          </div>

          {/* OUT OF STOCK */}
          <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wide">
                Out of Stock
              </h2>
              <p className="text-2xl font-semibold mt-1 text-black">14</p>
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AiOutlineWarning /> Needs attention
              </p>
            </div>
            <div className="bg-[#ffe4e6] px-3 py-4 rounded-lg">
              <AiOutlineExclamationCircle className="text-2xl text-[#e11d48]" />
            </div>
          </div>
        </div>

        {/* PRODUCT CATALOG TABLE */}
        <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden">
          <div className="flex justify-between p-6 border-b border-[#e0e0e0]">
            <div>
              <h2 className="text-md font-semibold text-black">
                Product Catalog
              </h2>
            </div>
            <div className="flex justify-between gap-6 px-5">
              <button>
                <IoFilterSharp className="text-xl text-[#94a3b8] active:text-black" />
              </button>
              <button>
                <FiDownload className="text-xl text-[#94a3b8] active:text-black" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* TABLE HEADER */}
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="w-[32%] py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest">
                    PRODUCT
                  </th>
                  <th className="w-[14%] py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest">
                    CATEGORY
                  </th>
                  <th className="w-[14%] py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest">
                    STOCK
                  </th>
                  <th className="w-[12%] py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest">
                    PRICE
                  </th>
                  <th className="w-[14%] py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest">
                    STATUS
                  </th>
                  <th className="w-[14%] py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest">
                    ACTIONS
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY  */}
              <tbody>
                {currentProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e0e0e0] hover:bg-[#f8fafc]"
                  >
                    {/* PRODUCT */}
                    <td className="w-[32%] py-4 px-6 align-middle">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h2 className="text-sm md:text-md font-serif font-semibold text-black truncate">
                            {item.name}
                          </h2>
                          <span className="text-xs text-[#64748b] block truncate">
                            SKU: {item.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="w-[14%] py-4 px-6 text-sm text-[#475569] align-middle">
                      {item.category}
                    </td>

                    {/* STOCK */}
                    <td
                      className={`w-[14%] py-4 px-6 text-sm align-middle ${
                        item.stock === 0 ? "text-red-500" : "text-[#475569]"
                      }`}
                    >
                      {item.stock} in stock
                    </td>

                    {/* PRICE */}
                    <td className="w-[12%] py-4 px-6 text-sm font-medium text-black align-middle">
                      ${item.price}.00
                    </td>

                    {/* STATUS */}
                    <td className="w-[14%] py-4 px-6 align-middle">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full
            ${item.status === "Live" && "bg-[#d1fae5] text-[#065f46]"}
            ${item.status === "Sold Out" && "bg-[#f1f5f9] text-[#334155]"}
            ${item.status === "Draft" && "bg-[#fef3c7] text-[#92400e]"}
          `}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="w-[14%] py-4 px-6 align-middle">
                      <div className="flex items-center gap-3 text-sm text-[#1241a1] cursor-pointer">
                        <span className="font-bold">Edit</span>
                        <BsThreeDotsVertical className="text-[#94a3b8]" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* TABLE FOOTER */}
              <tfoot>
                <tr>
                  <td colSpan="100%">
                    <div className="flex items-center justify-between px-6 py-4 border-t border-[#e0e0e0] bg-white">
                      {/* LEFT INFO */}
                      <p className="text-xs text-gray-500">
                        Showing
                        <span className="font-medium text-gray-900">
                          {(currentPage - 1) * itemsPerPage + 1}
                        </span>
                        to
                        <span className="font-medium text-gray-900">
                          {Math.min(currentPage * itemsPerPage, totalItems)}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-900">
                          {totalItems}
                        </span>{" "}
                        results
                      </p>

                      {/* PAGINATION */}
                      <div className="flex items-center gap-2">
                        {/* PREVIOUS */}
                        <button
                          disabled={currentPage === 1}
                          onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                          }
                          className={`px-3 py-1.5 text-xs border rounded-sm transition
              ${
                currentPage === 1
                  ? "text-gray-300 border-gray-200 cursor-not-allowed"
                  : "text-black border-[#e0e0e0] hover:bg-gray-50"
              }
            `}
                        >
                          Previous
                        </button>

                        {/* PAGE NUMBERS */}
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1.5 text-xs border rounded-sm transition
                  ${
                    currentPage === page
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-[#e0e0e0] text-black hover:bg-gray-50"
                  }
                `}
                            >
                              {page}
                            </button>
                          );
                        })}

                        {/* NEXT */}
                        <button
                          disabled={currentPage === totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                          className={`px-3 py-1.5 text-xs border rounded-sm transition
              ${
                currentPage === totalPages
                  ? "text-gray-300 border-gray-200 cursor-not-allowed"
                  : "text-black border-[#e0e0e0] hover:bg-gray-50"
              }
            `}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AdminProduct;
