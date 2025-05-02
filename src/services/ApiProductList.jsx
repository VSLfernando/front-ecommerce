import React, { useState, useEffect } from 'react';
import { productosService } from '../services/api';

function ApiProductList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await productosService.getAll();
        setProductos(response.data);
      } catch (err) {
        setError("Error al cargar productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-container">
      {productos.map(producto => (
        <div key={producto.producto_id} className="product-card">
          <img src={`https://via.placeholder.com/200x200?text=${producto.nombre.replace(/ /g, '+')}`} 
               alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>${parseFloat(producto.precio).toFixed(2)}</p>
          <p>Categoría: {producto.categoria_nombre || 'Sin categoría'}</p>
          <button>Añadir al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default ApiProductList;