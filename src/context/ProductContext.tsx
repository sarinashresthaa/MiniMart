// create a context
// provider
// consumer => useContext Hook

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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
interface Cart{
    item_id:number,
    quantity:number
  
}
interface ProductContextType {
  products: Product[];
  cart:Cart[];
  loading:boolean;
  addToCart:(item:Cart)=>void;
}
const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
 // Lazy init from localStorage
  const [cart, setCart] = useState<Cart[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const callApi = async () => {
    try {
      const res = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    callApi();
  }, []);
  const addToCart = (item: Cart) => {
  setCart(prev => {
    const existing = prev.find(ci => ci.item_id === item.item_id);
    if (existing) {
      return prev.map(ci =>
        ci.item_id === item.item_id
          ? { ...ci, quantity: Math.min(Math.max(ci.quantity + item.quantity, 1),15) }
          : ci
      );
      //ci.quantity is already cart ma vako and item.quantity is new add huda aaune quantity
    }
    return [...prev, item];
  });
};

  return (
    <ProductContext.Provider value={{ products,cart,loading,addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return context;
};
