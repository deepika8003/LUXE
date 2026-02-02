import React from "react";

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

const ProductCard = () => {
  return (
    <section className="w-full bg-[#f9fafb] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* TITLE */}
        <h2 className="mb-10 text-center font-serif text-4xl text-black">
          Complete the Look
        </h2>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2  md:grid-cols-4  gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* IMG */}
              <div className="mb-4 relative aspect-[3/4] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${product.image})` }}
                  aria-label={product.title}
                />
              </div>

              {/* CONTENT */}
              <div className="space-y-2">
                <h5 className="text-[9.5px] font-bold uppercase tracking-widest text-black">
                  {product.title}
                </h5>
                <p className="font-serif text-lg text-black">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
