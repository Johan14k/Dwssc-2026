import {defineConfig} from 'vite'
import {resolve} from 'node:path'

export default defineConfig({
    //Directorio raiz de los archivos fuente del front end
    root: 'src',
    //Configurando un servidor de desarrollo 
    server:{
        //Puerto de escucha
        port: 5173,
        //Rigidez del puerto
        strictPort: true
    },
    //Configurando el build
    build:{
        //Directorio de salida js pra produccion: 
        outDir: "../dist",
        //Asegurando limpieza del folder del folder de produccion
        emptyOutDir: true,
        //Generar mainfiesto para el servidor
        manifest: true,
        //Pocines de empaquetado
        rolldownOptions:{
            input:{
                main: resolve(__dirname, 'src/main.js')
            }

        } 
    },
    //Configuracion para el desarrollo 
    publicDir: false
})