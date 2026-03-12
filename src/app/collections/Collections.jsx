"use client";

import React, { useState, useEffect } from "react";
// api
import { getAllProducts } from "@/api/productApi";
import { useDispatch, useSelector } from "react-redux";

// react icons
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { addToCart } from "@/redux/cartSlice";

const normalizeProduct = (item) => {
  return {
    id: item.id,
    name: item.name || item.title,
    description: item.description,
    category: item.category,
    price: item.price,
    image: item.image,
    stock: item.stock ?? 100,
    status: "Live",
    originalPrice: item.price,
    discount: item.discount ?? 5,
    offerCount: item.offerCount ?? 0,
  };
};
const Collections = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [apiProducts, setApiProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  // get products
  const dispatch = useDispatch();
  const adminProducts = useSelector((state) => state.product.products);
  // api fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        const formattedProducts = data.map(normalizeProduct);

        setApiProducts(formattedProducts);
      } catch (error) {
        console.log(error);
      }
    };
    // fetch api
    fetchProducts();
  }, []);
  const categories = ["MEN", "WOMEN", "ACCESSORIES", "NEW ARRIVALS"];
  const [activeCategory, setActiveCategory] = useState("WOMEN");

  const images = [
    "/images/collectionbg1.png",
    "/images/collectionbg2.png",
    "/images/collectionbg3.png",
    "/images/collectionbg4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // mobile view filter

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowFilter(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [visibleProducts, setVisibleProducts] = useState(8);
  const allProducts = [...adminProducts, ...apiProducts];

  // liked products
  const toggleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // add to cart
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      }),
    );
  };
  return (
    <>
      {/* Header section */}
      <section className="mt-20 py-32 relative overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4">
            ALL PRODUCTS
          </h1>

          <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto">
            Explore our latest fashion pieces designed for the modern minimalist
            wardrobe.
          </p>

          <ul className="flex justify-center gap-3 md:gap-10 mt-10 text-sm font-medium tracking-wide">
            {categories.map((type) => (
              <li
                key={type}
                onClick={() => setActiveCategory(type)}
                className={`cursor-pointer text-[10px] sm:text-sm ${
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
        {/* MOBILE FILTER BAR */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <p className="text-sm font-medium text-gray-700">
            {allProducts.length} Products
          </p>

          <button
            onClick={() => setShowFilter(true)}
            className="border px-7 py-1 text-sm rounded-sm hover:bg-gray-100"
          >
            Filter
          </button>
        </div>

        {/* DESKTOP FILTERS */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 py-4 flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <select className="border border-gray-300 px-3 py-2 text-sm rounded-md">
              <option className="texe-black">Category</option>
              <option>Men</option>
              <option>Women</option>
              <option>Accessories</option>
            </select>

            <select className="border border-gray-300 px-3 py-2 text-sm rounded-md">
              <option className="texe-black">Price Range</option>
              <option>Under $50</option>
              <option>$50 – $100</option>
              <option>$100 – $200</option>
              <option>$200+</option>
            </select>

            <select className="border border-gray-300 px-3 py-2 text-sm rounded-md">
              <option className="texe-black">Discount</option>
              <option>10%+</option>
              <option>20%+</option>
              <option>30%+</option>
            </select>
            <select className="border border-gray-300 px-3 py-2 text-sm rounded-md">
              <option className="texe-black">Brand</option>
              <option>Nike</option>
              <option>Zara</option>
              <option>H&M</option>
              <option>Adidas</option>
            </select>

            <select className="border border-gray-300 px-3 py-2 text-sm rounded-md">
              <option className="texe-black">Rating</option>
              <option>4 ★ & above</option>
              <option>3 ★ & above</option>
              <option>2 ★ & above</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">
              {allProducts.length} Products Found
            </p>

            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md">
              <option>Sort: Popularity</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER SIDEBAR */}
      <div
        onClick={() => setShowFilter(false)}
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          showFilter ? "bg-black/40" : "bg-transparent pointer-events-none"
        }`}
      >
        <div
          className={`bg-white w-72 h-full p-5 overflow-y-auto transform transition-transform duration-300 ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>

            <button
              onClick={() => setShowFilter(false)}
              className="text-gray-900 text-lg"
            >
              <RxCross2 />
            </button>
          </div>

          {/* CHECKBOX FILTERS */}
          <div className="space-y-6 text-sm">
            <div className="text-gray-700">
              <p className="font-semibold mb-2 text-black">Category</p>

              <label className="flex items-center  gap-2">
                <input type="checkbox" /> Men
              </label>
              <label className="flex items-center  gap-2">
                <input type="checkbox" /> Women
              </label>
              <label className="flex items-center  gap-2">
                <input type="checkbox" /> Accessories
              </label>
            </div>

            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Price</p>

              <label className="flex  items-center gap-2">
                <input type="checkbox" /> Under $50
              </label>
              <label className="flex  items-center gap-2">
                <input type="checkbox" /> $50 - $100
              </label>
              <label className="flex  items-center gap-2">
                <input type="checkbox" /> $100 - $200
              </label>
            </div>

            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Discount</p>

              <label className="flex items-center gap-2">
                <input type="checkbox" /> 10%+
              </label>
              <label className="flex  items-center gap-2">
                <input type="checkbox" /> 20%+
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> 30%+
              </label>
            </div>
            {/* BRAND */}
            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Brand</p>

              <label className="flex  items-center gap-2">
                <input type="checkbox" /> Nike
              </label>
              <label className="flex  items-center gap-2">
                <input type="checkbox" /> Zara
              </label>
              <label className="flex  items-center gap-2">
                <input type="checkbox" /> H&M
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Adidas
              </label>
            </div>

            {/* RATING */}
            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Rating</p>

              <label className="flex  items-center gap-2">
                <input type="checkbox" /> 4★ & above
              </label>
              <label className="flex  items-center gap-2">
                <input type="checkbox" /> 3★ & above
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> 2★ & above
              </label>
            </div>
          </div>

          {/* APPLY BUTTON */}
          <button
            className="sticky bottom-0 mt-6 w-full bg-black active:bg-gray-800 text-white py-2 rounded-md"
            onClick={() => setShowFilter(false)}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {allProducts.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] md:aspect-[5/5] bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[9px] md:text-xs px-2 py-[2px] rounded shadow">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`absolute top-2 right-2 p-1.5 md:p-2 rounded-full shadow transition 
                      ${
                        likedProducts.includes(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white hover:bg-gray-100 text-black"
                      }`}
                  >
                    <FaRegHeart className="text-xs md:text-sm" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-2 md:p-4 flex flex-col flex-grow">
                  <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-[10px] md:text-xs text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center gap-1 md:gap-2 mt-2 md:mt-3 flex-wrap">
                    <span className="text-sm text-black md:text-lg font-bold">
                      ${product.price}
                    </span>

                    <span className="text-[10px] md:text-sm text-gray-400 line-through"></span>

                    <span className="text-green-600 text-[10px] md:text-sm font-semibold">
                      {product.discount}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <div className="mt-auto pt-3 md:pt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 md:gap-3 bg-black text-white text-[11px] md:text-sm py-1.5 md:py-2 rounded-md hover:bg-gray-800 transition"
                    >
                      <FaShoppingCart className="text-xs md:text-sm" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE */}
          <div className="flex justify-center mt-10">
            {visibleProducts < allProducts.length && (
              <button
                onClick={() => setVisibleProducts((prev) => prev + 8)}
                className="border border-gray-400 text-black px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm rounded-md hover:bg-black hover:text-white transition"
              >
                LOAD MORE PRODUCTS
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Collections;
