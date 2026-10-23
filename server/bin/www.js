#!/usr/bin/env node

/**
 * Module dependencies.
 */

// Manera anterior --> var app = require('../app');
// Importando debug
import creatDebug from 'debug';
// Manera anterior var debug = require('debug')('dwssc-2026:server');
// Manera anterior var http = require('http');
import http from 'node:http';
import app from '../app.js'; //<--- Nueva manera

// Creacion del obejto Debug
const debug = creatDebug('dwssc-2026:server');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const parsedPort = parseInt(val, 10);

  if (Number.isNaN(parsedPort)) {
    // named pipe
    return val;
  }

  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }

  return false;
}

// 1. PRIMERO declaramos el puerto
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// 2. DESPUÉS declaramos el servidor
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// 3. AHORA SÍ creamos las funciones que usan el puerto y el servidor
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`💻 Listening on ${bind}`);
}

// 4. FINALMENTE encendemos todo
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);