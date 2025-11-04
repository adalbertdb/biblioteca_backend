import {Router} from "express";
import * as peliculasController from "../controllers/peliculaController.js"

const router = Router();

router.get("/",peliculasController.getPeliculas);
router.post("/",peliculasController.createPelicula);
router.get("/:id",peliculasController.getPeliculaById);
router.put("/:id",peliculasController.updatePelicula);
router.delete("/:id",peliculasController.deletePelicula);

export default router;