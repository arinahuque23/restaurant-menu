"use client";
import React from "react";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/dashboard" && <Navbar />}
      {children}
    </>
  );
};

export default MainLayout;
