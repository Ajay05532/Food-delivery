import { useState } from "react";
import AuthDrawer from "../components/auth/AuthDrawer";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const Layout = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      {children}

      <Footer />

      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Layout;
