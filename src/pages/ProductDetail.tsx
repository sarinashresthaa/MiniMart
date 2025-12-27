import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState<Product | undefined>();
  const callApi = async () => {
    try {
      const res = await axios.get<Product>(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const [quantity, setQuantity] = useState<number>(1);
  const increment = () => {
      setQuantity(quantity + 1);
  };
  const decrement = () => {
      setQuantity(quantity - 1);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 mt-12">
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center items-center md:w-1/2">
          <img
            src={product?.image}
            alt={product?.title}
            className="h-72 w-72 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product?.title}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">⭐⭐⭐⭐</span>
            <span className="text-gray-600">{product?.rating.rate} / 5</span>
          </div>

          <div className="text-2xl font-bold text-[#e80071]">
            ${product?.price}
          </div>

          <div className="flex gap-4">
            <span className="text-gray-600 ">Quantity</span>
            <button
              onClick={decrement}
              disabled={quantity===1}
              className=" px-4 font-bold cursor-pointer bg-gray-200 text-gray-600 disabled:cursor-not-allowed "
            >
              -
            </button>
            <span className="font-bold">{quantity}</span>
            <button onClick={increment}
            disabled={quantity===15}
            className="px-4 font-bold bg-gray-200 text-gray-600 cursor-pointer disabled:cursor-not-allowed ">
              +
            </button>
          </div>

          <div className="mt-4 flex gap-4">
            <button className="w-fit bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition cursor-pointer">
              Buy Now
            </button>
            <button className=" w-fit bg-[#e80071] hover:bg-[#C5107B] text-white px-6 py-2 rounded-lg transition cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
