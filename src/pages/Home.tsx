
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const Home = () => {
  // rating itself is an object, so it needs its own type
 
  // const product= products.find((item)=>item.id===1)
  //   console.log(product);
  const {products}= useProducts()
  return (
    <div className="grid grid-cols-4 p-4">
      {products.map((item) => (
        <Link
        to = {`/product-detail/${item.id}`}
          key={item.id}
          className="border border-gray-200 flex flex-col items-center justify-center text-center p-4 hover:shadow-md hover:bg-gray-50 gap-2 rounded transition-transform duration-300 hover:scale-105"
        
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-40 w-40 object-contain "
          />
          <h1>{item.title}</h1>
          <h1 className="text-[#e80071] font-semibold">${item.price}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Home;
