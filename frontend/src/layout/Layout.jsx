import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthDrawer from "../components/auth/AuthDrawer";
import Navbar from "./Navbar";
import { setUser } from "../redux/slices/userSlice";
import axios from "axios";

const Layout = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
          {
            withCredentials: true,
          },
        );

        if (res.data && res.data.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.error("Session restore failed", err);
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <>
      <Navbar onLoginClick={() => setAuthOpen(true)} />
      <Outlet />
      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Layout;
