import express from "express";
import RespostaController from "../components/escolas/controller/respostasController.js";
import autenticarJWT from "../middleware/authMiddleware.js"; 
import { validarResposta, validarErros } from "../middleware/validacaoRespostaMiddleware.js"; 

const router = express.Router();

// Rota para cadastrar a resposta (aluno)
router.post("/", autenticarJWT, validarResposta, validarErros, RespostaController.cadastrarResposta);

// Rota para listar as respostas de uma publicação específica
router.get("/publicacoes/:publicacao_id/respostas", autenticarJWT, RespostaController.listarRespostasPorPublicacao);

export default router;
