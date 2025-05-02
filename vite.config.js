import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite exponer públicamente el frontend
    allowedHosts: ['b752-181-115-136-174.ngrok-free.app'] // agrega aquí tu dominio Ngrok
  }
})
