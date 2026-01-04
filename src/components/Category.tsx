import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const Category = () => {
  const { products } = useProducts();
  const categories = products.reduce<string[]>((arr, data) => {
    if (!arr.includes(data.category)) {
      return [...arr, data.category];
    }
    return arr;
  }, []);
  return (
    <div className="relative group inline-block ">
      Category
      <div className="absolute hidden group-hover:block top-full left-0 bg-white w-48 text-gray-700 font-semibold rounded shadow-md pl-4 capitalize z-10">
        {categories.map((category) => (
          <Link
            to={`/category-detail/${category}`}
            key={category}
            className="cursor-pointer block hover:text-orange-600"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
