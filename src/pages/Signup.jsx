import React from "react";

const Signup = () => {
  return (
    <section className="w-full bg-[#f6f6f8] px-10 py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT CONTENT */}
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl text-black font-serif font-medium">
            Join The Circle
          </h1>
          <p className="text-[#6b7280] leading-7">
            Subscribe for early access to new collections, editorial stories,
            and exclusive events.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full max-w-xl">
          <div className="flex items-center border-b border-gray-300 hover:border-[#155dfc]">
            {/* INPUT */}
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-transparent py-4 text-xl outline-none placeholder:text-[#6b7280]"
            />

            {/* BUTTON */}
            <button className="whitespace-nowrap text-black py-4 text-xs tracking-widest hover:text-[#155dfc]">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
