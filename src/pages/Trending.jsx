import React from "react";
import { BsPlusLg } from "react-icons/bs";
// PRODUCT DATA
const products = [
  {
    id: 1,
    title: "Cashmere Overcoat",
    category: "Outerwear",
    price: "$850.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjefRmKh9Ku3PvgSntBasogV94LwdiqA8R9C2_2nlNFaJikk5taowM4bTHAvX6euda-KAUqoUf8a_6vdo_J4ge4DlguYCdXAEwKFpauu5mD0JNhYGz_G53winsOMhOOiJDyUxMkXLeaDGzT1p55sqZW-kwL9UU2hKOCf4VWN1hrGDylrRnaRMU0ngc2bIWnIPRuzfAEBXHs4ejePYOC48a4l-VJ5UgHA78nQw8drISg0KK1-0slJxAdB1pCBdt6jjnLl_vU5xFIkc",
  },
  {
    id: 2,
    title: "Silk maxi dress",
    category: "dresses",
    price: "$420.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAffqwN00XAl1h8G56Fp3FL4FVgQq6265FlcgMp1XR4imu6kGs-sElH9ahoLEcgSwnBR3piVDMKMMtznRpocdlTmWhF0T9sZaCGZXR_mpWj7CBSmHem_96MI3-FJeqslO0lsqcHvxfxyzN2ypDXOO3v8IpQtYWB1A0tM06goZl8l1uj9RYt_hEO91TDXjqLp147XDhZA_gLlc0HfNzqnEagJcesiR8jRmDnqNCk8hxyiCgHLHGUikP5hdkdXPkCB5GHbNgtgpNRxv4",
  },
  {
    id: 3,
    title: " Metier tote bag",
    category: "Accessories",
    price: "$1,150.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCd-a8CTigA31Y7IXeIOsjLxTEQemi0DLysgX3O1VbppzoddGlcUoxBv9xppfgFWsZhbcoR6kg159PMhox7bOpZ03M5Iti5CAc9IauMza5nikPXFKUL9PG2BMPFrIdpRNrvqdaet-YArEeN_WmNLXMlhVQY2wc74BPkxyB5r9ldN4SZuMtFGo6ROrt9y3pBZgGr9jm0n3WRkiS4InS2EMPM7ULK8rg0VAvlrOm9Wx-kYYZq4ekPVPeDSBKDvCZyOJw7x-9LQgonDac",
  },
  {
    id: 4,
    title: "Relaxed linen shirt",
    category: "shirt",
    price: "$185.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUtjfQ10jwehXkcpLnxXaE6TvnZFHvmgbhTqvN_SXmmdeSruS15OomGGFDe5led_XYN24rucRb1oWId0He6LcrfVvYzxIUrcOAJ3NqshUL4XHp82kgcMVVHvAld2rYu56qTFlUWPq0mHaj0Ify9TbNs4qOXhvSs4mMC9cYMnJzBkMUQ6e3GUZ58E2v0qfWFby2NFh1jX1MRFC8lbYnobMQBjhfP1NUnsXu7hLxfgwJunGkv4ItF-saIQpDZsY0t2xSRJvUL3UgP_E",
  },
];

const Trending = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <h2 className="text-black text-4xl mb-10 text-center font-serif">
          Trending Now
        </h2>
        {/* SCROLL DIV */}
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-10">
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
                  <button className="w-full flex justify-center items-center gap-2 bg-gray-950 text-white py-4 text-xs font-bold uppercase tracking-widest">
                    <BsPlusLg />
                    Add to Bag
                  </button>
                </div>
              </div>
              {/* ABOUT PRODUCT DIV*/}
              <div>
                <h4 className="text-black mb-1 text-sm  font-bold uppercase">
                  {item.title}
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
