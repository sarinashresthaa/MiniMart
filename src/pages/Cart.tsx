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
          <div key={item.item_id} className="grid grid-cols-3 gap-6 items-center bg-white p-4 rounded-lg shadow-2xl border ">
            {/* gap-6 items-center bg-white p-4 rounded-lg shadow */}
            <img
              src={item.product?.image}
              alt=""
              className="h-20 w-20 object-contain "
            />
            <p className="font-semibold text-gray-800">{item.product?.title}</p>
            <p className="text-orange-500 font-bold">
              ${item.product?.price}* {item.quantity}= $
              {((item.product?.price || 0) * item.quantity).toFixed(2)}
            </p>
                 
          </div>
        ))}
      </div>
      <h2 className="flex justify-end font-bold mt-2">Total:${totalPrice}</h2>
    </div>
  );
};

export default Cart;
