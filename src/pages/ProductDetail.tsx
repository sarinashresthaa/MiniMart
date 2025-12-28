
import {  useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const{products, addToCart} = useProducts();
  // useParams() gives strings
  // Number(id) converts "5" → 5 so that the comparison works
  const product = products.find(p=>p.id===Number(id));

  const [quantity, setQuantity] = useState<number>(1);
  const increment = () => {
      setQuantity(quantity + 1);
  };
  const decrement = () => {
      setQuantity(quantity - 1);
  };
  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ item_id: product.id, quantity });
  }
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
            <button className=" w-fit bg-[#e80071] hover:bg-[#C5107B] text-white px-6 py-2 rounded-lg transition cursor-pointer" 
            onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
