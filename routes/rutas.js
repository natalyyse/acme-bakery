const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

router.get('/nosotros', (req, res) => {
  res.render('about', { title: 'Nosotros' });
});

router.get('/servicios', (req, res) => {
  res.render('services', { title: 'Nuestros Servicios' });
});

router.get('/catalogo', (req, res) => {
  res.render('catalog', { title: 'Catálogo de Clientes' });
});

router.get('/contacto', (req, res) => {
  res.render('contact', { title: 'Contáctenos' });
});

router.post('/contacto', (req, res) => {
  // Aquí manejarías el envío del formulario de contacto
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;