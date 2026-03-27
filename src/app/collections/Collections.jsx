"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { addToCart } from "@/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import { setFilter, toggleFilter, clearFilters } from "@/redux/filterSlice";
import { getAllProducts } from "@/api/productApi";
import { addOrder } from "@/redux/orderSlice";
import { useRouter } from "next/navigation";

// react icons
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaSliders } from "react-icons/fa6";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
const normalizeProduct = (item) => {
  return {
    id: item.id,
    name: item.title,
    description: item.description,
    category: item.category?.toUpperCase(),
    price: item.price,
    image: item.image,
    rating: item.rating?.rate,
    stock: item.rating?.count || 0,
    discount: 0,
    status: "Live",
    brand: "Fashion",
  };
};
const Collections = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const adminProducts = useSelector((state) => state.product.products);
  const wishlist = useSelector((state) => state.wishlist.items);
  const router = useRouter();

  const [showFilter, setShowFilter] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [apiProducts, setApiProducts] = useState([]);

  const [openSection, setOpenSection] = useState(null);

  // toggele filter sections
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
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
  const loadMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  const showLess = () => {
    setVisibleProducts((prev) => {
      if (prev <= 8) return 8;
      return prev - 8;
    });
  };
  const allProducts = [...adminProducts, ...apiProducts];

  // Handler for desktop dropdowns
  const handleSelectChange = (type, value) => {
    dispatch(setFilter({ type, value }));
  };

  // Handler for mobile checkboxes
  const handleCheckboxChange = (type, value) => {
    dispatch(toggleFilter({ type, value }));
  };
  const filteredProducts = allProducts.filter((product) => {
    // CATEGORY
    if (
      filters.category.length &&
      !filters.category.includes(product.category?.toUpperCase())
    ) {
      return false;
    }

    // BRAND
    if (filters.brand.length && !filters.brand.includes(product.brand)) {
      return false;
    }

    // PRICE
    if (filters.price.length) {
      const match = filters.price.some((range) => {
        if (range === "under50") return product.price < 50;
        if (range === "50to100")
          return product.price >= 50 && product.price <= 100;
        if (range === "100to200")
          return product.price >= 100 && product.price <= 200;
      });
      if (!match) return false;
    }

    // DISCOUNT
    if (filters.discount.length) {
      const match = filters.discount.some((d) => product.discount >= Number(d));
      if (!match) return false;
    }

    // RATING
    if (filters.rating.length) {
      const match = filters.rating.some((r) => product.rating >= Number(r));
      if (!match) return false;
    }

    return true;
  });

  // liked products
  const toggleLike = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
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

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  // add to orders page
  const handleBuyNow = (product) => {
    const order = {
      id: Date.now(),
      items: [product],
      total: product.price,
      status: "Processing",
      date: new Date().toDateString(),
      address: JSON.parse(localStorage.getItem("selectedAddress")) || null,
    };

    dispatch(addOrder(order));
    router.push("/profile/orders");
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
            {filteredProducts.length} Products
          </p>

          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center  gap-3 border px-7 py-1 text-sm rounded-sm hover:bg-gray-100 text-black"
          >
            <FaSliders className="text-black" />
            Filter
          </button>
        </div>

        {/* DESKTOP FILTERS */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 py-4 flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {/* CATEGORY */}
            <select
              className="border border-gray-300 px-3 py-2 text-sm rounded-md"
              onChange={(e) => handleSelectChange("category", e.target.value)}
              value={filters.category[0] || ""}
            >
              <option value="">Category</option>
              <option value="MEN">Men</option>
              <option value="WOMEN">Women</option>
              <option value="ACCESSORIES">Accessories</option>
            </select>

            {/* PRICE */}
            <select
              className="border border-gray-300 px-3 py-2 text-sm rounded-md"
              onChange={(e) => handleSelectChange("price", e.target.value)}
              value={filters.price[0] || ""}
            >
              <option value="">Price Range</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 – $100</option>
              <option value="100to200">$100 – $200</option>
            </select>

            {/* DISCOUNT */}
            <select
              className="border border-gray-300 px-3 py-2 text-sm rounded-md"
              onChange={(e) => handleSelectChange("discount", e.target.value)}
              value={filters.discount[0] || ""}
            >
              <option value="">Discount</option>
              <option value="10">10%+</option>
              <option value="20">20%+</option>
              <option value="30">30%+</option>
            </select>

            {/* BRAND */}
            <select
              className="border border-gray-300 px-3 py-2 text-sm rounded-md"
              onChange={(e) => handleSelectChange("brand", e.target.value)}
              value={filters.brand[0] || ""}
            >
              <option value="">Brand</option>
              <option value="Nike">Nike</option>
              <option value="Zara">Zara</option>
              <option value="H&M">H&M</option>
              <option value="Adidas">Adidas</option>
            </select>

            {/* RATING */}
            <select
              className="border border-gray-300 px-3 py-2 text-sm rounded-md"
              onChange={(e) => handleSelectChange("rating", e.target.value)}
              value={filters.rating[0] || ""}
            >
              <option value="">Rating</option>
              <option value="4">4 ★ & above</option>
              <option value="3">3 ★ & above</option>
              <option value="2">2 ★ & above</option>
            </select>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} Products Found
            </p>
            <select className="border border-gray-300 px-4 py-2 text-sm rounded-md">
              <option value="popular">Sort: Popularity</option>
              <option value="new">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
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
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-72 h-full p-5 overflow-y-auto transform transition-transform duration-300 ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center pb-3 mb-6 border-b border-b-[#e0e0e0]">
            <h2 className="text-lg font-semibold text-black ">Filters</h2>

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
                <input
                  type="checkbox"
                  checked={filters.category.includes("MEN")}
                  onChange={() => handleCheckboxChange("category", "MEN")}
                />
                Men
              </label>
              <label className="flex items-center  gap-2">
                <input
                  type="checkbox"
                  checked={filters.category.includes("WOMEN")}
                  onChange={() => handleCheckboxChange("category", "WOMEN")}
                />
                Women
              </label>
              <label className="flex items-center  gap-2">
                <input
                  type="checkbox"
                  checked={filters.category.includes("ACCESSORIES")}
                  onChange={() =>
                    handleCheckboxChange("category", "ACCESSORIES")
                  }
                />
                Accessories
              </label>
            </div>

            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Price</p>

              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.price.includes("under50")}
                  onChange={() => handleCheckboxChange("price", "under50")}
                />
                Under $50
              </label>
              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.price.includes("50to100")}
                  onChange={() => handleCheckboxChange("price", "50to100")}
                />
                $50 - $100
              </label>
              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.price.includes("100to200")}
                  onChange={() => handleCheckboxChange("price", "100to200")}
                />
                $100 - $200
              </label>
            </div>

            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Discount</p>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.discount.includes("10")}
                  onChange={() => handleCheckboxChange("discount", "10")}
                />
                10%+
              </label>
              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.discount.includes("20")}
                  onChange={() => handleCheckboxChange("discount", "20")}
                />
                20%+
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.discount.includes("30")}
                  onChange={() => handleCheckboxChange("discount", "30")}
                />
                30%+
              </label>
            </div>

            {/* BRAND */}
            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Brand</p>

              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brand.includes("Nike")}
                  onChange={() => handleCheckboxChange("brand", "Nike")}
                />
                Nike
              </label>
              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brand.includes("Zara")}
                  onChange={() => handleCheckboxChange("brand", "Zara")}
                />
                Zara
              </label>
              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brand.includes("H&M")}
                  onChange={() => handleCheckboxChange("brand", "H&M")}
                />
                H&M
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brand.includes("Adidas")}
                  onChange={() => handleCheckboxChange("brand", "Adidas")}
                />
                Adidas
              </label>
            </div>

            {/* RATING */}
            <div className="text-gray-700">
              <p className="font-semibold text-black mb-2">Rating</p>

              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.rating.includes("4")}
                  onChange={() => handleCheckboxChange("rating", "4")}
                />
                4★ & above
              </label>
              <label className="flex  items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.rating.includes("3")}
                  onChange={() => handleCheckboxChange("rating", "3")}
                />
                3★ & above
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.rating.includes("2")}
                  onChange={() => handleCheckboxChange("rating", "2")}
                />
                2★ & above
              </label>
            </div>
          </div>

          {/* CLEAR FILTER */}
          <button
            onClick={handleClearFilters}
            className="sticky bottom-0 mt-6 w-full bg-black text-white py-2 rounded-md"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {/* no product found */}
            {filteredProducts.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
                {/* ICON */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <FaSearch className="text-xl text-blue-500" />
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No products found
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm mb-8">
                  Try adjusting your filters or explore our collections.
                </p>

                {/* BUTTON */}
                <Link href="/collections">
                  <button
                    onClick={() => setShowFilter(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-xl flex items-center gap-2"
                  >
                    <FaSliders />
                    Try Other Filters
                  </button>
                </Link>
              </div>
            )}
            {/* product card */}
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="relative aspect-4/5 md:aspect-5/5 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => router.push(`/productDetails/${product.id}`)}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[9px] md:text-xs px-2 py-0.5 rounded shadow">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product);
                    }}
                    className={`absolute top-2 cursor-pointer right-2 p-2 rounded-full shadow
                    ${
                      wishlist.some((item) => item.id === product.id)
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <FaRegHeart className="text-xs md:text-sm" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-2 md:p-4 flex flex-col grow">
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
                      {product.discount}%
                    </span>
                  </div>

                  {/* BUTTON */}
                  <div className="mt-auto pt-3 md:pt-4 flex flex-col sm:flex-row gap-2">
                    {/* Add to Cart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] md:text-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaShoppingCart className="text-xs md:text-sm" />
                      Add to Cart
                    </button>

                    {/* Buy Now */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                      className="w-full cursor-pointer border border-gray-300 text-black text-[11px] md:text-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-black hover:text-white hover:scale-[1.03] active:scale-95 transition-all duration-200"
                    >
                      <AiOutlineThunderbolt />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE & SHOW LESS */}
          <div className="flex justify-center mt-10 gap-3 flex-wrap">
            {/* Load More */}
            {visibleProducts < filteredProducts.length && (
              <button
                onClick={loadMore}
                className="cursor-pointer px-6 py-2 rounded-full text-sm font-medium 
      bg-gradient-to-r from-blue-600 to-purple-600 text-white 
      shadow-md hover:shadow-lg hover:scale-105 active:scale-95 
      transition-all duration-200"
              >
                Load More
              </button>
            )}

            {/* Show Less */}
            {visibleProducts > 8 && (
              <button
                onClick={showLess}
                className="cursor-pointer px-6 py-2 rounded-full text-sm font-medium 
      border border-gray-300 text-black 
      hover:bg-black hover:text-white 
      hover:scale-105 active:scale-95 
      transition-all duration-200"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Collections;
