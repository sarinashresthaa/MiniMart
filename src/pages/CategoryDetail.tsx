import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const { products } = useProducts();
  const product = products.filter((p) => p.category == category);
  return (
    <div className="grid lg:grid-cols-4 lg:mt-6">
      {product.map((item) => (
        <Link
          to={`/${item.category}/${item.id}`}
          className="  flex flex-col items-center justify-center hover:shadow-md hover:bg-gray-100 gap-2 border border-gray-200 p-6 lg:px-4 lg:py-4"
        >
          <div>
            <img
              src={item.image}
              alt={item.title}
              className="lg:h-40 lg:w-40 object-contain w-58"
            />
          </div>
          <div className="lg:text-base text-lg line-clamp-4">{item.title} </div>
          <div className="text-[#e80071] font-semibold text-lg lg:text-base">
            ${item.price}{" "}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryDetail;
