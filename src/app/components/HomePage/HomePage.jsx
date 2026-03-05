"use client";

import React from "react";
import Mainpage from "./Mainpage";
import Featured from "./Featured";
import Trending from "./Trending";
import About from "./About";
import Signup from "./Signup";

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
