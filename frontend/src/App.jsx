import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./layout/Layout.jsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
