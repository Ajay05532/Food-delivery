import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./layout/Layout.jsx";
import Cart from "./components/cart/Cart.jsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Layout>
  );
};

export default App;
