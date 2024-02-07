import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {target: 'https://wyrserver.onrender.com/api/',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),}
    }
  },
  //base: "/Would-you-rather/Client/"
})
