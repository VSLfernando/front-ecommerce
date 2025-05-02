import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [totalVentas, setTotalVentas] = useState(null);
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(null);

  useEffect(() => {
    // Aquí llamarás a tus endpoints cuando tengas API
    // Ejemplo con datos ficticios:
    setTimeout(() => {
      setTotalVentas(15000);
      setProductosVendidos([
        { nombre: 'Lavadora', cantidad_vendida: 120 },
        { nombre: 'Nevera', cantidad_vendida: 85 },
      ]);
      setUsuariosRegistrados(300);
    }, 1000);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resumen del Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Ventas */}
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold mb-2">Total de Ventas</h3>
          <p className="text-2xl">{totalVentas !== null ? `$${totalVentas}` : 'Cargando...'}</p>
        </div>
        
        {/* Productos más vendidos */}
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Productos más vendidos</h3>
          {productosVendidos.length > 0 ? (
            <ul>
              {productosVendidos.map((prod, index) => (
                <li key={index}>{prod.nombre} - {prod.cantidad_vendida} unidades</li>
              ))}
            </ul>
          ) : (
            'Cargando...'
          )}
        </div>

        {/* Usuarios registrados */}
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <h3 className="font-semibold mb-2">Usuarios Registrados</h3>
          <p className="text-2xl">{usuariosRegistrados !== null ? usuariosRegistrados : 'Cargando...'}</p>
        </div>
      </div>

      {/* Aquí puedes agregar gráficos o más estadísticas */}
    </div>
  );
};

export default Dashboard;