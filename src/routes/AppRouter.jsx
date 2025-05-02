import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import AdminProductos from "../components/AdminProductos";
import AdminCategorias from "../components/AdminCategorias";
import AdminClientes from "../components/AdminClientes";

const AppRoutes = () => {
  const location = useLocation();
  const userRol = localStorage.getItem("rol"); // Obtener el rol del usuario desde localStorage

  // Mostrar el Footer solo en '/' o '/inicio'
  const mostrarFooter =
    location.pathname === "/" || location.pathname === "/inicio";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />
        <Route path="/carrito" element={<CartPage />} />

        {/* Ruta protegida para el administrador */}
        <Route
          path="/admin"
          element={
            userRol === "ADMIN" ? <AdminProductos /> : <Navigate to="/" />
          }
        />

        {/* Ruta protegida para el administrador (categorías) */}
        <Route
          path="/admin/categorias"
          element={
            userRol === "ADMIN" ? <AdminCategorias /> : <Navigate to="/" />
          }
        />

        <Route
          path="/admin/clientes"
          element={
            userRol === "ADMIN" ? <AdminClientes /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
};

const AppRouter = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default AppRouter;
