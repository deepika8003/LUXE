import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Featured = () => {
  return (
    <section className=" bg-[#f6f6f8] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP CONTENT */}
        <div className="block items-center justify-between mb-20">
          <div className="mb-5">
            <h2 className="font-serif text-5xl mb-4 text-black">
              Curated Edits
            </h2>
            <p className="text-[#6b7280] max-w-lg text-xl font-extralight ">
              Explore our meticulously crafted collections designed for the
              modern lifestyle.
            </p>
          </div>

          <div className="w-full relative">
            <a
              href="#"
              className=" absolute right-0 font-semibold flex items-center gap-2 text-sm tracking-widest uppercase "
            >
              View All Categories
              <IoIosArrowRoundForward className="text-2xl transform hover:translate-x-1 duration-300 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* IMAGE GRID */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {/* LEFT IMG */}
          <div className="col-span-2 relative group overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1IzqIFF44MKbyYUYp9Gvi8DVMADs8vR_oMGzOWTkv7v8wTXRYwrl0tYuRRLhTuBcMpmtt4lh_DpYKwOvJNK0XW5NbLB6RSdO10Gt1gBXyhtL0_5qsCZUm4dvLfOn9pnZQ9xxNzHg7-0fRLmcg8qP_J5KFJEoCGB98hNvBEK3WUL2F1AWgE4eO1rnRarZHJy3t2QbaW7YZN4XOsUfYuo6jydcvnU13VFKdxJgshTrcKz8XSaN3lzHaUX9n_6z2R05Fda34ILL7YhI"
              alt="Winter Edit"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* TEXT */}
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-xs tracking-[4px] uppercase mb-2">
                Featured Collection
              </p>
              <h3 className="font-serif text-4xl mb-4">The Winter Edit</h3>
              <button className="border border-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-white hover:text-black">
                Explore
              </button>
            </div>
          </div>

          {/* RIGHT IMG */}
          <div className="flex flex-col gap-6">
            {/* TOP IMG */}
            <div className="relative group overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbRBWytVXZ3FdN0Y9wqgE1QxXLHyLH-mlS5xOsGOddzRSgfWumfRnrQz9skd-x_yXQuT-_RyFKUqwrf_7dp1AFANTzvwscz5DiJPTOjW6RXu1Sj9-hZ2zCj_eq678PcrMeCjuWWPBaX_7IOWtNqzO0Rh225rXNMMvG8BvbEeMdJjoIrZ5KuWnPDnWnfUmQ8UZMp5dn5h6NvIuQwPN9SU_keeME07vqaY32dDC4kxqODkzKfwfRCBU62OjX5R9uITaRgr7Hw2pTO4M"
                alt="Essential Knits"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* TEXT */}
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="font-serif text-2xl mb-5">Essential Knits</h4>
                <a className="text-xs py-1 border-b tracking-widest uppercase ">
                  Shop Now
                </a>
              </div>
            </div>

            {/* BOTTOM IMG */}
            <div className="relative group overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDECsHXjR4_zXBt-4ehhJGwhbLnH9Hk0DraJLo2Tukxy15wzwDX--oYuxS-zaRfvYxj5qHiyGQ8Pzgg4hFQJt4PP1hu7Y2XBV5SX9ThF9YTawogfXTtlv2zWNalS_QCIz8zqobl_3LV0Qgz-6nKeK5Lfm7x8fvLxX3mtRq_XASSWmF8WFVAUPKzyOZzP7xEhh8R3G-ZjKC8c2VpoiUptbZZTYqG_1N_6_CbiSHNTVRaVyKj-ZMnyq24RKfPpcjTRLNYOfE5EgZCaJY"
                alt="Occasion Wear"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* TEXT */}
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="font-serif text-2xl mb-5"> Occasion Wear</h4>
                <a className="text-xs py-1 border-b tracking-widest uppercase ">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
