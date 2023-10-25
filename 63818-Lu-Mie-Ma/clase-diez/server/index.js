const express = require("express");
const cors = require("cors");
const webPush = require("web-push");

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const subscripciones = [];

webPush.setVapidDetails(
    "mailto:mct.esteban.calabria@gmail.com",
    "BOSco5oijcOdL4ebcyVkqe6dG9t15l4pVxgLhtaUzzqZB627ldaNjhjzqDeVp6GtjuqSpcQR7_1GAfCURn_7UUY",
    "mfta84QzESEm9cir-u9e31reB0bG1TgwA4s5qSG-ygY"
);

setInterval(()=>{
    
    subscripciones.forEach((sub)=>{
        console.log("Enviando noticia a suscripcion");
        console.log(JSON.stringify(sub));
        webPush.sendNotification(sub, "Tenemos una noticia para vos " + new Date());
    })

}, 30000);


 
app.post("/subscribe", (req,res)=>{
    console.log("Tenemos un afortunado subscribiendose a mi servidor push");
    const subscripcion = req.body;

    console.log(JSON.stringify(subscripcion));
    subscripciones.push(subscripcion);

    webPush.sendNotification(subscripcion, 
        "Bienvenido a nuestro servidor push");
});


app.get("/", (_,resp)=>{
    resp.send("<h1>Mi backend esta funcionando</h1>")
    resp.end();
});

app.listen(port, ()=>{
   console.log(`Escuchando en el puerto ${port} -`);
})