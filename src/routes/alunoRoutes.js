import express from 'express';
import AlunosController from '../controllers/alunosController.js';
import autenticarJWT from "../middleware/authMiddleware.js";

const router = express.Router();

// Definição das rotas, chamando os métodos corretos do controller
router.get('/', autenticarJWT, AlunosController.listarAlunos);
router.get('/:id', autenticarJWT, AlunosController.listarAlunosPorId);
router.post('/', autenticarJWT, AlunosController.cadastrarAluno);
router.put('/:id', autenticarJWT, AlunosController.atualizarAluno);
router.delete('/:id', autenticarJWT, AlunosController.excluirAluno);

export default router;
