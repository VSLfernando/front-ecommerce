
import React, { useState, useEffect } from "react";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]); // 👈 NUEVO: estado para categorías
  const [nuevoProducto, setNuevoProducto] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    image: null,
  });
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchCategorias(); // 👈 NUEVO: llamar también a cargar categorías
  }, []);

  const fetchProductos = async () => {
    try {
      //const response = await fetch("http://localhost:8000/api/productos/");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/productos/`);
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const data = await response.json();
      const productosAdaptados = data.map((prod) => ({
        id: prod.id,
        name: prod.nombre,
        price: prod.precio,
        description: prod.descripcion,
        stock: prod.stock,
        category: prod.categoria, // importante traer el ID de categoría real
        image: prod.imagen || 'https://via.placeholder.com/200x200?text=Producto'
        //image: prod.imagen ? `http://localhost:8000${prod.imagen}` : 'https://via.placeholder.com/200x200?text=Producto'
        // image: prod.imagen
        //   ? `http://localhost:8000${prod.imagen}`
        //   : "https://via.placeholder.com/200x200?text=Producto",
      }));
      setProductos(productosAdaptados);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    // 👈 NUEVO: función para traer categorías
    try {
      //const response = await fetch("http://localhost:8000/api/categorias/");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias/`);
      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }
      const data = await response.json();
      setCategorias(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarArchivo = (e) => {
    setNuevoProducto((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    if (!nuevoProducto.name || !nuevoProducto.price || !nuevoProducto.category)
      return;

    const formData = new FormData();
    formData.append("nombre", nuevoProducto.name);
    formData.append("descripcion", nuevoProducto.description || "");
    formData.append("precio", nuevoProducto.price);
    formData.append("stock", nuevoProducto.stock || 10);
    formData.append("categoria", nuevoProducto.category); // 👈 ahora sí mandamos el ID de categoría
    if (nuevoProducto.image) {
      formData.append("imagen", nuevoProducto.image);
    }

    try {
      //const response = await fetch("http://localhost:8000/api/productos/", {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/productos/`, { 
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear producto");
      }

      fetchProductos();
      setNuevoProducto({
        id: "",
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: null,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/productos/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar producto");
      }

      fetchProductos();
    } catch (err) {
      alert(err.message);
    }
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setNuevoProducto({
      id: producto.id,
      name: producto.name,
      price: producto.price,
      description: producto.description,
      stock: producto.stock,
      category: producto.category,
      image: null, // importante: imagen se carga si el usuario selecciona otra
    });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    if (!nuevoProducto.name || !nuevoProducto.price || !nuevoProducto.category)
      return;
    
    const formData = new FormData();
    formData.append("nombre", nuevoProducto.name);
    formData.append("descripcion", nuevoProducto.description || "");
    formData.append("precio", nuevoProducto.price);
    formData.append("stock", nuevoProducto.stock || 10);
    formData.append("categoria", nuevoProducto.category);

    if (nuevoProducto.image) {
      formData.append("imagen", nuevoProducto.image);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/productos/${editandoId}/`,
        {
          method: "PATCH", // ✅ CORREGIDO
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar producto");
      }

      fetchProductos();
      setEditandoId(null);
      setNuevoProducto({
        id: "",
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: null,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="text-center p-10">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Gestión de Productos
      </h2>

      {/* Formulario */}
      <form
        onSubmit={editandoId ? guardarEdicion : agregarProducto}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          name="name"
          value={nuevoProducto.name}
          onChange={manejarCambio}
          placeholder="Nombre"
          className="p-2 border rounded"
          required
        />
        <input
          name="price"
          value={nuevoProducto.price}
          onChange={manejarCambio}
          placeholder="Precio"
          type="number"
          className="p-2 border rounded"
          required
        />
        <input
          name="description"
          value={nuevoProducto.description}
          onChange={manejarCambio}
          placeholder="Descripción"
          className="p-2 border rounded"
        />
        <input
          name="stock"
          value={nuevoProducto.stock}
          onChange={manejarCambio}
          placeholder="Stock"
          type="number"
          className="p-2 border rounded"
        />

        {/* 👇 Aquí cambiamos el input a un SELECT dinámico */}
        <select
          name="category"
          value={nuevoProducto.category}
          onChange={manejarCambio}
          className="p-2 border rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="image"
          onChange={manejarArchivo}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          {editandoId ? "Guardar cambios" : "Agregar producto"}
        </button>
      </form>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="border p-4 rounded shadow flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* <img src={prod.image} alt={prod.name} className="w-24 h-24 object-cover" /> */}
            <img
              src={
                prod.image ||
                "https://via.placeholder.com/200x200?text=Producto"
              }
              alt={prod.name}
              className="w-24 h-24 object-cover"
            />

            <div className="flex-1">
              <h3 className="font-bold">{prod.name}</h3>
              <p>${prod.price}</p>
              <p className="text-sm text-gray-500">{prod.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => iniciarEdicion(prod)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarProducto(prod.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductos;
