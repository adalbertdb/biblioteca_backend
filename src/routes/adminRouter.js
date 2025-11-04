import {Router} from "express";
import * as adminController from "../controllers/adminController.js"

const router = Router();

router.get("/",adminController.getAdmins);
router.post("/",adminController.createAdmin);
router.get("/:id",adminController.getAdminById);
router.put("/:id",adminController.updateAdmin);
router.delete("/:id",adminController.deleteAdmin);

export default router;