import {Router} from "express";
import * as revistasController from "../controllers/revistaController.js"

const router = Router();

router.get("/",revistasController.getRevistas);
router.post("/",revistasController.createRevista);
router.get("/:id",revistasController.getRevistaById);
router.put("/:id",revistasController.updateRevista);
router.delete("/:id",revistasController.deleteRevista);

export default router;