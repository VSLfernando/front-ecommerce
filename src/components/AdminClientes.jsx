import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        //const response = await fetch("http://localhost:8000/api/clientes/");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clientes/`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setClientes(data);
        } else {
          console.warn("Respuesta inesperada:", data);
          setClientes([]); // vaciar si no es array
        }
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Listado de Clientes</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-indigo-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Teléfono</th>
            <th className="py-2 px-4 border">Dirección</th>
          </tr>
        </thead>
        {/* <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="text-center hover:bg-gray-50">
              <td className="py-2 px-4 border">{cliente.id}</td>
              <td className="py-2 px-4 border">{cliente.nombre}</td>
              <td className="py-2 px-4 border">{cliente.email}</td>
              <td className="py-2 px-4 border">{cliente.telefono}</td>
              <td className="py-2 px-4 border">{cliente.direccion}</td>
            </tr>
          ))}
        </tbody> */}
        {/* <tbody>
          {Array.isArray(clientes) ? (
            clientes.map((cliente) => (
              <tr key={cliente.id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border">{cliente.id}</td>
                <td className="py-2 px-4 border">{cliente.nombre}</td>
                <td className="py-2 px-4 border">{cliente.email}</td>
                <td className="py-2 px-4 border">{cliente.telefono}</td>
                <td className="py-2 px-4 border">{cliente.direccion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-red-500">
                No se pudieron cargar los clientes.
              </td>
            </tr>
          )}
        </tbody> */}
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border">{cliente.id}</td>
                <td className="py-2 px-4 border">{cliente.nombre}</td>
                <td className="py-2 px-4 border">{cliente.email}</td>
                <td className="py-2 px-4 border">{cliente.telefono}</td>
                <td className="py-2 px-4 border">{cliente.direccion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-red-500">
                No se pudieron cargar los clientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClientes;
