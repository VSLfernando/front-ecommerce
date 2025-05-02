import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/productos/${id}/`
        );
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        const data = await response.json();
        const adaptado = {
          id: data.id,
          name: data.nombre || "Sin nombre",
          description: data.descripcion || "Sin descripción", // 👈 ahora capturamos descripción
          price: data.precio || 0,
          category: data.categoria_nombre || "Sin categoría",
          image: data.imagen ? data.imagen : 'https://via.placeholder.com/400x400?text=Sin+Imagen'
        };
        setProduct(adaptado);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      return;
    }
    addToCart(product);
    alert("Producto agregado al carrito");
  };

  if (loading) {
    return <div className="text-center p-10">Cargando producto...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto flex flex-col min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6">
        {/* <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto object-cover rounded-lg" /> */}
        <img
          src={
            product.image
              ? product.image
              : "https://via.placeholder.com/400x400?text=Sin+Imagen"
          }
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-700 text-base">{product.description}</p>{" "}
          {/* 👈 Mostramos descripción completa */}
          <p className="text-xl text-indigo-600 font-bold">${product.price}</p>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
