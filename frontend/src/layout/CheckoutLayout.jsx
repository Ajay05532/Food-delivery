import { Outlet } from "react-router-dom";
import CheckoutNavbar from "./CheckoutNavbar";

const CheckoutLayout = () => {
  return (
    <>
      <CheckoutNavbar />
      <Outlet />
    </>
  );
};

export default CheckoutLayout;