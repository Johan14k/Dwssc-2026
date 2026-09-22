// Funcion para manejar errores en la aplicacion
// ❌ var createError = require('http-errors');
import createError from 'http-errors'

// Importar el framework express
// ❌ var express = require('express');
import express from 'express'

// Importa modulos para manejar rutas
// ❌ var path = require('path');
import path from 'node:path'

// Importa modulos para manejar cookies
// ❌ var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser'

// Importa modulos para manejar logs
// ❌ var logger = require('morgan');
import logger from 'morgan'

// Importar las rutas de la aplicación
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

// Crear la aplicación express
var app = express();

// --- Configuración del motor de vistas (lo que el usuario verá) ---

// Le indicamos a Express en qué carpeta se encuentran nuestros archivos de vistas (plantillas)
app.set('views', path.join(__dirname, 'views'));

// Establecemos 'hbs' (Handlebars) como nuestro motor para renderizar el HTML
app.set('view engine', 'hbs');

// --- Configuración de herramientas (middlewares) ---

// Usamos el logger en modo 'dev' para ver en consola cada petición que nos hacen
app.use(logger('dev'));

// Le decimos a la aplicación que entienda y procese los datos que lleguen en formato JSON
app.use(express.json());

// Le decimos a la aplicación que entienda los datos enviados a través de formularios web
app.use(express.urlencoded({ extended: false }));

// Habilitamos el uso de cookies en nuestra aplicación
app.use(cookieParser());

// Definimos la carpeta 'public' para archivos estáticos (aquí van tus imágenes, CSS, scripts del cliente)
app.use(express.static(path.join(__dirname, 'public')));

// --- Definición de las Rutas ---

// Cuando alguien visite la ruta raíz ('/'), usa el enrutador principal
app.use('/', indexRouter);

// Cuando alguien visite '/users', usa el enrutador de usuarios
app.use('/users', usersRouter);

// --- Manejo de Errores ---

// Si el usuario busca una ruta que no existe, atrapamos el error 404 (No encontrado) y lo enviamos al manejador
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador central de errores (aquí caen todos los problemas)
app.use(function(err, req, res, next) {
  // Prepara el mensaje de error para mostrarlo en la vista
  res.locals.message = err.message;
  
  // Muestra los detalles del error solo si estamos desarrollando (por seguridad, en producción no se muestran detalles)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Define el código de estado HTTP (usa el del error, o 500 si fue un fallo interno del servidor)
  res.status(err.status || 500);
  
  // Renderiza y muestra la plantilla 'error.hbs' al usuario
  res.render('error');
});

// Exporta toda la configuración de la aplicación para que el servidor pueda arrancarla
module.exports = app;