import React from "react";
import { FaAward } from "react-icons/fa";

const About = () => {
  return (
    <section className="flex  items-center justify-center bg-[#f6f6f8] border-b border-[#e5e7eb] px-10 py-25">
      <div className="mx-auto max-w-4xl text-center">
        {/* ICON */}
        <div className="mb-8 flex justify-center">
          <FaAward className="text-4xl text-blue-600" />
        </div>

        {/* HEADING */}
        <h1 className="font-serif text-3xl leading-snug text-[#0b0f18] sm:text-4xl md:text-5xl">
          Crafting the future of fashion through intentional design and
          sustainable luxury.
        </h1>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-6 max-w-3xl text-xl leading-7 text-[#4b5563] ">
          At LUXE, we believe that style should be effortless, and luxury should
          be conscious. Every piece in our collection is crafted with the
          highest quality materials and ethical practices to ensure they remain
          staples in your wardrobe for years to come.
        </p>

        {/* LINK */}
        <div className="mt-10">
          <a
            href="#"
            className="inline-block border-b-2 border-[#1152d4] pb-1 text-xs font-extralight tracking-widest text-[#0b0f18] hover:text-[#1152d4]"
          >
            OUR STORY
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
