import { response, Router } from "express";
import Recurso from "../models/Recurso.js";
import * as recursoController from "../controllers/recursoController.js";
import peliculaRouter from "./peliculaRouter.js"
import libroRouter from "./libroRouter.js"
import revistaRouter from "./revistaRouter.js"

const router = Router();
router.use("/peliculas", peliculaRouter);
router.use("/libros", libroRouter );
router.use("/revistas", revistaRouter);

router.get("/", recursoController.getRecursos);
router.post("/", recursoController.createRecurso);
router.get("/:id", recursoController.getRecursoById);
router.put("/:id", recursoController.updateRecurso);
router.delete("/:id", recursoController.deleteRecurso);


//router.get("/peliculas/:id", peliculaController.getPeliculas)



export default router;