import { useMemo } from "react";
import { useProducts } from "../context/ProductContext";

const Cart = () => {
  const { products, cart,addToCart } = useProducts();
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
    <div className="flex justify-center w-full">
      <div className="w-full max-w-7xl px-4 lg:px-8">

      <h1 className="text-2xl font-bold m-6">Your Cart</h1>
      <div className="  flex flex-col gap-4 ">
        {cartItems.map((item) => (
          <div
          key={item.item_id}
          className="grid lg:grid-cols-[120px_1fr_180px_200px]   gap-4 items-center bg-white p-8 rounded-lg shadow-lg border border-gray-200 "
          >
            <img
              src={item.product?.image}
              alt={item.product?.title}
              className="h-40 w-40 lg:h-20 lg:w-20 object-contain mx-auto lg:mx-0"
              />
            <p className="font-semibold text-gray-800 text-2xl lg:text-base text-center lg:text-left">{item.product?.title}</p>
            <p className="text-pink-500 font-bold text-xl lg:text-base text-center lg:text-left">
              ${item.product?.price}* {item.quantity}= $
              {((item.product?.price || 0) * item.quantity).toFixed(2)}
            </p>

             <div className="flex gap-4 justify-center lg:justify-start">
            <span className="text-gray-600  text-xl lg:text-base">Quantity</span>
            <button
                        onClick={()=>addToCart({item_id:item.item_id,quantity:-1})}

              className=" px-4 font-bold cursor-pointer bg-gray-200 text-gray-600 disabled:cursor-not-allowed "
              >
              -
            </button>
            <span className="font-bold ">{item.quantity}</span>
            <button 
            onClick={()=>addToCart({item_id:item.item_id,quantity:1})}
            className="px-4 font-bold bg-gray-200 text-gray-600 cursor-pointer disabled:cursor-not-allowed ">
              +
            </button>
          </div>
          
          </div>
        ))}
      </div>
      <h2 className="font-bold mt-4 text-right text-xl lg:text-base text-gray-800">
        Total:${totalPrice.toFixed(2)}
      </h2>
        </div>
    </div>
  );
};

export default Cart;
