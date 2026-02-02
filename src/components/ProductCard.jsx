import React from "react";
import { BsPlusLg } from "react-icons/bs";

const ProductCard = ({ productData }) => {
  return (
    <section className="w-full bg-[#f9fafb] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* TITLE */}
        <h2 className="mb-10 text-center font-serif text-3xl md:text-4xl text-black">
          Complete the Look
        </h2>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productData.map((product) => (
            <div key={product.id} className="group cursor-pointer relative">
              {/* IMG */}
              <div className="mb-4 relative aspect-[3/4] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${product.image})` }}
                  aria-label={product.title}
                />

                {/* ADD TO BAG BUTTON */}
                <div className="absolute bottom-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full flex justify-center items-center gap-2 bg-gray-950 text-white py-4 text-xs font-bold uppercase tracking-widest">
                    <BsPlusLg />
                    Add to Cart
                  </button>
                </div>
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
