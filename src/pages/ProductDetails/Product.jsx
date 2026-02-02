"use client";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { FaBoxArchive } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";

const Product = () => {
  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  const thumbnails = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCjefRmKh9Ku3PvgSntBasogV94LwdiqA8R9C2_2nlNFaJikk5taowM4bTHAvX6euda-KAUqoUf8a_6vdo_J4ge4DlguYCdXAEwKFpauu5mD0JNhYGz_G53winsOMhOOiJDyUxMkXLeaDGzT1p55sqZW-kwL9UU2hKOCf4VWN1hrGDylrRnaRMU0ngc2bIWnIPRuzfAEBXHs4ejePYOC48a4l-VJ5UgHA78nQw8drISg0KK1-0slJxAdB1pCBdt6jjnLl_vU5xFIkc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDbRBWytVXZ3FdN0Y9wqgE1QxXLHyLH-mlS5xOsGOddzRSgfWumfRnrQz9skd-x_yXQuT-_RyFKUqwrf_7dp1AFANTzvwscz5DiJPTOjW6RXu1Sj9-hZ2zCj_eq678PcrMeCjuWWPBaX_7IOWtNqzO0Rh225rXNMMvG8BvbEeMdJjoIrZ5KuWnPDnWnfUmQ8UZMp5dn5h6NvIuQwPN9SU_keeME07vqaY32dDC4kxqODkzKfwfRCBU62OjX5R9uITaRgr7Hw2pTO4M",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAKbqioNjiaGylHsUhnUaj5e0_oUQthm3fH0-KxtqwwvY3u2e3eAPluQJ14aZy-qP3ScqkFuSZflu87fo24Jv1ggebHzPAiNBa6AwjP9P1rnIGtr0qFbFBvack0wd0ls2P9BIsRZeg3nDQ79kNBURw_77RaxgweTRB28WMSU22w-CQz5P_yw9bXM-ra16BXNk7qh4hvPAvYQ-dPJuC_zETK6maSajgfojlY6fUCsNViLRXV810gDUu4jJm6dpbuG1GorQkwN11gTFA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA1IzqIFF44MKbyYUYp9Gvi8DVMADs8vR_oMGzOWTkv7v8wTXRYwrl0tYuRRLhTuBcMpmtt4lh_DpYKwOvJNK0XW5NbLB6RSdO10Gt1gBXyhtL0_5qsCZUm4dvLfOn9pnZQ9xxNzHg7-0fRLmcg8qP_J5KFJEoCGB98hNvBEK3WUL2F1AWgE4eO1rnRarZHJy3t2QbaW7YZN4XOsUfYuo6jydcvnU13VFKdxJgshTrcKz8XSaN3lzHaUX9n_6z2R05Fda34ILL7YhI",
  ];
  const [activeImage, setActiveImage] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCjefRmKh9Ku3PvgSntBasogV94LwdiqA8R9C2_2nlNFaJikk5taowM4bTHAvX6euda-KAUqoUf8a_6vdo_J4ge4DlguYCdXAEwKFpauu5mD0JNhYGz_G53winsOMhOOiJDyUxMkXLeaDGzT1p55sqZW-kwL9UU2hKOCf4VWN1hrGDylrRnaRMU0ngc2bIWnIPRuzfAEBXHs4ejePYOC48a4l-VJ5UgHA78nQw8drISg0KK1-0slJxAdB1pCBdt6jjnLl_vU5xFIkc",
  );

  const [sizes] = useState(["XS", "S", "M", "L", "XL"]);
  const [selectedSize, setSelectedSize] = useState("S");

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    console.log("Selected size:", size);
  };
  const products = [
    {
      id: 1,
      title: "Silk Maxi Dress",
      price: "420.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAffqwN00XAl1h8G56Fp3FL4FVgQq6265FlcgMp1XR4imu6kGs-sElH9ahoLEcgSwnBR3piVDMKMMtznRpocdlTmWhF0T9sZaCGZXR_mpWj7CBSmHem_96MI3-FJeqslO0lsqcHvxfxyzN2ypDXOO3v8IpQtYWB1A0tM06goZl8l1uj9RYt_hEO91TDXjqLp147XDhZA_gLlc0HfNzqnEagJcesiR8jRmDnqNCk8hxyiCgHLHGUikP5hdkdXPkCB5GHbNgtgpNRxv4",
    },
    {
      id: 2,
      title: "Metier Tote Bag",
      price: "1,150.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCd-a8CTigA31Y7IXeIOsjLxTEQemi0DLysgX3O1VbppzoddGlcUoxBv9xppfgFWsZhbcoR6kg159PMhox7bOpZ03M5Iti5CAc9IauMza5nikPXFKUL9PG2BMPFrIdpRNrvqdaet-YArEeN_WmNLXMlhVQY2wc74BPkxyB5r9ldN4SZuMtFGo6ROrt9y3pBZgGr9jm0n3WRkiS4InS2EMPM7ULK8rg0VAvlrOm9Wx-kYYZq4ekPVPeDSBKDvCZyOJw7x-9LQgonDac",
    },
    {
      id: 3,
      title: "Relaxed Linen Shirt",
      price: "185.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUtjfQ10jwehXkcpLnxXaE6TvnZFHvmgbhTqvN_SXmmdeSruS15OomGGFDe5led_XYN24rucRb1oWId0He6LcrfVvYzxIUrcOAJ3NqshUL4XHp82kgcMVVHvAld2rYu56qTFlUWPq0mHaj0Ify9TbNs4qOXhvSs4mMC9cYMnJzBkMUQ6e3GUZ58E2v0qfWFby2NFh1jX1MRFC8lbYnobMQBjhfP1NUnsXu7hLxfgwJunGkv4ItF-saIQpDZsY0t2xSRJvUL3UgP_E",
    },
    {
      id: 4,
      title: "Ankle Boot Noir",
      price: "550.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDECsHXjR4_zXBt-4ehhJGwhbLnH9Hk0DraJLo2Tukxy15wzwDX--oYuxS-zaRfvYxj5qHiyGQ8Pzgg4hFQJt4PP1hu7Y2XBV5SX9ThF9YTawogfXTtlv2zWNalS_QCIz8zqobl_3LV0Qgz-6nKeK5Lfm7x8fvLxX3mtRq_XASSWmF8WFVAUPKzyOZzP7xEhh8R3G-ZjKC8c2VpoiUptbZZTYqG_1N_6_CbiSHNTVRaVyKj-ZMnyq24RKfPpcjTRLNYOfE5EgZCaJY",
    },
  ];

  return (
    <>
      <section className="bg-[#fcfcfc] py-24 w-full">
        <div className=" py-10  md:flex">
          <div className="max-w-7xl mx-auto px-6 md:flex gap-8">
            {/* LEFT IMAGE SECTION */}
            <div className="md:w-[60%] flex flex-col md:flex-row gap-6 flex-shrink-0">
              {/* MAIN IMAGE */}
              <div className="w-full aspect-[3/4] relative overflow-hidden order-1">
                <img
                  src={activeImage}
                  className="w-full h-full object-cover"
                  alt="Product"
                />
                {/* HEART ICON */}
                <div className="absolute top-4 right-4 w-10 h-12 flex items-center justify-center rounded-full bg-white shadow">
                  <IoMdHeartEmpty className="text-xl text-black" />
                </div>
              </div>

              {/* THUMBNAILS */}
              <div className="flex flex-row md:flex-col gap-4 mt-4 md:mt-0 order-2 md:order-none">
                {thumbnails.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 sm:w-20 h-20 sm:h-24  object-cover cursor-pointer border ${
                      activeImage === img
                        ? "border-black"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:w-[40%] md:px-5 mt-8 md:mt-0">
              {/* HEADING */}
              <div>
                <h4 className="text-[#6b7280] uppercase font-extralight mb-5 pt-10 text-[10px] tracking-[3px]">
                  The winter edit - outwear
                </h4>

                <p className=" font-serif mb-5 text-3xl md:text-5xl text-black ">
                  Cashmere Overcoat
                </p>
                <span className="font-serif text-2xl text-[#4b5563] ">
                  $850.00
                </span>
              </div>
              {/* PARAGRAPH */}
              <div className="mb-18 mt-8">
                <i className="font-serif text-xl text-[#4b5563] ">
                  A study in quiet luxury. This overcoat is masterfully tailored
                  from the finest Italian cashmere, designed to drape with an
                  effortless weight that captures the essence of modern
                  sophistication.
                </i>
              </div>
              {/* SIZE  */}
              <div className="mt-10">
                <div className="flex justify-between my-2 mb-4">
                  <h3 className="uppercase text-xs tracking-widest font-bold text-black  ">
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
            ${selectedSize === size ? " bg-black text-white" : "border-[#e5e7eb] hover:border-black"}
          `}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* ADD TO BAG  */}

              <div className="w-full mt-10 mb-5">
                <button className="text-white tracking-[5] text-sm bg-black hover:bg-gray-800 w-full py-4.5 uppercase text">
                  add to bag
                </button>
              </div>

              {/* SHIPPING & STOCK */}

              <div className="border-y border-[#f3f4f6]  flex gap-7 justify-center items-center py-5">
                <p className="flex items-center  gap-2 text-[10px] tracking-widest text-[#6b7280] uppercase">
                  <BsTruck className="text-[13px] text-[#6b7280]" /> free
                  express shipping
                </p>
                <p className=" flex items-center gap-2 text-[10px] tracking-widest text-[#6b7280] uppercase">
                  <FaBoxArchive className="text-[13px] text-[#6b7280]" />{" "}
                  instock
                </p>
              </div>

              {/* ABOUT PRODUCT */}
              <div className="mt-10">
                {/* Details & Fit */}
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
                      Designed for a relaxed, tailored fit. Our model is 6'2"
                      and wears a size Small.
                    </p>
                    <div className="text-[#4b5563] text-[15px] leading-7 px-4 pb-3">
                      <li>Peak lapel and structured shoulders</li>
                      <li>Double-breasted front with horn buttons</li>
                      <li>Two internal welt pockets</li>
                      <li>Back vent for movement</li>
                    </div>
                  </div>
                </div>

                {/* Composition & Care */}
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
                      100% Mongolian Cashmere
                    </p>
                    <p className="text-[#4b5563] text-[15px] mb-5">
                      Lining: 100% Cupro. Professional dry clean only. Store on
                      a wide-shoulder hanger to maintain silhouette.
                    </p>
                  </div>
                </div>

                {/* Shipping & Returns */}
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
                      Returns are accepted within 14 days of receipt for a full
                      refund or exchange. Items must be in original condition
                      with all tags attached.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductCard productData={products} />
    </>
  );
};

export default Product;
