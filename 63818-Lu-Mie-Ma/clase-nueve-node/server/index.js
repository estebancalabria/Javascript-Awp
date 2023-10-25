const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(bodyParser.json());

let personas = [
    {id:1, nombre : "Juan"},
    {id:2, nombre : "Pedro"},
    {id:3, nombre : "Pablo"},
];

app.post("/api/personas", (req,resp)=>{
    //console.log("El body es " + req.body);
    
    let nuevaPersona = req.body;
    console.log(JSON.stringify(nuevaPersona));
    nuevaPersona.id = Math.max(...personas.map((p)=>(p.id)),0) + 1;
    personas.push(nuevaPersona);

    resp.send({
        msg : "Persona Agregada con id"
    });
    resp.end();
})

app.get("/saludo", (req, resp)=>{
    resp.send(`Hola ${req.query.nombre}`);
})

app.get("/api/personas", (_,resp)=>{
    resp.send(personas);
    resp.end();
});

app.get("/", (_,resp)=>{
    resp.write("<h1>Hola Mundo Node</h1>");
    resp.end();
});

app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`);
});