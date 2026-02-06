import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { LuClipboardCheck } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { IoReorderThree } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

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
];

const AdminProduct = () => {
  return (
    <section className="p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* TOTAL INVENTORY */}
        <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide">
              Total Inventory
            </h2>
            <p className="text-2xl font-semibold mt-1">12,450</p>
            <p className="text-green-600 text-xs mt-1">+2% from last month</p>
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
            <p className="text-2xl font-semibold mt-1">328</p>
            <p className="text-green-600 text-xs mt-1">+15% this month</p>
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
            <p className="text-2xl font-semibold mt-1">1,084</p>
            <p className="text-gray-400 text-xs mt-1">Current status</p>
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
            <p className="text-2xl font-semibold mt-1">14</p>
            <p className="text-red-500 text-xs mt-1">Needs attention</p>
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
            <h2 className="text-md font-semibold">Product Catalog</h2>
          </div>
          <div className="flex justify-between gap-6 px-5">
            <IoReorderThree className="text-xl text-[#94a3b8]" />
            <FiDownload className="text-xl text-[#94a3b8]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* TABLE HEADER */}
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="text-left py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest align-middle">
                  PRODUCT
                </th>
                <th className="text-left py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest align-middle">
                  CATEGORY
                </th>
                <th className="text-left py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest align-middle">
                  STOCK
                </th>
                <th className="text-left py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest align-middle">
                  PRICE
                </th>
                <th className="text-left py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest align-middle">
                  STATUS
                </th>
                <th className="text-left py-3 px-6 text-xs font-bold text-[#64748b] tracking-widest align-middle">
                  ACTIONS
                </th>
              </tr>
            </thead>

            {/* TABLE BODY  */}
            <tbody>
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#e0e0e0] hover:bg-[#f8fafc]"
                >
                  {/* PRODUCT */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <h2 className="text-md font-serif font-semibold text-black">
                          {item.name}
                        </h2>
                        <span className="text-xs text-[#64748b]">
                          SKU: {item.sku}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="py-4 px-6 text-sm text-[#475569] align-middle">
                    {item.category}
                  </td>

                  {/* STOCK */}
                  <td
                    className={`py-4 px-6 text-sm align-middle ${item.stock === 0 ? "text-red-500" : "text-[#475569]"}`}
                  >
                    {item.stock} in stock
                  </td>

                  {/* PRICE */}
                  <td className="py-4 px-6 text-sm font-medium text-black align-middle">
                    ${item.price}.00
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-6 align-middle">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full
                  ${item.status === "Live" && "bg-[#d1fae5] text-[#065f46]"}
                  ${item.status === "Sold Out" && "bg-[#f1f5f9] text-[#334155]"}
                  ${item.status === "Draft" && "bg-[#fef3c7] text-[#92400e]"}
                `}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-3 text-sm text-[#1241a1] cursor-pointer">
                      <span className="font-bold">Edit</span>
                      <BsThreeDotsVertical className="text-[#94a3b8]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-[#e0e0e0]">
          <div className="text-sm text-gray-500">
            Showing 1 to 4 of 1,084 products
          </div>

          {/* BUTTON GROUP */}
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs border border-[#e0e0e0] rounded-sm text-gray-400 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm border border-[#e0e0e0] rounded-sm bg-[#1241a1] text-white">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-[#e0e0e0] rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 text-sm border border-[#e0e0e0] rounded-sm hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1.5 text-md border border-[#e0e0e0] rounded-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProduct;
