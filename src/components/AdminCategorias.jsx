import React, { useState, useEffect } from 'react';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: '',
    descripcion: ''
  });
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      //const response = await fetch('http://localhost:8000/api/categorias/');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias/`);
      const data = await response.json();
      setCategorias(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const manejarCambio = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, [e.target.name]: e.target.value });
  };

  const agregarCategoria = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/categorias/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCategoria),
      });

      if (!response.ok) throw new Error('Error al crear categoría');

      fetchCategorias();
      setNuevaCategoria({ nombre: '', descripcion: '' });
    } catch (error) {
      console.error(error.message);
    }
  };

  const iniciarEdicion = (categoria) => {
    setEditandoId(categoria.id);
    setNuevaCategoria({ nombre: categoria.nombre, descripcion: categoria.descripcion });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevaCategoria({ nombre: '', descripcion: '' });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/categorias/${editandoId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCategoria),
      });

      if (!response.ok) throw new Error('Error al actualizar categoría');

      fetchCategorias();
      setEditandoId(null);
      setNuevaCategoria({ nombre: '', descripcion: '' });
    } catch (error) {
      console.error(error.message);
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta categoría?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/categorias/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar categoría');

      fetchCategorias();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <div className="text-center p-8">Cargando categorías...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Administrar Categorías</h2>

      {/* Formulario */}
      <form onSubmit={editandoId ? guardarEdicion : agregarCategoria} className="grid grid-cols-1 gap-4 mb-6">
        <input
          name="nombre"
          value={nuevaCategoria.nombre}
          onChange={manejarCambio}
          placeholder="Nombre de la categoría"
          className="p-2 border rounded"
          required
        />
        <textarea
          name="descripcion"
          value={nuevaCategoria.descripcion}
          onChange={manejarCambio}
          placeholder="Descripción"
          className="p-2 border rounded"
        ></textarea>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editandoId ? 'Guardar cambios' : 'Agregar categoría'}
          </button>

          {editandoId && (
            <button type="button" onClick={cancelarEdicion} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista */}
      <div className="grid gap-4">
        {categorias.map((cat) => (
          <div key={cat.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{cat.nombre}</h3>
              <p className="text-gray-600 text-sm">{cat.descripcion}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => iniciarEdicion(cat)} className="bg-yellow-400 text-white px-3 py-1 rounded">Editar</button>
              <button onClick={() => eliminarCategoria(cat.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategorias;
