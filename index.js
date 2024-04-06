// Crear package.json ----> npm init --yes
// Instalar express ----> npm i express --save
// instalar nodemon global (una vez) para ejecutar los comandos ----> npm i -g nodemon
// instalar nodemon en el proyecto ----> npm i nodemon -D

// Importar e instanciar express
const express = require('express');
const app = express();

// Definir el puerto
const PUERTO = 3000;

// Iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});

// Definir la carpeta "assets" como carpeta pública del servidor.
app.use(express.static('assets'));

// Crear un arreglo de nombres
const nombres = ["Juan", "Jocelyn", "Astrid", "María", "Ignacia", "Javier", "Brian"];

// Ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios: nombres });
});

// Middleware para validar la existencia del usuario
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    nombres.includes(usuario) ? next() : res.redirect('assets/who.jpeg');
});

// Ruta para manejar la lógica del juego
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    const numeroParametro = parseInt(req.params.n);
    const imagen = numeroParametro === numeroAleatorio ? '/assets/conejito.jpg' : '/assets/voldemort.jpg';
    res.redirect(__dirname + '/' + imagen);
});

// Ruta genérica para manejar páginas no encontradas
app.use((req, res) => {
    res.status(404).send(`La página ${req.url} no existe...`);
});

// // Servir el archivo HTML
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });