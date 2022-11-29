const express = require("express");
const cors = require("cors");
const webPush = require("web-push");

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3000;
var subscripciones = [];

webPush.setVapidDetails("mailto:mct.esteban.calabria@gmail.com",
"BDVfCkRd43_q1HyA7Uq0k54_iV6qaiL6c5utEq-3EqaQ6fmo1Qi0GqpAIlCPlDV_UM4h1c2sWhnXFaRmDepJuCQ",
"O3aIDPRZU12RRZz6slsv4OtN-wTi_NbnO1NgaImthvE");

app.get("/", (req,res)=>{
    console.log("GET "+ req.url);
    res.send("<h1>Hola Server...</h1>")
});

app.get("/notificar", (req,res)=>{
    console.log("Notificando");
    for (let sub of subscripciones){
        console.log("Notificando");
        webPush.sendNotification(sub,"Notificacion desde el server");
    }
    res.send("OK");
    res.status(200);
})

app.post("/subscribe",(req,res)=>{
   subscripciones.push(req.body);
   console.log("Dispositivo Registrado");
   console.log(req.body);
   res.status(200);
})

app.listen(PORT,()=>{
   console.log(`%cEscuchando en el puerto ${PORT}`); 
});

