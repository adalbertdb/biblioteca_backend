// app.js
import express from "express";
import recursoRouter from "./routes/recursoRouter.js";
import socioRouter from "./routes/socioRouter.js";
import adminRouter from "./routes/adminRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';


//import peliculasRouter from "./routes/peliculaRouter.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bodyParser from "body-parser";

// Middleware para que Express entienda JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Montamos el router de recursos en la ruta base /recursos
app.use("/recursos", recursoRouter);
app.use("/socios", socioRouter);
app.use("/admins", adminRouter);
//app.use("/recursos/peliculas", peliculasRouter);

//app.use("/llibres", llibreRouter);

// Exportamos la app para usarla en server.js
export default app;
