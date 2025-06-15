import React from "react";
import Navbar from "../Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
     <Navbar/>
      {children}
    </>
  );
};

export default MainLayout;
