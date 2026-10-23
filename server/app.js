// Función para manejar errores en la aplicación (como el clásico error 404)
import createError from 'http-errors';

// Importar el framework express (la base de nuestra aplicación)
import express from 'express';

// Importa módulo para manejar y unir rutas de archivos y carpetas fácilmente
import path from 'path';

// Importa módulo para manejar y leer las cookies del navegador
import cookieParser from 'cookie-parser';

// Importa módulo para manejar logs (registra las peticiones que llegan al servidor en la consola)
import logger from 'morgan';

// ¡AQUÍ ESTÁ LA PIEZA FALTANTE! Importamos hbs y tu helper de Vite
import hbs from 'hbs';
import { registerViteHelper } from './LIB/vite.js';

// Importa el enrutador que controlará la página principal
// eslint-disable-next-line import-x/no-rename-default, import-x/no-useless-path-segments
import indexRouter from './routes/index.js';

// Importa el enrutador que controlará todo lo relacionado con usuarios
// eslint-disable-next-line import-x/no-rename-default
import usersRouter from './routes/users.js';

// Inicializa nuestra aplicación de Express
const app = express();

// --- Configuración del motor de vistas (lo que el usuario verá) ---

// Le indicamos a Express en qué carpeta se encuentran nuestros archivos de vistas
app.set('views', path.join(import.meta.dirname, 'views'));

// Establecemos 'hbs' (Handlebars) como nuestro motor para renderizar el HTML
app.set('view engine', 'hbs');

// ¡AQUÍ ENCENDEMOS LA CONEXIÓN CON VITE!
registerViteHelper(hbs);

// --- Configuración de herramientas (middlewares) ---

// Usamos el logger en modo 'dev' para ver en consola cada petición
app.use(logger('dev'));

// Le decimos a la aplicación que entienda y procese los datos en JSON
app.use(express.json());

// Le decimos a la aplicación que entienda los datos enviados a través de formularios web
app.use(express.urlencoded({ extended: false }));

// Habilitamos el uso de cookies en nuestra aplicación
app.use(cookieParser());

// Definimos la carpeta 'public' para archivos estáticos
app.use(express.static(path.join(import.meta.dirname, 'public')));

// --- Definición de las Rutas ---

// Cuando alguien visite la ruta raíz ('/'), usa el enrutador principal
app.use('/', indexRouter);

// Cuando alguien visite '/users', usa el enrutador de usuarios
app.use('/users', usersRouter);

// --- Manejo de Errores ---

// Si el usuario busca una ruta que no existe, atrapamos el error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador central de errores
app.use((err, req, res, _next) => {
  // Prepara el mensaje de error para mostrarlo en la vista
  res.locals.message = err.message;

  // Muestra los detalles del error solo si estamos desarrollando
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Define el código de estado HTTP
  res.status(err.status || 500);

  // Renderiza y muestra la plantilla 'error.hbs' al usuario
  res.render('error');
});

// Exporta toda la configuración de la aplicación
export default app;