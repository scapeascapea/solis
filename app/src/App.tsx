import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Markets from "@/pages/Markets";
import Convert from "@/pages/Convert";
import Trade from "@/pages/Trade";
import Security from "@/pages/Security";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/security" element={<Security />} />
      </Routes>
      <Footer />
    </Layout>
  );
}
