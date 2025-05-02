import { useState, useEffect } from 'react';
import { productosService } from './api';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const response = await productosService.getAll();
      
      // Mapear los datos de backend al formato que espera tu frontend
      const productosFormateados = response.data.map(producto => ({
        id: producto.producto_id,
        name: producto.nombre,
        price: producto.precio,
        category: producto.categoria_nombre || 'Sin categoría',
        // Usa una imagen placeholder si no tienes imágenes en el backend
        image: "https://via.placeholder.com/200x200?text=" + producto.nombre.replace(/ /g, '+')
      }));
      
      setProductos(productosFormateados);
      setError(null);
    } catch (err) {
      setError("Error al cargar productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return { productos, loading, error, refetch: cargarProductos };
};

// También puedes mantener una versión fallback por si la API falla
export const productosFallback = [
  {
    id: 1,
    name: "Camiseta Oversize Blanca",
    price: 20.99,
    category: "Ropa",
    image: "https://via.placeholder.com/200x200?text=Producto+1"
  },
  {
    id: 2,
    name: "Jeans Slim Fit Azul",
    price: 35.50,
    category: "Ropa",
    image: "https://via.placeholder.com/200x200?text=Producto+2"
  },
  // Puedes mantener el resto como fallback
];

export default useProductos;