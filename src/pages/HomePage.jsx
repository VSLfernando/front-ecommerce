import React, { useState, useEffect } from 'react';
import Categorias from '../components/Categorias';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/productos/`);
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        // 🔥 Adaptamos los productos a lo que ProductCard.jsx espera
        const adaptados = data.map(prod => ({
          id: prod.id,
          name: prod.nombre,
          price: prod.precio,
          description: prod.descripcion,
          category: prod.categoria_nombre,
          image: prod.imagen ? prod.imagen : 'https://via.placeholder.com/200x200?text=Producto' // asignamos un placeholder temporal
        }));
        setProducts(adaptados);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoriasUnicas = ['Todas', ...new Set(products.map(producto => producto.category))];

  const productosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? products
      : products.filter(producto => producto.category === categoriaSeleccionada);

  if (loading) {
    return <div className="text-center p-10">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-1/4 p-4">
          <Categorias
            categorias={categoriasUnicas}
            seleccionarCategoria={setCategoriaSeleccionada}
          />
        </aside>

        <main className="w-full lg:w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">
            {categoriaSeleccionada === 'Todas'
              ? 'Todos los productos'
              : `Categoría: ${categoriaSeleccionada}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productosFiltrados.map(producto => (
              <ProductCard key={producto.id} product={producto} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;

