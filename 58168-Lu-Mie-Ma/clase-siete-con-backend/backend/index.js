const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/productos", (req,res)=>{
    setTimeout(()=>{
        res.send([{id:1, nombre:"Televisor"},{id:2, nombre:"Radio"}])
    }, 4000);
})

app.listen(3000, ()=>{console.log("Escuchando en el 3000")});