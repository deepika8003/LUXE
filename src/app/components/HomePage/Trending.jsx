"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

const Trending = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This runs only after hydration
    setIsMounted(true);
  }, []);

  // During SSR and initial client render, show nothing (or a skeleton)
  if (!isMounted) {
    return (
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-black text-4xl mb-10 text-center font-serif">
            Trending Now
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-10">
            {/* Optional: render skeleton cards here to prevent layout shift */}
          </div>
        </div>
      </section>
    );
  }

  // After hydration, render the real products
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-black text-4xl mb-10 text-center font-serif">
          Trending Now
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] md:min-w-[350px] group cursor-pointer"
            >
              {/*PRODUCT IMG DIV */}
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <div
                  className="absolute inset-0  transition-transform duration-500 group-hover:scale-105 bg-cover bg-center"
                  style={{ backgroundImage: `url("${item.image}")` }}
                ></div>

                <div className="absolute bottom-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="w-full flex justify-center cursor-pointer items-center gap-2 bg-gray-950 text-white py-4 text-xs font-bold uppercase tracking-widest"
                  >
                    <BsPlusLg />
                    Add to Cart
                  </button>
                </div>
              </div>
              {/* ABOUT PRODUCT DIV*/}
              <div>
                <h4 className="text-black mb-1 text-sm  font-bold uppercase">
                  {item.name}
                </h4>
                <p className="text-[#6b7280] text-xs uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <p className=" text-black font-serif text-lg">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
