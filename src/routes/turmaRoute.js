import express from 'express';
import TurmasController from '../controllers/turmasController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', autenticarJWT, TurmasController.listarTurmas);
router.get('/:id', autenticarJWT, TurmasController.listarTurmaPorId);
router.post('/', autenticarJWT, TurmasController.cadastrarTurma);
router.put('/:id', autenticarJWT, TurmasController.atualizarTurma);
router.delete('/:id', autenticarJWT, TurmasController.excluirTurma);

export default router;
