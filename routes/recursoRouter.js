import { Router } from "express";
import Recurso from "../models/Recurso.js";
import * as recursoController from "../controllers/recursoController.js";

const router = Router();

router.get("/", recursoController.getRecursos);
router.get("/:id", recursoController.getRecursoById);
router.post("/", recursoController.createRecurso);
router.put("/:id", recursoController.updateRecurso);
router.delete("/:id", recursoController.deleteRecurso);

export default router;