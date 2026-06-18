import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import React from "react";

export default function Tutorlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
