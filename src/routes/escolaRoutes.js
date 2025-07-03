import express from 'express';
import EscolasController from '../components/auth/controller/escolasController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", autenticarJWT, EscolasController.listarEscolas);
router.get("/:id", autenticarJWT, EscolasController.listarEscolasPorId);
router.post("/", EscolasController.cadastrarEscola);
router.put("/:id", autenticarJWT, EscolasController.atualizarEscola);
router.delete("/:id", autenticarJWT, EscolasController.excluirEscola);

export default router;
