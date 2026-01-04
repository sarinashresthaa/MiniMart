import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Category from "./Category";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const { cart} = useProducts();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="z-10 sticky top-0">
      <div className="flex gap-3 relative p-4 lg:px-32 xl:px-52 2xl:px-82 bg-pink-100 text-xl font-bold justify-between text-[#36526e] ">
      <h1 className="italic">FakeStore</h1>
      <div className="lg:flex gap-24 cursor-pointer items-center hidden ">
        <Link to="/">Home</Link>
        <div>
          <Category />
        </div>
        <Link to="/cart" className="relative">
          <FiShoppingCart />
          {totalItems > 0 && (
            <span className="absolute bg-red-500 text-white  w-5 h-5 rounded-full text-xs flex items-center -right-2 -top-2 justify-center">
              {totalItems}
            </span>
          )}{" "}
        </Link>
      </div>
      <div className="lg:hidden">
        <MdMenu
          size={24}
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        />
      </div>
      {open && (
        <div className="absolute top-full right-0 flex flex-col gap-4 shadow-md p-4 lg:hidden mr-6 rounded">
        <Link to="/" onClick={()=>setOpen(false)} >Home</Link>
        <div>
          <Category />
        </div>
        <Link to="/cart" onClick={()=>setOpen(false)}>
          <div className="relative w-max">
            <FiShoppingCart />
          {totalItems > 0 && (
            <span className="absolute bg-red-500 text-white  w-5 h-5 rounded-full text-xs flex items-center -right-2 -top-2 justify-center">
              {totalItems}
            </span>
          )}{" "}
          </div>
        </Link>
      </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;
