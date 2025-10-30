 import {Router} from "express";
import * as peliculasController from "../controllers/peliculaController.js"

const router = Router();

router.get('/', (req, res) => {
    res.send('hello you are in peliculas');
});

/* router.get("/",peliculasController.getPeliculas);
router.post("/",peliculasController.createPelicula);
router.get("/:id","getPeliculaById");
router.put("/:id","updatePelicula");
router.delete("/:id","deletePelicula");
 */

export default router;