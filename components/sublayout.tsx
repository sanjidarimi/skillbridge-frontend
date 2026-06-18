"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./global/Footer";
import Navbar from "./global/Navbar";

export default function SubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      {pathname !== "/login" && <Navbar />}

      <section className="min-h-screen">{children}</section>
      {pathname !== "/login" && <Footer />}
    </>
  );
}
