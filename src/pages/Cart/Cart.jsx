"use client";
import React, { useState } from "react";
import { ImBoxAdd } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const cartData = [
  {
    id: 1,
    name: "Camel Wool Blend Overcoat",
    description:
      "Elegant long-length overcoat made from a soft wool-blend fabric. Features a classic lapel collar and a clean, minimal silhouette, ideal for winter wear and formal occasions.",
    originalPrice: 4000,
    price: 1860,
    offerCount: 3,
    discount: 25,
    delivery: "Mon Feb 9",
    qty: 1,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjefRmKh9Ku3PvgSntBasogV94LwdiqA8R9C2_2nlNFaJikk5taowM4bTHAvX6euda-KAUqoUf8a_6vdo_J4ge4DlguYCdXAEwKFpauu5mD0JNhYGz_G53winsOMhOOiJDyUxMkXLeaDGzT1p55sqZW-kwL9UU2hKOCf4VWN1hrGDylrRnaRMU0ngc2bIWnIPRuzfAEBXHs4ejePYOC48a4l-VJ5UgHA78nQw8drISg0KK1-0slJxAdB1pCBdt6jjnLl_vU5xFIkc",
  },
  {
    id: 2,
    name: "Black Satin Evening Gown",
    description:
      "Sophisticated floor-length satin gown with a sleek silhouette and delicate shoulder straps. Perfect for evening parties, formal events, and special occasions.",
    originalPrice: 4999,
    price: 3200,
    offerCount: 4,
    discount: 36,
    delivery: "Tue Feb 10",
    qty: 1,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAffqwN00XAl1h8G56Fp3FL4FVgQq6265FlcgMp1XR4imu6kGs-sElH9ahoLEcgSwnBR3piVDMKMMtznRpocdlTmWhF0T9sZaCGZXR_mpWj7CBSmHem_96MI3-FJeqslO0lsqcHvxfxyzN2ypDXOO3v8IpQtYWB1A0tM06goZl8l1uj9RYt_hEO91TDXjqLp147XDhZA_gLlc0HfNzqnEagJcesiR8jRmDnqNCk8hxyiCgHLHGUikP5hdkdXPkCB5GHbNgtgpNRxv4",
  },
  {
    id: 3,
    name: "Tan Leather Structured Handbag",
    description:
      "Premium structured handbag crafted from textured leather. Features sturdy top handles and a minimalist design suitable for daily use and formal styling.",
    originalPrice: 2499,
    price: 1600,
    offerCount: 2,
    discount: 36,
    delivery: "Mon Feb 9",
    qty: 1,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd-a8CTigA31Y7IXeIOsjLxTEQemi0DLysgX3O1VbppzoddGlcUoxBv9xppfgFWsZhbcoR6kg159PMhox7bOpZ03M5Iti5CAc9IauMza5nikPXFKUL9PG2BMPFrIdpRNrvqdaet-YArEeN_WmNLXMlhVQY2wc74BPkxyB5r9ldN4SZuMtFGo6ROrt9y3pBZgGr9jm0n3WRkiS4InS2EMPM7ULK8rg0VAvlrOm9Wx-kYYZq4ekPVPeDSBKDvCZyOJw7x-9LQgonDac",
  },
  {
    id: 4,
    name: "White Cotton Button-Down Shirt",
    description:
      "Classic white button-down shirt made from breathable cotton fabric. Designed with a relaxed fit, making it ideal for office wear and casual styling.",
    originalPrice: 2999,
    price: 2010,
    offerCount: 3,
    discount: 33,
    delivery: "Wed Feb 11",
    qty: 1,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUtjfQ10jwehXkcpLnxXaE6TvnZFHvmgbhTqvN_SXmmdeSruS15OomGGFDe5led_XYN24rucRb1oWId0He6LcrfVvYzxIUrcOAJ3NqshUL4XHp82kgcMVVHvAld2rYu56qTFlUWPq0mHaj0Ify9TbNs4qOXhvSs4mMC9cYMnJzBkMUQ6e3GUZ58E2v0qfWFby2NFh1jX1MRFC8lbYnobMQBjhfP1NUnsXu7hLxfgwJunGkv4ItF-saIQpDZsY0t2xSRJvUL3UgP_E",
  },
];

