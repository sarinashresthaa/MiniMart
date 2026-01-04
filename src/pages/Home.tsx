import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Spinner } from "@/components/ui/spinner";


const Home = () => {
  // rating itself is an object, so it needs its own type

  // const product= products.find((item)=>item.id===1)
  //   console.log(product);
  const { products, loading } = useProducts();
if (loading) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Spinner className="size-8 text-pink-500"/>
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
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-w-xs mx-auto "
      >
        <CarouselContent>
          {products.slice(0, 10).map((item) => (
            <CarouselItem  key={item.id}>
              <div className="flex justify-center items-center h-64 m-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain "
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="grid lg:grid-cols-4 ">
        {products.map((item) => (
          <Link
            to={`/${item.category}/${item.id}`}
            key={item.id}
            className="border border-gray-200  flex flex-col items-center justify-center text-center p-4 hover:shadow-md hover:bg-gray-100 gap-2"
          >
            <img
              src={item.image}
              alt={item.title}
              className="lg:h-40 lg:w-40 object-contain w-58"
            />
            <h1 className="lg:text-base text-lg">{item.title}</h1>
            <h1 className="text-[#e80071] font-semibold text-lg lg:text-base">
              ${item.price}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
