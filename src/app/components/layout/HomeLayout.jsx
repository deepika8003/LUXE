"use client";

import React from "react";
import Nav from "../HomePage/Nav";
import Footer from "../HomePage/Footer";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
