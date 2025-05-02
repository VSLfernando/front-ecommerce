
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  const isAdmin = user?.rol === "ADMIN";

  return (
    <nav className="bg-indigo-500 p-4 flex justify-between items-center">
      <Link to="/inicio">
        <h1 className="text-white font-bold text-xl">Electro Hogar</h1>
      </Link>

      <div className="flex items-center gap-6">
        {/* CRUD botones solo visibles si es admin */}
        {isAdmin && (
          <>
            <Link to="/admin" className="text-white hover:underline">
              Productos
            </Link>
            <Link to="/admin/categorias" className="text-white hover:underline">
              Categorías
            </Link>
            <Link to="/admin/clientes" className="text-white hover:underline">
              Clientes
            </Link>
          </>
        )}

        <Link to="/carrito" className="relative">
          <ShoppingCart className="text-white w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

        {!user && (
          <>
            <Link to="/login" className="text-white hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="text-white hover:underline">
              Registrarse
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-white text-sm">Hola, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
