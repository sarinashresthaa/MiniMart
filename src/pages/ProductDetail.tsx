
import {  useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Spinner } from "@/components/ui/spinner";


const ProductDetail = () => {
  const { id } = useParams();
  const{products, addToCart, loading} = useProducts();
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
    alert("✅ Added to cart successfully!")
  }
if (loading) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Spinner className="size-8 text-pink-500" />
    </div>
  )
}
if (!products) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Spinner className="size-8 text-gray-600" />
    </div>
  )
}

  return (
    <div className="max-w-5xl mx-auto lg:p-6 p-1 ">
      <div className="flex flex-col lg:gap-8 gap-4 bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center items-center">
          <img
            src={product?.image}
            alt={product?.title}
            className="lg:h-72 lg:w-72 w-62 h-62 md:h-72 md:w-72 object-contain transition-transform duration-500 lg:hover:scale-125   "
          />
        </div>
        <div className="flex flex-col lg:gap-4 gap-1 md:gap-4 xl:gap-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product?.title}
          </h1>

          <p className="text-gray-600 leading-relaxed line-clamp-4 md:line-clamp-6">
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

          <div className="mt-4 flex gap-4 ">
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
