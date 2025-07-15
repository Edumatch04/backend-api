import express from 'express';
import AlunosController from '../controllers/alunosController.js';
import TempoController from '../controllers/tempoController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', autenticarJWT, AlunosController.listarAlunos);
router.get('/:id', autenticarJWT, AlunosController.listarAlunosPorId);
router.post('/', autenticarJWT, AlunosController.cadastrarAluno);
router.post('/:id/tempo', TempoController.registrarTempo);
router.get('/:id/tempo', TempoController.obterTempoPorIntervalo);
router.put('/:id', autenticarJWT, AlunosController.atualizarAluno);
router.delete('/:id', autenticarJWT, AlunosController.excluirAluno);

export default router;
