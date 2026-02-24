import React from "react";
import Mainpage from "./HomePage/Mainpage";
import Featured from "./HomePage/Featured";
import Trending from "./HomePage/Trending";
import About from "./HomePage/About";
import Signup from "./HomePage/Signup";

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
