
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const Navbar = () => {
  const {cart}= useProducts();
  const totalItems = cart.reduce((sum,item)=> sum + item.quantity,0)
  return (
    <div className="flex gap-3 p-4 justify-around bg-pink-100 text-xl font-bold text-[#36526e] sticky top-0
    ">
      <h1 className="italic">FakeStore</h1>
      <div className="flex gap-24 cursor-pointer items-center ">
        <Link to="/">Home</Link>
        <Link to="/category">Category</Link>
        <Link to ="/cart" className="relative"><FiShoppingCart />{totalItems>0 &&( <span className="absolute bg-red-500 text-white  w-5 h-5 rounded-full text-xs flex items-center -right-2 -top-2 justify-center">{totalItems}</span>)} </Link>
      </div>
    </div>
  );
};

export default Navbar;
