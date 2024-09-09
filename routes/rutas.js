const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuración del transporter para enviar correos
let transporter;
try {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "", // colocar el correo de Gmail
            pass: "" // colocar la contraseña de aplicación
        }
    });
} catch (error) {
    console.error('Error al crear el transporter:', error);
}

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

router.post('/contacto', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).send('Faltan campos requeridos');
    }

    const now = new Date();
    const fechaHora = now.toLocaleString('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: false
    });

    const mailOptions = {
      from: '"Pasteleria Acme" <yaseni.esquivel@tecsup.edu.pe>',
      to: "yasenisandoval25@gmail.com",
      cc: "ravalosr@gmail.com", 
      replyTo: email,
      subject: "Pasteleria acme",
      text: `Nombre: ${name}\nEmail: ${email}\nFecha y Hora: ${fechaHora}\nMensaje: ${message}`
    };

    await transporter.sendMail(mailOptions);

    console.log(JSON.stringify({
      desde: mailOptions.from,
      para: mailOptions.to,
      cuerpo: mailOptions.text.replace(/\n/g, ' ')
    }, null, 2));

    res.redirect('/?mensaje=Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar:', error);
    res.status(500).send('Error al enviar');
  }
});

module.exports = router;