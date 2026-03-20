"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import { addToCart } from "@/redux/cartSlice";

import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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
  return (
    <section className="min-h-screen bg-[#f5f5f5] pt-24 pb-10 px-6 md:px-12">
      {/* HEADER */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <FaRegHeart className="text-black-500" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800">My Wishlist</h1>
          <p className="text-sm text-gray-500">{wishlist.length} items saved</p>
        </div>
      </div>

      {/* EMPTY */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <FaRegHeart className="text-5xl text-gray-400 mb-4" />

          <h2 className="text-xl text-gray-700 mb-2">Your wishlist is empty</h2>

          <p className="text-gray-500 text-sm mb-6">
            Save items you love by clicking the heart icon
          </p>

          <button className="bg-black text-white px-6 py-2 text-sm hover:opacity-90 transition">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 
             "
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover hover:scale-110  transition-all duration-300 "
                />

                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  {item.discount} %
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-sm text-gray-800 mb-1">{item.name}</h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-gray-900">
                    ${item.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${item.oldPrice}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-black text-white text-sm py-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                  >
                    <IoCartOutline />
                    Move to Cart
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="p-2 bg-gray-100 hover:bg-red-100 transition"
                  >
                    <MdDeleteOutline className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
