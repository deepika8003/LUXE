import React from "react";
import HomeLayout from "../components/layout/HomeLayout";
import Profile from "./Profile";

const page = () => {
  return (
    <div>
      <HomeLayout>
        <Profile />
      </HomeLayout>
    </div>
  );
};

export default page;
