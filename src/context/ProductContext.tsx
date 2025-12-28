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
  cart:Cart[],
  addToCart:(item:Cart)=>void
}
const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart,setCart] = useState<Cart[]>([])
  const callApi = async () => {
    try {
      const res = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );
      setProducts(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
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
          ? { ...ci, quantity: Math.min(ci.quantity + item.quantity, 15) }
          : ci
      );
    }
    return [...prev, item];
  });
};

  return (
    <ProductContext.Provider value={{ products,cart,addToCart }}>
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
