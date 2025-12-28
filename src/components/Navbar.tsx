
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-3 p-4 justify-around bg-pink-300 text-xl font-bold text-[#36526e]">
      <h1 className="italic">FakeStore</h1>
      <div className="flex gap-16 cursor-pointer items-center ">
        <Link to="/">Home</Link>
        <Link to ="/cart"><FiShoppingCart /></Link>
      </div>
    </div>
  );
};

export default Navbar;
