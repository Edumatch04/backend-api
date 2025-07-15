import express from 'express';
import AlternativaDesafioController from '../components/escolas/controller/alternativasDesafiosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/questao/:questao_id', autenticarJWT, AlternativaDesafioController.listarAlternativasPorQuestao);
router.post('/questao/:questao_id', autenticarJWT, AlternativaDesafioController.adicionarAlternativa);
router.put('/:id', autenticarJWT, AlternativaDesafioController.atualizarAlternativa);
router.delete('/:id', autenticarJWT, AlternativaDesafioController.excluirAlternativa);

export default router;
