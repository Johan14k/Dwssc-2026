import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, _next) {
  res.render('index', { 
    title: 'Johan Aleman',
    counter: 4,
    numbers: [1, 2, 3, 4]
  });
});

export default router;