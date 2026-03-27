"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { FaBoxArchive } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

import ProductCard from "../../components/ProductCard";
import { getProductById, getAllProducts } from "@/api/productApi";
import { addToCart } from "@/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import { addOrder } from "@/redux/orderSlice";

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [sizes] = useState(["XS", "S", "M", "L", "XL"]);
  const [selectedSize, setSelectedSize] = useState("S");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        // Set active image
        if (productData.images && productData.images.length > 0) {
          setActiveImage(productData.images[0]);
        } else if (productData.image) {
          setActiveImage(productData.image);
        }

        const all = await getAllProducts();
        setAllProducts(all);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // Wishlist toggle
  const toggleWishlist = (e) => {
    e.stopPropagation();
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      }),
    );
  };

  // Buy Now
  const handleBuyNow = () => {
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

  // Related products
  const getRelatedProducts = () => {
    if (!product || allProducts.length === 0) return [];
    const sameCategory = allProducts.filter(
      (p) => p.id !== product.id && p.category === product.category,
    );
    const others = allProducts.filter(
      (p) => p.id !== product.id && p.category !== product.category,
    );
    const related = [...sameCategory, ...others];
    return related.slice(0, 4);
  };

  // Thumbnails generation
  const getThumbnails = () => {
    if (product.images && product.images.length) return product.images;
    const idNum = product.id || 1;
    return [
      product.image,
      `https://picsum.photos/id/${(idNum % 100) + 1}/300/300`,
      `https://picsum.photos/id/${(idNum % 100) + 20}/300/300`,
      `https://picsum.photos/id/${(idNum % 100) + 40}/300/300`,
    ].filter(Boolean);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading product details...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Product not found</p>
      </div>
    );

  const thumbnails = getThumbnails();
  const relatedProducts = getRelatedProducts();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <>
      <section className="bg-[#fcfcfc] py-24 w-full px-6">
        <h2 className="text-xl sm:text-2xl text-center font-bold text-black  pt-5">
          Product Details
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Explore detailed information about this product, including features,
          pricing, and specifications to help you make the right choice.
        </p>
        <div className="pt-10 md:flex">
          <div className="max-w-7xl mx-auto  lg:flex gap-8">
            {/* LEFT IMAGE SECTION */}
            <div className="w-full lg:w-[60%] flex flex-col lg:flex-row gap-6 flex-shrink-0">
              <div className="w-full aspect-[3/4] relative overflow-hidden order-1">
                <img
                  src={activeImage}
                  className="w-full h-full object-cover"
                  alt={product.title}
                />
                {/* Wishlist Heart Icon */}
                <button
                  onClick={toggleWishlist}
                  className="absolute cursor-pointer top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:scale-105 transition"
                >
                  {isInWishlist ? (
                    <IoMdHeart className="text-xl text-red-500" />
                  ) : (
                    <IoMdHeartEmpty className="text-xl text-black" />
                  )}
                </button>
              </div>

              {/* THUMBNAILS */}
              <div className="flex flex-row lg:flex-col gap-4 mt-4 md:mt-0 order-2 lg:order-none">
                {thumbnails.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 sm:w-20 h-20 sm:h-24 object-cover cursor-pointer border ${
                      activeImage === img
                        ? "border-black"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    alt={`Thumbnail ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:w-[40%] md:px-5 mt-8 md:mt-0">
              <div>
                <h4 className="text-[#6b7280] uppercase font-extralight mb-5 pt-10 text-[10px] tracking-[3px]">
                  {product.category || "Product Details"}
                </h4>
                <p className="font-serif mb-5 text-xl md:text-3xl  text-black">
                  {product.title}
                </p>
                <span className="font-serif text-lg sm:text-2xl text-[#4b5563]">
                  ${product.price}
                </span>
              </div>

              <div className="mb-10  mt-4">
                <i className="font-serif text-md line-clamp-3 sm:text-md text-[#4b5563]">
                  {product.description}
                </i>
              </div>

              {/* SIZE */}
              <div className="mt-10">
                <div className="flex justify-between my-2 mb-4">
                  <h3 className="uppercase text-xs tracking-widest font-bold text-black">
                    select size
                  </h3>
                  <a
                    className="uppercase text-[#4b5563] text-[10px] tracking-widest border-b border-[#4b5563]"
                    href=""
                  >
                    size guide
                  </a>
                </div>
                <div className="flex gap-4">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => handleSizeClick(size)}
                      className={`w-10 sm:w-13 h-10 sm:h-13 aspect-square flex items-center justify-center rounded-full border text-black cursor-pointer
                        ${selectedSize === size ? "bg-black text-white" : "border-[#e5e7eb] hover:border-black"}`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="w-full mt-7 mb-5 flex  gap-4">
                <button
                  onClick={handleAddToCart}
                  className="text-white cursor-pointer flex items-center w-1/2  justify-center gap-2 cursor-pointer   text-sm bg-black hover:bg-gray-800 px-6  py-4.5 uppercase"
                >
                  <FaShoppingCart />
                  add to bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex items-center cursor-pointer w-1/2 justify-center gap-2 bg-black text-white py-4.5 px-3 uppercase text-sm hover:bg-gray-800 transition"
                >
                  <AiOutlineThunderbolt className="text-lg" />
                  Buy Now
                </button>
              </div>

              {/* SHIPPING & STOCK */}
              <div className="border-y border-[#f3f4f6] flex gap-7 justify-center items-center py-5">
                <p className="flex items-center gap-2 text-[10px] tracking-widest text-[#6b7280] uppercase">
                  <BsTruck className="text-[13px] text-[#6b7280]" /> free
                  express shipping
                </p>
                <p className="flex items-center gap-2 text-[10px] tracking-widest text-[#6b7280] uppercase">
                  <FaBoxArchive className="text-[13px] text-[#6b7280]" />{" "}
                  {product.rating?.count > 0 ? "in stock" : "out of stock"}
                </p>
              </div>

              {/* ABOUT PRODUCT */}
              <div className="mt-10">
                <div
                  className="border-t border-[#f3f4f6] cursor-pointer"
                  onClick={() => toggleSection(0)}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="uppercase text-[12px] py-7 font-bold text-black tracking-[2px]">
                      details & fit
                    </h2>
                    <IoIosArrowDown
                      className={`transition-transform duration-300 text-black ${
                        openSections.includes(0) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openSections.includes(0)
                        ? "max-h-[400px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#4b5563] text-[15px] mb-4">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div
                  className="border-t border-[#f3f4f6] cursor-pointer"
                  onClick={() => toggleSection(1)}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="uppercase text-[12px] py-6 font-bold text-black tracking-[2px]">
                      Composition & Care
                    </h2>
                    <IoIosArrowDown
                      className={`transition-transform duration-300 text-black ${
                        openSections.includes(1) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openSections.includes(1)
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[15px] mb-3 text-[#4b5563]">
                      100% Premium Material
                    </p>
                    <p className="text-[#4b5563] text-[15px] mb-5">
                      Professional dry clean only.
                    </p>
                  </div>
                </div>

                <div
                  className="border-t border-[#f3f4f6] cursor-pointer"
                  onClick={() => toggleSection(2)}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="uppercase text-[12px] py-6 font-bold text-black tracking-[2px]">
                      Shipping & Returns
                    </h2>
                    <IoIosArrowDown
                      className={`transition-transform duration-300 text-black ${
                        openSections.includes(2) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openSections.includes(2)
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#4b5563] text-[15px] mb-5">
                      Complimentary express shipping on all orders over $500.
                      Returns accepted within 14 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div>
          <ProductCard productData={relatedProducts} />
        </div>
      )}
    </>
  );
};

export default Product;
