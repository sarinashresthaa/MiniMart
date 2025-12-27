const Navbar = () => {
  return (
    <div className="flex gap-3 p-4 justify-around bg-amber-200 text-xl font-bold text-gray-800 ">
      <h1>FakeStore</h1>
      <div className="flex gap-16 cursor-pointer ">
        <div>Home</div>
        <div>Products</div>
      </div>
    </div>
  );
};

export default Navbar;
