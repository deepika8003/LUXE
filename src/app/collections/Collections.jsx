"use client";

import React, { useState, useEffect } from "react";

// react icons
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Collections = () => {
  // Category tabs
  const categories = ["MEN", "WOMEN", "ACCESSORIES", "NEW ARRIVALS"];
  const [activeCategory, setActiveCategory] = useState("WOMEN");

  const products = [
    {
      id: 1,
      name: "Summer Straw Hat",
      desc: "Lightweight breathable straw hat for sunny days",
      price: 45,
      oldPrice: 60,
      discount: "25% OFF",
      badge: "NEW ARRIVAL",
      offer: "2 OFFERS AVAILABLE",
      image: "images/summerhat.jpg",
    },
    {
      id: 2,
      name: "Raw Edge Denim Jacket",
      desc: "Structured blue denim jacket with durable stitching",
      price: 120,
      oldPrice: 160,
      discount: "25% OFF",
      badge: "SALE",
      offer: "3 OFFERS AVAILABLE",
      image: "images/denimjacket.jpg",
    },
    {
      id: 3,
      name: "Classic Leather Watch",
      desc: "Minimalist leather strap watch with premium finish",
      price: 150,
      oldPrice: 199,
      discount: "20% OFF",
      badge: "BESTSELLER",
      offer: "LIMITED TIME OFFER",
      image: "images/Classic Leather Watch.jpg",
    },
    {
      id: 4,
      name: "Handcrafted Leather Boots",
      desc: "Premium brown leather boots with durable sole",
      price: 210,
      oldPrice: 260,
      discount: "19% OFF",
      badge: "TRENDING",
      offer: "EXCLUSIVE OFFER INSIDE",
      image: "images/shoe.jpg",
    },
  ];
  // Background image carousel
  const images = [
    "/images/collectionbg1.png",
    "/images/collectionbg2.png",
    "/images/collectionbg3.png",
    "/images/collectionbg4.png",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Header section */}
      <section className="mt-20 py-32 relative overflow-hidden">
        {/* Background images */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4">
            ALL PRODUCTS
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto">
            Explore our latest fashion pieces designed for the modern minimalist
            wardrobe.
          </p>

          {/* Category pills */}
          <ul className="flex justify-center gap-10 mt-10 text-sm font-medium tracking-wide">
            {categories.map((type) => (
              <li
                key={type}
                onClick={() => setActiveCategory(type)}
                className={`cursor-pointer text-xs sm:text-sm ${
                  activeCategory === type
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Left filters */}
          <div className="flex flex-wrap gap-3">
            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md text-gray-900 outline-none hover:border-black">
              <option>Category</option>
              <option>Men</option>
              <option>Women</option>
              <option>Accessories</option>
            </select>
            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md text-gray-900 outline-none hover:border-black">
              <option>Price Range</option>
              <option>Under $50</option>
              <option>$50 – $100</option>
              <option>$100 – $200</option>
              <option>$200+</option>
            </select>
            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md text-gray-900 outline-none hover:border-black">
              <option>Discount</option>
              <option>10%+</option>
              <option>20%+</option>
              <option>30%+</option>
              <option>50%+</option>
            </select>
            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md text-gray-900 outline-none hover:border-black">
              <option>Brand</option>
              <option>Nike</option>
              <option>Zara</option>
              <option>H&M</option>
              <option>Adidas</option>
            </select>
            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md text-gray-900 outline-none hover:border-black">
              <option>Rating</option>
              <option>4 ★ & above</option>
              <option>3 ★ & above</option>
              <option>2 ★ & above</option>
            </select>
          </div>

          {/* Right side filter */}
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">
              {products.length} Products Found
            </p>
            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md text-gray-900 outline-none hover:border-black">
              <option>Sort: Popularity</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col h-full"
              >
                {/* IMAGE: full cover, fixed height */}
                <div className="relative h-64 md:h-72 bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  {/* Badge (if any) */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded shadow">
                      {product.badge}
                    </span>
                  )}
                  {/* Wishlist icon */}
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                    <FaRegHeart />
                  </button>
                </div>

                {/* DETAILS: flexible content with button at bottom */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {product.desc}
                  </p>

                  {/* Price & discount */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-green-600 text-sm font-semibold">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Offer text */}
                  {product.offer && (
                    <p className="text-xs text-gray-400 mt-1">
                      {product.offer}
                    </p>
                  )}

                  {/* Spacer to push button to bottom */}
                  <div className="mt-auto pt-4">
                    <button className="w-full flex  items-center justify-center gap-3 bg-black text-white text-sm py-2 rounded-md hover:bg-gray-800 transition">
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More button */}
          <div className="flex justify-center mt-10">
            <button className="border border-gray-400 px-8 py-3 text-sm rounded-md hover:bg-black hover:text-white transition">
              LOAD MORE PRODUCTS
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collections;
