import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This exposes the server to the network
    // host: '0.0.0.0', // This is equivalent to host: true
    // port: 5173, // Optional: Specify a port if needed
  },
})
