import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/producto/${product.id}`}>
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition">
        {/* <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-md" /> */}
        <img
          src={
            product.image
              ? product.image
              : "https://via.placeholder.com/200x200?text=Sin+Imagen"
          }
          alt={product.name}
          className="w-40 h-40 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-500 text-sm">
          {product.description?.slice(0, 60)}...
        </p>{" "}
        {/* 👈 Agregamos la descripción corta */}
        <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
        <button className="mt-2 bg-indigo-500 text-white py-1 px-4 rounded hover:bg-indigo-600 transition">
          Ver más
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
