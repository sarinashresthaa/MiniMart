import { useProducts } from "../context/ProductContext";

const Categories = () => {
  const { products } = useProducts();

  const categories = [...new Set(products.map(item => item.category))];

  return (
    <div className="p-4">
      {categories.map((category) => (
        <h3 key={category} className="cursor-pointer">{category}</h3>
      ))}
    </div>
  );
};

export default Categories;
