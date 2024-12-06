import { Router } from "express";
import {
    createCliente,
    getClientes,
    getClienteByCodigo,
    updateClienteByCodigo,
    deleteClienteByCodigo,
} from "../controllers/cliente.controller.js";

const router = Router();

router.post("/clientes", createCliente);
router.get("/clientes", getClientes);
router.get("/clientes/:codigo", getClienteByCodigo);
router.put("/clientes/:codigo", updateClienteByCodigo);
router.delete("/clientes/:codigo", deleteClienteByCodigo);

export default router;
