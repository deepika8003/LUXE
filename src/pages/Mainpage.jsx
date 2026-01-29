import React from "react";
import { HiChevronDown } from "react-icons/hi";

const Mainpage = () => {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKbqioNjiaGylHsUhnUaj5e0_oUQthm3fH0-KxtqwwvY3u2e3eAPluQJ14aZy-qP3ScqkFuSZflu87fo24Jv1ggebHzPAiNBa6AwjP9P1rnIGtr0qFbFBvack0wd0ls2P9BIsRZeg3nDQ79kNBURw_77RaxgweTRB28WMSU22w-CQz5P_yw9bXM-ra16BXNk7qh4hvPAvYQ-dPJuC_zETK6maSajgfojlY6fUCsNViLRXV810gDUu4jJm6dpbuG1GorQkwN11gTFA')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <i className="mb-4 font-serif text-3xl  text-white/80 ">
          Autumn / Winter 2024
        </i>

        <h1 className=" text-4xl md:text-6xl font-bold text-white md:text-6xl lg:text-7xl">
          THE NEW <br /> STANDARD
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row gap-6">
          <button className="bg-white px-8 py-4 text-md  tracking-widest rounded-xs text-black hover:text-white hover:bg-[#1152d4] transition">
            SHOP MEN
          </button>

          <button className="bg-white px-8 py-4 text-md  tracking-widest rounded-xs text-black hover:text-white hover:bg-[#1152d4] transition">
            SHOP WOMEN
          </button>
        </div>
      </div>
      {/* DOWN ARROW */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
        <HiChevronDown className="text-white text-3xl opacity-80" />
      </div>
    </section>
  );
};

export default Mainpage;
