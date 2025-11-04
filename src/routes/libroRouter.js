import {Router} from "express";
import * as librosController from "../controllers/libroController.js"

const router = Router();

router.get("/",librosController.getLibros);
router.post("/",librosController.createLibro);
router.get("/:id",librosController.getLibroById);
router.put("/:id",librosController.updateLibro);
router.delete("/:id",librosController.deleteLibro);

export default router;