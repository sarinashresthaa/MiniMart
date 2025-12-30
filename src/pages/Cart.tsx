import { useMemo } from "react";
import { useProducts } from "../context/ProductContext";

const Cart = () => {
  const { products, cart } = useProducts();
  const cartItems = useMemo(() => {
    return cart.map((ci) => {
      const product = products.find((p) => p.id === ci.item_id);
      return { ...ci, product };
    });
  }, [cart, products]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
  }, [cartItems]);
  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold ">Your Cart</h1>
      <div className=" p-4 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.item_id}
            className="grid grid-cols-4 gap-24 items-center bg-white p-4 rounded-lg shadow-lg border border-gray-200 "
          >
            <img
              src={item.product?.image}
              alt=""
              className="h-20 w-20 object-contain "
            />
            <p className="font-semibold text-gray-800">{item.product?.title}</p>
            <p className="text-pink-500 font-bold">
              ${item.product?.price}* {item.quantity}= $
              {((item.product?.price || 0) * item.quantity).toFixed(2)}
            </p>
             <div className="flex gap-4">
            <span className="text-gray-600 ">Quantity</span>
            <button
              
              className=" px-4 font-bold cursor-pointer bg-gray-200 text-gray-600 disabled:cursor-not-allowed "
            >
              -
            </button>
            <span className="font-bold">{item.quantity}</span>
            <button 
            className="px-4 font-bold bg-gray-200 text-gray-600 cursor-pointer disabled:cursor-not-allowed ">
              +
            </button>
          </div>
          </div>
        ))}
      </div>
      <h2 className="flex justify-end font-bold mt-2">
        Total:${totalPrice.toFixed(2)}
      </h2>
    </div>
  );
};

export default Cart;
