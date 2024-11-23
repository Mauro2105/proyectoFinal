const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para contar visitas
let visitCounter = 0;

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware personalizado para contar visitas
app.use((req, res, next) => {
    visitCounter++;
    next();
});

// Rutas
app.get('/', (req, res) => {
    res.render('index', { visitCounter });
});

app.get('/about', (req, res) => {
    res.render('about', { visitCounter });
});

app.get('/contact', (req, res) => {
    res.render('contact', { visitCounter });
});

// Ruta para manejo de errores (404)
app.use((req, res) => {
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
