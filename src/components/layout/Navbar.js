import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router";
import { TiArrowBack } from "react-icons/ti";

export default function Navbar({ title }) {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-200 px-2 sm:px-4 py-5 flex items-center justify-between fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
      <div className="flex-1">
        {title === "Products" ? "" : <div className="py-1"><TiArrowBack onClick={() => navigate("/products")} className="text-white text-2xl cursor-pointer" /></div>}
      </div>

      <div className="flex-auto">
        <div>{title}</div>
      </div>
      <button
        onClick={() => navigate("/cart")}
        className={`${title === "Products" ? "flex" : "hidden"} items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 `}
      >
        <GiShoppingBag /> <span className="ml-2">Go to Cart</span>
      </button>
    </nav>
  );
}
