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