import { useMemo } from "react";
import { useProducts } from "../context/ProductContext";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { products, cart, addToCart, removeFromCart, clearCart } =
    useProducts();
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

  if (cart.length === 0) {
    return (
      <p className="text-center mt-30 font-bold text-3xl text-gray-700">
        Cart is empty 🛒
      </p>
    );
  }
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-7xl px-4 lg:px-8">
        <div className="flex justify-between ">
          <div className="text-2xl font-bold m-4">Your Cart</div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer bg-red-500 text-xl text-white m-4 hover:bg-red-600 hover:text-white"
              >
                Clear Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to clear cart?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your cart items.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={clearCart}
                  className="hover:bg-red-500 bg-red-500 "
                >
                  Continue
                </AlertDialogAction>
                <AlertDialogCancel className="hover:bg-gray-100">
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* <button onClick={clearCart} className="text-red-500 font-bold">
            Clear Cart
          </button> */}
        </div>
        <div className="  flex flex-col gap-4 ">
          {cartItems.map((item) => (
            <div
              key={item.item_id}
              className="flex flex-col lg:grid lg:grid-cols-[120px_1fr_180px_200px_60px]  gap-4 items-center bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <Link to={`/${item.product?.category}/${item.item_id}`}>
                <img
                  src={item.product?.image}
                  alt={item.product?.title}
                  className="h-32 w-32 lg:h-24 lg:w-24 object-contain mx-auto lg:mx-0 p-2 rounded bg-gray-200"
                />
              </Link>
              <p className="font-semibold text-gray-800 text-lg lg:text-base text-center lg:text-left">
                {item.product?.title}
              </p>
              <p className="text-[#40aecc] font-bold text-xl lg:text-base text-center lg:text-left">
                ${item.product?.price}* {item.quantity}= $
                {((item.product?.price || 0) * item.quantity).toFixed(2)}
              </p>

              <div className="flex gap-4 justify-center lg:justify-start">
                <span className="text-gray-600  text-xl lg:text-base ">
                  Quantity
                </span>
                <button
                  onClick={() =>
                    addToCart({ item_id: item.item_id, quantity: -1 })
                  }
                  className=" px-4 font-bold cursor-pointer bg-gray-200 text-gray-600 disabled:cursor-not-allowed "
                >
                  -
                </button>
                <span className="font-bold ">{item.quantity}</span>
                <button
                  onClick={() =>
                    addToCart({ item_id: item.item_id, quantity: 1 })
                  }
                  className="px-4 font-bold bg-gray-200 text-gray-600 cursor-pointer disabled:cursor-not-allowed "
                >
                  +
                </button>
              </div>
              <button
                  onClick={() => removeFromCart(item.item_id)}
                  className="lg:hidden border px-6 py-2 bg-red-500 text-white font-semibold rounded"
                >
                 Delete
                </button>
                <button
                  // type="button"
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   removeFromCart(item.item_id);
                  // }}
                  onClick={() => removeFromCart(item.item_id)}
                  title="Remove item" className="lg:flex justify-center items-center hidden"
                >
                  <MdDelete className="text-red-500 cursor-pointer"  size={24}/>
                  
                </button>
            </div>
          ))}
        </div>
        <h2 className="font-bold mt-4 text-right text-xl lg:text-base text-gray-700">
          Total:${totalPrice.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default Cart;
