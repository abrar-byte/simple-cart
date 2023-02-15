import React, { useState } from "react";
import { FaBox } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { BsHeartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./layout/Navbar";
import { numberWithComma } from "../utils";
import { toast, ToastContainer } from "react-toastify";



const Cart = () => {
  const { cart, shipping, vat, discount, wishlist } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [isCode, setIsCode] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };
  const handleCheckout=()=>{
    if(cart.length > 0){
    toast.success("Checkout Success!", {
      theme: "colored",      
      hideProgressBar: true,  
      autoClose: 3000,
    });}else{
      toast.error("Your Cart is empty!", {
        theme: "colored",      
        hideProgressBar: true,  
        autoClose: 3000,
      });
    }
  }
  let sum = cart.reduce(addition, 0);
  if (isCode.toLowerCase() === "promo" && sum > 0 && isConfirm) {
    sum = sum - discount;
  }
  const total = sum;
  console.log(cart);
  return (
    <div>
      <Navbar title="Shopping Cart" />
      <div className="md:mx-auto mt-24 justify-items-center grid grid-cols-1 md:grid-cols-5 gap-4">
        <div
          className={`${
            cart.length < 1 ? "w-full md:max-w-2xl" : ""
          } p-5 rounded-md bg-white border justify-self-end border-gray-200 shadow-md col-span-3`}
        >
          <h1 className="mb-5 font-bold text-xl">
            {" "}
            Cart ({cart.length} items)
          </h1>
          {cart.length > 0 &&
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center md:flex-row md:max-w-3xl border-b pb-3 mb-5"
              >
                <div className="p-2 rounded-lg bg-gray-200">
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={` ../images/${item.image}`}
                    alt="cart"
                  />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <div className="flex items-center justify-between">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                      {item.name}
                    </h5>
                    <div className="flex border rounded-md items-center space-x-2">
                      <button
                        className=" text-gray-700 font-semibold px-3 border-r py-1 hover:bg-gray-400 hover:rounded-l-md"
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch({ type: "DECREASE", payload: item });
                          } else {
                            dispatch({ type: "REMOVE", payload: item });
                          }
                        }}
                      >
                        -
                      </button>
                      <p className="text-gray-700 px-2 font-semibold">
                        {item.quantity}
                      </p>
                      <button
                        className=" text-gray-700 font-semibold px-3 py-1 border-l hover:bg-gray-400 hover:rounded-r-md"
                        onClick={() =>
                          dispatch({ type: "INCREASE", payload: item })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="mb-3 uppercase text-sm font-normal text-gray-500 ">
                    {item.type} {item.color}
                  </p>
                  <p className="mb-1 uppercase text-sm font-normal text-gray-500 ">
                    COLOR {item.color}
                  </p>
                  <p className="mb-3 uppercase text-sm font-normal text-gray-500 ">
                    SIZE {item.size}
                  </p>
                  <div className="grid md:flex justify-between items-center md:w-96">
                    <div className="flex">
                      <div
                        className="flex items-center cursor-pointer hover:opacity-50"
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: item })
                        }
                      >
                        <FaBox />
                        <span className="uppercase ml-2 text-sm text-gray-400">
                          remove item
                        </span>
                      </div>
                      <div
                        className="ml-3 flex items-center cursor-pointer hover:opacity-50"
                        onClick={() =>
                          dispatch({ type: "ADD_TO_WISHLIST", payload: item })
                        }
                      >
                        <BsHeartFill
                          className={
                            wishlist.find((x) => x.id === item.id)
                              ? "text-red-600"
                              : ""
                          }
                        />
                        <span className="uppercase ml-2 text-sm text-gray-400">
                          move to wishlist
                        </span>
                      </div>
                    </div>
                    <div>Rp {numberWithComma(item.price * item.quantity)}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-2 justify-self-start">
          <div className="p-5  rounded-md h-72 w-screen md:w-auto bg-white border border-gray-200 shadow-md">
            <h1 className="mb-5 font-bold text-xl"> The total amount of</h1>
            {isCode.toLowerCase() === "promo" && sum > 0 && isConfirm && (
              <p className="text-xs text-gray-400 italic font-bold">
                Hooray, you got a discount
              </p>
            )}
            <div className="flex justify-between md:w-80">
              <span className="text-gray-400">Temporary Amount</span>
              <span className="text-gray-400">
                {total > 0 ? numberWithComma(total) : numberWithComma(0)}
              </span>
            </div>
            <div className="flex justify-between md:w-80 my-2 border-b pb-2">
              <span className="text-gray-400">Shipping</span>
              <span className="text-gray-400">
                {shipping === 0 ? "Gratis" : numberWithComma(shipping)}
              </span>
            </div>
            <div className="flex justify-between md:w-80">
              <span className="text-black w-48">
                The Total Amount of (including VAT)
              </span>
              <span className="text-black">
                {total > 0
                  ? numberWithComma(total + shipping + vat)
                  : numberWithComma(0 + shipping + vat)}
              </span>
            </div>
            <button
            onClick={handleCheckout}
              className={`items-center w-full mt-8 uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mr-3 md:mr-0 `}
            >
              Go to checkout
            </button>
          </div>
          <SimpleDisclosure>
            <input
              value={isCode}
              onChange={(e) => setIsCode(e.target.value)}
              className="h-10 uppercase border py-1 w-full px-4 rounded-md"
            />
            <button
              onClick={() => setIsConfirm(true)}
              className={`items-center w-full mt-3 uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mr-3 md:mr-0 `}
            >
              Confirm
            </button>
          </SimpleDisclosure>
        </div>
      </div>
          <ToastContainer />

    </div>
  );
};

export const SimpleDisclosure = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border w-full border-gray-200 shadow-md p-4 mt-5 rounded-md">
      <button
        className="flex items-center justify-between w-full focus:outline-none"
        onClick={toggleExpansion}
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Add Discount Code (optional)
        </h2>
        <FiChevronDown
          className={`w-4 h-4 ${
            isExpanded ? "transform rotate-180" : ""
          } text-gray-600`}
        />
      </button>
      {isExpanded && <div className="mt-4 w-full md:w-80">{children}</div>}
    </div>
  );
};

export default Cart;
