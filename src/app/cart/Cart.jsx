"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "@/redux/cartSlice";
import { ImBoxAdd } from "react-icons/im";
import { MdDelete, MdErrorOutline, MdEdit } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { deleteAddress, setEditAddress } from "@/redux/addressSlice";
import Link from "next/link";

const Cart = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.product.products);
  const addresses = useSelector((state) => state.address.addresses);
  console.log("All Products:", products);
  console.log("Cart Items:", cart);
  const dispatch = useDispatch();
  const [openQty, setOpenQty] = useState(null);
  const [customQty, setCustomQty] = useState("");
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const calculateSellingPrice = (item) => {
    const discount = item.discount ?? 0;
    const originalPrice = item.originalPrice ?? item.price ?? 0;
    return Math.round((originalPrice * (100 - discount)) / 100);
  };

  const selectedCart =
    selectedItems.length === 0
      ? cart
      : cart.filter((item) => selectedItems.includes(item.id));

  // total orginal price
  const totalOriginalPrice = selectedCart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return sum;
    const price = product.originalPrice ?? product.price ?? 0;
    return sum + price * item.qty;
  }, 0);

  // total selling price
  const totalSellingPrice = selectedCart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return sum;
    const selling = calculateSellingPrice(product);
    return sum + selling * item.qty;
  }, 0);

  const totalDiscount = totalOriginalPrice - totalSellingPrice;
  const totalCustomerPrice = totalSellingPrice - (couponDiscount ?? 0);
  // toggle select
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // toggle select all
  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };
  const handleContinue = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please select products");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(selectedCart));
    localStorage.setItem("selectedAddress", selectedAddress);

    router.push("/payment");
  };
  const [cartChecked, setCartChecked] = useState(false);

  useEffect(() => {
    if (cartChecked) return;

    if (cart.length === 0) {
      alert("Your cart is empty. Add your products");
      router.push("/");
    }

    setCartChecked(true);
  }, [cart]);

  useEffect(() => {
    setSelectedItems(cart.map((item) => item.id));
  }, [cart]);

  return (
    <section className="w-full bg-[#f6f6f8] pt-17">
      <div className="max-w-7xl mx-auto sm:px-6 py-6 md:flex gap-4">
        {/* LEFT */}
        <div className="w-full md:w-[70%]">
          {/* ADDRESS */}
          <div className="flex justify-between items-start bg-white p-4 mb-3">
            <div className=" p-4 mb-3">
              <h3 className="text-black text-md font-bold md:text-md mb-3">
                From Saved Addresses
              </h3>

              {addresses.length > 0 ? (
                addresses.map((addr) => (
                  <div key={addr.id} className="flex gap-2 items-start">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                    />

                    <div
                      key={addr.id}
                      className="text-sm text-black space-y-1 border-b border-gray-300 pb-3 mb-3"
                    >
                      <p className="font-medium">{addr.name}</p>
                      <p>{addr.street}</p>
                      <p>
                        {addr.city}, {addr.region}
                      </p>
                      <p>
                        {addr.country} - {addr.postal}
                      </p>
                      <p>Phone: {addr.phone}</p>

                      <div className="flex gap-4 mt-2">
                        <MdEdit
                          className="cursor-pointer text-blue-600 text-lg"
                          onClick={() => {
                            dispatch(setEditAddress(addr));
                            router.push("/shippingDetails");
                          }}
                        />

                        <MdDelete
                          className="cursor-pointer text-red-600 text-lg"
                          onClick={() => dispatch(deleteAddress(addr.id))}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No address added yet</p>
              )}
            </div>
            <Link
              href="/shippingDetails"
              className="text-[#155dfc] p-4  font-medium cursor-pointer text-sm md:text-md"
            >
              Add Delivery Address
            </Link>
          </div>

          {/* PRODUCT LIST */}
          <div className="bg-white p-4 mb-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedItems.length === cart.length}
              onChange={toggleSelectAll}
            />
            <p className="text-sm text-black font-medium">Select All</p>
          </div>
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.id);

            if (!product) return null;
            const sellingPrice = calculateSellingPrice(product);

            return (
              <div key={product.id} className="bg-white mb-3">
                <div className="p-4 flex justify-between gap-4">
                  {/* CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="mt-2 mr-3"
                  />

                  {/* PRODUCT DETAILS */}
                  <div className="flex-1">
                    <h2 className="text-sm md:text-xl text-black">
                      {product.name}
                    </h2>

                    <p className="text-xs text-gray-500 mt-2 mb-4">
                      {product.description}
                    </p>

                    <p className="text-green-600 text-sm md:text-md font-medium my-1">
                      {product.discount ?? 0}% off
                      <del className="text-gray-400 mx-2">
                        ${product.originalPrice ?? product.price}
                      </del>
                      ${sellingPrice}
                    </p>

                    <p className="text-xs text-green-600">
                      {product.offerCount ?? 0} offers available
                    </p>

                    <p className="text-xs text-black mt-5 mb-3">
                      Delivery by 5 - 7 days
                    </p>
                  </div>

                  {/* IMAGE & QTY */}
                  <div className="flex flex-col items-end">
                    {/* IMAGE */}
                    <div className="w-28 h-28 md:w-32 md:h-32 mb-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* QTY */}
                    <div className="relative w-full md:w-32">
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
                          className="absolute top-0 left-0 w-full bg-white border border-[#ababab] z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {[1, 2, 3].map((num) => (
                            <p
                              key={num}
                              className="py-1 px-3 hover:bg-gray-100 text-black cursor-pointer text-sm"
                              onClick={() => {
                                dispatch(updateQty({ id: item.id, qty: num }));
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
                              setCustomQty(item.qty.toString());
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
                  <button className="flex items-center cursor-pointer justify-center gap-1 md:gap-4 text-sm text-black px-5 py-4 w-[50%] border-r border-[#f0f0f0] hover:bg-gray-50">
                    <ImBoxAdd className="text-sm text-[#ababab]" />
                    Save For Later
                  </button>

                  <button
                    className="flex items-center justify-center cursor-pointer gap-1 md:gap-4 text-sm text-black px-5 py-4 w-[50%] hover:bg-gray-50"
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
        <div className="w-full md:w-[30%] mt-6 md:mt-0 md:sticky md:top-23 self-start">
          <div className="bg-white rounded">
            <div className="space-y-4 p-4">
              <h2 className="text-black font-semibold text-lg">
                Price Details
              </h2>

              <div className="flex justify-between">
                <h4 className="flex items-center gap-2 text-sm text-gray-600">
                  Price ({selectedCart.reduce((sum, item) => sum + item.qty, 0)}{" "}
                  items)
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

              <div className="flex justify-between items-center border-t pt-4 border-[#e0e0e0] border-dashed">
                <h4 className="text-sm font-medium text-black">
                  Total Customer Price
                </h4>
                <p className=" text-md text-black">
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
              <p className="text-black text-md md:text-lg font-semibold flex items-center gap-2">
                ${totalCustomerPrice.toLocaleString()}
                <MdErrorOutline className="text-[#878787] text-base" />
              </p>
            </div>
            <div>
              <button
                onClick={handleContinue}
                className="bg-black cursor-pointer text-white px-10 py-3 rounded-sm hover:bg-gray-800 font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QTY MODAL */}
      {showQtyModal && selectedItem && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowQtyModal(false)}
        >
          <div
            className="bg-white w-[80%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h3 className="text-md font-medium mb-4 text-black">
                Enter Quantity
              </h3>
              <input
                type="number"
                className="outline-none text-base w-full px-4 text-black rounded-lg"
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
                className="text-black py-4 text-sm font-medium w-[50%] border-r border-[#f0f0f0] hover:bg-gray-50 rounded-bl-xl"
              >
                CANCEL
              </button>
              <button
                className="text-blue-600 text-sm font-medium w-[50%] py-4 hover:bg-blue-50 rounded-br-xl"
                onClick={() => {
                  if (!customQty) return;
                  dispatch(
                    updateQty({ id: selectedItem.id, qty: Number(customQty) }),
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
      {showDeleteModal && selectedItem && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white w-[80%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CONTENT */}
            <div className="p-4">
              <h3 className="text-md font-medium mb-4 text-black">
                Remove Item
              </h3>
              <p className="text-black text-sm">
                Are you sure you want to remove this item from your cart?
              </p>
            </div>

            {/* BUTTONS */}
            <div className="w-full flex border-t border-[#f0f0f0]">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-black py-4 text-sm font-medium w-[50%] border-r border-[#f0f0f0] hover:bg-gray-50 rounded-bl-xl"
              >
                CANCEL
              </button>

              <button
                className="text-red-600 text-sm font-medium w-[50%] py-4 hover:bg-red-50 rounded-br-xl"
                onClick={() => {
                  setSelectedItems((prev) =>
                    prev.filter((id) => id !== selectedItem.id),
                  );

                  dispatch(removeFromCart(selectedItem.id));
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
