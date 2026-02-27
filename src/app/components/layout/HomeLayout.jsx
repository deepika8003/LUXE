import React from "react";
import Nav from "../Nav";
import Footer from "../Footer";

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
