import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

import CategoryDetail from "./pages/CategoryDetail";
import Footer from "./components/Footer";

const App = () => {
  return (
    < >
    <BrowserRouter>
      <div className="min-h-screen flex flex-col  ">
        <Navbar />
        <div className="grow md:px-42 lg:px-32 xl:px-52 2xl:px-82">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category/:id" element={<ProductDetail />} />
            <Route
              path="/category-detail/:category"
              element={<CategoryDetail />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
    </>
  );
};

export default App;
