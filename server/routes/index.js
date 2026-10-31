import express from 'express';
import logger from '../LIB/winston.js';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, _next) => {
  res.render('index', {
    title: 'Johan Aleman',
    counter: 4,
    numbers: [1, 2, 3, 4],
  });
});

// Rutas de prueba para exceptions y rejections
// Solo habilitadas en modo desarrollo
if (process.env.NODE_ENV !== 'production') {
  // Ruta de prueba de excepciones
  router.get('/test-exception', (req, res) => {
    // Retrasar el fallo 100ms
    setTimeout(() => {
      throw new Error('Excepcion de prueba no capturada');
    }, 100);
    res.json({
      message: 'Excepcion lanzada. Revisa logs/exceptions.log'
    });
  });

  // Prueba de una rejection
  router.get('/test-rejection', (req, res) => {
    // Promesa rechazada sin catch
    Promise.reject(new Error('Promesa rechazada de prueba sin catch'));
    res.json({
      message: 'Promesa rechazada, revisa archivo logs/rejections.log'
    });
  });
}

// Rutas para prueba de logs
// Acceder a GET /test-logs
router.get('/test-logs', (req, res) => {
  logger.error('Esto es un mensaje de ERROR - algo falló');
  logger.warn('Esto es un mensaje de WARN - algo podría estar mal');
  logger.info('Esto es un mensaje de INFO - operación exitosa');
  logger.http('Esto es un mensaje de HTTP - petición recibida');
  logger.debug('Esto es un mensaje de DEBUG - detalle de depuración');

  res.json({
    message: 'Logs de prueba generados. Revisa la consola y los archivos en /logs',
    files: [
      'logs/app-YYYY-MM-DD.log -> DailyRotateFile (info+warn+error en JSON)',
      'logs/app-readable.log -> Formato legible (info+warn+error)',
      'logs/error.log -> Solo errores'
    ]
  });
});

export default router;