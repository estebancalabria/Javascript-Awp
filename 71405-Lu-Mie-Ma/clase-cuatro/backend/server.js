const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());

// Lista de tareas
const tareas = [
    { id: 1, tarea: 'Aprender Node.js' },
    { id: 2, tarea: 'Desarrollar una API' },
    { id: 3, tarea: 'Probar la API con Postman' }
];

// Ruta GET /tareas/
app.get('/tareas/', (req, res) => {
    res.json(tareas);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
