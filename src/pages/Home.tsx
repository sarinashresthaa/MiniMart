import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // rating itself is an object, so it needs its own type
  interface Rating {
    rate: number;
    count: number;
  }

  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  const [products, setProducts] = useState<Product[]>([]);
  const callApi = async () => {
    try {
        const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
        setProducts(res.data)
        console.log(res.data)
    } catch (err) {
        console.error("Failed to fetch products",err)
    }
  };
  useEffect(() => {
    callApi();
  }, []);
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
          {/* <button className="border p-2 font-semibold bg-orange-400 text-white rounded cursor-pointer">Add to Cart</button> */}
        </Link>
      ))}
    </div>
  );
};

export default Home;
