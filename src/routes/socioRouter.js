import {Router} from "express";
import * as socioController from "../controllers/socioController.js"

const router = Router();

router.get("/",socioController.getSocios);
router.post("/",socioController.createSocio);
router.get("/:id",socioController.getSocioById);
router.put("/:id",socioController.updateSocio);
router.delete("/:id",socioController.deleteSocio);

export default router;