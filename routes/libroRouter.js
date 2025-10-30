import { Router } from "express";
//import Llibre from "../models/Llibre";

const router = Router();

router.get('/', (req,res) =>{
    res.send("You are in Libros");
});

/* router.get("/","getLlibres");
router.post("/","createLlibre");
router.get("/:id","getLlibreById");
router.put("/:id","updateLlibre");
router.delete("/:id","deleteLlibre"); */

export default router;