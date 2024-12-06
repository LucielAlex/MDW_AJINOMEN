import { Router } from "express";
import {
    createLocal,
    getLocal,
    getLocalByCodigo,
    updateLocalByCodigo,
    deleteLocalByCodigo,
} from "../controllers/local.controller.js";

const router = Router();

router.post("/locales", createLocal);
router.get("/locales", getLocal);
router.get("/locales/:codigo", getLocalByCodigo);
router.put("/locales/:codigo", updateLocalByCodigo);
router.delete("/locales/:codigo", deleteLocalByCodigo);

export default router;
