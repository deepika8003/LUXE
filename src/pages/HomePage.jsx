"use client";

export const dynamic = "force-dynamic";
import React from "react";
import Mainpage from "../app/components/HomePage/Mainpage";
import Featured from "../app/components/HomePage/Featured";
import Trending from "../app/components/HomePage/Trending";
import About from "../app/components/HomePage/About";
import Signup from "../app/components/HomePage/Signup";

const HomePage = () => {
  return (
    <div>
      <Mainpage />
      <Featured />
      <Trending />
      <About />
      <Signup />
    </div>
  );
};

export default HomePage;
