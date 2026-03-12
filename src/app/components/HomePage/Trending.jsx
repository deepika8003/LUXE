"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { getAllProducts } from "@/api/productApi";

const Trending = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products);
  const [apiProducts, setApiProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setApiProducts(data);
    };

    fetchProducts();
  }, []);
  const allProducts = [...products, ...apiProducts];
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-black text-4xl mb-10 text-center font-serif">
          Trending Now
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-10">
          {allProducts?.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] md:min-w-[350px] group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 bg-cover bg-center"
                  style={{ backgroundImage: `url("${item.image}")` }}
                ></div>

                <div className="absolute bottom-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          description: item.description,
                          discount: item.discount,
                          originalPrice: item.originalPrice,
                          offerCount: item.offerCount,
                          qty: 1,
                        }),
                      )
                    }
                    className="w-full flex justify-center items-center gap-2 bg-gray-950 active:bg-gray-800 text-white py-4 text-xs font-bold uppercase tracking-widest"
                  >
                    <BsPlusLg />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-black mb-1 text-sm font-bold uppercase">
                  {item.name}
                </h4>
                <p className="text-[#6b7280] text-xs uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <p className="text-black font-serif text-lg">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
