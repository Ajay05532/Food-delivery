import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Layout from "./layout/Layout.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Restaurant from "./pages/Restaurant/Restaurant.jsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </Layout>
  );
};

export default App;
