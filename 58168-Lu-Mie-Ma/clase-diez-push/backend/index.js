const express = require("express");
const cors = require("cors");
const webPush = require("web-push");

webPush.setVapidDetails("mailto:mct.esteban.calabria@gmail.com",
    "BHdxL2ZsTReNQGngdFZoF_WijAagWNhPWUFDlm0mecAyM5AXWtojecOC4Ad6oSRWM6iGTjJDme4hEmyqO3DYimE",
    "toINMLhnRaGOtBa-rG5sqdRhxiWeJOvQk1XMacXUZok");

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

const subscripciones = [];

app.get("/", (req, res) => {
    res.send("Mi backend esta funcionando");
})

app.post("/registrar", (req, res) => {
    console.log("Applicacion Registrada", req);
    subscripciones.push(req.body)
})

setInterval(() => {
    for (let sub of subscripciones) {
        console.log("Mandando notificaciones a apps");
        webPush.sendNotification(sub, "Novedades desde el server...")
    }
}, 10000);

app.listen(PORT, () => {
    console.log("Esuchando en el %d", PORT)
})