import { useState } from "react";
import { Outlet } from "react-router-dom";
import CheckoutNavbar from "./CheckoutNavbar";
import AuthDrawer from "../components/auth/AuthDrawer";

const CheckoutLayout = () => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <CheckoutNavbar onLoginClick={() => setAuthOpen(true)} />
      <Outlet />
      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default CheckoutLayout;
