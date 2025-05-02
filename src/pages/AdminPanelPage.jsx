import React from 'react';
import Dashboard from '../components/Dashboard';

const AdminPanelPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Lado Izquierdo: Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Administrador</h2>
        <nav className="flex flex-col gap-2">
          <a href="#" className="hover:bg-blue-700 px-2 py-1 rounded">Dashboard</a>
          <a href="#" className="hover:bg-blue-700 px-2 py-1 rounded">Productos</a>
          <a href="#" className="hover:bg-blue-700 px-2 py-1 rounded">Usuarios</a>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Panel de Administración</h1>
        <Dashboard />
      </main>
    </div>
  );
};

export default AdminPanelPage;
