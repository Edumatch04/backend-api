import express from 'express';
import AlternativasController from '../controllers/alternativasController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/questao/:questao_id', autenticarJWT, AlternativasController.listarAlternativasPorQuestao);
router.post('/questao/:questao_id', autenticarJWT, AlternativasController.adicionarAlternativa);
router.put('/:id', autenticarJWT, AlternativasController.atualizarAlternativa);
router.delete('/:id', autenticarJWT, AlternativasController.excluirAlternativa);

export default router;
