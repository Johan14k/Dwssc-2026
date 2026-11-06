import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
    // Directorio raiz de los archivos fuente del front end
    root: 'src',
    // Agregando a Vite el plugin de tailwindcss
    plugins: [tailwindcss()],
    // Configurando un servidor de desarrollo 
    server: {
        // Puerto de escucha
        port: 5173,
        // Rigidez del puerto
        strictPort: true
    },
    // Configurando el build
    build: {
        // Directorio de salida js pra produccion: 
        outDir: "../dist",
        // Asegurando limpieza del folder de produccion
        emptyOutDir: true,
        // Generar manifiesto para el servidor
        manifest: true,
        // Opciones de empaquetado
        rolldownOptions: {
            input: {
                // ¡AQUÍ ESTÁ LA CORRECCIÓN! Cambiamos __dirname por import.meta.dirname
                main: resolve(import.meta.dirname, 'src/main.js')
            }
        } 
    },
    // Configuracion para el desarrollo 
    publicDir: false
});