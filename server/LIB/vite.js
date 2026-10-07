// Biblioteca File Stream
import fs from 'node:fs'

// Biblioteca de rutas
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Creando (alias) función __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Helper para Handlebars que genera las etiquetas de Vite
 * * EN DESARROLLO: Conecta al servidor de desarrollo de Vite
 * * EN PRODUCCIÓN: Usa los compilados de Vite
 */
export function viteAssets() {
    // Obtener modo de ejecución
    const isDev = process.env.NODE_ENV !== 'production'
    // Rescatando la URL del servidor de desarrollo
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'
    
    // Si estamos en modo desarrollo
    if (isDev) {
        // En desarrollo, cargamos los archivos
        // del front-end directamente del servidor de Desarrollo de Vite
        return `
            <script type="module" src="${viteDevServer}/@vite/client"></script>
            <script type="module" src="${viteDevServer}/main.js"></script>
        `
    }
    
    // En producción leemos el manifest y generamos las etiquetas finales
    const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json')

    // Si no existe el manifest
    if (!fs.existsSync(manifestPath)) {
        console.warn("Vite manifest not found. Run 'npm run build'")
        return ''
    }

    // Leyendo y parseando a JSON el archivo de manifiesto
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    
    // Obteniendo la ruta del punto de entrada del front-end
    const mainEntry = manifest['main.js']
    
    // Guarda el main.js
    if (!mainEntry) {
        console.warn('Archivo main.js no esta disponible en el manifiesto de vite')
        return ''
    }

    let tags = ''

    // Archivos CSS
    if (mainEntry.css) {
        mainEntry.css.forEach(cssFile => {
            tags += `<link rel="stylesheet" href="/${cssFile}">\n`
        });
    }

    // JS file
    tags += `<script type="module" src="/${mainEntry.file}"defer></script>`;

    // Retornamos todas las etiquetas generadas
    return ''
}

/**
 * Función registradora del helper de handlebars
 */
export function registerViteHelper(hbs) {
    hbs.registerHelper('viteAssets', () => { 
        return new hbs.SafeString(viteAssets()) 
    })
}