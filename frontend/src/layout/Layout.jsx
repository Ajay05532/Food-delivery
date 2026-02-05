import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthDrawer from "../components/auth/AuthDrawer";
import Navbar from "./Navbar";
import { setUser } from "../redux/slices/userSlice";

const Layout = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        dispatch(setUser(data.user));
      } catch {
        console.error("Session restore failed");
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <>
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      {/* Routed pages render here */}
      <Outlet />

      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Layout;
