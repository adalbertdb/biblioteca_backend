import { Router } from "express";

const router = Router()

router.get('/',(req,res) => {
    res.send("you are in Revistas")
})

export default router