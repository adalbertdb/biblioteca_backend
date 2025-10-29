import {Router} from "express";
import * as PeliculasController from "../controllers/peliculaController.js"

const router = Router();

router.get("/",PeliculasController.getPeliculas);
/* router.post("/","createPelicula");
router.get("/:id","getPeliculaById");
router.put("/:id","updatePelicula");
router.delete("/:id","deletePelicula"); */


export default router;