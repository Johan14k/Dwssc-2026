// Importando modulos de express
import express from 'express';

// Importando la accion que quiero enrutar
import renderHome from './home.controller.js';

// Creando un enrutador de express
const router = express.Router();

// Enrutando Action Methods del controlador Home

// GET "/"
router.get('/', renderHome);

export default router;