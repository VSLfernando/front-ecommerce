import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/`;

// Crear instancia de axios con configuración
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios para las diferentes entidades
export const productosService = {
  getAll: () => apiClient.get('productos/'),
  getById: (id) => apiClient.get(`productos/${id}/`),
  getPorCategoria: (categoriaId) => apiClient.get(`productos/por_categoria/?categoria_id=${categoriaId}`),
};

export const categoriasService = {
  getAll: () => apiClient.get('categorias/'),
};

export const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}api-token-auth/`, { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Más servicios según necesites...