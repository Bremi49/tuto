import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import router from "./routes/routes.js";

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

app.use("/", router);

app.listen(3001, () => {
    console.log("le serveur est demarrer")
})

//body-parser= middleware qui sécurise les envoies utilisateurs
//cors = connexion entre le back et le front (permet de rentrer dans la base de données)
//lien vers la route.js