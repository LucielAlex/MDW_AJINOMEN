import { Router } from "express";
import {
    createVenta,
    getVenta,
    getVentaByCodigo,
    updateVentaByCodigo,
    deleteVentaByCodigo,
} from "../controllers/venta.controller.js";

const router = Router();

router.post("/ventas", createVenta);
router.get("/ventas", getVenta);
router.get("/ventas/:codigo", getVentaByCodigo);
router.put("/ventas/:codigo", updateVentaByCodigo);
router.delete("/ventas/:codigo", deleteVentaByCodigo);

export default router;
