"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineExclamationCircle, AiOutlineWarning } from "react-icons/ai";
import { LuClipboardCheck } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiTrendingUp, HiOutlineRefresh } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import AddProduct from "./AddProduct";

const AdminProduct = ({
  products = [],
  showModal,
  setShowModal,
  selectedProduct,
  mode,
  showSuccess,
  onSaveProduct,
  onEditClick,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Reset page if products change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [products, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts =
    totalItems > 0 ? products.slice(startIndex, endIndex) : [];

  return (
    <section className="">
      {showSuccess && (
        <div className="fixed top-5 right-5 z-[9999] transition-all duration-500 ease-in-out">
          <div className="flex items-center gap-3 bg-[#0074eb] text-white px-5 py-3 rounded-lg shadow-xl animate-slideDown">
            <AiFillCheckCircle className="text-lg" />
            <span className="font-bold text-sm md:text-base">
              {mode === "edit"
                ? "Product updated successfully!"
                : "Product added successfully!"}
            </span>
          </div>
        </div>
      )}

      {/*  TABLE SECTION  */}

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
            {/* table header */}
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
            {/* table body */}
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e0e0e0] hover:bg-[#f8fafc]"
                  >
                    <td className="w-[32%] py-4 px-6 align-middle">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "https://via.placeholder.com/50"}
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

                    <td className="w-[14%] py-4 px-6 text-sm text-[#475569] align-middle">
                      {item.category}
                    </td>

                    <td
                      className={`w-[14%] py-4 px-6 text-sm align-middle ${
                        item.stock === 0 ? "text-red-500" : "text-[#475569]"
                      }`}
                    >
                      {item.stock} in stock
                    </td>

                    <td className="w-[12%] py-4 px-6 text-sm font-medium text-black align-middle">
                      ${item.price}.00
                    </td>

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

                    <td
                      className="w-[14%] py-4 px-6 align-middle"
                      onClick={() => onEditClick(item)}
                    >
                      <div className="flex items-center gap-3 text-sm text-[#1241a1] cursor-pointer">
                        <span className="font-bold">Edit</span>
                        <BsThreeDotsVertical className="text-[#94a3b8]" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
            {/* table footer */}
            <tfoot>
              <tr>
                <td colSpan="100%">
                  <div className="flex items-center justify-between px-6 py-4 border-t border-[#e0e0e0] bg-white">
                    <p className="text-xs text-gray-500">
                      Showing
                      <span className="font-medium text-gray-900">
                        {" "}
                        {totalItems === 0 ? 0 : startIndex + 1}{" "}
                      </span>
                      to
                      <span className="font-medium text-gray-900">
                        {" "}
                        {Math.min(endIndex, totalItems)}{" "}
                      </span>
                      of
                      <span className="font-medium text-gray-900">
                        {" "}
                        {totalItems}{" "}
                      </span>
                      Products
                    </p>

                    <div className="flex items-center gap-2">
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
                        }`}
                      >
                        Previous
                      </button>

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
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

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
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>

          {showModal && (
            <AddProduct
              onClose={() => setShowModal(false)}
              onSave={onSaveProduct}
              mode={mode}
              productData={selectedProduct}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminProduct;
