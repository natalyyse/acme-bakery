const express = require('express');
const path = require('path');
const routes = require('./routes/rutas');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', routes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));