const Cart = () => {
  const [cart, setCart] = useState(cartData);
  const [openQty, setOpenQty] = useState(null);
  const [customQty, setCustomQty] = useState("");
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(500);

  // Calculate selling price for an item
  const calculateSellingPrice = (item) => {
    return Math.round((item.originalPrice * (100 - item.discount)) / 100);
  };

  // ORIGINAL PRICE
  const totalOriginalPrice = cart.reduce(
    (sum, item) => sum + item.originalPrice * item.qty,
    0,
  );

  // SELLING PRICE
  const totalSellingPrice = cart.reduce(
    (sum, item) => sum + calculateSellingPrice(item) * item.qty,
    0,
  );

  // TOTAL DISCOUNT
  const totalDiscount = totalOriginalPrice - totalSellingPrice;

  // PAYABLE AMOUNT
  const totalCustomerPrice = totalSellingPrice - couponDiscount;

  return (
    <section className="w-full bg-[#f6f6f8] pt-17">
      <div className="max-w-7xl mx-auto sm:px-6 py-6 md:flex gap-4">
        {/* LEFT */}
        <div className="w-full md:w-[70%]">
          {/* ADDRESS */}
          <div className="flex justify-between items-center bg-white p-4 mb-3">
            <h3 className="text-black text-sm md:text-md">
              From Saved Addresses
            </h3>
            <button className="text-[#155dfc] font-medium text-sm md:text-md">
              Enter Delivery Pincode
            </button>
          </div>

          {/* PRODUCT LIST */}
          {cart.map((item) => {
            const sellingPrice = calculateSellingPrice(item);
            return (
              <div key={item.id} className="bg-white mb-3">
                <div className="p-4 flex justify-between gap-5">
                  <div className="flex-1">
                    <h2 className="text-md md:text-xl text-black">
                      {item.name}
                    </h2>
                    <p className="text-xs text-gray-500 mt-2 mb-4">
                      {item.description}
                    </p>

                    <p className="text-green-600 font-medium my-1">
                      {item.discount}% off
                      <del className="text-gray-400 mx-2">
                        ${item.originalPrice}
                      </del>
                      ${sellingPrice}
                    </p>

                    <p className="text-xs text-green-600">
                      {item.offerCount} offers available
                    </p>

                    <p className="text-xs text-black mt-5 mb-3">
                      Delivery by {item.delivery}
                    </p>
                  </div>

                  {/* IMAGE & QTY */}
                  <div className="flex flex-col items-end">
                    {/* IMG */}
                    <div className="w-32 h-32 mb-2">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {/* QTY */}
                    <div className="relative w-32">
                      <div
                        className="w-full border border-[#dbdbdb] text-center py-1 px-3 cursor-pointer"
                        onClick={() =>
                          setOpenQty(openQty === item.id ? null : item.id)
                        }
                      >
                        <h4 className="flex text-black items-center justify-center gap-2 text-sm">
                          Qty: {item.qty} <FaCaretDown />
                        </h4>
                      </div>

                      {openQty === item.id && (
                        <div
                          className="absolute top-full left-0 w-full bg-white border border-[#ababab] z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {[1, 2, 3].map((num) => (
                            <p
                              key={num}
                              className="py-1 px-3 hover:bg-gray-100 text-black cursor-pointer text-sm"
                              onClick={() => {
                                setCart((prev) =>
                                  prev.map((c) =>
                                    c.id === item.id ? { ...c, qty: num } : c,
                                  ),
                                );
                                setOpenQty(null);
                              }}
                            >
                              {num}
                            </p>
                          ))}

                          <p
                            className="py-1 px-3 hover:bg-gray-100 text-black cursor-pointer text-sm border-t border-gray-200"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowQtyModal(true);
                              setOpenQty(null);
                            }}
                          >
                            more
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex w-full border-t border-[#f0f0f0]">
                  <button className="flex items-center justify-center gap-4 text-sm text-black px-5 py-4 w-[50%] border-r border-[#f0f0f0] hover:bg-gray-50">
                    <ImBoxAdd className="text-sm text-[#ababab]" /> Save For
                    Later
                  </button>

                  <button
                    className="flex items-center justify-center gap-4 text-sm text-black px-5 py-4 w-[50%] hover:bg-gray-50"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDeleteModal(true);
                    }}
                  >
                    <MdDelete className="text-[#ababab] text-xl" />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[30%] mt-6 md:mt-0">
          <div className="bg-white rounded">
            <div className="space-y-4 p-4">
              <h2 className="text-black font-semibold text-lg">
                Price Details
              </h2>

              <div className="flex justify-between">
                <h4 className="flex items-center gap-2 text-sm text-gray-600">
                  Price ({cart.length} items){" "}
                  <MdErrorOutline className="text-[#878787]" />
                </h4>
                <p className="font-medium text-black">
                  ${totalOriginalPrice.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between">
                <h4 className="text-sm text-gray-600">Discount</h4>
                <p className="text-[#008c00] font-medium">
                  -${totalDiscount.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between">
                <h4 className="flex items-center gap-2 text-sm text-gray-600">
                  Coupons for you <MdErrorOutline className="text-[#878787]" />
                </h4>
                <p className="text-[#008c00] font-medium">
                  -${couponDiscount.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between border-t pt-4 border-[#e0e0e0] border-dashed">
                <h4 className="text-sm font-medium text-black">
                  Total Customer Price
                </h4>
                <p className="font-bold text-lg text-black">
                  ${totalCustomerPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t px-4 py-3 border-[#e0e0e0] ">
              <p className="text-[#008c00] text-sm">
                You will save $
                {(totalDiscount + couponDiscount).toLocaleString()} on this
                order
              </p>
            </div>
          </div>

          {/* SECURE */}
          <div className="my-4 p-4 bg-white rounded">
            <p className="text-[#878787] text-sm flex items-center gap-3">
              <IoShieldCheckmarkSharp className="text-xl text-[#878787]" />
              Safe and secure payments. Easy returns. 100% Authentic products.
            </p>
          </div>

          {/* PAYMENT DIV */}
          <div className="bg-white p-4 rounded flex justify-between items-center">
            <div>
              <del className="text-[#878787] text-sm block">
                ${totalOriginalPrice.toLocaleString()}
              </del>
              <p className="text-black text-lg font-semibold flex items-center gap-2">
                ${totalCustomerPrice.toLocaleString()}
                <MdErrorOutline className="text-[#878787] text-base" />
              </p>
            </div>
            <div>
              <button className="bg-black text-white px-10 py-3 rounded-sm hover:bg-gray-800 font-medium">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QTY MODAL */}
      {showQtyModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowQtyModal(false)}
        >
          <div
            className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 text-black">
                Enter Quantity
              </h3>
              <input
                type="number"
                min="1"
                className="outline-none text-base w-full py-3 px-4 border text-black border-gray-300 rounded-lg mb-2"
                placeholder="Enter quantity"
                value={customQty}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setCustomQty(value.toString());
                }}
              />
            </div>

            <div className="w-full flex border-t border-[#f0f0f0]">
              <button
                onClick={() => setShowQtyModal(false)}
                className="text-black py-4 text-base font-medium w-[50%] border-r border-[#f0f0f0] hover:bg-gray-50 rounded-bl-xl"
              >
                CANCEL
              </button>
              <button
                className="text-blue-600 text-base font-medium w-[50%] py-4 hover:bg-blue-50 rounded-br-xl"
                onClick={() => {
                  if (!customQty) return;

                  setCart((prev) =>
                    prev.map((c) =>
                      c.id === selectedItem.id
                        ? { ...c, qty: Math.max(1, Number(customQty)) }
                        : c,
                    ),
                  );

                  setShowQtyModal(false);
                  setCustomQty("");
                }}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2 text-black">
                Remove Item
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove this item from your cart?
              </p>
            </div>

            {/* BUTTONS */}
            <div className="w-full flex border-t border-[#f0f0f0]">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-black py-4 text-base font-medium w-[50%] border-r border-[#f0f0f0] hover:bg-gray-50 rounded-bl-xl"
              >
                CANCEL
              </button>

              <button
                className="text-red-600 text-base font-medium w-[50%] py-4 hover:bg-red-50 rounded-br-xl"
                onClick={() => {
                  setCart((prev) =>
                    prev.filter((c) => c.id !== selectedItem.id),
                  );
                  setShowDeleteModal(false);
                }}
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
