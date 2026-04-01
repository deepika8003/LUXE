import React from "react";
import Wishlist from "./Wishlist";
import HomeLayout from "@/app/components/layout/HomeLayout";

const page = () => {
  return (
    <div>
      <HomeLayout>
        <Wishlist />
      </HomeLayout>
    </div>
  );
};

export default page;
