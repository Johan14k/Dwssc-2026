import express from 'express';

const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', (req, res, _next) => { // <-- CAMBIO 1: Le pusimos un guion bajo a _next
  counter += 1;                        // <-- CAMBIO 2: Cambiamos counter++ por counter += 1
  numbers.push(counter);
  res.render('index', {
    title: 'Johan Aleman',
    counter,
    numbers,
  });
});

export default router;