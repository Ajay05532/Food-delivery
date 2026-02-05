import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Restaurant from "./pages/Restaurant/Restaurant";
import Order from "./pages/Order/Order";
import Search from "./pages/Search/Search";
import NotFound from "./pages/NotFound";
import CheckoutLayout from "./layout/CheckoutLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/search" element={<Search />} />
      </Route>

      <Route element={<CheckoutLayout />}>
        <Route path="/checkout" element={<Cart />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
