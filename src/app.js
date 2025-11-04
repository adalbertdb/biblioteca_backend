// app.js
import express from "express";
import recursoRouter from "./routes/recursoRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';


//import peliculasRouter from "./routes/peliculaRouter.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para que Express entienda JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


// Montamos el router de recursos en la ruta base /recursos
app.use("/recursos", recursoRouter);
//app.use("/recursos/peliculas", peliculasRouter);

//app.use("/llibres", llibreRouter);

// Exportamos la app para usarla en server.js
export default app;
