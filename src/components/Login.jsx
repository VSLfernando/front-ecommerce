
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso:', data);

        // Guardar usuario y rol en localStorage
        //localStorage.setItem('user', data.username);
        localStorage.setItem('user', JSON.stringify(data)); //descomentar esto si falla
      
        localStorage.setItem('rol', data.rol);  // Asegúrate de que 'rol' sea 'ADMIN' si es administrador
        // console.log('Login exitoso:', data);

        // Redirigir al dashboard si el usuario es administrador
        if (data.is_admin) {
          navigate("/admin");  // Redirigir directamente a /admin
        } else {
          navigate("/");  // Redirige a la página de inicio si no es admin
        }
      }else {
        const errorData = await response.json();
        alert(errorData.error || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4">
        <h1 className="text-center text-2xl font-bold text-blue-600">LOGIN</h1>
        <input
          type="text"
          placeholder="Usuario"
          className="text-center p-2 border border-gray-600 rounded bg-gray-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="text-center p-2 border border-gray-600 rounded bg-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-400 hover:bg-indigo-500 text-white px-20 py-2 rounded"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;