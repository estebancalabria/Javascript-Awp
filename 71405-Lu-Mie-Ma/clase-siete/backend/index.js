// server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Ruta para obtener todas las tareas
app.get('/tasks', (req, res) => {
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para agregar una nueva tarea
//El post recibe un json con el atributo description y actualiza los id de todos los elementos
app.post('/tasks', (req, res) => {
    console.log("POST:" + JSON.stringify(req.body));
    const newTask = req.body;
    console.log("New Task:" + JSON.stringify(newTask));

    if (!newTask.description) {
        return res.status(400).json({ error: 'La descripción es requerida' });
    }

    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }

        let tasks = JSON.parse(data);

        // Asignar un nuevo id a la nueva tarea
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        newTask.id = newId;

        tasks.push(newTask);

        fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar la tarea' });
            }
            res.status(201).json(newTask);
        });
    });
});

// Ruta para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        
        let tasks = JSON.parse(data);
        tasks = tasks.filter(task => task.id !== taskId);

        fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar la tarea' });
            }
            res.status(204).send();
        });
    });
});

// Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
