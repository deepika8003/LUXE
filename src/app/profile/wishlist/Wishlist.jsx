"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import { addToCart } from "@/redux/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const handleMoveToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: 1,
      }),
    );

    dispatch(removeFromWishlist(item.id));
  };
  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="bg-gray-100">
      <section className="min-h-screen max-w-7xl mx-auto  pt-24 pb-10 px-6 ">
        {/* HEADER */}
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <FaRegHeart className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              My Wishlist
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {wishlist.length} items saved
            </p>
          </div>
        </div>

        {/* EMPTY */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto mt-20">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg mb-6">
              <FaRegHeart className="text-xl text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link href="/collections">
              <button className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-xl">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 sm:h-48 md:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Discount Badge */}
                  <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 rounded-full shadow">
                    {item.discount}% OFF
                  </span>

                  {/* DELETE BUTTON - TOP RIGHT */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-2 right-2 cursor-pointer p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-red-100 hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <MdDeleteOutline className="text-gray-700 text-sm" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-3 md:p-4 flex flex-col flex-grow">
                  <h3 className="text-[10px] sm:text-sm md:text-base font-semibold text-black line-clamp-1 mb-1">
                    {item.name}
                  </h3>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-black text-xs sm:text-sm md:text-base">
                      ${item.price}
                    </span>
                    <span className="text-gray-400 line-through text-xs">
                      {item.oldPrice}
                    </span>
                  </div>

                  {/* SINGLE BUTTON */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <IoCartOutline />
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default WishlistPage;
