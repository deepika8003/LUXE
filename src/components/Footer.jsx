import React from "react";
import { BiWorld } from "react-icons/bi";
import { FiCamera } from "react-icons/fi";
import { CiAt } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b0f18] text-sm text-[#b6bdc7]   ">
      {/* TOP FOOTER */}
      <div className="mx-auto px-4 md:px-6 grid max-w-7xl grid-cols-1 gap-12 py-21  md:grid-cols-2 lg:grid-cols-4 border-b border-[#1f2430]">
        {/* BRAND */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-white pb-3">
            LUXE
          </h2>

          <p className=" text-[#9ca3af]">
            Defining modern luxury since 2012. Our mission is to provide
            timeless apparel for the conscious modern individual.
          </p>

          <div className="flex gap-4">
            <div className="border text-[#9ca3af] border-white p-2.5 text-sm rounded-full hover:bg-white hover:text-black">
              <BiWorld />
            </div>
            <div className="border text-[#9ca3af] border-white p-2.5 text-sm rounded-full hover:bg-white hover:text-black">
              <FiCamera />
            </div>
            <div className="border text-[#9ca3af] border-white p-2.5 text-sm rounded-full hover:bg-white hover:text-black">
              <CiAt />
            </div>
          </div>
        </div>

        {/* COLLECTIONS */}
        <div>
          <h3 className="mb-8 font-semibold tracking-widest text-white">
            COLLECTIONS
          </h3>
          <ul className="space-y-4 text-[#9ca3af]">
            <li className="hover:text-white cursor-pointer">New Arrivals</li>
            <li className="hover:text-white cursor-pointer">Best Sellers</li>
            <li className="hover:text-white cursor-pointer">Men’s Apparel</li>
            <li className="hover:text-white cursor-pointer">Women’s Apparel</li>
            <li className="hover:text-white cursor-pointer">Accessories</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="mb-8 font-semibold tracking-widest text-white">
            SUPPORT
          </h3>
          <ul className="space-y-4 text-[#9ca3af]">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-white cursor-pointer">Order Tracking</li>
            <li className="hover:text-white cursor-pointer">Size Guide</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* VISIT US */}
        <div className="space-y-4 text-[#9ca3af]">
          <h3 className="mb-8 font-semibold tracking-widest text-white">
            VISIT US
          </h3>

          <p>
            742 Madison Ave,
            <br />
            New York, NY 10065
          </p>

          <p className="pt-2">Mon – Sat: 10:00 – 19:00</p>
          <p>Sun: 12:00 – 18:00</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 py-9 text-xs text-center md:text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-[#7f8899] text-[10px]">
            © 2024 LUXE ATELIER. ALL RIGHTS RESERVED.
          </p>

          <ul className="flex justify-center gap-6 uppercase tracking-widest text-[#7f8899] text-[10px] lg:justify-end">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer">Accessibility</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
