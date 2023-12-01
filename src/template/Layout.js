import React from "react";
import Header from "../component/Header";
import CategoriesHeader from "../component/CategoriesHeader";
import Footer from "../component/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <CategoriesHeader />
      <div className="pt-48">{children}</div>
      <Footer />
    </div>
  );
}
