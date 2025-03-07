import express from 'express';
import AlunosController from '../controllers/alunosController.js';

const router = express.Router();

// Definição das rotas, chamando os métodos corretos do controller
router.get('/', AlunosController.listarAlunos);
router.get('/:id', AlunosController.listarAlunosPorId);
router.post('/', AlunosController.cadastrarAluno);
router.put('/:id', AlunosController.atualizarAluno);
router.delete('/:id', AlunosController.excluirAluno);

export default router;
