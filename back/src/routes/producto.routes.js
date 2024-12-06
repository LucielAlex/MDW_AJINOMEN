import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductByCodigo,
    updateProductByCodigo,
    deleteProductByCodigo,
} from "../controllers/producto.controller.js";

const router = Router();

router.post("/productos", createProduct);
router.get("/productos", getProducts);
router.get("/productos/:codigo", getProductByCodigo);
router.put("/productos/:codigo", updateProductByCodigo);
router.delete("/productos/:codigo", deleteProductByCodigo);

export default router;
