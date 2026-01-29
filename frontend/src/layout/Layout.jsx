import { useState } from "react";
import AuthDrawer from "../components/auth/AuthDrawer";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../redux/slices/userSlice";


const Layout = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
    const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include"
        });

        if (!res.ok) return;

        const data = await res.json();
        dispatch(setUser(data.user));
      } catch (err) {
        console.error("Session restore failed");
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <>
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      {children}

      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Layout;
