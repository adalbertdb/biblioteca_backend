// app.js
import express from "express";
import recursoRouter from "./routes/recursoRouter.js";
//import peliculasRouter from "./routes/peliculaRouter.js";

console.log("User:", process.env.DB_USER);


//import peliculasRouter from "./routes/peliculaRouter.js";

const app = express();

// Middleware para que Express entienda JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("html"));
// Montamos el router de recursos en la ruta base /recursos
app.use("/recursos", recursoRouter);
//app.use("/recursos/peliculas", peliculasRouter);

//app.use("/llibres", llibreRouter);

// Exportamos la app para usarla en server.js
export default app;
