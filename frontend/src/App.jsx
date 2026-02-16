import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/userSlice";
import { useCart } from "./redux/hooks/useCart";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Restaurant from "./pages/Restaurant/Restaurant";
import Order from "./pages/Order/Order";
import Search from "./pages/Search/Search";
import NotFound from "./pages/NotFound";
import CheckoutLayout from "./layout/CheckoutLayout";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { fetchCart } = useCart();
  const dispatch = useDispatch();

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Fetch cart from backend when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
